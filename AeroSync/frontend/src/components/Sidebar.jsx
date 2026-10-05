import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Plane,
  Building2,
  Cpu,
  Users,
  UserCheck,
  DoorClosed,
  Route,
  Calendar,
  Layers,
  ShieldAlert,
  Binary,
  Compass,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Flights', path: '/flights', icon: Plane },
  { name: 'Airports', path: '/airports', icon: Building2 },
  { name: 'Aircraft', path: '/aircraft', icon: Cpu },
  { name: 'Crew', path: '/crew', icon: Users },
  { name: 'Passengers', path: '/passengers', icon: UserCheck },
  { name: 'Gates', path: '/gates', icon: DoorClosed },
  { name: 'Routes', path: '/routes', icon: Route },
  { name: 'Scheduling', path: '/scheduling', icon: Calendar },
  { name: 'Resource Allocation', path: '/resources', icon: Layers },
  { name: 'Decision Support', path: '/decisions', icon: ShieldAlert },
  { name: 'Algorithm Lab', path: '/algorithm-lab', icon: Binary },
];

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  return (
    <aside
      className={`fixed left-0 top-0 bottom-0 z-40 bg-aviation-950/95 border-r border-cyan-500/20 backdrop-blur-xl transition-all duration-300 flex flex-col ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* AeroSync Logo & Branding */}
      <div className="h-20 flex items-center justify-between px-4 border-b border-cyan-500/20">
        <NavLink to="/" className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(0,240,255,0.4)] flex-shrink-0">
            <Compass className="w-6 h-6 animate-pulse" />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col">
              <span className="font-mono text-lg font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-100 to-blue-400 glow-text-cyan">
                AEROSYNC
              </span>
              <span className="text-[9px] font-mono text-cyan-400/70 tracking-tight uppercase">
                Aviation Decision OS
              </span>
            </div>
          )}
        </NavLink>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-slate-900 border border-transparent hover:border-cyan-500/30 transition-colors"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl font-mono text-xs transition-all group relative ${
                isActive
                  ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-400/40 shadow-[0_0_15px_rgba(0,240,255,0.15)] font-semibold'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-aviation-900/60 hover:border hover:border-cyan-500/20'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon
                  className={`w-4 h-4 flex-shrink-0 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-cyan-300' : 'text-slate-400 group-hover:text-cyan-300'
                  }`}
                />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
                {isActive && (
                  <span className="absolute right-2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00f0ff]" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* System Engine Tag */}
      <div className="p-4 border-t border-cyan-500/20 bg-aviation-900/30">
        {!isCollapsed ? (
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-emerald-400 font-semibold">DSA v2.4 Engine</span>
            </div>
            <span className="text-slate-500">20 Flights</span>
          </div>
        ) : (
          <div className="flex justify-center">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
        )}
      </div>
    </aside>
  );
}
