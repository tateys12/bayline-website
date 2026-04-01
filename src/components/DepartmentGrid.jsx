// src/components/DepartmentGrid.jsx
import { Shield, Heart, Zap } from 'lucide-react';

const departments = [
  { name: 'State Patrol', icon: <Shield />, color: 'blue', slug: 'fhp' },
  { name: 'Medical Services', icon: <Heart />, color: 'red', slug: 'safr' },
  { name: 'Dispatch Center', icon: <Zap />, color: 'yellow', slug: 'comms' },
];

export default function DepartmentGrid() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <h2 className="text-xs font-bold tracking-[0.4em] uppercase text-gray-500 mb-12 text-center">
        Available Career Paths
      </h2>
      <div className="grid md:grid-cols-3 gap-px bg-white/5 border border-white/5">
        {departments.map((dept) => (
          <div key={dept.name} className="bg-bayline-black p-12 hover:bg-white/[0.02] transition-all group cursor-pointer">
            <div className="mb-8 text-gray-600 group-hover:text-white transition-colors">
              {dept.icon}
            </div>
            <h3 className="text-lg font-black tracking-tighter uppercase mb-4">{dept.name}</h3>
            <p className="text-gray-500 text-sm mb-8">Currently accepting applications for highly motivated individuals.</p>
            <button className="text-[10px] font-bold tracking-widest uppercase border-b border-white/20 pb-1 hover:border-white transition-all">
              View Requirements
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}