

export default function Documentation() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-12">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Smart Route Planner Documentation</h1>
        <p className="text-xl text-muted-foreground">A practical implementation of Dijkstra's Shortest Path Algorithm</p>
      </div>

      <section className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2">1. Problem Statement</h2>
        <p className="text-lg">
          Finding the shortest path between locations in a weighted network. This represents real-world problems like GPS navigation, network routing, and logistics planning.
        </p>
      </section>

      <section className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2">2. Graph Representation</h2>
        <ul className="space-y-2 list-disc list-inside text-lg">
          <li><strong>Locations</strong> represent Graph <span className="font-semibold text-primary">Vertices</span> (Nodes).</li>
          <li><strong>Roads</strong> represent Graph <span className="font-semibold text-primary">Edges</span>.</li>
          <li><strong>Distance</strong> represents Edge <span className="font-semibold text-primary">Weight</span>.</li>
        </ul>
        <p className="mt-4 text-muted-foreground">The graph can contain directed (one-way) or undirected (two-way) edges.</p>
      </section>

      <section className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2">3. Dijkstra's Algorithm</h2>
        <p className="text-lg mb-4">
          Dijkstra's Algorithm finds the shortest path from a starting vertex to all other vertices in a weighted graph with non-negative edge weights.
        </p>
        
        <h3 className="text-xl font-medium mt-6 mb-3">Algorithm Steps</h3>
        <div className="bg-muted p-4 rounded-md font-mono text-sm space-y-2 overflow-x-auto">
          <div>Initialize distances (Start = 0, Others = ∞)</div>
          <div className="text-primary">↓</div>
          <div>Choose minimum-distance unvisited node</div>
          <div className="text-primary">↓</div>
          <div>Relax neighboring edges</div>
          <div className="text-primary">↓</div>
          <div>Update distances if shorter path found</div>
          <div className="text-primary">↓</div>
          <div>Repeat until destination reached or all visited</div>
          <div className="text-primary">↓</div>
          <div>Reconstruct shortest path</div>
        </div>
      </section>

      <section className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2">4. Complexity</h2>
        <div className="text-lg">
          <p>Using an adjacency list and priority queue:</p>
          <p className="font-mono bg-muted p-2 rounded inline-block mt-2 font-bold">O((V + E) log V)</p>
          <ul className="mt-4 space-y-1 text-muted-foreground">
            <li>Where <strong>V</strong> = number of locations (Vertices)</li>
            <li>Where <strong>E</strong> = number of roads (Edges)</li>
          </ul>
        </div>
      </section>

      <section className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2">5. Limitations</h2>
        <ul className="space-y-2 list-disc list-inside text-lg">
          <li><strong>Non-negative weights required:</strong> Dijkstra's Algorithm cannot handle negative edge weights.</li>
          <li><strong>Abstract Network:</strong> This application represents an abstract road network, not a real geographic map.</li>
        </ul>
      </section>

      <section className="bg-card border border-border rounded-lg p-6 shadow-sm">
        <h2 className="text-2xl font-semibold mb-4 border-b border-border pb-2">6. Future Scope</h2>
        <ul className="space-y-2 list-disc list-inside text-lg text-muted-foreground">
          <li>Real map integration (e.g., Leaflet or Google Maps)</li>
          <li>A* algorithm implementation for better performance with coordinates</li>
          <li>Traffic-aware dynamic weights</li>
          <li>Multiple intermediate destinations (Traveling Salesperson Problem variations)</li>
          <li>Alternative route suggestions</li>
        </ul>
      </section>
    </div>
  );
}
