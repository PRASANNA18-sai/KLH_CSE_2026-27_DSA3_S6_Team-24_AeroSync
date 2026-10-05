import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Search,
  Plane,
  Building2,
  Cpu,
  UserCheck,
  Users,
  DoorClosed,
  ArrowRight,
} from 'lucide-react';
import api from '../api/api';
import StatusBadge from '../components/StatusBadge';
import { LoadingSpinner, EmptyState, ErrorMessage } from '../components/LoadingSpinner';

export default function GlobalSearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const performSearch = async (q) => {
    if (!q) return;
    try {
      setLoading(true);
      setError(null);
      const res = await api.globalSearch(q);
      setResults(res.data);
    } catch (err) {
      console.error(err);
      setError('Search operation failed with backend engine.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  if (loading) {
    return <LoadingSpinner message={`Executing KMP & Trie pattern lookup for "${query}"...`} />;
  }

  const totalMatches = results?.totalMatches || 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Search className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-widest">
            Intelligent Global Search Results
          </span>
        </div>
        <h1 className="text-2xl font-bold font-mono text-slate-100">
          Query: &ldquo;<span className="text-cyan-300">{query}</span>&rdquo;
        </h1>
        <p className="text-xs font-mono text-slate-400 mt-1">
          Found {totalMatches} matching records across AeroSync aviation domain databases.
        </p>
      </div>

      {error && <ErrorMessage message={error} />}

      {totalMatches === 0 && !loading && (
        <EmptyState
          title={`No matches found for "${query}"`}
          description="Try searching with a broader keyword such as HYD, Delhi, Air India, A320, or Captain."
          icon={Search}
        />
      )}

      {/* Categorized Results */}
      {results && totalMatches > 0 && (
        <div className="space-y-8">
          {/* Flights */}
          {results.flights?.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold font-mono text-slate-100 flex items-center gap-2">
                  <Plane className="w-4 h-4 text-cyan-400" />
                  Flights ({results.flights.length})
                </h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.flights.map((f) => (
                  <div
                    key={f.flightId}
                    onClick={() => navigate('/flights')}
                    className="glass-panel p-4 rounded-xl border border-cyan-500/20 cursor-pointer hover:border-cyan-400 transition-all font-mono text-xs"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-cyan-300 text-sm">{f.flightId}</span>
                      <span className="text-slate-400">{f.airline}</span>
                    </div>
                    <p className="text-slate-200">
                      {f.source} ➔ {f.destination}
                    </p>
                    <span className="text-[11px] text-slate-500 block mt-1">Tail: {f.aircraft}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Airports */}
          {results.airports?.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold font-mono text-slate-100 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-cyan-400" />
                Airports ({results.airports.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.airports.map((ap) => (
                  <div
                    key={ap.code}
                    onClick={() => navigate('/airports')}
                    className="glass-panel p-4 rounded-xl border border-cyan-500/20 cursor-pointer hover:border-cyan-400 transition-all font-mono text-xs"
                  >
                    <span className="font-bold text-cyan-300 text-sm">{ap.code}</span>
                    <h4 className="font-semibold text-slate-100 mt-1">{ap.name}</h4>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      {ap.city}, {ap.country}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Passengers */}
          {results.passengers?.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold font-mono text-slate-100 flex items-center gap-2">
                <UserCheck className="w-4 h-4 text-cyan-400" />
                Passengers ({results.passengers.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.passengers.map((p) => (
                  <div
                    key={p.passengerId}
                    onClick={() => navigate('/passengers')}
                    className="glass-panel p-4 rounded-xl border border-cyan-500/20 cursor-pointer hover:border-cyan-400 transition-all font-mono text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-100">{p.name}</span>
                      <StatusBadge status={p.status} />
                    </div>
                    <p className="text-cyan-300">
                      ID: {p.passengerId} • Flight: {p.flightId} • Seat: {p.seat}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Crew */}
          {results.crew?.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold font-mono text-slate-100 flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                Crew Personnel ({results.crew.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {results.crew.map((c) => (
                  <div
                    key={c.crewId}
                    onClick={() => navigate('/crew')}
                    className="glass-panel p-4 rounded-xl border border-cyan-500/20 cursor-pointer hover:border-cyan-400 transition-all font-mono text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-slate-100">{c.name}</span>
                      <StatusBadge status={c.availability} />
                    </div>
                    <p className="text-cyan-300">
                      {c.crewId} • {c.role}
                    </p>
                    <span className="text-[11px] text-slate-400 block mt-0.5">{c.qualification}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gates */}
          {results.gates?.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-bold font-mono text-slate-100 flex items-center gap-2">
                <DoorClosed className="w-4 h-4 text-cyan-400" />
                Terminal Gates ({results.gates.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {results.gates.map((g) => (
                  <div
                    key={g.gateId}
                    onClick={() => navigate('/gates')}
                    className="glass-panel p-4 rounded-xl border border-cyan-500/20 cursor-pointer hover:border-cyan-400 transition-all font-mono text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-cyan-300 text-base">{g.gateId}</span>
                      <StatusBadge status={g.status} />
                    </div>
                    <p className="text-slate-400">Terminal {g.terminal}</p>
                    {g.currentFlight && (
                      <span className="text-emerald-400 text-[11px] block mt-1">Flight: {g.currentFlight}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
