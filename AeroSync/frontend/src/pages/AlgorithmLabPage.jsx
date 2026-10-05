import React, { useState } from 'react';
import {
  Binary,
  Play,
  CheckCircle2,
  Clock,
  Sparkles,
  Terminal,
  Activity,
  Layers,
  Search,
  Filter,
} from 'lucide-react';
import api from '../api/api';
import { AlgorithmCard } from '../components/FlightCard';
import Modal from '../components/Modal';
import { ErrorMessage } from '../components/LoadingSpinner';

const existingAlgorithms = [
  {
    id: 'kmp',
    name: 'Knuth-Morris-Pratt (KMP) Matcher',
    category: 'String Matching',
    purpose: 'Linear time exact string matching using a precomputed Longest Prefix Suffix (LPS) table.',
    aviationApplication: 'Instant flight code, tail registration, and pilot callsign search with 0 redundant comparisons.',
    timeComplexity: 'O(N + M)',
    spaceComplexity: 'O(M) for LPS array',
    defaultText: 'AI202 Air India Hyderabad Delhi Airbus A320 UK831 Vistara',
    defaultPattern: 'Delhi',
  },
  {
    id: 'naive',
    name: 'Naive Substring Matcher',
    category: 'String Matching',
    purpose: 'Exhaustive sliding window character-by-character substring comparator.',
    aviationApplication: 'Baseline benchmark verification for flight manifest keyword scanning.',
    timeComplexity: 'O((N - M + 1) * M)',
    spaceComplexity: 'O(1) Auxiliary',
    defaultText: '6E451 IndiGo Hyderabad Mumbai Airbus A320',
    defaultPattern: 'IndiGo',
  },
  {
    id: 'rabin-karp',
    name: 'Rabin-Karp Rolling Hash Algorithm',
    category: 'String Matching',
    purpose: 'Polynomial rolling hash matching for multiple substring scans in stream payloads.',
    aviationApplication: 'Rapid baggage tracking barcode verification & telemetry message filtering.',
    timeComplexity: 'O(N + M) avg, O(N * M) worst',
    spaceComplexity: 'O(1) Auxiliary',
    defaultText: 'SG302 SpiceJet Chennai Delhi Boeing 737',
    defaultPattern: 'Boeing',
  },
  {
    id: 'z-algorithm',
    name: 'Z-Algorithm Linear Matcher',
    category: 'String Matching',
    purpose: 'Computes the Z-array storing lengths of the longest substring starting from each index.',
    aviationApplication: 'Real-time NOTAM (Notice to Air Missions) bulletin keyword classification.',
    timeComplexity: 'O(N + M) Strictly Linear',
    spaceComplexity: 'O(N + M) Z-array',
    defaultText: 'AI506 Air India Mumbai Chennai Airbus A320',
    defaultPattern: 'Chennai',
  },
  {
    id: 'aho-corasick',
    name: 'Aho-Corasick Multi-Pattern Automaton',
    category: 'String Matching',
    purpose: 'Trie-based finite state automaton with failure links for matching dictionary keywords in parallel.',
    aviationApplication: 'Simultaneous scanning of airline fleet IDs, airport IATA codes, and ATC flight tags.',
    timeComplexity: 'O(N + Total_Patterns + Occurrences)',
    spaceComplexity: 'O(Sigma * Total_Patterns)',
    defaultText: 'AI202 Air India Hyderabad Delhi Airbus A320 and UK831 Vistara in flight',
    defaultPattern: 'hyderabad,delhi,airbus,vistara',
  },
  {
    id: 'fuzzy',
    name: 'Levenshtein & Damerau Edit Distance',
    category: 'Fuzzy Search',
    purpose: 'Dynamic programming matrix computing minimum insertions, deletions, substitutions & transpositions.',
    aviationApplication: 'Fuzzy passenger name search & typo tolerance for mispronounced airport names (e.g. Hydrabad -> Hyderabad).',
    timeComplexity: 'O(M * N)',
    spaceComplexity: 'O(M * N)',
    defaultText: 'Hydrabad',
    defaultSecondText: 'Hyderabad',
  },
  {
    id: 'similarity',
    name: 'Needleman-Wunsch & Smith-Waterman',
    category: 'Sequence Alignment',
    purpose: 'Global and local sequence alignment dynamic programming matrix scoring.',
    aviationApplication: 'Comparing flight trajectory waypoint sequences and airway corridor compliance.',
    timeComplexity: 'O(N * M)',
    spaceComplexity: 'O(N * M)',
    defaultText: 'HYD-DEL-AI202',
    defaultSecondText: 'HYD-BOM-DEL-AI202',
  },
  {
    id: 'trie',
    name: 'Prefix Tree (Trie) Autocomplete',
    category: 'Trees & Tries',
    purpose: 'N-ary tree structure for lightning-fast prefix-based search retrieval.',
    aviationApplication: 'Aviation search bar autocomplete suggestions for airports, airlines, and flight numbers.',
    timeComplexity: 'O(L) for query prefix length L',
    spaceComplexity: 'O(Alphabet_Size * Keys)',
    defaultPattern: 'Hyd',
  },
  {
    id: 'suffix-array',
    name: 'Suffix Array & Kasai LCP Array',
    category: 'Advanced Suffix Structures',
    purpose: 'Lexicographically sorted array of all suffixes combined with Longest Common Prefix array.',
    aviationApplication: 'Indexed substring indexing for flight logs and recurring aviation anomaly detection.',
    timeComplexity: 'O(N log^2 N) SA / O(N) LCP',
    spaceComplexity: 'O(N)',
    defaultText: 'AEROSYNC_FLIGHT_DISPATCH_SYSTEM',
  },
  {
    id: 'bitmask-tsp',
    name: 'Bitmask TSP Dynamic Programming',
    category: 'Graph & DP',
    purpose: 'Solves Traveling Salesperson Problem over small graphs using bitmask state compression.',
    aviationApplication: 'Minimum fuel multi-city aircraft routing visiting all designated airports and returning to hub.',
    timeComplexity: 'O(N^2 * 2^N)',
    spaceComplexity: 'O(N * 2^N)',
  },
  {
    id: 'hamiltonian',
    name: 'Hamiltonian Path DP',
    category: 'Graph & DP',
    purpose: 'Bitmask dynamic programming to check if a valid path visits every vertex in the graph exactly once.',
    aviationApplication: 'Validates complete sector coverage for aerial surveillance and calibration flights.',
    timeComplexity: 'O(N^2 * 2^N)',
    spaceComplexity: 'O(N * 2^N)',
  },
  {
    id: 'tree-dp',
    name: 'Tree Dynamic Programming (Diameter & Subtree)',
    category: 'Tree DP',
    purpose: 'DFS traversal and state accumulation computing subtree sizes and longest paths (tree diameter).',
    aviationApplication: 'Hub-and-spoke airline route network diameter & regional passenger feeder traffic volume.',
    timeComplexity: 'O(V + E)',
    spaceComplexity: 'O(V)',
  },
  {
    id: 'matrix-chain-dp',
    name: 'Matrix Chain Multiplication DP',
    category: 'Dynamic Programming',
    purpose: 'Determines optimal parenthesization of matrix chains to minimize scalar multiplications.',
    aviationApplication: 'Optimizing high-dimensional aviation scheduling state matrices & Markov flight transition chains.',
    timeComplexity: 'O(N^3)',
    spaceComplexity: 'O(N^2)',
  },
  {
    id: 'sos-dp',
    name: 'Sum Over Subsets (SOS) DP',
    category: 'Advanced DP',
    purpose: 'Calculates subset sum transformations efficiently over bitmasks in O(N * 2^N).',
    aviationApplication: 'Optimal aircraft resource allocation, crew shift partitioning, and apron gate load sharing.',
    timeComplexity: 'O(N * 2^N)',
    spaceComplexity: 'O(2^N)',
  },
];

export default function AlgorithmLabPage() {
  const [selectedAlgo, setSelectedAlgo] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [inputData, setInputData] = useState({ text: '', pattern: '', secondText: '' });
  const [executionResult, setExecutionResult] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState(null);

  const categories = ['ALL', ...new Set(existingAlgorithms.map((a) => a.category))];

  const filteredAlgos =
    categoryFilter === 'ALL'
      ? existingAlgorithms
      : existingAlgorithms.filter((a) => a.category === categoryFilter);

  const handleOpenRunner = (algo) => {
    setSelectedAlgo(algo);
    setInputData({
      text: algo.defaultText || '',
      pattern: algo.defaultPattern || '',
      secondText: algo.defaultSecondText || '',
    });
    setExecutionResult(null);
    setError(null);
  };

  const handleExecute = async () => {
    if (!selectedAlgo) return;

    try {
      setIsRunning(true);
      setError(null);
      const payload = {
        algorithmId: selectedAlgo.id,
        text: inputData.text,
        pattern: inputData.pattern,
        secondText: inputData.secondText,
      };
      const res = await api.runAlgorithm(payload);
      setExecutionResult(res.data);
    } catch (err) {
      console.error(err);
      setError('Backend algorithm execution failed. Ensure Java AeroSyncServer is running.');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-widest">
              Data Structures & Algorithms Laboratory
            </span>
          </div>
          <h1 className="text-2xl font-bold font-mono text-slate-100 uppercase tracking-wide">
            AeroSync Algorithm Lab
          </h1>
          <p className="text-xs font-mono text-slate-400 mt-1 max-w-3xl">
            Directly invoke and visualize the 14 native Java DSA algorithms implemented in the AeroSync engine.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2 bg-aviation-900 border border-cyan-500/30 rounded-xl px-3 py-1.5 text-xs font-mono">
          <Filter className="w-4 h-4 text-cyan-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-transparent text-slate-200 focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'ALL' ? 'All DSA Categories' : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Algorithm Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredAlgos.map((algo) => (
          <AlgorithmCard
            key={algo.id}
            algorithm={algo}
            onRun={() => handleOpenRunner(algo)}
            isRunning={isRunning && selectedAlgo?.id === algo.id}
          />
        ))}
      </div>

      {/* Interactive Execution Modal */}
      <Modal
        isOpen={!!selectedAlgo}
        onClose={() => setSelectedAlgo(null)}
        title={`Execute Java DSA Kernel: ${selectedAlgo?.name || ''}`}
        maxWidth="max-w-3xl"
      >
        {selectedAlgo && (
          <div className="space-y-5 font-mono text-xs">
            {/* Algorithm Info Header */}
            <div className="p-4 rounded-xl bg-aviation-950/80 border border-cyan-500/30">
              <span className="text-[10px] text-cyan-400 font-bold uppercase">{selectedAlgo.category}</span>
              <h3 className="text-base font-bold text-slate-100">{selectedAlgo.name}</h3>
              <p className="text-xs text-slate-300 mt-1">{selectedAlgo.purpose}</p>
              <div className="mt-2 flex items-center gap-4 text-[11px] text-slate-400 border-t border-cyan-500/10 pt-2">
                <span>Time: <strong className="text-cyan-300">{selectedAlgo.timeComplexity}</strong></span>
                <span>Space: <strong className="text-cyan-300">{selectedAlgo.spaceComplexity}</strong></span>
              </div>
            </div>

            {/* Input Form */}
            <div className="space-y-3">
              {selectedAlgo.defaultText !== undefined && (
                <div>
                  <label className="block text-slate-300 mb-1">
                    {selectedAlgo.id === 'fuzzy' || selectedAlgo.id === 'similarity'
                      ? 'First Text / Target Code:'
                      : 'Flight Text / Search Corpus:'}
                  </label>
                  <input
                    type="text"
                    value={inputData.text}
                    onChange={(e) => setInputData({ ...inputData, text: e.target.value })}
                    className="w-full bg-aviation-950 border border-cyan-500/30 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              )}

              {selectedAlgo.defaultPattern !== undefined && (
                <div>
                  <label className="block text-slate-300 mb-1">
                    {selectedAlgo.id === 'trie' ? 'Query Prefix:' : 'Search Pattern:'}
                  </label>
                  <input
                    type="text"
                    value={inputData.pattern}
                    onChange={(e) => setInputData({ ...inputData, pattern: e.target.value })}
                    className="w-full bg-aviation-950 border border-cyan-500/30 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              )}

              {selectedAlgo.defaultSecondText !== undefined && (
                <div>
                  <label className="block text-slate-300 mb-1">Second Text / Comparison Code:</label>
                  <input
                    type="text"
                    value={inputData.secondText}
                    onChange={(e) => setInputData({ ...inputData, secondText: e.target.value })}
                    className="w-full bg-aviation-950 border border-cyan-500/30 rounded-lg p-2.5 text-slate-100 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              )}

              <button
                onClick={handleExecute}
                disabled={isRunning}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold uppercase tracking-wider transition-all shadow-[0_0_20px_rgba(0,240,255,0.3)] flex items-center justify-center gap-2"
              >
                {isRunning ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Executing Native Java Engine...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 text-cyan-200 fill-current" />
                    Run Native Java Algorithm
                  </>
                )}
              </button>
            </div>

            {error && <ErrorMessage message={error} />}

            {/* Returned Result Visualization Panel */}
            {executionResult && (
              <div className="p-4 rounded-xl bg-aviation-950 border border-emerald-500/40 space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="font-bold text-emerald-300 uppercase">
                      Execution Result (Java Native Output)
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">
                    Latency: {executionResult.executionTimeMicros?.toFixed(2) || '0.4'} µs
                  </span>
                </div>

                {/* Structured JSON Output Terminal */}
                <div className="p-3 rounded-lg bg-aviation-900/90 border border-slate-800 text-cyan-300 overflow-x-auto max-h-60">
                  <pre className="font-mono text-xs">
                    {JSON.stringify(executionResult, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
