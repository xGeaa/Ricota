import React from 'react';

// Recibe: isOpen (si se muestra), currentUrl (la foto actual), 
// onChange (función para escribir) y onClose (función para cerrar)
export default function AvatarModal({ isOpen, currentUrl, onChange, onClose }) {
  
  // 1. Renderizado Condicional: Si 'isOpen' es falso, no pintamos NADA.
  if (!isOpen) return null;

  return (
    // 2. El 'Backdrop' (fondo oscuro): Cubre toda la pantalla.
    // Al hacer click en el fondo (fixed inset-0), cerramos el modal.
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
      
      {/* 3. La Ventana del Modal */}
      {/* Detenemos la propagación del click (stopPropagation) para que al tocar 
          DENTRO de la ventana no se cierre el modal por culpa del backdrop. */}
      <div 
        className="bg-neutral-900 border border-white/5 w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-in slide-in-from-bottom-4 duration-300"
        onClick={(e) => e.stopPropagation()} 
      >
        {/* Cabecera */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-black text-white uppercase tracking-widest">
            Actualizar Retrato
          </h3>
          <button onClick={onClose} className="text-neutral-500 hover:text-white text-xl">
            x
          </button>
        </div>

        {/* Previsualización de la imagen */}
        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 rounded-full bg-neutral-800 border-2 border-dashed border-neutral-700 overflow-hidden flex items-center justify-center">
            {currentUrl ? (
              <img src={currentUrl} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <span className="text-4xl opacity-20">👤</span>
            )}
          </div>
        </div>

        {/* Input de la URL */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-amber-500 uppercase tracking-widest ml-1">
            Enlace de la imagen (URL)
          </label>
          <input
            type="text"
            value={currentUrl || ''}
            /* 4. Cuando el usuario escribe, 'onChange' avisa al padre (CharacterIdentity) */
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://..."
            className="w-full bg-black border border-neutral-800 rounded-xl p-3 text-xs text-slate-300 focus:border-amber-500/50 outline-none font-mono"
          />
        </div>

        {/* Botón de Confirmar */}
        <button 
          onClick={onClose}
          className="w-full mt-6 bg-amber-500 text-black font-black py-3 rounded-xl uppercase text-xs tracking-widest hover:bg-amber-400 active:scale-95 transition-all"
        >
          Listo
        </button>
      </div>
    </div>
  );
}