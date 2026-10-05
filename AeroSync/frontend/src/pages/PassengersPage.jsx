import React, { useState, useEffect } from 'react';
import { UserCheck, Search, Plane, Tag, CheckCircle2 } from 'lucide-react';
import api from '../api/api';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { LoadingSpinner, ErrorMessage } from '../components/LoadingSpinner';

export default function PassengersPage() {
  const [passengers, setPassengers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPassengers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getPassengers();
      setPassengers(res.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch passenger manifest.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPassengers();
  }, []);

  const columns = [
    {
      header: 'Passenger ID',
      key: 'passengerId',
      sortable: true,
      render: (row) => (
        <span className="font-bold text-cyan-300 font-mono flex items-center gap-1.5">
          <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
          {row.passengerId}
        </span>
      ),
    },
    { header: 'Passenger Name', key: 'name', sortable: true },
    {
      header: 'Flight ID',
      key: 'flightId',
      sortable: true,
      render: (row) => (
        <span className="font-mono text-cyan-300 font-semibold px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-500/20">
          {row.flightId}
        </span>
      ),
    },
    { header: 'Airline', key: 'airline', sortable: true },
    { header: 'Route', key: 'route' },
    {
      header: 'Assigned Seat',
      key: 'seat',
      sortable: true,
      render: (row) => (
        <span className="font-mono font-bold text-amber-300 px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/30">
          {row.seat}
        </span>
      ),
    },
    {
      header: 'Boarding Status',
      key: 'status',
      sortable: true,
      render: (row) => <StatusBadge status={row.status} />,
    },
  ];

  if (loading) {
    return <LoadingSpinner message="Querying Passenger Manifest & Security Clearances..." />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-mono text-slate-100 uppercase tracking-wide">
            Passenger Manifest & Boarding
          </h1>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Real-time passenger verification, seat allocation, and boarding status tracking.
          </p>
        </div>
      </div>

      {error && <ErrorMessage message={error} onRetry={fetchPassengers} />}

      {/* Passengers Table */}
      <DataTable
        columns={columns}
        data={passengers}
        searchPlaceholder="Search passenger name, ID, flight number, seat..."
        itemsPerPage={10}
      />
    </div>
  );
}
