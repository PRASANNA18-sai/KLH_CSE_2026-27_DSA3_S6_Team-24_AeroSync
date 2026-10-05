import React, { useState, useEffect } from 'react';
import { Cpu, Wrench, ShieldCheck, Gauge, CheckCircle2 } from 'lucide-react';
import api from '../api/api';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import { LoadingSpinner, ErrorMessage } from '../components/LoadingSpinner';

export default function AircraftPage() {
  const [fleet, setFleet] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAircraft = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getAircraft();
      setFleet(res.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch aircraft fleet inventory.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAircraft();
  }, []);

  const columns = [
    {
      header: 'Aircraft ID / Tail',
      key: 'aircraftId',
      sortable: true,
      render: (row) => (
        <span className="font-bold text-cyan-300 font-mono flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          {row.aircraftId}
        </span>
      ),
    },
    { header: 'Model', key: 'model', sortable: true },
    { header: 'Airline Operator', key: 'airline', sortable: true },
    {
      header: 'Capacity',
      key: 'capacity',
      sortable: true,
      render: (row) => <span className="font-mono text-slate-200">{row.capacity} Seats</span>,
    },
    {
      header: 'Operational Status',
      key: 'status',
      sortable: true,
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Maintenance Status',
      key: 'maintenanceStatus',
      render: (row) => (
        <span className="font-mono text-xs flex items-center gap-1 text-slate-300">
          <Wrench className="w-3 h-3 text-cyan-400" />
          {row.maintenanceStatus}
        </span>
      ),
    },
    {
      header: 'Fuel Index',
      key: 'fuelEfficiency',
      render: (row) => <span className="font-mono text-emerald-400 font-bold">{row.fuelEfficiency}</span>,
    },
  ];

  if (loading) {
    return <LoadingSpinner message="Querying Fleet Telemetry & Airworthiness Logs..." />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-mono text-slate-100 uppercase tracking-wide">
            Aircraft Fleet Management
          </h1>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Active tail numbers, passenger configurations, maintenance cycles, and engine diagnostics.
          </p>
        </div>
      </div>

      {error && <ErrorMessage message={error} onRetry={fetchAircraft} />}

      {/* Fleet Table */}
      <DataTable
        columns={columns}
        data={fleet}
        searchPlaceholder="Search tail number, model, airline..."
        itemsPerPage={10}
      />
    </div>
  );
}
