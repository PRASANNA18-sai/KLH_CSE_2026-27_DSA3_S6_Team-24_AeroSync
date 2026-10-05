import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plane,
  Building2,
  Cpu,
  Users,
  UserCheck,
  DoorClosed,
  Route,
  Activity,
  AlertTriangle,
  ArrowRight,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import api from '../api/api';
import StatCard from '../components/StatCard';
import StatusBadge from '../components/StatusBadge';
import AirportNetwork from '../components/AirportNetwork';
import { AlertCard } from '../components/FlightCard';
import { LoadingSpinner, ErrorMessage } from '../components/LoadingSpinner';

export default function DashboardPage() {
  const [flights, setFlights] = useState([]);
  const [airports, setAirports] = useState([]);
  const [aircraft, setAircraft] = useState([]);
  const [crew, setCrew] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [gates, setGates] = useState([]);
  const [decisions, setDecisions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAirportCode, setSelectedAirportCode] = useState('HYD');
  const navigate = useNavigate();

  const loadAllData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        flightsRes,
        airportsRes,
        aircraftRes,
        crewRes,
        passengersRes,
        gatesRes,
        decisionsRes,
      ] = await Promise.all([
        api.getFlights(),
        api.getAirports(),
        api.getAircraft(),
        api.getCrew(),
        api.getPassengers(),
        api.getGates(),
        api.getDecisions(),
      ]);

      setFlights(flightsRes.data || []);
      setAirports(airportsRes.data || []);
      setAircraft(aircraftRes.data || []);
      setCrew(crewRes.data || []);
      setPassengers(passengersRes.data || []);
      setGates(gatesRes.data || []);
      setDecisions(decisionsRes.data || []);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Unable to load real-time telemetry from AeroSync backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Synchronizing Aviation Telemetry & Flight Graphs..." />;
  }

  const activeFlightsCount = flights.filter(
    (f) => f.status === 'IN_AIR' || f.status === 'BOARDING' || f.status === 'ON_TIME'
  ).length;
  const availableCrewCount = crew.filter((c) => c.availability === 'Available').length;
  const availableGatesCount = gates.filter((g) => g.status === 'Available').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden rounded-2xl glass-panel-cyan p-6 sm:p-8">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-300 uppercase">
                Aviation Command Center
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-50 tracking-wider">
              AeroSync
            </h1>
            <p className="text-sm font-mono text-cyan-200/90 mt-1 max-w-2xl">
              Intelligent Aviation Search & Decision Support System
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/algorithm-lab')}
              className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 font-mono text-xs font-semibold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(0,240,255,0.2)]"
            >
              <Sparkles className="w-4 h-4 text-cyan-300" />
              DSA Algorithm Lab
            </button>
            <button
              onClick={loadAllData}
              className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {error && <ErrorMessage message={error} onRetry={loadAllData} />}

      {/* Primary Metric Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <StatCard
          title="Total Flights"
          value={flights.length}
          subtitle="Active Repository"
          icon={Plane}
          color="cyan"
        />
        <StatCard
          title="Active Flights"
          value={activeFlightsCount}
          subtitle="En Route / Boarding"
          icon={Activity}
          color="emerald"
        />
        <StatCard
          title="Airports"
          value={airports.length}
          subtitle="Connected Nodes"
          icon={Building2}
          color="blue"
        />
        <StatCard
          title="Aircraft"
          value={aircraft.length}
          subtitle="Fleet Units"
          icon={Cpu}
          color="cyan"
        />
        <StatCard
          title="Available Crew"
          value={availableCrewCount}
          subtitle="Standby Roster"
          icon={Users}
          color="emerald"
        />
        <StatCard
          title="Passengers"
          value={passengers.length}
          subtitle="Active Manifest"
          icon={UserCheck}
          color="blue"
        />
        <StatCard
          title="Available Gates"
          value={availableGatesCount}
          subtitle="Docking Ready"
          icon={DoorClosed}
          color="amber"
        />
      </div>

      {/* Aviation Network Visualizer */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Route className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold font-mono text-slate-100 uppercase tracking-wide">
              Aviation Network Topology (Graph Data Structure)
            </h2>
          </div>
          <button
            onClick={() => navigate('/routes')}
            className="text-xs font-mono text-cyan-300 hover:text-cyan-200 flex items-center gap-1 group"
          >
            Compute Shortest Path <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <AirportNetwork
          airports={airports}
          selectedAirport={selectedAirportCode}
          onSelectAirport={(code) => setSelectedAirportCode(code)}
          highlightPath={['HYD', 'DXB', 'LHR']}
          height="h-[460px]"
        />
      </div>

      {/* Live Flight Operations Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Plane className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold font-mono text-slate-100 uppercase tracking-wide">
              Live Flight Operations
            </h2>
          </div>
          <button
            onClick={() => navigate('/flights')}
            className="text-xs font-mono text-cyan-300 hover:text-cyan-200 flex items-center gap-1 group"
          >
            View All Flights <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="glass-panel rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-aviation-950/70 border-b border-cyan-500/20 text-slate-400 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Flight ID</th>
                  <th className="px-4 py-3">Airline</th>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3">Destination</th>
                  <th className="px-4 py-3">Departure</th>
                  <th className="px-4 py-3">Arrival</th>
                  <th className="px-4 py-3">Aircraft</th>
                  <th className="px-4 py-3">Gate</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan-500/10">
                {flights.slice(0, 8).map((f) => (
                  <tr key={f.flightId} className="hover:bg-cyan-950/20 transition-colors">
                    <td className="px-4 py-3 font-bold text-cyan-300">{f.flightId}</td>
                    <td className="px-4 py-3 text-slate-200">{f.airline}</td>
                    <td className="px-4 py-3 text-slate-300">{f.source}</td>
                    <td className="px-4 py-3 text-slate-300">{f.destination}</td>
                    <td className="px-4 py-3 text-slate-400">{f.departure}</td>
                    <td className="px-4 py-3 text-slate-400">{f.arrival}</td>
                    <td className="px-4 py-3 text-slate-400">{f.aircraft}</td>
                    <td className="px-4 py-3 text-cyan-300 font-semibold">{f.gate}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={f.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Decision Support Recommendations & Operational Alerts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h2 className="text-lg font-bold font-mono text-slate-100 uppercase tracking-wide">
              Decision Support Recommendations & Operational Alerts
            </h2>
          </div>
          <button
            onClick={() => navigate('/decisions')}
            className="text-xs font-mono text-cyan-300 hover:text-cyan-200 flex items-center gap-1 group"
          >
            Open Decision Center <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {decisions.slice(0, 3).map((dec) => (
            <AlertCard key={dec.id} alert={dec} />
          ))}
        </div>
      </div>
    </div>
  );
}
