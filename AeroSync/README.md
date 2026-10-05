# AeroSync: Intelligent Aviation Search & Decision Support System

> **AeroSync** is an enterprise-grade intelligent aviation operations management, search, flight scheduling, network routing, and decision support platform powered by advanced **Data Structures and Algorithms (DSA)**.

---

## ✈️ System Architecture

AeroSync consists of a high-performance **Java Native DSA Backend Engine** coupled with a modern **React + Vite + Tailwind CSS Dark Aviation Dashboard**.

```
                           AEROSYNC PLATFORM
                                   │
       ┌───────────────────────────┴───────────────────────────┐
       ▼                                                       ▼
REACT 18 + VITE FRONTEND                               JAVA NATIVE DSA BACKEND
(Port 5173)                                            (Port 8080)
• Aviation Dark Theme Dashboard                        • FlightRepository & Inverted Indices
• Graph Topology Network Visualizer                    • Knuth-Morris-Pratt (KMP) Search
• Live Flight Operations Table                         • Rabin-Karp Rolling Hash
• Interactive Gate Concourse (G01-G12)                 • Z-Algorithm & Aho-Corasick Automaton
• Priority Queue Runway Scheduling                     • Levenshtein & Damerau Edit Distances
• Resource Allocation (SOS-DP)                         • Needleman-Wunsch & Smith-Waterman
• Automated Decision Support Center                    • Trie Autocomplete Engine & Suffix Arrays
• DSA Algorithm Lab (14 Native Algorithms)             • Bitmask TSP & Hamiltonian Path DP
                                                       • Tree DP (Hub-and-Spoke Topology)
                                                       • Matrix Chain DP & SOS-DP Optimization
```

---

## 🧩 Algorithms Implemented in Java Core

| Algorithm | Category | Aviation Application | Time Complexity | Space Complexity |
| :--- | :--- | :--- | :--- | :--- |
| **Knuth-Morris-Pratt (KMP)** | String Matching | Flight code, tail ID & callsign pattern matching | $O(N + M)$ | $O(M)$ |
| **Naive Pattern Matcher** | String Matching | Baseline validation for manifest search | $O((N-M+1)M)$ | $O(1)$ |
| **Rabin-Karp Rolling Hash** | String Matching | Telemetry string stream hashing & barcode filter | $O(N + M)$ avg | $O(1)$ |
| **Z-Algorithm** | String Matching | Real-time NOTAM aviation bulletin keyword search | $O(N + M)$ | $O(N + M)$ |
| **Aho-Corasick** | Multi-Pattern Automaton | Simultaneous multi-pattern flight code scanning | $O(N + \Sigma P)$ | $O(\Sigma \cdot P)$ |
| **Levenshtein / Damerau** | Fuzzy Distance | Typo-tolerant passenger & airport name search | $O(M \cdot N)$ | $O(M \cdot N)$ |
| **Sequence Alignment** | Needleman-Wunsch / Smith-Waterman | Flight trajectory waypoint alignment | $O(M \cdot N)$ | $O(M \cdot N)$ |
| **Prefix Tree (Trie)** | Trees & Tries | Instant search bar autocomplete for airports/flights | $O(L)$ | $O(\Sigma \cdot \text{Keys})$ |
| **Suffix Array & LCP** | Suffix Structures | Indexed flight telemetry search & repeating anomaly detection | $O(N \log^2 N)$ | $O(N)$ |
| **Bitmask TSP** | Graph DP | Optimal fuel-efficient closed-loop multi-city flight tour | $O(N^2 \cdot 2^N)$ | $O(N \cdot 2^N)$ |
| **Hamiltonian Path DP** | Graph DP | Complete sector coverage check for aerial calibration | $O(N^2 \cdot 2^N)$ | $O(N \cdot 2^N)$ |
| **Tree DP (Diameter/Subtree)** | Tree DP | Hub-and-Spoke route topology analysis & passenger volume | $O(V + E)$ | $O(V)$ |
| **Matrix Chain DP** | Dynamic Programming | Optimization of aviation Markov scheduling state matrices | $O(N^3)$ | $O(N^2)$ |
| **Sum Over Subsets (SOS-DP)** | Advanced DP | Optimal aircraft, crew shift & apron gate resource partition | $O(N \cdot 2^N)$ | $O(2^N)$ |

---

## 🚀 Quick Start Guide

### Option 1: One-Click Launch (Windows)
Double-click [`start_all.bat`](file:///c:/Users/Balaji%20P/Desktop/2%20year%20odd%20sem/DSA%20project/KLH_CSE_2026-27_DSA3_S6_Team-24_AeroSync/AeroSync/start_all.bat) to start both Backend and Frontend simultaneously.

### Option 2: Manual Terminal Launch

#### 1. Start Java Backend:
```bash
cd AeroSync
javac -d bin src/*.java
java -cp bin AeroSyncServer
```
*Backend runs on `http://localhost:8080`*

#### 2. Start React Frontend:
```bash
cd AeroSync/frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`*

---

## 🖥️ Demonstration Flow for Evaluators

1. **Dashboard Overview**: Inspect live aviation telemetry, KPI metric cards, active flights, and live network topology.
2. **Global Intelligent Search**: Search flight codes (`AI202`), airports (`HYD`), aircraft (`A320`), or crew with instant Trie/KMP matching.
3. **Aviation Route Graph**: Select Origin (`HYD`) and Destination (`LHR`) to execute Dijkstra shortest path navigation with airway distance and waypoint breakdown.
4. **Multi-City Tour Optimization**: Execute Bitmask TSP to calculate minimum fuel burn closed-loop flight paths.
5. **Runway Slot Scheduling**: Optimize flight departures using Priority Queue scheduling and wake turbulence deconfliction.
6. **Visual Gate Management**: Inspect terminal concourse layout (`G01`–`G12`) and perform real-time gate reassignments.
7. **Resource Allocation Matrix**: View fleet, crew, and gate utilization with SOS-DP optimization.
8. **Decision Support Center**: Review automated operational alerts, gate conflict warnings, and aircraft maintenance recommendations.
9. **Algorithm Lab**: Interactively execute and inspect all 14 native Java DSA algorithms with custom input parameters and live microsecond execution output.
