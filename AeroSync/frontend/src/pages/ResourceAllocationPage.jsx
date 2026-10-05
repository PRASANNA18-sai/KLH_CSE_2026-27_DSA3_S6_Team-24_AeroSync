import React, { useState, useEffect } from 'react';
import { Layers, Zap, Cpu, Users, DoorClosed, Fuel, CheckCircle2 } from 'lucide-react';
import api from '../api/api';
import { LoadingSpinner, ErrorMessage } from '../components/LoadingSpinner';

export default function ResourceAllocationPage() {
  const [resources, setResources] = useState(null);
  const [optimizeResult, setOptimizeResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [error, setError] = useState(null);

  const fetchResources = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getResources();
      setResources(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch aviation resource telemetry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  const handleOptimizeResources = async () => {
    try {
      setIsOptimizing(true);
      setError(null);
      const res = await api.optimizeResources();
      setOptimizeResult(res.data);
    } catch (err) {
      console.error(err);
      setError('Failed to optimize resource allocation.');
    } finally {
      setIsOptimizing(false);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Querying Resource Load & Dynamic Programming Partitions..." />;
  }

  const items = [
    {
      title: 'Aircraft Fleet Utilization',
      value: resources?.aircraftUtilization || 82,
      icon: Cpu,
      color: 'from-cyan-500 to-blue-500',
      textColor: 'text-cyan-400',
      detail: `${resources?.totalAircraft || 20} Active Aircraft Tails`,
    },
    {
      title: 'Crew Duty Hours & Roster Load',
      value: resources?.crewUtilization || 74,
      icon: Users,
      color: 'from-emerald-500 to-teal-500',
      textColor: 'text-emerald-400',
      detail: `${resources?.activeCrewCount || 12} Flight Deck & Purser Personnel`,
    },
    {
      title: 'Terminal Gate Concourse Occupancy',
      value: resources?.gateUtilization || 68,
      icon: DoorClosed,
      color: 'from-amber-500 to-yellow-500',
      textColor: 'text-amber-400',
      detail: `${resources?.totalGatesCount || 12} Concourse Aprons`,
    },
    {
      title: 'Runway Departure Throughput Capacity',
      value: resources?.runwayUtilization || 88,
      icon: Layers,
      color: 'from-purple-500 to-indigo-500',
      textColor: 'text-purple-400',
      detail: 'Dual Parallel Runways 09L / 09R',
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-mono text-slate-100 uppercase tracking-wide">
            Aviation Resource Allocation Matrix
          </h1>
          <p className="text-xs font-mono text-slate-400 mt-1">
            Sum Over Subsets (SOS-DP) & Matrix Optimization for fleet, crew shifts, and gate slots.
          </p>
        </div>

        {/* Optimize Resources Button */}
        <button
          onClick={handleOptimizeResources}
          disabled={isOptimizing}
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center gap-2"
        >
          {isOptimizing ? (
            <>
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Computing SOS-DP Partitions...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 text-cyan-200" />
              Optimize Resources
            </>
          )}
        </button>
      </div>

      {error && <ErrorMessage message={error} onRetry={fetchResources} />}

      {/* Utilization Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.title} className="glass-panel p-5 rounded-xl border border-cyan-500/20">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400 uppercase">{item.title}</span>
              <item.icon className={`w-5 h-5 ${item.textColor}`} />
            </div>

            <div className="flex items-baseline justify-between mb-2">
              <span className={`text-3xl font-bold font-mono ${item.textColor}`}>{item.value}%</span>
              <span className="text-[11px] font-mono text-slate-400">{item.detail}</span>
            </div>

            {/* Glowing Progress Bar */}
            <div className="w-full h-2 rounded-full bg-aviation-950 overflow-hidden border border-slate-800">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-500 shadow-[0_0_10px_rgba(0,240,255,0.4)]`}
                style={{ width: `${item.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Optimization Result Visual Display */}
      {optimizeResult && (
        <div className="glass-panel-cyan p-6 rounded-2xl border border-cyan-500/40 animate-in fade-in">
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-cyan-400" />
              <h3 className="text-base font-bold font-mono text-slate-100">
                Resource Allocation Optimized via SOS-DP
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-400 font-semibold">
              Optimization Score: {optimizeResult.optimizationScore}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono mb-4">
            <div className="p-3.5 rounded-xl bg-aviation-950/80 border border-cyan-500/20">
              <span className="text-slate-500 block text-[10px]">AIRCRAFT EFFICIENCY GAIN</span>
              <span className="text-xl font-bold text-emerald-400">
                {optimizeResult.aircraftEfficiencyGain}
              </span>
              <span className="text-slate-400 text-[11px] block mt-0.5">Turnaround & Fuel Optimization</span>
            </div>

            <div className="p-3.5 rounded-xl bg-aviation-950/80 border border-cyan-500/20">
              <span className="text-slate-500 block text-[10px]">CREW DUTY SAVINGS</span>
              <span className="text-xl font-bold text-cyan-300">
                {optimizeResult.crewDutyHourSavings}
              </span>
              <span className="text-slate-400 text-[11px] block mt-0.5">FDP Fatigue Risk Reduced</span>
            </div>

            <div className="p-3.5 rounded-xl bg-aviation-950/80 border border-cyan-500/20">
              <span className="text-slate-500 block text-[10px]">GATE IDLE TIME REDUCTION</span>
              <span className="text-xl font-bold text-amber-300">
                -{optimizeResult.gateIdleTimeReduction}
              </span>
              <span className="text-slate-400 text-[11px] block mt-0.5">Apron Docking Density</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-aviation-950/90 border border-cyan-500/30 text-xs font-mono">
            <span className="text-cyan-300 font-bold block mb-1">
              Backend Algorithm Execution: {optimizeResult.algorithmUsed}
            </span>
            <p className="text-slate-300">{optimizeResult.message}</p>
            <p className="text-slate-500 text-[11px] mt-1">
              Computed Subset Array: {optimizeResult.sosComputedSubsetSums}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
