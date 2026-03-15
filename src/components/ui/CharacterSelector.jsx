import React from 'react';

/**
 * Componente para la pantalla de inicio y selección de héroes
 * @param {Array} characters - Lista de personajes guardados
 * @param {Function} onSelect - Función para elegir un personaje
 * @param {Function} onCreate - Función para crear uno nuevo
 * @param {Function} onDelete - Función para borrar uno
 */
export default function CharacterSelector({ characters, onSelect, onCreate, onDelete }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-black text-slate-500 uppercase tracking-widest">Mis Perfiles</h2>
        <span className="bg-neutral-800 text-slate-400 text-[10px] px-2 py-1 rounded-md font-mono">
          {characters.length} Ranuras
        </span>
      </div>

      <div className="grid gap-4">
        {characters.map((char, index) => (
          <div key={index} className="flex gap-2 group">
            {/* Tarjeta de Selección */}
            <button 
              onClick={() => onSelect(index)}
              className="flex-1 bg-neutral-900 border border-neutral-800 p-6 rounded-3xl text-left hover:border-amber-500/50 transition-all active:scale-95 shadow-lg"
            >
              <p className="text-2xl font-black italic text-white group-hover:text-amber-500 transition-colors">
                {char.name}
              </p>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-tighter">
                {char.class} • NIVEL {char.level}
              </p>
            </button>

            {/* Botón Borrar */}
            <button 
              onClick={() => onDelete(index)}
              className="bg-red-950/10 text-red-900 hover:text-red-500 hover:bg-red-900/20 px-4 rounded-3xl border border-red-900/10 transition-all"
              title="Borrar personaje"
            >
              🗑️
            </button>
          </div>
        ))}

        {/* Botón de Creación */}
        <button 
          onClick={onCreate}
          className="p-8 border-2 border-dashed border-neutral-800 rounded-3xl text-neutral-600 font-bold hover:border-amber-500/50 hover:text-amber-500 transition-all flex flex-col items-center gap-2"
        >
          <span className="text-2xl">+</span>
          <span className="uppercase text-[10px] tracking-[0.2em]">Nuevo Perfil</span>
        </button>
      </div>
    </div>
  );
}