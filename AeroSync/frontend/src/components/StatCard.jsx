import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'cyan', trend }) {
  const colorMap = {
    cyan: {
      border: 'border-cyan-500/30 hover:border-cyan-400/60',
      text: 'text-cyan-400',
      bg: 'from-cyan-500/10 to-transparent',
      glow: 'group-hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]',
      iconBg: 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300'
    },
    blue: {
      border: 'border-blue-500/30 hover:border-blue-400/60',
      text: 'text-blue-400',
      bg: 'from-blue-500/10 to-transparent',
      glow: 'group-hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]',
      iconBg: 'bg-blue-950/60 border-blue-500/40 text-blue-300'
    },
    emerald: {
      border: 'border-emerald-500/30 hover:border-emerald-400/60',
      text: 'text-emerald-400',
      bg: 'from-emerald-500/10 to-transparent',
      glow: 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.25)]',
      iconBg: 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
    },
    amber: {
      border: 'border-amber-500/30 hover:border-amber-400/60',
      text: 'text-amber-400',
      bg: 'from-amber-500/10 to-transparent',
      glow: 'group-hover:shadow-[0_0_20px_rgba(245,158,11,0.25)]',
      iconBg: 'bg-amber-950/60 border-amber-500/40 text-amber-300'
    }
  };

  const scheme = colorMap[color] || colorMap.cyan;

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border ${scheme.border} bg-aviation-900/80 p-5 backdrop-blur-md transition-all duration-300 ${scheme.glow}`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${scheme.bg} pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity`} />
      
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-xs font-mono uppercase tracking-wider text-slate-400">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-3xl font-bold font-mono ${scheme.text}`}>{value}</span>
            {trend && (
              <span className="text-xs font-mono text-emerald-400 font-medium">{trend}</span>
            )}
          </div>
          {subtitle && <p className="mt-1 text-xs text-slate-400">{subtitle}</p>}
        </div>

        {Icon && (
          <div className={`p-3 rounded-lg border ${scheme.iconBg}`}>
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      <div className="mt-3 flex items-center gap-1.5 opacity-60">
        <div className="h-0.5 w-12 bg-cyan-500/40 rounded-full" />
        <div className="h-0.5 w-3 bg-cyan-400/60 rounded-full" />
        <div className="h-0.5 w-1 bg-cyan-300 rounded-full" />
      </div>
    </div>
  );
}
