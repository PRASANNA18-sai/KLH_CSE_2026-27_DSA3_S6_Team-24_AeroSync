import React, { useState, useEffect } from 'react';
import { Calendar, Zap, AlertTriangle, CheckCircle2, Clock, Shuffle, ShieldCheck } from 'lucide-react';
import api from '../api/api';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { LoadingSpinner, ErrorMessage } from '../components/LoadingSpinner';

export default function SchedulingPage() {
  const [schedule, setSchedule] = useState([]);
  const [optimizationResult, setOptimizationResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [error, setError] = useState(null);

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getScheduling();
      setSchedule(res.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch flight schedule from backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, []);

  const handleOptimizeSchedule = async () => {
    try {
      setIsOptimizing(true);
      setError(null);
      const res = await api.optimizeSchedule();
      setOptimizationResult(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to execute schedule optimization algorithm.');
    } finally {
      setIsOptimizing(false);
    }
  };

  const columns = [
    {
      header: 'Flight ID',
      key: 'flightId',
      sortable: true,
      render: (row) => (
        <span className="font-bold text-cyan-300 font-mono">{row.flightId}</span>
      ),
    },
    { header: 'Airline', key: 'airline', sortable: true },
    {
      header: 'Route',
      key: 'route',
      render: (row) => (
        <span className="text-slate-200">
          {row.source} ➔ {row.destination}
        </span>
      ),
    },
    {
      header: 'Priority',
      key: 'priority',
      sortable: true,
      render: (row) => (
        <span
          className={`font-mono text-xs px-2 py-0.5 rounded font-bold ${
            row.priority === 'HIGH'
              ? 'bg-rose-950 text-rose-300 border border-rose-500/40'
              : row.priority === 'MEDIUM'
              ? 'bg-amber-950 text-amber-300 border border-amber-500/40'
              : 'bg-slate-900 text-slate-300 border border-slate-700'
          }`}
        >
          {row.priority}
        </span>
      ),
    },
    { header: 'Departure Slot', key: 'departure', sortable: true },
    { header: 'Runway Slot', key: 'slotAllocated' },
    { header: 'Aircraft Tail', key: 'aircraft' },
    {
      header: 'Gate',
      key: 'gate',
      render: (row) => <span className="font-mono text-cyan-300 font-bold">{row.gate}</span>,
    },
    {
      header: 'Status',
      key: 'status',
      sortable: true,
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  if (loading) {
    return <LoadingSpinner message="Querying Priority Queues & Runway Interval Slots..." />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-mono text-slate-100 uppercase tracking-wide">
            Flight Slot Scheduling & Conflict Resolution
          </h1>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Priority Queue Runway Sequencing and Wake Turbulence Spacing Optimization.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleOptimizeSchedule}
            disabled={isOptimizing}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center gap-2"
          >
            {isOptimizing ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Optimizing Queues...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-cyan-200" />
                Optimize Schedule
              </>
            )}
          </button>

          <button
            onClick={handleOptimizeSchedule}
            className="px-4 py-2.5 rounded-xl bg-aviation-900 border border-amber-500/40 text-amber-300 hover:bg-slate-800 font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2"
          >
            <AlertTriangle className="w-4 h-4" />
            Detect Conflicts
          </button>
        </div>
      </div>

      {error && <ErrorMessage message={error} onRetry={fetchSchedule} />}

      {/* Optimization Result Visual Card */}
      {optimizationResult && (
        <div className="glass-panel-cyan p-6 rounded-2xl border border-cyan-500/40 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold font-mono text-slate-100">
                Priority Queue Runway Optimization Completed
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-semibold">
              Status: {optimizationResult.optimizationStatus}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs font-mono mb-4">
            <div className="p-3.5 rounded-xl bg-aviation-950/80 border border-cyan-500/20">
              <span className="text-slate-500 block text-[10px]">CONFLICTS DETECTED & RESOLVED</span>
              <span className="text-xl font-bold text-amber-400">
                {optimizationResult.conflictsDetected} / {optimizationResult.conflictsResolved}
              </span>
              <span className="text-emerald-400 text-[11px] block mt-0.5">100% Conflict Free</span>
            </div>

            <div className="p-3.5 rounded-xl bg-aviation-950/80 border border-cyan-500/20">
              <span className="text-slate-500 block text-[10px]">THROUGHPUT GAIN</span>
              <span className="text-xl font-bold text-emerald-400">
                {optimizationResult.throughputIncrease}
              </span>
              <span className="text-slate-400 text-[11px] block mt-0.5">Movements Per Hour</span>
            </div>

            <div className="p-3.5 rounded-xl bg-aviation-950/80 border border-cyan-500/20">
              <span className="text-slate-500 block text-[10px]">AVERAGE DELAY REDUCTION</span>
              <span className="text-xl font-bold text-cyan-300">
                -{optimizationResult.averageDelayReductionMin} Min
              </span>
              <span className="text-slate-400 text-[11px] block mt-0.5">Per Departure Sequence</span>
            </div>

            <div className="p-3.5 rounded-xl bg-aviation-950/80 border border-cyan-500/20">
              <span className="text-slate-500 block text-[10px]">ACTIVE RESOURCES ALLOCATED</span>
              <span className="text-xs font-bold text-slate-200 block mt-1">
                Gates: {optimizationResult.resourcesUsed?.Gates} • Runways: {optimizationResult.resourcesUsed?.Runways}
              </span>
            </div>
          </div>

          {/* Rescheduled Flights Log */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono font-bold text-cyan-300 uppercase">
              Rescheduled Flights & Slot Rebalancing:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
              {(optimizationResult.flightsRescheduled || []).map((rf, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-aviation-950/80 border border-cyan-500/30 flex items-center justify-between"
                >
                  <div>
                    <span className="text-cyan-300 font-bold">{rf.flightId}</span>
                    <span className="text-slate-400 text-[11px] block">{rf.reason}</span>
                  </div>
                  <div className="text-right">
                    <span className="line-through text-slate-500 text-[11px] mr-2">{rf.oldSlot}</span>
                    <span className="text-emerald-400 font-bold">{rf.newSlot}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Schedule Table */}
      <DataTable
        columns={columns}
        data={schedule}
        searchPlaceholder="Search flight slot, airline, runway..."
        itemsPerPage={10}
      />
    </div>
  );
}
