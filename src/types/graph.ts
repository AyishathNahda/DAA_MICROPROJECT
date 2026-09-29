export type Location = {
  id: string;
  name: string;
};

export type Road = {
  id: string;
  from: string;
  to: string;
  distance: number;
  bidirectional: boolean;
};

export type RoadNetwork = {
  locations: Location[];
  roads: Road[];
};

export type DijkstraStep = {
  description: string;
  type: 'INITIALIZATION' | 'SELECTION' | 'RELAXATION' | 'COMPLETION';
  currentNode?: string;
  edge?: Road;
  updatedDistances?: Record<string, number>;
  details?: string;
};

export type ShortestPathResult = {
  found: boolean;
  distance: number;
  path: string[];
  distances: Record<string, number>;
  previous: Record<string, string | null>;
  visitedOrder: string[];
  steps: DijkstraStep[];
};
