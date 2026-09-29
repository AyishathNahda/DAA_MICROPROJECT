import { useState } from 'react';
import type { RoadNetwork, ShortestPathResult, Location, Road } from '../types/graph';
import { findShortestPath } from '../algorithms/dijkstra';
import { cityNetworkExample } from '../data/examples';
import GraphView from '../components/GraphView';
import LocationManager from '../components/LocationManager';
import RoadManager from '../components/RoadManager';
import RouteSelector from '../components/RouteSelector';
import RouteResult from '../components/RouteResult';
import AlgorithmSteps from '../components/AlgorithmSteps';

export default function Planner() {
  const [network, setNetwork] = useState<RoadNetwork>({ locations: [], roads: [] });
  const [startId, setStartId] = useState<string>('');
  const [endId, setEndId] = useState<string>('');
  const [result, setResult] = useState<ShortestPathResult | null>(null);

  const handleLoadExample = () => {
    setNetwork(cityNetworkExample);
    setStartId('');
    setEndId('');
    setResult(null);
  };

  const handleClearNetwork = () => {
    if (window.confirm('Are you sure you want to clear the entire network?')) {
      setNetwork({ locations: [], roads: [] });
      setStartId('');
      setEndId('');
      setResult(null);
    }
  };

  const handleAddLocation = (name: string) => {
    if (network.locations.some(l => l.name.toLowerCase() === name.toLowerCase())) {
      alert('A location with this name already exists.');
      return;
    }
    const newLoc: Location = { id: Date.now().toString(), name };
    setNetwork(prev => ({ ...prev, locations: [...prev.locations, newLoc] }));
  };

  const handleDeleteLocation = (id: string) => {
    setNetwork(prev => ({
      locations: prev.locations.filter(l => l.id !== id),
      roads: prev.roads.filter(r => r.from !== id && r.to !== id),
    }));
    if (startId === id) setStartId('');
    if (endId === id) setEndId('');
    setResult(null);
  };

  const handleAddRoad = (road: Omit<Road, 'id'>) => {
    if (road.from === road.to) {
      alert('Cannot create a road to the same location.');
      return;
    }
    if (road.distance < 0) {
      alert('Distance must be a non-negative number.');
      return;
    }
    const newRoad: Road = { ...road, id: Date.now().toString() };
    setNetwork(prev => ({ ...prev, roads: [...prev.roads, newRoad] }));
    setResult(null);
  };

  const handleDeleteRoad = (id: string) => {
    setNetwork(prev => ({ ...prev, roads: prev.roads.filter(r => r.id !== id) }));
    setResult(null);
  };

  const handleFindRoute = () => {
    if (!startId) {
      alert('Please select a starting location.');
      return;
    }
    if (!endId) {
      alert('Please select a destination.');
      return;
    }
    const res = findShortestPath(network, startId, endId);
    setResult(res);
  };

  const handleClearRoute = () => {
    setResult(null);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="bg-card rounded-lg shadow border border-border p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Road Network Map</h2>
            <div className="space-x-2">
              <button onClick={handleLoadExample} className="text-sm px-3 py-1 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80">
                Load Example
              </button>
              <button onClick={handleClearNetwork} className="text-sm px-3 py-1 bg-destructive text-destructive-foreground rounded hover:bg-destructive/90">
                Clear All
              </button>
            </div>
          </div>
          <div className="h-[400px] border border-border rounded">
            <GraphView network={network} path={result?.path} />
          </div>
        </div>

        {result && (
          <>
            <RouteResult result={result} network={network} startId={startId} endId={endId} />
            <AlgorithmSteps result={result} network={network} />
          </>
        )}
      </div>

      <div className="space-y-6">
        <RouteSelector 
          locations={network.locations}
          startId={startId}
          endId={endId}
          setStartId={setStartId}
          setEndId={setEndId}
          onFindRoute={handleFindRoute}
          onClearRoute={handleClearRoute}
          hasResult={!!result}
        />
        <LocationManager 
          locations={network.locations}
          onAdd={handleAddLocation}
          onDelete={handleDeleteLocation}
        />
        <RoadManager 
          network={network}
          onAdd={handleAddRoad}
          onDelete={handleDeleteRoad}
        />
      </div>
    </div>
  );
}
