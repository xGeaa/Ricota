import React from 'react';

export default function MasterCard({ char, onOpen }) {
  // Calculamos el porcentaje de vida para la barrita visual
  const healthPercent = (char.hp.current / char.hp.max) * 100;

  return (
    <button 
      onClick={onOpen}
      className="w-full bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden hover:border-amber-500/50 transition-all group active:scale-95 text-left"
    >
      <div className="flex items-center gap-4 p-4">
        {/* Avatar del Personaje */}
        <div className="w-16 h-16 rounded-2xl bg-neutral-800 overflow-hidden border border-white/5 flex-shrink-0">
          {/* LÓGICA DIDÁCTICA: */}
          {char.imageUrl ? (
            /* Si 'imageUrl' tiene contenido, mostramos la etiqueta <img> */
            <img 
              src={char.imageUrl} 
              alt={char.name} 
              className="w-full h-full object-cover shadow-inner" 
              /* Control de errores: Si el link es malo y la imagen no carga, podemos poner un fallback */
              onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Error'; }}
            />
          ) : (
            /* Si 'imageUrl' está vacío, mostramos el emoji por defecto */
            <div className="w-full h-full flex items-center justify-center text-2xl grayscale opacity-30">
              👤
            </div>
          )}
        </div>

        {/* Info Básica */}
        <div className="flex-1 min-w-0">
          <h4 className="text-white font-black italic truncate uppercase tracking-tighter">
            {char.name}
          </h4>
          <p className="text-[9px] text-amber-500 font-black uppercase tracking-widest truncate">
            {char.class} • NIVEL {char.level}
          </p>
          
          {/* Mini Barra de Vida */}
          <div className="mt-2 w-full h-1.5 bg-black rounded-full overflow-hidden border border-white/5">
            <div 
              className={`h-full transition-all duration-500 ${healthPercent < 30 ? 'bg-red-500' : 'bg-emerald-500'}`}
              style={{ width: `${healthPercent}%` }}
            />
          </div>
        </div>

        <div className="text-xs text-neutral-600 font-black pr-2">
          {char.hp.current}/{char.hp.max}
        </div>
      </div>
    </button>
  );
}