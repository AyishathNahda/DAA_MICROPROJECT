import React, { useState } from 'react';
import type { Location } from '../types/graph';
import { Plus, Trash2, MapPin } from 'lucide-react';

interface Props {
  locations: Location[];
  onAdd: (name: string) => void;
  onDelete: (id: string) => void;
}

export default function LocationManager({ locations, onAdd, onDelete }: Props) {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAdd(name.trim());
    setName('');
  };

  return (
    <div className="bg-card rounded-lg shadow border border-border p-4">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <MapPin className="w-5 h-5 mr-2" /> Locations
      </h3>
      
      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New location name"
          className="flex-1 px-3 py-1.5 bg-background border border-input rounded text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button
          type="submit"
          className="bg-primary text-primary-foreground px-3 py-1.5 rounded flex items-center hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </form>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        {locations.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-2">No locations added yet.</p>
        ) : (
          locations.map(loc => (
            <div key={loc.id} className="flex justify-between items-center p-2 bg-muted rounded">
              <span className="text-sm">{loc.name}</span>
              <button
                onClick={() => onDelete(loc.id)}
                className="text-muted-foreground hover:text-destructive transition-colors"
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
