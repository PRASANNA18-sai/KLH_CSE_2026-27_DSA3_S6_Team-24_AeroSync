import React, { useState } from 'react';
import { Plane, Compass, MapPin, Navigation, Info } from 'lucide-react';

export default function AirportNetwork({
  airports = [],
  highlightPath = [],
  onSelectAirport,
  selectedAirport,
  height = 'h-[520px]',
}) {
  const [hoveredAirport, setHoveredAirport] = useState(null);

  // Default coordinate layout for key aviation nodes
  const airportCoords = {
    HYD: { x: 460, y: 350, name: 'Hyderabad (HYD)' },
    DEL: { x: 420, y: 160, name: 'Delhi (DEL)' },
    BOM: { x: 300, y: 330, name: 'Mumbai (BOM)' },
    BLR: { x: 440, y: 440, name: 'Bangalore (BLR)' },
    MAA: { x: 500, y: 460, name: 'Chennai (MAA)' },
    CCU: { x: 640, y: 250, name: 'Kolkata (CCU)' },
    PNQ: { x: 330, y: 360, name: 'Pune (PNQ)' },
    GOI: { x: 320, y: 430, name: 'Goa (GOI)' },
    DXB: { x: 170, y: 230, name: 'Dubai (DXB)' },
    SIN: { x: 790, y: 480, name: 'Singapore (SIN)' },
    LHR: { x: 90, y: 90, name: 'London (LHR)' },
  };

  // Predefined route edges
  const networkEdges = [
    { from: 'HYD', to: 'DEL' },
    { from: 'HYD', to: 'BOM' },
    { from: 'HYD', to: 'BLR' },
    { from: 'HYD', to: 'MAA' },
    { from: 'HYD', to: 'CCU' },
    { from: 'DEL', to: 'BOM' },
    { from: 'DEL', to: 'BLR' },
    { from: 'DEL', to: 'CCU' },
    { from: 'DEL', to: 'PNQ' },
    { from: 'BOM', to: 'BLR' },
    { from: 'BOM', to: 'MAA' },
    { from: 'BOM', to: 'GOI' },
    { from: 'BOM', to: 'DXB' },
    { from: 'BLR', to: 'MAA' },
    { from: 'BLR', to: 'CCU' },
    { from: 'MAA', to: 'CCU' },
    { from: 'MAA', to: 'SIN' },
    { from: 'DXB', to: 'HYD' },
    { from: 'DXB', to: 'DEL' },
    { from: 'DXB', to: 'LHR' },
    { from: 'SIN', to: 'HYD' },
    { from: 'SIN', to: 'BLR' },
  ];

  // Check if edge is in highlighted path
  const isEdgeHighlighted = (from, to) => {
    if (!highlightPath || highlightPath.length < 2) return false;
    for (let i = 0; i < highlightPath.length - 1; i++) {
      if (
        (highlightPath[i] === from && highlightPath[i + 1] === to) ||
        (highlightPath[i] === to && highlightPath[i + 1] === from)
      ) {
        return true;
      }
    }
    return false;
  };

  const isNodeHighlighted = (code) => {
    return highlightPath && highlightPath.includes(code);
  };

  return (
    <div className={`relative w-full ${height} glass-panel rounded-2xl overflow-hidden radar-grid border border-cyan-500/30 flex flex-col`}>
      {/* Radar Overlay & Grid Rings */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-cyan-500/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-cyan-500/15" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full border border-cyan-500/20" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-cyan-500/10" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-cyan-500/10" />
      </div>

      {/* Header Overlay */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-3 pointer-events-none">
        <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-500/40 text-cyan-300">
          <Compass className="w-5 h-5 animate-spin duration-[20000ms]" />
        </div>
        <div>
          <h4 className="text-sm font-bold font-mono text-slate-100 flex items-center gap-2">
            AEROSYNC AVIATION GRAPH TOPOLOGY
            <span className="text-[10px] font-normal px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              DSA ADJACENCY MATRIX
            </span>
          </h4>
          <p className="text-[11px] text-slate-400 font-mono">
            {highlightPath && highlightPath.length > 0
              ? `Path Active: ${highlightPath.join(' ➔ ')}`
              : 'Interactive Node Inspector • Click an airport to explore graph connections'}
          </p>
        </div>
      </div>

      {/* SVG Network Canvas */}
      <svg className="w-full h-full" viewBox="0 0 900 550">
        {/* Render Edges */}
        {networkEdges.map((edge, idx) => {
          const c1 = airportCoords[edge.from];
          const c2 = airportCoords[edge.to];
          if (!c1 || !c2) return null;

          const highlighted = isEdgeHighlighted(edge.from, edge.to);

          // Calculate curved bezier control point
          const midX = (c1.x + c2.x) / 2;
          const midY = (c1.y + c2.y) / 2 - 25;

          return (
            <g key={`edge-${idx}`}>
              {/* Glow background line if highlighted */}
              {highlighted && (
                <path
                  d={`M ${c1.x} ${c1.y} Q ${midX} ${midY} ${c2.x} ${c2.y}`}
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="6"
                  strokeOpacity="0.4"
                  className="animate-pulse"
                />
              )}
              {/* Route Line */}
              <path
                d={`M ${c1.x} ${c1.y} Q ${midX} ${midY} ${c2.x} ${c2.y}`}
                fill="none"
                stroke={highlighted ? '#00f0ff' : 'rgba(6, 182, 212, 0.25)'}
                strokeWidth={highlighted ? '2.5' : '1.2'}
                strokeDasharray={highlighted ? 'none' : '4,4'}
                className="transition-all duration-300"
              />
            </g>
          );
        })}

        {/* Render Airport Nodes */}
        {Object.entries(airportCoords).map(([code, coords]) => {
          const isSelected = selectedAirport === code;
          const isPathNode = isNodeHighlighted(code);
          const isHovered = hoveredAirport === code;

          return (
            <g
              key={`node-${code}`}
              transform={`translate(${coords.x}, ${coords.y})`}
              className="cursor-pointer group"
              onClick={() => onSelectAirport && onSelectAirport(code)}
              onMouseEnter={() => setHoveredAirport(code)}
              onMouseLeave={() => setHoveredAirport(null)}
            >
              {/* Outer Pulse Rings */}
              {(isSelected || isPathNode) && (
                <circle
                  r="20"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="1.5"
                  strokeOpacity="0.6"
                  className="animate-ping"
                />
              )}

              {/* Node Background Halo */}
              <circle
                r={isSelected ? 16 : isHovered ? 14 : 11}
                fill={isSelected ? '#00f0ff' : isPathNode ? '#06b6d4' : '#0a1020'}
                stroke={isSelected ? '#ffffff' : isPathNode ? '#00f0ff' : '#06b6d4'}
                strokeWidth={isSelected ? '3' : '2'}
                className="transition-all duration-200 filter drop-shadow-[0_0_8px_rgba(0,240,255,0.6)]"
              />

              {/* Center Dot */}
              <circle
                r="3.5"
                fill={isSelected ? '#060913' : '#ffffff'}
              />

              {/* Airport Code Label */}
              <text
                y="-18"
                textAnchor="middle"
                className={`text-[11px] font-mono font-bold select-none ${
                  isSelected || isPathNode
                    ? 'fill-cyan-300 font-extrabold filter drop-shadow-[0_0_5px_rgba(0,240,255,0.8)]'
                    : 'fill-slate-300'
                }`}
              >
                {code}
              </text>

              {/* Tooltip on Hover */}
              {isHovered && (
                <g transform="translate(0, -38)">
                  <rect
                    x="-65"
                    y="-18"
                    width="130"
                    height="24"
                    rx="6"
                    fill="#060913"
                    stroke="#00f0ff"
                    strokeWidth="1"
                    className="filter drop-shadow-md"
                  />
                  <text
                    y="-2"
                    textAnchor="middle"
                    className="fill-cyan-300 text-[10px] font-mono font-semibold"
                  >
                    {coords.name}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>

      {/* Legend & Stats Bar */}
      <div className="mt-auto px-6 py-3 border-t border-cyan-500/20 bg-aviation-950/80 backdrop-blur-md flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-3">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
            <span>Active Airport Node</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
            <span>Dijkstra Shortest Route</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 h-0.5 border-b border-dashed border-cyan-500/50" />
            <span>Direct Flight Edge</span>
          </div>
        </div>

        <div className="text-cyan-400/90 font-mono">
          <span>Vertices: 11 | Edges: 22 | Hub: HYD (Degree: 8)</span>
        </div>
      </div>
    </div>
  );
}
