import React from 'react';

export default function AttributeGrid({ stats }) {
  // Diccionario para traducir las siglas a nombres épicos
  const labelMap = {
    str: "Fuerza",
    dex: "Destreza",
    con: "Constitución",
    int: "Inteligencia",
    wis: "Sabiduría",
    cha: "Carisma"
  };

  return (
    <div className="grid grid-cols-2 gap-4 mb-8">
      {Object.entries(stats).map(([key, value]) => (
        <div key={key} className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl flex justify-between items-center shadow-md">
          <div>
            <p className="text-[10px] uppercase font-black text-amber-500 tracking-widest leading-none mb-1">
              {labelMap[key]}
            </p>
            <p className="text-xs text-slate-500 font-bold uppercase">{key}</p>
          </div>
          <div className="text-3xl font-black text-white">
            {value >= 0 ? `+${value}` : value}
          </div>
        </div>
      ))}
    </div>
  );
}