import React from 'react';
import { Plane, AlertCircle, HelpCircle } from 'lucide-react';

export function LoadingSpinner({ message = 'Accessing AeroSync Engine...' }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="relative w-16 h-16 mb-4">
        {/* Radar concentric rings */}
        <div className="absolute inset-0 rounded-full border-2 border-cyan-500/20 animate-ping" />
        <div className="absolute inset-2 rounded-full border border-cyan-500/40" />
        <div className="absolute inset-0 rounded-full border-t-2 border-cyan-400 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center text-cyan-400">
          <Plane className="w-6 h-6 animate-pulse transform -rotate-45" />
        </div>
      </div>
      <p className="text-sm font-mono text-cyan-300 font-medium tracking-wide">{message}</p>
      <span className="text-xs text-slate-500 mt-1 font-mono">DSA Core Processing in progress</span>
    </div>
  );
}

export function EmptyState({ title = 'No data available', description = 'Try adjusting your search criteria.', icon: Icon = HelpCircle }) {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center glass-panel rounded-xl">
      <div className="p-4 rounded-full bg-slate-900/80 border border-cyan-500/20 text-cyan-400 mb-3">
        <Icon className="w-8 h-8" />
      </div>
      <h4 className="text-base font-semibold text-slate-200">{title}</h4>
      <p className="text-xs text-slate-400 mt-1 max-w-sm">{description}</p>
    </div>
  );
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-rose-500/30 bg-rose-950/40 backdrop-blur-md text-rose-200 my-4">
      <div className="flex items-center gap-3">
        <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
        <div>
          <p className="text-sm font-medium">{message || 'Connection to AeroSync Java backend failed.'}</p>
          <p className="text-xs text-rose-300/70 font-mono mt-0.5">Ensure backend server is running on http://localhost:8080</p>
        </div>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-3 py-1 text-xs font-mono bg-rose-900/60 hover:bg-rose-800 border border-rose-500/40 rounded-lg transition-colors"
        >
          Retry Connection
        </button>
      )}
    </div>
  );
}
