import React from 'react';
import MasterCard from './MasterCard';

export default function MasterView({ allCharacters, onSelectCharacter, onLogout }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* HEADER DEL MASTER */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex flex-col">
          <h2 className="text-2xl font-black italic text-white tracking-tighter uppercase">Panel DM</h2>
          <p className="text-[10px] text-amber-500 font-black uppercase tracking-[0.3em]">
            {allCharacters.length} Héroes en mesa
          </p>
        </div>
        
        {/* BOTÓN DE SALIR */}
        <button 
          onClick={onLogout}
          className="bg-neutral-900 border border-white/5 px-4 py-2 rounded-xl text-[10px] font-black text-slate-500 hover:text-white hover:border-red-500/50 transition-all uppercase tracking-widest"
        >
          Salir
        </button>
      </div>

      {/* LISTADO DE TARJETAS */}
      <div className="grid gap-4">
        {allCharacters.map((char, index) => (
          <MasterCard 
            key={index} 
            char={char} 
            onOpen={() => onSelectCharacter(index)} 
          />
        ))}
      </div>

      {allCharacters.length === 0 && (
        <div className="text-center p-20 border-2 border-dashed border-neutral-900 rounded-3xl mt-4">
          <p className="text-neutral-700 font-bold text-sm italic italic">No hay personajes creados...</p>
        </div>
      )}
    </div>
  );
}