import React, { useState, useEffect } from 'react';
import { Building2, Search, MapPin, Globe, Compass, Route } from 'lucide-react';
import api from '../api/api';
import DataTable from '../components/DataTable';
import Modal from '../components/Modal';
import { LoadingSpinner, ErrorMessage } from '../components/LoadingSpinner';

export default function AirportsPage() {
  const [airports, setAirports] = useState([]);
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchAirports = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getAirports();
      setAirports(res.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load airport directory.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAirports();
  }, []);

  const columns = [
    {
      header: 'Code',
      key: 'code',
      sortable: true,
      render: (row) => (
        <span className="font-bold text-cyan-300 font-mono px-2 py-1 rounded bg-cyan-950/80 border border-cyan-500/30">
          {row.code}
        </span>
      ),
    },
    { header: 'Airport Name', key: 'name', sortable: true },
    { header: 'City', key: 'city', sortable: true },
    { header: 'Country', key: 'country', sortable: true },
    {
      header: 'Terminals',
      key: 'terminals',
      sortable: true,
      render: (row) => <span className="font-mono text-slate-200">{row.terminals}</span>,
    },
    {
      header: 'Gates',
      key: 'gates',
      sortable: true,
      render: (row) => <span className="font-mono text-cyan-300 font-bold">{row.gates}</span>,
    },
    {
      header: 'Connected Routes',
      key: 'connectedRoutes',
      render: (row) => (
        <div className="flex flex-wrap gap-1 max-w-xs">
          {(row.connectedRoutes || []).map((rte) => (
            <span
              key={rte}
              className="px-1.5 py-0.5 rounded bg-slate-900 border border-cyan-500/20 text-[10px] font-mono text-cyan-300"
            >
              {rte}
            </span>
          ))}
        </div>
      ),
    },
  ];

  if (loading) {
    return <LoadingSpinner message="Querying Airport Graph Vertices & Route Edges..." />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-mono text-slate-100 uppercase tracking-wide">
            Aviation Airport Directory
          </h1>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Connected hub and spoke vertices across domestic and international corridors.
          </p>
        </div>
      </div>

      {error && <ErrorMessage message={error} onRetry={fetchAirports} />}

      {/* Airports Data Table */}
      <DataTable
        columns={columns}
        data={airports}
        searchPlaceholder="Search airport code, name, city, country..."
        onRowClick={(row) => setSelectedAirport(row)}
        itemsPerPage={8}
      />

      {/* Airport Detail Modal */}
      <Modal
        isOpen={!!selectedAirport}
        onClose={() => setSelectedAirport(null)}
        title={`Airport Dossier: ${selectedAirport?.code || ''}`}
      >
        {selectedAirport && (
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-aviation-950/80 border border-cyan-500/30">
              <span className="text-xs font-mono text-cyan-400 uppercase">IATA Code: {selectedAirport.code}</span>
              <h3 className="text-lg font-bold font-mono text-slate-100">{selectedAirport.name}</h3>
              <p className="text-xs text-slate-400 font-mono mt-1">
                {selectedAirport.city}, {selectedAirport.country}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-aviation-900/60 border border-cyan-500/20">
                <span className="text-slate-500 block">Total Terminals</span>
                <span className="text-xl font-bold text-cyan-300">{selectedAirport.terminals} Terminals</span>
              </div>
              <div className="p-3.5 rounded-xl bg-aviation-900/60 border border-cyan-500/20">
                <span className="text-slate-500 block">Total Active Gates</span>
                <span className="text-xl font-bold text-cyan-300">{selectedAirport.gates} Gates</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-aviation-950/60 border border-cyan-500/20">
              <span className="text-xs font-mono font-bold text-cyan-400 block mb-2">
                Connected Direct Flight Nodes (Graph Degree: {selectedAirport.connectedRoutes?.length || 0})
              </span>
              <div className="flex flex-wrap gap-2">
                {(selectedAirport.connectedRoutes || []).map((dst) => (
                  <span
                    key={dst}
                    className="px-2.5 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold"
                  >
                    {selectedAirport.code} ➔ {dst}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setSelectedAirport(null)}
              className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
