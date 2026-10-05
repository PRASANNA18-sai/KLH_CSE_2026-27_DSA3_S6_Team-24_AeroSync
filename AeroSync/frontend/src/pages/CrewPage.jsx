import React, { useState, useEffect } from 'react';
import { Users, UserCheck, ShieldCheck, Search, Award, CheckCircle } from 'lucide-react';
import api from '../api/api';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import { LoadingSpinner, ErrorMessage } from '../components/LoadingSpinner';

export default function CrewPage() {
  const [crew, setCrew] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allocationModal, setAllocationModal] = useState(false);
  const [availableCrewList, setAvailableCrewList] = useState([]);

  const fetchCrew = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getCrew();
      setCrew(res.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch flight crew roster.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrew();
  }, []);

  const handleFindAvailableCrew = () => {
    const available = crew.filter((c) => c.availability === 'Available');
    setAvailableCrewList(available);
    setAllocationModal(true);
  };

  const columns = [
    {
      header: 'Crew ID',
      key: 'crewId',
      sortable: true,
      render: (row) => (
        <span className="font-bold text-cyan-300 font-mono flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-cyan-400" />
          {row.crewId}
        </span>
      ),
    },
    { header: 'Full Name', key: 'name', sortable: true },
    {
      header: 'Role',
      key: 'role',
      sortable: true,
      render: (row) => (
        <span className="font-mono text-xs px-2 py-0.5 rounded bg-aviation-950 border border-cyan-500/20 text-slate-200">
          {row.role}
        </span>
      ),
    },
    {
      header: 'Qualification & Type Rating',
      key: 'qualification',
      render: (row) => (
        <span className="font-mono text-xs text-slate-300 flex items-center gap-1">
          <Award className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          {row.qualification}
        </span>
      ),
    },
    {
      header: 'Availability',
      key: 'availability',
      sortable: true,
      render: (row) => <StatusBadge status={row.availability} />,
    },
    {
      header: 'Assigned Flight',
      key: 'assignedFlight',
      render: (row) => (
        <span className={`font-mono font-bold ${row.assignedFlight === 'Standby' ? 'text-slate-400' : 'text-cyan-300'}`}>
          {row.assignedFlight}
        </span>
      ),
    },
  ];

  if (loading) {
    return <LoadingSpinner message="Querying Flight Crew Rostering & Duty Limits..." />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-mono text-slate-100 uppercase tracking-wide">
            Flight Crew Management
          </h1>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Flight deck commanders, first officers, lead pursers, and cabin crew scheduling.
          </p>
        </div>

        {/* Find Available Crew Button */}
        <button
          onClick={handleFindAvailableCrew}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] flex items-center gap-2"
        >
          <UserCheck className="w-4 h-4" />
          Find Available Crew
        </button>
      </div>

      {error && <ErrorMessage message={error} onRetry={fetchCrew} />}

      {/* Crew Table */}
      <DataTable
        columns={columns}
        data={crew}
        searchPlaceholder="Search crew ID, name, role, qualification..."
        itemsPerPage={8}
      />

      {/* Available Crew Modal */}
      <Modal
        isOpen={allocationModal}
        onClose={() => setAllocationModal(false)}
        title="Active Standby Crew for Immediate Allocation"
      >
        <div className="space-y-4">
          <p className="text-xs font-mono text-slate-300">
            The following certified flight personnel are currently on standby with 0 active flight duty conflicts:
          </p>

          <div className="space-y-2 max-h-80 overflow-y-auto">
            {availableCrewList.map((c) => (
              <div
                key={c.crewId}
                className="p-3 rounded-xl bg-aviation-950/80 border border-emerald-500/30 flex items-center justify-between"
              >
                <div>
                  <h4 className="text-sm font-bold font-mono text-slate-100">{c.name}</h4>
                  <p className="text-xs text-cyan-400 font-mono">
                    {c.crewId} • {c.role}
                  </p>
                  <span className="text-[11px] text-slate-400 font-mono">{c.qualification}</span>
                </div>
                <StatusBadge status="AVAILABLE" />
              </div>
            ))}
          </div>

          <button
            onClick={() => setAllocationModal(false)}
            className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors"
          >
            Close Crew Roster
          </button>
        </div>
      </Modal>
    </div>
  );
}
