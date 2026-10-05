import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import FlightsPage from './pages/FlightsPage';
import AirportsPage from './pages/AirportsPage';
import AircraftPage from './pages/AircraftPage';
import CrewPage from './pages/CrewPage';
import PassengersPage from './pages/PassengersPage';
import GatesPage from './pages/GatesPage';
import RoutesPage from './pages/RoutesPage';
import SchedulingPage from './pages/SchedulingPage';
import ResourceAllocationPage from './pages/ResourceAllocationPage';
import DecisionSupportPage from './pages/DecisionSupportPage';
import AlgorithmLabPage from './pages/AlgorithmLabPage';
import GlobalSearchResultsPage from './pages/GlobalSearchResultsPage';

export default function App() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-aviation-950 text-slate-100 flex">
        {/* Navigation Sidebar */}
        <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

        {/* Main Content Area */}
        <div
          className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
            isCollapsed ? 'pl-20' : 'pl-64'
          }`}
        >
          {/* Top Header Navbar */}
          <Navbar />

          {/* Page Routing Container */}
          <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/flights" element={<FlightsPage />} />
              <Route path="/airports" element={<AirportsPage />} />
              <Route path="/aircraft" element={<AircraftPage />} />
              <Route path="/crew" element={<CrewPage />} />
              <Route path="/passengers" element={<PassengersPage />} />
              <Route path="/gates" element={<GatesPage />} />
              <Route path="/routes" element={<RoutesPage />} />
              <Route path="/scheduling" element={<SchedulingPage />} />
              <Route path="/resources" element={<ResourceAllocationPage />} />
              <Route path="/decisions" element={<DecisionSupportPage />} />
              <Route path="/algorithm-lab" element={<AlgorithmLabPage />} />
              <Route path="/search" element={<GlobalSearchResultsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
