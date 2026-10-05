import React, { useState, useEffect } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, RefreshCw, Filter } from 'lucide-react';
import api from '../api/api';
import { AlertCard } from '../components/FlightCard';
import { LoadingSpinner, ErrorMessage } from '../components/LoadingSpinner';

export default function DecisionSupportPage() {
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState('ALL');

  const fetchDecisions = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getDecisions();
      setDecisions(res.data || []);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch decision support recommendations.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDecisions();
  }, []);

  const filteredDecisions =
    priorityFilter === 'ALL'
      ? decisions
      : decisions.filter((d) => d.priority === priorityFilter);

  if (loading) {
    return <LoadingSpinner message="Evaluating Multi-Criteria Decision Algorithms..." />;
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-widest">
              Automated Operations Intelligence
            </span>
          </div>
          <h1 className="text-2xl font-bold font-mono text-slate-100 uppercase tracking-wide">
            AeroSync Decision Support Center
          </h1>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Proactive constraint resolution, gate collision mitigation, and trajectory re-routing recommendations.
          </p>
        </div>

        {/* Priority Filter */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-aviation-900 border border-cyan-500/30 rounded-xl px-3 py-1.5 text-xs font-mono">
            <Filter className="w-4 h-4 text-cyan-400" />
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none"
            >
              <option value="ALL">All Priorities</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>

          <button
            onClick={fetchDecisions}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
            title="Refresh Recommendations"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {error && <ErrorMessage message={error} onRetry={fetchDecisions} />}

      {/* Decision Support Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDecisions.map((card) => (
          <AlertCard key={card.id} alert={card} />
        ))}
      </div>
    </div>
  );
}
