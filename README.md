# Smart Route Planner

A graph-based route planning application that uses **Dijkstra's Algorithm** to find shortest paths. This project demonstrates the practical application of Design and Analysis of Algorithms (DAA) concepts in a real-world scenario.

## Overview

The Smart Route Planner allows users to construct a network of locations (vertices) and roads (edges), specify starting and destination points, and dynamically calculate the shortest route using Dijkstra's Algorithm.

## Problem Statement

Finding the shortest path between locations in a weighted network. This represents real-world problems like GPS navigation, network routing, and logistics planning.

## Objective

To build an interactive, web-based utility that visualizes and executes Dijkstra's Algorithm dynamically on a user-defined road network without hardcoding answers or relying on external routing APIs.

## DAA Concept

### Graph Representation
* **Locations** → Vertices (Nodes)
* **Roads** → Edges (Directed or Undirected)
* **Distance** → Weight (Must be non-negative)

### Dijkstra's Algorithm
Dijkstra's Algorithm finds the shortest path from a source vertex to all other vertices in a weighted graph with non-negative edge weights.

#### Algorithm Steps
1. Initialize distances (Start = 0, Others = ∞).
2. Choose the unvisited node with the minimum tentative distance.
3. Relax all neighboring edges (update distances if a shorter path is found).
4. Repeat until the destination is reached or all reachable nodes are visited.
5. Reconstruct the shortest path using a previous-node tracking table.

#### Complexity
Using an adjacency list and a priority queue (min-heap structure):
* **Time Complexity:** O((V + E) log V)
* **Space Complexity:** O(V + E)

Where `V` is the number of locations and `E` is the number of roads.

## Features
- **Dynamic Network Creation:** Add and remove locations and roads.
- **One-way and Two-way Roads:** Support for directed and undirected edges.
- **Interactive Visualization:** View the road network as a graph using React Flow.
- **Dijkstra Execution Details:** Step-by-step breakdown of distance tables, visited order, and edge relaxations.
- **Client-Side Execution:** Algorithm runs locally in the browser. No backend required.

## Architecture
- `src/algorithms/dijkstra.ts`: Core algorithm implementation (pure logic).
- `src/types/graph.ts`: Data structures and type definitions.
- `src/components/`: Modular React components for UI and graph visualization.
- `src/pages/`: Main application pages (Planner and Documentation).

## Limitations
- **Non-negative weights required:** Dijkstra's Algorithm cannot handle negative edge weights by design.
- **Abstract Network:** This application is intended for conceptual graphs, not real-world geographic coordinates.

## Future Scope
- Integration with real map tiles (e.g., Leaflet or Google Maps).
- Implementation of the A* algorithm with heuristics for better coordinate-based routing.
- Traffic-aware weights and dynamic road closures.
- Alternative route suggestions.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Deployment
The project is built with Vite and React and can be easily deployed to Vercel, Netlify, or any static hosting provider.
