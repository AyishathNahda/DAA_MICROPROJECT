import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import Planner from './pages/Planner';
import Documentation from './pages/Documentation';
import { Map, BookOpen } from 'lucide-react';

function Navigation() {
  const location = useLocation();
  
  return (
    <nav className="border-b border-border bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <div className="flex flex-shrink-0 items-center">
              <span className="text-xl font-bold text-foreground">Smart Route Planner</span>
            </div>
            <div className="ml-6 flex space-x-8">
              <Link
                to="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === '/' 
                    ? 'border-primary text-foreground' 
                    : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'
                }`}
              >
                <Map className="mr-2 h-4 w-4" />
                Planner
              </Link>
              <Link
                to="/docs"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  location.pathname === '/docs' 
                    ? 'border-primary text-foreground' 
                    : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'
                }`}
              >
                <BookOpen className="mr-2 h-4 w-4" />
                Documentation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-background text-foreground dark">
        <Navigation />
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Planner />} />
            <Route path="/docs" element={<Documentation />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
