import React, { useState, useEffect } from 'react';
import { Activity, Server, Network } from 'lucide-react';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import OrderDetails from './components/OrderDetails';
import { apiGetQueueStats } from './services/mockBackend';

function App() {
  const [activeOrderIds, setActiveOrderIds] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [stats, setStats] = useState({ queued: 0, active: 0, total: 0 });

  const handleOrderCreated = (id: string) => {
    setActiveOrderIds(prev => [...prev, id]);
    if (!selectedId) setSelectedId(id);
  };

  // Poll for global stats (Active Connections/Queue depth)
  useEffect(() => {
    const interval = setInterval(() => {
      setStats(apiGetQueueStats());
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-secondary/30">
      
      {/* NAVBAR */}
      <header className="border-b border-slate-800 bg-slate-950/50 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Activity className="text-white h-5 w-5" />
            </div>
            <h1 className="font-bold text-lg tracking-tight text-white">
              Solana Execution Engine <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-400 ml-2 font-normal">Devnet Simulator</span>
            </h1>
          </div>
          <div className="flex items-center gap-6 text-xs font-mono text-slate-500">
             <div className="flex items-center gap-2">
               <Server className="h-4 w-4" />
               <span>Queue: <span className="text-white">{stats.queued}</span></span>
             </div>
             <div className="flex items-center gap-2">
               <Activity className="h-4 w-4" />
               <span>Processing: <span className="text-secondary">{stats.active}/10</span></span>
             </div>
             <div className="flex items-center gap-2">
               <Network className="h-4 w-4" />
               <span>Total Orders: <span className="text-white">{stats.total}</span></span>
             </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-64px)]">
        
        {/* LEFT COLUMN: INPUT & LIST */}
        <div className="lg:col-span-4 flex flex-col gap-6 h-full overflow-hidden">
          <OrderForm onOrderCreated={handleOrderCreated} />
          <div className="flex-1 bg-card border border-slate-800 rounded-xl p-4 overflow-hidden flex flex-col">
            <OrderList 
              activeOrderIds={activeOrderIds} 
              selectedId={selectedId}
              onSelectOrder={setSelectedId}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: DETAILS & VISUALIZATION */}
        <div className="lg:col-span-8 h-full">
          {selectedId ? (
            <OrderDetails orderId={selectedId} />
          ) : (
            <div className="h-full bg-card border border-slate-800 rounded-xl flex flex-col items-center justify-center text-slate-600 p-10 text-center border-dashed">
              <div className="bg-slate-900 p-4 rounded-full mb-4">
                <Activity className="h-8 w-8 opacity-50" />
              </div>
              <h3 className="text-lg font-medium text-slate-400">Ready to Route</h3>
              <p className="text-sm mt-2 max-w-md">
                Submit an order on the left to visualize the DEX routing engine, queue management, and WebSocket status updates in real-time.
              </p>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}

export default App;