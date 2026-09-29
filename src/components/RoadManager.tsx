import React, { useState } from 'react';
import type { RoadNetwork, Road } from '../types/graph';
import { Plus, Trash2, GitMerge } from 'lucide-react';

interface Props {
  network: RoadNetwork;
  onAdd: (road: Omit<Road, 'id'>) => void;
  onDelete: (id: string) => void;
}

export default function RoadManager({ network, onAdd, onDelete }: Props) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [distance, setDistance] = useState('');
  const [bidirectional, setBidirectional] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!from || !to || !distance) return;
    
    const dist = parseFloat(distance);
    if (isNaN(dist)) return;

    onAdd({
      from,
      to,
      distance: dist,
      bidirectional
    });
    
    setFrom('');
    setTo('');
    setDistance('');
  };

  const getLocationName = (id: string) => 
    network.locations.find(l => l.id === id)?.name || id;

  return (
    <div className="bg-card rounded-lg shadow border border-border p-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <GitMerge className="w-5 h-5 mr-2" /> Roads
      </h3>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mb-4">
        <div className="flex gap-2">
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="flex-1 px-3 py-1.5 bg-background border border-input rounded text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            required
          >
            <option value="">From...</option>
            {network.locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
          </select>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="flex-1 px-3 py-1.5 bg-background border border-input rounded text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            required
          >
            <option value="">To...</option>
            {network.locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
          </select>
        </div>
        
        <div className="flex gap-2 items-center">
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="Distance"
            min="0"
            step="0.1"
            className="w-24 px-3 py-1.5 bg-background border border-input rounded text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            required
          />
          
          <div className="flex-1 flex items-center justify-center gap-2 text-sm bg-muted p-1 rounded border border-border">
            <label className="flex items-center gap-1 cursor-pointer">
              <input 
                type="radio" 
                checked={bidirectional} 
                onChange={() => setBidirectional(true)} 
                className="accent-primary"
              />
              Two-way
            </label>
            <label className="flex items-center gap-1 cursor-pointer">
              <input 
                type="radio" 
                checked={!bidirectional} 
                onChange={() => setBidirectional(false)}
                className="accent-primary"
              />
              One-way
            </label>
          </div>

          <button
            type="submit"
            className="bg-primary text-primary-foreground px-3 py-1.5 rounded flex items-center hover:bg-primary/90 transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </form>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        {network.roads.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-2">No roads added yet.</p>
        ) : (
          network.roads.map(road => (
            <div key={road.id} className="flex justify-between items-center p-2 bg-muted rounded text-sm">
              <div className="flex items-center gap-2">
                <span className="font-medium w-20 truncate">{getLocationName(road.from)}</span>
                <span className="text-muted-foreground">{road.bidirectional ? '↔' : '→'}</span>
                <span className="font-medium w-20 truncate">{getLocationName(road.to)}</span>
                <span className="bg-background px-1.5 py-0.5 rounded text-xs border border-border">{road.distance}</span>
              </div>
              <button
                onClick={() => onDelete(road.id)}
                className="text-muted-foreground hover:text-destructive transition-colors ml-2"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
