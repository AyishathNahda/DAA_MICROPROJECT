import type { RoadNetwork, ShortestPathResult, DijkstraStep, Road } from '../types/graph';

class MinPriorityQueue {
  private queue: { id: string; priority: number }[] = [];

  enqueue(id: string, priority: number) {
    this.queue.push({ id, priority });
    this.queue.sort((a, b) => a.priority - b.priority);
  }

  dequeue(): string | undefined {
    return this.queue.shift()?.id;
  }

  isEmpty(): boolean {
    return this.queue.length === 0;
  }
}

export function findShortestPath(
  network: RoadNetwork,
  startId: string,
  endId: string
): ShortestPathResult {
  const distances: Record<string, number> = {};
  const previous: Record<string, string | null> = {};
  const steps: DijkstraStep[] = [];
  const visitedOrder: string[] = [];
  const unvisited = new Set<string>();

  // Initialize adjacency list
  const adjacencyList: Record<string, Road[]> = {};
  network.locations.forEach((loc) => {
    adjacencyList[loc.id] = [];
    distances[loc.id] = Infinity;
    previous[loc.id] = null;
    unvisited.add(loc.id);
  });

  network.roads.forEach((road) => {
    if (!adjacencyList[road.from]) adjacencyList[road.from] = [];
    if (!adjacencyList[road.to]) adjacencyList[road.to] = [];
    
    adjacencyList[road.from].push(road);
    if (road.bidirectional) {
      adjacencyList[road.to].push({
        ...road,
        from: road.to,
        to: road.from,
      });
    }
  });

  distances[startId] = 0;
  const pq = new MinPriorityQueue();
  pq.enqueue(startId, 0);

  steps.push({
    type: 'INITIALIZATION',
    description: 'Initialized distances. Set start node distance to 0 and all others to infinity.',
    updatedDistances: { ...distances },
  });

  while (!pq.isEmpty()) {
    const current = pq.dequeue()!;

    if (!unvisited.has(current)) continue;

    unvisited.delete(current);
    visitedOrder.push(current);

    steps.push({
      type: 'SELECTION',
      description: `Selected node with minimum distance: ${network.locations.find((l) => l.id === current)?.name || current}.`,
      currentNode: current,
    });

    if (current === endId) {
      steps.push({
        type: 'COMPLETION',
        description: `Destination node reached.`,
        currentNode: current,
      });
      break;
    }

    if (distances[current] === Infinity) {
      break; // Remaining nodes are unreachable
    }

    const neighbors = adjacencyList[current] || [];
    for (const edge of neighbors) {
      const neighbor = edge.to;
      if (!unvisited.has(neighbor)) continue;

      const newDistance = distances[current] + edge.distance;
      
      const step: DijkstraStep = {
        type: 'RELAXATION',
        description: `Checking edge to ${network.locations.find((l) => l.id === neighbor)?.name || neighbor}. Current distance: ${distances[current]}, Edge weight: ${edge.distance}, New possible distance: ${newDistance}.`,
        currentNode: current,
        edge,
      };

      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        previous[neighbor] = current;
        pq.enqueue(neighbor, newDistance);
        step.description += ` Updated distance to ${newDistance}.`;
        step.updatedDistances = { [neighbor]: newDistance };
      } else {
        step.description += ` No update needed (current distance ${distances[neighbor]} is better or equal).`;
      }
      steps.push(step);
    }
  }

  // Reconstruct path
  const path: string[] = [];
  let currentPathNode: string | null = endId;
  let found = false;
  
  if (distances[endId] !== Infinity || startId === endId) {
    found = true;
    while (currentPathNode !== null) {
      path.unshift(currentPathNode);
      currentPathNode = previous[currentPathNode];
    }
  }

  return {
    found: found && (startId === endId || path.length > 1),
    distance: distances[endId] === Infinity ? 0 : distances[endId],
    path: found ? path : [],
    distances,
    previous,
    visitedOrder,
    steps,
  };
}
