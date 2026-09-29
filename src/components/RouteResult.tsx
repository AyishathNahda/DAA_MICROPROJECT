import React from 'react';
import type { ShortestPathResult, RoadNetwork } from '../types/graph';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface Props {
  result: ShortestPathResult;
  network: RoadNetwork;
  startId: string;
  endId: string;
}

export default function RouteResult({ result, network, startId, endId }: Props) {
  const getLocationName = (id: string) => 
    network.locations.find(l => l.id === id)?.name || id;

  if (startId === endId) {
    return (
      <div className="bg-card rounded-lg shadow border border-border p-6 mt-6">
        <h3 className="text-xl font-bold mb-4 flex items-center text-primary">
          <CheckCircle2 className="w-6 h-6 mr-2" /> Shortest Route
        </h3>
        <p className="text-lg">You are already at the destination.</p>
        <p className="text-muted-foreground mt-2">Total Distance: 0 units</p>
      </div>
    );
  }

  if (!result.found) {
    return (
      <div className="bg-card rounded-lg shadow border border-border p-6 mt-6">
        <h3 className="text-xl font-bold mb-4 flex items-center text-destructive">
          <XCircle className="w-6 h-6 mr-2" /> No Route Found
        </h3>
        <p className="text-lg">
          There is no path from <span className="font-semibold">{getLocationName(startId)}</span> to <span className="font-semibold">{getLocationName(endId)}</span>.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg shadow border border-border p-6 mt-6">
      <h3 className="text-xl font-bold mb-6 flex items-center text-primary">
        <CheckCircle2 className="w-6 h-6 mr-2" /> Shortest Route
      </h3>
      
      <div className="flex flex-wrap items-center gap-2 mb-8 bg-muted p-4 rounded-lg">
        {result.path.map((nodeId, index) => (
          <React.Fragment key={`${nodeId}-${index}`}>
            <span className="font-semibold text-lg bg-background px-3 py-1 rounded border border-border shadow-sm">
              {getLocationName(nodeId)}
            </span>
            {index < result.path.length - 1 && (
              <ArrowRight className="w-5 h-5 text-muted-foreground" />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-background p-4 rounded border border-border">
          <p className="text-sm text-muted-foreground mb-1">Total Distance</p>
          <p className="text-3xl font-bold font-mono">{result.distance}</p>
        </div>
        <div className="bg-background p-4 rounded border border-border">
          <p className="text-sm text-muted-foreground mb-1">Stops</p>
          <p className="text-3xl font-bold font-mono">{result.path.length}</p>
        </div>
      </div>
    </div>
  );
}
