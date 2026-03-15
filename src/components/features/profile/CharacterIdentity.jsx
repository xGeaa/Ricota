import React, { useState } from 'react'; // 1. Importamos useState
import AvatarModal from './AvatarModal'; // 2. Importamos el nuevo Modal

export default function CharacterIdentity({ char, onUpdate }) {
  
  // 3. ESTADO LOCAL DEL MODAL: ¿Está abierto? (Empieza en false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Función auxiliar para los inputs (lo mismo de antes)
  const renderInput = (label, value, field) => (
    <div className="flex flex-col gap-1">
      <label className="text-[10px] font-black text-neutral-500 uppercase tracking-widest ml-1">
        {label}
      </label>
      <input
        type="text"
        value={value || ''}
        onChange={(e) => onUpdate({ [field]: e.target.value })}
        className="bg-neutral-900 border border-white/5 rounded-xl p-3 text-sm text-white outline-none focus:border-amber-500/50 transition-all"
      />
    </div>
  );

  return (
    <div className="space-y-6">
      
      {/* SECCIÓN CABECERA */}
      <div className="flex gap-4 items-end">
        
        {/* 4. EL AVATAR INTERACTIVO */}
        {/* Convertimos el div en un <button> para que sea clicable y accesible */}
        <button 
          type="button"
          /* 5. Al hacer click, abrimos el modal */
          onClick={() => setIsModalOpen(true)}
          className="w-24 h-24 rounded-3xl bg-neutral-900 border-2 border-dashed border-neutral-800 overflow-hidden flex-shrink-0 flex items-center justify-center relative group hover:border-amber-500/50 transition-colors"
        >
          {char.imageUrl ? (
            <img src={char.imageUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <span className="text-3xl grayscale opacity-20 group-hover:opacity-50 transition-opacity">👤</span>
          )}
          
          {/* Un pequeño indicador visual de "editar" que sale al pasar el ratón */}
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Editar</span>
          </div>
        </button>

        {/* Resto de datos (nombre, nivel...) */}
        <div className="flex-1 space-y-2">
          {renderInput("Nombre del Héroe", char.name, "name")}
          <div className="grid grid-cols-2 gap-2">
            {renderInput("Nivel", char.level, "level")}
            {renderInput("Clase", char.class, "class")}
          </div>
        </div>
      </div>

      {/* Eliminamos el bloque viejo de "Enlace de Imagen (URL)" que teníamos antes */}

      {/* DETALLES (Ancestría, etc.) */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
        {renderInput("Ancestría", char.ancestry, "ancestry")}
        {renderInput("Herencia", char.heritage, "heritage")}
        <div className="col-span-2">
          {renderInput("Trasfondo", char.background, "background")}
        </div>
      </div>

      {/* 6. INTEGRACIÓN DEL MODAL */}
      {/* Lo ponemos al final del archivo. Le pasamos el estado y las funciones necesarias. */}
      <AvatarModal 
        isOpen={isModalOpen} 
        currentUrl={char.imageUrl} 
        /* Cuando el usuario escribe en el modal, actualizamos el personaje principal */
        onChange={(newUrl) => onUpdate({ imageUrl: newUrl })} 
        /* Cuando el usuario cierra el modal, ponemos el estado a false */
        onClose={() => setIsModalOpen(false)} 
      />

    </div>
  );
}