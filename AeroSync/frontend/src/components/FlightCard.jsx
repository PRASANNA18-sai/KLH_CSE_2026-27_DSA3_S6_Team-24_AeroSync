import React from 'react';
import { Plane, Clock, ShieldCheck, MapPin } from 'lucide-react';
import StatusBadge from './StatusBadge';

export function FlightCard({ flight, onSelect }) {
  if (!flight) return null;

  return (
    <div
      onClick={() => onSelect && onSelect(flight)}
      className="glass-panel glass-panel-hover rounded-xl p-5 border border-cyan-500/20 cursor-pointer group"
    >
      <div className="flex items-center justify-between border-b border-cyan-500/10 pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
            <Plane className="w-4 h-4 transform -rotate-45 group-hover:translate-x-0.5 transition-transform" />
          </div>
          <div>
            <h4 className="font-mono font-bold text-slate-100 text-sm tracking-wider">{flight.flightId}</h4>
            <span className="text-[11px] text-cyan-400/80 font-mono">{flight.airline}</span>
          </div>
        </div>

        <StatusBadge status={flight.status || 'SCHEDULED'} />
      </div>

      {/* Flight Route Display */}
      <div className="my-4 flex items-center justify-between">
        <div className="text-left">
          <p className="text-xl font-mono font-bold text-slate-100">{flight.source}</p>
          <span className="text-[10px] font-mono text-slate-400">Departure {flight.departure || '08:00'}</span>
        </div>

        <div className="flex-1 px-4 flex flex-col items-center">
          <span className="text-[10px] font-mono text-cyan-400 mb-1">Direct Flight</span>
          <div className="w-full relative flex items-center">
            <div className="w-full h-0.5 bg-gradient-to-r from-cyan-500/20 via-cyan-400 to-cyan-500/20" />
            <Plane className="w-3 h-3 text-cyan-300 absolute left-1/2 -translate-x-1/2" />
          </div>
        </div>

        <div className="text-right">
          <p className="text-xl font-mono font-bold text-slate-100">{flight.destination}</p>
          <span className="text-[10px] font-mono text-slate-400">Arrival {flight.arrival || '10:15'}</span>
        </div>
      </div>

      <div className="pt-3 border-t border-cyan-500/10 flex items-center justify-between text-xs font-mono text-slate-400">
        <span>Tail: {flight.aircraft}</span>
        <span className="text-cyan-300 font-semibold">Gate: {flight.gate || 'G01'}</span>
      </div>
    </div>
  );
}

export function AlgorithmCard({ algorithm, onRun, isRunning }) {
  if (!algorithm) return null;

  return (
    <div className="glass-panel glass-panel-hover rounded-xl p-5 border border-cyan-500/20 flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-500/40">
            {algorithm.category || 'DSA CORE'}
          </span>
          <span className="text-xs font-mono text-emerald-400">Java Native</span>
        </div>

        <h3 className="text-base font-bold font-mono text-slate-100 group-hover:text-cyan-300 transition-colors">
          {algorithm.name}
        </h3>

        <p className="text-xs text-slate-300 mt-2 leading-relaxed">{algorithm.purpose}</p>

        <div className="mt-3 p-2.5 rounded-lg bg-aviation-950/60 border border-cyan-500/15">
          <p className="text-[11px] font-mono text-cyan-400 font-medium">Aviation Application:</p>
          <p className="text-xs text-slate-400 mt-0.5">{algorithm.aviationApplication}</p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 border-t border-cyan-500/10 pt-3">
          <div>
            <span className="text-slate-500 block">Time Complexity:</span>
            <span className="text-cyan-300 font-semibold">{algorithm.timeComplexity}</span>
          </div>
          <div>
            <span className="text-slate-500 block">Space Complexity:</span>
            <span className="text-cyan-300 font-semibold">{algorithm.spaceComplexity}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => onRun && onRun(algorithm)}
        disabled={isRunning}
        className="mt-5 w-full py-2 px-4 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-mono text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] flex items-center justify-center gap-2"
      >
        {isRunning ? (
          <>
            <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Executing Java Kernel...
          </>
        ) : (
          <>
            <span>Run Algorithm</span>
            <span className="text-cyan-200">▶</span>
          </>
        )}
      </button>
    </div>
  );
}

export function AlertCard({ alert }) {
  if (!alert) return null;

  const priorityStyles = {
    CRITICAL: 'border-rose-500/50 bg-rose-950/30 text-rose-300',
    HIGH: 'border-amber-500/50 bg-amber-950/30 text-amber-300',
    MEDIUM: 'border-cyan-500/50 bg-cyan-950/30 text-cyan-300',
    LOW: 'border-blue-500/50 bg-blue-950/30 text-blue-300',
  };

  const currentStyle = priorityStyles[alert.priority] || priorityStyles.MEDIUM;

  return (
    <div className={`glass-panel rounded-xl p-5 border ${currentStyle} transition-all`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold text-slate-100 uppercase tracking-wide">
            {alert.title}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-aviation-950 border border-current">
            {alert.module || 'Decision Engine'}
          </span>
        </div>
        <StatusBadge status={alert.priority} />
      </div>

      <h4 className="text-sm font-semibold text-slate-200 mt-1">{alert.problem}</h4>

      <div className="mt-2 text-xs font-mono text-slate-400 bg-aviation-950/70 p-2.5 rounded-lg border border-slate-800">
        <span className="text-slate-500 block text-[10px] uppercase">Detected Condition:</span>
        {alert.detectedCondition}
      </div>

      <div className="mt-3 text-xs text-cyan-300 bg-cyan-950/40 p-2.5 rounded-lg border border-cyan-500/30">
        <span className="text-cyan-400 font-mono block text-[10px] uppercase font-bold">
          Recommendation:
        </span>
        {alert.recommendation}
      </div>
    </div>
  );
}
