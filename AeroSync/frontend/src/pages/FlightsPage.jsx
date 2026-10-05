import React, { useState, useEffect } from 'react';
import { Plane, Search, Filter, Eye, ArrowUpDown, Clock } from 'lucide-react';
import api from '../api/api';
import DataTable from '../components/DataTable';
import StatusBadge from '../components/StatusBadge';
import Modal from '../components/Modal';
import { LoadingSpinner, ErrorMessage } from '../components/LoadingSpinner';

export default function FlightsPage() {
  const [flights, setFlights] = useState([]);
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [airlineFilter, setAirlineFilter] = useState('ALL');

  const fetchFlights = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getFlights();
      setFlights(res.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch flight inventory from backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  const airlines = ['ALL', ...new Set(flights.map((f) => f.airline))];
  const filteredFlights =
    airlineFilter === 'ALL'
      ? flights
      : flights.filter((f) => f.airline === airlineFilter);

  const columns = [
    {
      header: 'Flight ID',
      key: 'flightId',
      sortable: true,
      render: (row) => (
        <span className="font-bold text-cyan-300 font-mono flex items-center gap-1.5">
          <Plane className="w-3.5 h-3.5 text-cyan-400" />
          {row.flightId}
        </span>
      ),
    },
    { header: 'Airline', key: 'airline', sortable: true },
    {
      header: 'Route',
      key: 'route',
      render: (row) => (
        <span className="text-slate-200 font-semibold">
          {row.source} <span className="text-cyan-400">➔</span> {row.destination}
        </span>
      ),
    },
    { header: 'Departure', key: 'departure', sortable: true },
    { header: 'Arrival', key: 'arrival', sortable: true },
    { header: 'Aircraft Model', key: 'aircraft', sortable: true },
    {
      header: 'Gate',
      key: 'gate',
      render: (row) => <span className="text-cyan-300 font-bold">{row.gate}</span>,
    },
    {
      header: 'Status',
      key: 'status',
      render: (row) => <StatusBadge status={row.status} />,
    },
    {
      header: 'Actions',
      key: 'actions',
      render: (row) => (
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedFlight(row);
          }}
          className="p-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/30 transition-colors"
          title="View Flight Details"
        >
          <Eye className="w-4 h-4" />
        </button>
      ),
    },
  ];

  if (loading) {
    return <LoadingSpinner message="Querying Flight Repository & Inverted Search Indices..." />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-mono text-slate-100 uppercase tracking-wide">
            Flight Operations Registry
          </h1>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Real-time flight status, aircraft tail assignments, and schedule tracking.
          </p>
        </div>

        {/* Airline Filter Dropdown */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-cyan-400" />
          <select
            value={airlineFilter}
            onChange={(e) => setAirlineFilter(e.target.value)}
            className="bg-aviation-900 border border-cyan-500/30 rounded-lg px-3 py-1.5 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
          >
            {airlines.map((al) => (
              <option key={al} value={al}>
                {al === 'ALL' ? 'All Airlines' : al}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && <ErrorMessage message={error} onRetry={fetchFlights} />}

      {/* Flight Table */}
      <DataTable
        columns={columns}
        data={filteredFlights}
        searchPlaceholder="Search flight ID, airline, city..."
        onRowClick={(row) => setSelectedFlight(row)}
        itemsPerPage={10}
      />

      {/* Flight Details Modal */}
      <Modal
        isOpen={!!selectedFlight}
        onClose={() => setSelectedFlight(null)}
        title={`Flight Dossier: ${selectedFlight?.flightId || ''}`}
      >
        {selectedFlight && (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-aviation-950/80 border border-cyan-500/30">
              <div>
                <h3 className="text-lg font-bold font-mono text-cyan-300">
                  {selectedFlight.airline}
                </h3>
                <p className="text-xs text-slate-400 font-mono">Flight No: {selectedFlight.flightId}</p>
              </div>
              <StatusBadge status={selectedFlight.status} />
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-4 rounded-xl bg-aviation-900/60 border border-cyan-500/20">
                <span className="text-slate-500 block">Origin Airport</span>
                <span className="text-base font-bold text-slate-100">{selectedFlight.source}</span>
                <span className="text-cyan-400 block mt-1">ETD: {selectedFlight.departure}</span>
              </div>
              <div className="p-4 rounded-xl bg-aviation-900/60 border border-cyan-500/20">
                <span className="text-slate-500 block">Destination Airport</span>
                <span className="text-base font-bold text-slate-100">{selectedFlight.destination}</span>
                <span className="text-cyan-400 block mt-1">ETA: {selectedFlight.arrival}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono p-4 rounded-xl bg-aviation-950/60 border border-cyan-500/20">
              <div className="flex justify-between py-1 border-b border-cyan-500/10">
                <span className="text-slate-400">Assigned Aircraft:</span>
                <span className="text-slate-100">{selectedFlight.aircraft}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-cyan-500/10">
                <span className="text-slate-400">Terminal Gate:</span>
                <span className="text-cyan-300 font-bold">{selectedFlight.gate}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-cyan-500/10">
                <span className="text-slate-400">Priority Level:</span>
                <span className="text-amber-300 font-semibold">{selectedFlight.priority}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Flight Navigation Profile:</span>
                <span className="text-emerald-400">Standard Great Circle IFR</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedFlight(null)}
              className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Close Flight Record
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
