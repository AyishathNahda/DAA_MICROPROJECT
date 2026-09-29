
import type { Location } from '../types/graph';
import { Navigation, Route } from 'lucide-react';

interface Props {
  locations: Location[];
  startId: string;
  endId: string;
  setStartId: (id: string) => void;
  setEndId: (id: string) => void;
  onFindRoute: () => void;
  onClearRoute: () => void;
  hasResult: boolean;
}

export default function RouteSelector({
  locations,
  startId,
  endId,
  setStartId,
  setEndId,
  onFindRoute,
  onClearRoute,
  hasResult
}: Props) {
  return (
    <div className="bg-card rounded-lg shadow border border-border p-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Navigation className="w-5 h-5 mr-2" /> Route Settings
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Start Location</label>
          <select
            value={startId}
            onChange={(e) => setStartId(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-input rounded focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select starting point...</option>
            {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">Destination</label>
          <select
            value={endId}
            onChange={(e) => setEndId(e.target.value)}
            className="w-full px-3 py-2 bg-background border border-input rounded focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select destination...</option>
            {locations.map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
          </select>
        </div>

        <div className="pt-2 flex gap-2">
          <button
            onClick={onFindRoute}
            disabled={!startId || !endId}
            className="flex-1 bg-primary text-primary-foreground py-2 rounded font-medium flex justify-center items-center hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            <Route className="w-4 h-4 mr-2" /> Find Shortest Route
          </button>
          
          {hasResult && (
            <button
              onClick={onClearRoute}
              className="px-4 bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
