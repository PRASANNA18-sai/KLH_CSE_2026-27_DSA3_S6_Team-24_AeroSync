import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

const client = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const api = {
  // System Status
  getStatus: () => client.get('/api/status'),

  // Flights
  getFlights: () => client.get('/api/flights'),

  // Airports
  getAirports: () => client.get('/api/airports'),

  // Aircraft Fleet
  getAircraft: () => client.get('/api/aircraft'),

  // Crew
  getCrew: () => client.get('/api/crew'),

  // Passengers
  getPassengers: () => client.get('/api/passengers'),

  // Gates
  getGates: () => client.get('/api/gates'),
  assignGate: (gateId, flightId, status) =>
    client.post('/api/gates/assign', { gateId, flightId, status }),

  // Routes & Path Finding
  getRoutes: () => client.get('/api/routes'),
  getShortestPath: (source, destination) =>
    client.post('/api/routes/shortest-path', { source, destination }, {
      params: { source, destination }
    }),
  getTSPRoute: () => client.post('/api/routes/tsp'),

  // Scheduling
  getScheduling: () => client.get('/api/scheduling'),
  optimizeSchedule: () => client.post('/api/scheduling/optimize'),

  // Resources
  getResources: () => client.get('/api/resources'),
  optimizeResources: () => client.post('/api/resources/optimize'),

  // Decision Support
  getDecisions: () => client.get('/api/decisions'),

  // Global Search
  globalSearch: (q) => client.get('/api/search', { params: { q } }),

  // DSA Algorithm Runner
  runAlgorithm: (payload) => client.post('/api/algorithms/run', payload, {
    params: payload
  }),
};

export default api;
