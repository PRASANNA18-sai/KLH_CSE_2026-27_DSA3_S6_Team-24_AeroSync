import React from 'react';

export default function StatusBadge({ status, className = '' }) {
  const getStyle = (st) => {
    if (!st) return 'bg-slate-800 text-slate-300 border-slate-700';
    const s = String(st).toUpperCase();

    switch (s) {
      case 'ON_TIME':
      case 'ACTIVE':
      case 'AVAILABLE':
      case 'BOARDED':
      case 'ONLINE_OPERATIONAL':
        return 'bg-emerald-950/60 text-emerald-400 border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]';
      
      case 'BOARDING':
      case 'IN_AIR':
      case 'IN_FLIGHT':
      case 'OCCUPIED':
      case 'OPTIMAL_SCHEDULE_GENERATED':
        return 'bg-cyan-950/60 text-cyan-400 border-cyan-500/40 shadow-[0_0_10px_rgba(6,182,212,0.25)]';
      
      case 'RESERVED':
      case 'SCHEDULED':
      case 'CHECKED-IN':
      case 'MEDIUM':
        return 'bg-amber-950/60 text-amber-400 border-amber-500/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]';

      case 'DELAYED':
      case 'MAINTENANCE':
      case 'CRITICAL':
      case 'HIGH':
        return 'bg-rose-950/60 text-rose-400 border-rose-500/40 shadow-[0_0_10px_rgba(244,63,94,0.25)] animate-pulse';

      case 'LANDED':
      case 'NORMAL':
      case 'LOW':
        return 'bg-blue-950/60 text-blue-400 border-blue-500/40';

      default:
        return 'bg-slate-800/80 text-slate-300 border-slate-700';
    }
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${getStyle(
        status
      )} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 opacity-80" />
      {String(status).replace(/_/g, ' ')}
    </span>
  );
}
