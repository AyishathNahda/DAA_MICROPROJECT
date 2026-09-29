import { useMemo } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  MarkerType,
  type Edge,
  type Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import type { RoadNetwork } from '../types/graph';

interface Props {
  network: RoadNetwork;
  path?: string[];
}

export default function GraphView({ network, path }: Props) {
  // Generate nodes positioned in a circle
  const initialNodes: Node[] = useMemo(() => {
    const total = network.locations.length;
    const radius = Math.min(300, 150 + total * 10);
    const centerX = 200;
    const centerY = 200;

    return network.locations.map((loc, i) => {
      const angle = (i / total) * 2 * Math.PI - Math.PI / 2;
      const isPath = path?.includes(loc.id);
      
      return {
        id: loc.id,
        position: {
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle),
        },
        data: { label: loc.name },
        style: {
          background: isPath ? 'hsl(var(--primary))' : 'hsl(var(--card))',
          color: isPath ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
          border: isPath ? '2px solid hsl(var(--primary))' : '1px solid hsl(var(--border))',
          borderRadius: '8px',
          padding: '10px',
          fontWeight: isPath ? 'bold' : 'normal',
          width: 100,
          textAlign: 'center',
          boxShadow: isPath ? '0 0 10px hsl(var(--primary)/0.5)' : 'none',
        }
      };
    });
  }, [network.locations, path]);

  // Generate edges
  const initialEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = [];
    
    network.roads.forEach(road => {
      // Check if this road is part of the shortest path
      let isPath = false;
      if (path && path.length > 1) {
        for (let i = 0; i < path.length - 1; i++) {
          if (
            (path[i] === road.from && path[i+1] === road.to) ||
            (road.bidirectional && path[i] === road.to && path[i+1] === road.from)
          ) {
            isPath = true;
            break;
          }
        }
      }

      edges.push({
        id: road.id,
        source: road.from,
        target: road.to,
        label: `${road.distance}`,
        type: 'straight',
        animated: isPath,
        style: {
          stroke: isPath ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
          strokeWidth: isPath ? 3 : 1.5,
        },
        labelStyle: { fill: 'hsl(var(--foreground))', fontWeight: 'bold' },
        labelBgStyle: { fill: 'hsl(var(--background))' },
        markerEnd: road.bidirectional ? undefined : {
          type: MarkerType.ArrowClosed,
          color: isPath ? 'hsl(var(--primary))' : 'hsl(var(--muted-foreground))',
        },
      });
    });

    return edges;
  }, [network.roads, path]);

  return (
    <ReactFlow
      nodes={initialNodes}
      edges={initialEdges}
      fitView
      className="bg-muted/30"
    >
      <Controls />
      <Background color="hsl(var(--border))" gap={16} />
    </ReactFlow>
  );
}
