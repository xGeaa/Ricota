import React from 'react';

export default function Navbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'stats', label: 'Acción', icon: '⚔️' },   // Vida, Atributos, Skills
    { id: 'feats', label: 'Senda', icon: '📜' },    // Ancestros, Dotes
    { id: 'inv', label: 'Bolsa', icon: '🎒' },      // Armas, Hechizos, Equipo
    { id: 'profile', label: 'Héroe', icon: '👤' },  // Nombre, Clase, Notas
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-neutral-900/80 backdrop-blur-xl border-t border-white/5 pb-8 pt-3 px-6 flex justify-between items-center z-50">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`flex flex-col items-center gap-1 transition-all duration-300 ${
            activeTab === tab.id ? 'text-amber-500 scale-110' : 'text-slate-500 opacity-60'
          }`}
        >
          <span className="text-2xl">{tab.icon}</span>
          <span className="text-[10px] font-black uppercase tracking-tighter">
            {tab.label}
          </span>
          {/* Indicador visual de pestaña activa */}
          <div className={`h-1 rounded-full bg-amber-500 transition-all duration-300 ${
            activeTab === tab.id ? 'w-4 mt-1' : 'w-0 mt-1'
          }`} />
        </button>
      ))}
    </nav>
  );
}