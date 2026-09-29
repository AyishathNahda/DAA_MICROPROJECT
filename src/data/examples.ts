import type { RoadNetwork } from '../types/graph';

export const cityNetworkExample: RoadNetwork = {
  locations: [
    { id: '1', name: 'College' },
    { id: '2', name: 'Metro' },
    { id: '3', name: 'Mall' },
    { id: '4', name: 'Hospital' },
    { id: '5', name: 'Airport' },
    { id: '6', name: 'Home' },
  ],
  roads: [
    { id: 'r1', from: '1', to: '2', distance: 4, bidirectional: true },
    { id: 'r2', from: '1', to: '3', distance: 7, bidirectional: true },
    { id: 'r3', from: '2', to: '4', distance: 3, bidirectional: true },
    { id: 'r4', from: '2', to: '5', distance: 8, bidirectional: true },
    { id: 'r5', from: '3', to: '4', distance: 2, bidirectional: true },
    { id: 'r6', from: '4', to: '5', distance: 4, bidirectional: true },
    { id: 'r7', from: '4', to: '6', distance: 5, bidirectional: true },
    { id: 'r8', from: '5', to: '6', distance: 2, bidirectional: true },
  ],
};
