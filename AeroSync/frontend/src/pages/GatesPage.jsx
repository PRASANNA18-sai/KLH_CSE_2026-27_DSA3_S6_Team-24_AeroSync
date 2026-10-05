import React, { useState, useEffect } from 'react';
import { DoorClosed, Plane, AlertCircle, CheckCircle2, Shield, Wrench } from 'lucide-react';
import api from '../api/api';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import { LoadingSpinner, ErrorMessage } from '../components/LoadingSpinner';

export default function GatesPage() {
  const [gates, setGates] = useState([]);
  const [selectedGate, setSelectedGate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [assignModal, setAssignModal] = useState(false);
  const [targetFlightId, setTargetFlightId] = useState('');
  const [targetStatus, setTargetStatus] = useState('Occupied');
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchGates = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getGates();
      setGates(res.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch gate allocation data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGates();
  }, []);

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    if (!selectedGate) return;

    try {
      setIsUpdating(true);
      await api.assignGate(selectedGate.gateId, targetFlightId, targetStatus);
      await fetchGates();
      setAssignModal(false);
    } catch (err) {
      console.error(err);
      setError('Failed to update gate assignment.');
    } finally {
      setIsUpdating(false);
    }
  };

  const getGateColor = (status) => {
    switch (status) {
      case 'Available':
        return 'border-emerald-500/40 bg-emerald-950/30 text-emerald-400 hover:border-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]';
      case 'Occupied':
        return 'border-cyan-500/50 bg-cyan-950/40 text-cyan-300 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]';
      case 'Reserved':
        return 'border-amber-500/40 bg-amber-950/30 text-amber-400 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]';
      case 'Maintenance':
        return 'border-rose-500/40 bg-rose-950/30 text-rose-400 hover:border-rose-400 hover:shadow-[0_0_20px_rgba(244,63,94,0.3)]';
      default:
        return 'border-slate-700 bg-slate-900 text-slate-400';
    }
  };

  if (loading) {
    return <LoadingSpinner message="Querying Terminal Gate Concourse Matrix..." />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-mono text-slate-100 uppercase tracking-wide">
            Terminal Gate Concourse Layout
          </h1>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Real-time visual gate management, apron docking status, and turnaround allocation.
          </p>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-emerald-500/60 border border-emerald-400" />
            <span className="text-slate-300">Available</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-cyan-500/60 border border-cyan-400" />
            <span className="text-slate-300">Occupied</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-amber-500/60 border border-amber-400" />
            <span className="text-slate-300">Reserved</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded bg-rose-500/60 border border-rose-400" />
            <span className="text-slate-300">Maintenance</span>
          </div>
        </div>
      </div>

      {error && <ErrorMessage message={error} onRetry={fetchGates} />}

      {/* Terminal Gate Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {gates.map((g) => {
          const isSelected = selectedGate?.gateId === g.gateId;

          return (
            <div
              key={g.gateId}
              onClick={() => setSelectedGate(g)}
              className={`glass-panel p-5 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col justify-between h-44 ${getGateColor(
                g.status
              )} ${isSelected ? 'ring-2 ring-cyan-400 scale-[1.03]' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xl font-mono font-extrabold tracking-wider">{g.gateId}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-aviation-950/80 border border-current">
                  {g.terminal}
                </span>
              </div>

              <div className="my-2">
                {g.currentFlight ? (
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 block uppercase">Docked Flight:</span>
                    <span className="text-sm font-mono font-bold text-slate-100 flex items-center gap-1 mt-0.5">
                      <Plane className="w-3.5 h-3.5 text-cyan-400" />
                      {g.currentFlight}
                    </span>
                  </div>
                ) : (
                  <span className="text-xs font-mono text-slate-400 italic">No Tail Docked</span>
                )}
              </div>

              <div className="pt-2 border-t border-current/20 flex items-center justify-between">
                <StatusBadge status={g.status} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Gate Control Panel */}
      {selectedGate && (
        <div className="glass-panel-cyan p-6 rounded-2xl border border-cyan-500/40 animate-in fade-in">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold font-mono text-cyan-300">
                  Gate {selectedGate.gateId} Telemetry
                </h3>
                <StatusBadge status={selectedGate.status} />
              </div>
              <p className="text-xs font-mono text-slate-400 mt-1">
                Airport: {selectedGate.airport} • Terminal: {selectedGate.terminal} • Current Flight: {selectedGate.currentFlight || 'None (Standby)'}
              </p>
            </div>

            <button
              onClick={() => {
                setTargetFlightId(selectedGate.currentFlight || '');
                setTargetStatus(selectedGate.status || 'Occupied');
                setAssignModal(true);
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]"
            >
              Reassign / Change Status
            </button>
          </div>
        </div>
      )}

      {/* Assign Gate Modal */}
      <Modal
        isOpen={assignModal}
        onClose={() => setAssignModal(false)}
        title={`Reassign Gate ${selectedGate?.gateId || ''}`}
      >
        <form onSubmit={handleAssignSubmit} className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-slate-300 mb-1">Assigned Flight ID</label>
            <input
              type="text"
              placeholder="e.g. AI202, 6E451"
              value={targetFlightId}
              onChange={(e) => setTargetFlightId(e.target.value)}
              className="w-full bg-aviation-950 border border-cyan-500/30 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-1">Gate Status</label>
            <select
              value={targetStatus}
              onChange={(e) => setTargetStatus(e.target.value)}
              className="w-full bg-aviation-950 border border-cyan-500/30 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-400"
            >
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Reserved">Reserved</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          <div className="flex gap-3 pt-3">
            <button
              type="button"
              onClick={() => setAssignModal(false)}
              className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 font-bold uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isUpdating}
              className="flex-1 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold uppercase shadow-[0_0_15px_rgba(0,240,255,0.3)]"
            >
              {isUpdating ? 'Saving...' : 'Apply Gate Change'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
