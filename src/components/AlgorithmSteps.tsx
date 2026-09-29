import { useState } from 'react';
import type { ShortestPathResult, RoadNetwork } from '../types/graph';
import { ChevronDown, ChevronUp, Terminal } from 'lucide-react';

interface Props {
  result: ShortestPathResult;
  network: RoadNetwork;
}

export default function AlgorithmSteps({ result, network }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const getLocationName = (id: string) => 
    network.locations.find(l => l.id === id)?.name || id;

  return (
    <div className="bg-card rounded-lg shadow border border-border mt-6 overflow-hidden">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-muted hover:bg-muted/80 transition-colors"
      >
        <div className="flex items-center font-semibold">
          <Terminal className="w-5 h-5 mr-2" /> 
          Algorithm Execution Details
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {isOpen && (
        <div className="p-4 space-y-6">
          
          <div>
            <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wider">Distance Table</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left font-mono border-collapse">
                <thead className="bg-muted text-muted-foreground">
                  <tr>
                    <th className="px-4 py-2 border border-border">Location</th>
                    <th className="px-4 py-2 border border-border">Distance</th>
                    <th className="px-4 py-2 border border-border">Previous</th>
                  </tr>
                </thead>
                <tbody>
                  {network.locations.map(loc => {
                    const dist = result.distances[loc.id];
                    const prev = result.previous[loc.id];
                    return (
                      <tr key={loc.id} className="border-b border-border hover:bg-muted/50">
                        <td className="px-4 py-2 border border-border">{loc.name}</td>
                        <td className="px-4 py-2 border border-border">{dist === Infinity ? '∞' : dist}</td>
                        <td className="px-4 py-2 border border-border">{prev ? getLocationName(prev) : '—'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wider">Visited Order</h4>
            <div className="bg-muted p-3 rounded font-mono text-sm flex flex-wrap gap-2">
              {result.visitedOrder.map((id, idx) => (
                <span key={id} className="bg-background px-2 py-1 rounded border border-border">
                  {idx + 1}. {getLocationName(id)}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2 text-sm text-muted-foreground uppercase tracking-wider">Execution Steps</h4>
            <div className="bg-muted rounded p-4 font-mono text-sm max-h-[400px] overflow-y-auto space-y-2">
              {result.steps.map((step, idx) => (
                <div key={idx} className="border-l-2 border-primary pl-3 py-1">
                  <span className="text-muted-foreground font-semibold">[{step.type}]</span>{' '}
                  {step.description}
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
