import React from 'react';

// Recibimos 'notes' (el texto) y 'onNotesChange' (la función para cambiarlo)
export default function Notes({ notes, onNotesChange }) {
  return (
    <div className="bg-neutral-900/50 border border-neutral-800 rounded-3xl p-5 shadow-inner">
      <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3 italic">
        Diario de Campaña
      </h3>
      
      <textarea
        // 1. Aquí "leemos" lo que hay en el estado del personaje
        value={notes} 
        
        // 2. Aquí "escribimos". 'e.target.value' es lo que acabas de teclear
        onChange={(e) => onNotesChange(e.target.value)} 
        
        placeholder="Escribe aquí tus notas..."
        className="w-full h-40 bg-transparent text-slate-300 text-sm leading-relaxed resize-none focus:outline-none"
      />
    </div>
  );
}