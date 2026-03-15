import React, { useState, useEffect } from 'react';

// --- IMPORTACIONES DE CONEXIÓN ---
import { db } from './firebaseConfig'; // Traemos la conexión
import { 
  collection, 
  onSnapshot, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc 
} from "firebase/firestore";

// --- IMPORTACIONES DE UI ---
import Login from './components/ui/Login';
import Navbar from './components/ui/Navbar';
import MasterView from './components/ui/master/MasterView';
import CharacterSelector from './components/ui/CharacterSelector';

// --- IMPORTACIONES DE FEATURES ---
import CharacterIdentity from './components/features/profile/CharacterIdentity';
import Notes from './components/features/profile/Notes';
import HealthBar from './components/features/stats/HealthBar';
import AttributeGrid from './components/features/stats/AttributeGrid';


/**
 * APP PRINCIPAL: RICOTA SYSTEM
 */
export default function App() {
  
  // --- 1. ESTADO DE USUARIO Y NAVEGACIÓN ---
  const [currentUser, setCurrentUser] = useState(null); 
  const [activeIndex, setActiveIndex] = useState(null); 
  const [activeTab, setActiveTab] = useState('profile');

  // --- 2. ESTADO DE PERSONAJES (Persistencia en LocalStorage) ---
  const [characters, setCharacters] = useState(() => {
    const saved = localStorage.getItem('ricota_chars');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('ricota_chars', JSON.stringify(characters));
  }, [characters]);

  // --- 3. FUNCIONES DE GESTIÓN ---

  const createNewCharacter = () => {
    const newChar = {
      name: "Nuevo Héroe",
      owner: currentUser,
      level: 1,
      ancestry: "Humano",
      heritage: "Versátil",
      class: "Guerrero",
      background: "",
      imageUrl: "", 
      notes: "",
      hp: { current: 12, max: 12 },
      attributes: { str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10 }
    };
    setCharacters([...characters, newChar]);
    setActiveIndex(characters.length);
  };

  const updateActiveChar = (newData) => {
    const updated = [...characters];
    updated[activeIndex] = { ...updated[activeIndex], ...newData };
    setCharacters(updated);
  };

  const deleteCharacter = (index) => {
    if (window.confirm("¿Eliminar este héroe?")) {
      const updated = characters.filter((_, i) => i !== index);
      setCharacters(updated);
      setActiveIndex(null);
    }
  };

  // --- 4. RENDERIZADO DE VISTAS ---

  const renderView = () => {
    // A. PANTALLA DE ACCESO (LOGIN)
    if (!currentUser) {
      return <Login onLogin={setCurrentUser} />;
    }

    // B. VISTA DEL MASTER (Panel de control de todos los PJs)
    if (currentUser.toLowerCase() === 'master' && activeIndex === null) {
      return (
        <MasterView 
          allCharacters={characters} 
          onSelectCharacter={(index) => setActiveIndex(index)} 
          onLogout={() => setCurrentUser(null)}
        />
      );
    }

    // C. SELECTOR DE PERSONAJE (Filtrado por usuario)
if (activeIndex === null) {
  // 1. Filtramos con seguridad (si char.owner no existe, usamos string vacío)
  const myCharacters = characters.filter(char => 
    (char.owner || "").toLowerCase() === currentUser.toLowerCase()
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-neutral-900/50 p-4 rounded-2xl border border-white/5">
        <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Sesión: {currentUser}</span>
        <button 
          onClick={() => setCurrentUser(null)} 
          className="text-[10px] text-slate-500 underline uppercase italic"
        >
          Cerrar sesión
        </button>
      </div>
      
      <CharacterSelector 
        characters={myCharacters} 
        onSelect={(indexInFiltered) => {
          // Buscamos el personaje exacto en la lista global para abrir su ficha
          const selectedChar = myCharacters[indexInFiltered];
          const realIndex = characters.findIndex(c => c === selectedChar);
          if (realIndex !== -1) setActiveIndex(realIndex);
        }} 
        onCreate={createNewCharacter}
        onDelete={(indexInFiltered) => {
          const selectedChar = myCharacters[indexInFiltered];
          const realIndex = characters.findIndex(c => c === selectedChar);
          if (realIndex !== -1) deleteCharacter(realIndex);
        }}
      />
    </div>
  );
}

    // D. FICHA INDIVIDUAL DEL PERSONAJE
    const char = characters[activeIndex];

    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <button 
              onClick={() => setActiveIndex(null)}
              className="flex items-center gap-2 text-[10px] font-black text-neutral-500 hover:text-amber-500 uppercase tracking-widest transition-colors mb-2"
            >
              <span>⬅</span> Volver al panel
            </button>
            <CharacterIdentity char={char} onUpdate={updateActiveChar} />
            <Notes notes={char.notes} onNotesChange={(val) => updateActiveChar({ notes: val })} />
          </div>
        );

      case 'stats':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <HealthBar 
              current={char.hp.current} 
              max={char.hp.max} 
              onDamage={() => updateActiveChar({ hp: { ...char.hp, current: Math.max(0, char.hp.current - 1) } })}
              onHeal={() => updateActiveChar({ hp: { ...char.hp, current: Math.min(char.hp.max, char.hp.current + 1) } })}
            />
            {/* DefenseGrid eliminado hasta que lo creemos */}
            <AttributeGrid stats={char.attributes} />
          </div>
        );

      default:
        return (
          <div className="text-center py-20 opacity-20 italic">
            Esta sección llegará pronto...
          </div>
        );
    }
  };

  // --- 5. ESTRUCTURA GLOBAL ---
  return (
    <div className="min-h-screen bg-black text-white p-4 pb-36 font-sans">
      
      {/* Logo / Header centrado */}
      <header className="mb-8 flex justify-between items-center max-w-md mx-auto">
        <div>
          <h1 className="text-[10px] font-black tracking-[0.5em] text-neutral-600 uppercase">Project</h1>
          <h2 className="text-xl font-black italic tracking-tighter text-neutral-400">RICOTA</h2>
        </div>
        {currentUser && (
          <div className="bg-neutral-900 px-3 py-1 rounded-full border border-white/5 text-[9px] font-bold text-amber-500/50 uppercase">
            {currentUser}
          </div>
        )}
      </header>

      {/* Área de Contenido Principal */}
      <main className="max-w-md mx-auto w-full">
        {renderView()}
      </main>

      {/* Menú de navegación (Solo dentro de una ficha) */}
      {activeIndex !== null && (
        <div className="fixed bottom-0 left-0 right-0 flex justify-center p-4 pointer-events-none z-50">
          <div className="max-w-md w-full pointer-events-auto">
            <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </div>
      )}
    </div>
  );
}