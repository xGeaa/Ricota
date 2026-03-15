import React from 'react';

export default function HealthBar({ current, max, onDamage, onHeal }) {
  const percentage = (current / max) * 100;

  // Forzamos a Tailwind a leer estas clases escribiéndolas completas aquí
  const colors = {
    healthy: 'bg-emerald-500',
    wounded: 'bg-amber-500',
    critical: 'bg-red-600 animate-pulse'
  };

  // Determinamos qué llave usar
  let status = 'healthy';
  if (percentage <= 25) status = 'critical';
  else if (percentage <= 50) status = 'wounded';

  return (
    <section className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 shadow-2xl mb-6">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">
            Puntos de Golpe
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-5xl font-black text-white tracking-tighter">
              {current}
            </span>
            <span className="text-xl text-slate-600 font-bold">/ {max}</span>
          </div>
        </div>
        
        <div className="flex gap-3">
          <button onClick={onDamage} className="w-14 h-14 rounded-2xl bg-neutral-800 border-b-4 border-neutral-950 flex items-center justify-center text-2xl active:border-b-0 active:translate-y-1 transition-all shadow-lg text-red-500">
            ➖
          </button>
          <button onClick={onHeal} className="w-14 h-14 rounded-2xl bg-neutral-800 border-b-4 border-neutral-950 flex items-center justify-center text-2xl active:border-b-0 active:translate-y-1 transition-all shadow-lg text-emerald-500">
            ➕
          </button>
        </div>
      </div>

      <div className="w-full bg-black h-5 rounded-full p-1 border border-neutral-800 shadow-inner overflow-hidden">
        {/* LA BARRA: Aquí aplicamos el color mapeado */}
        <div 
          style={{ width: `${Math.max(0, Math.min(100, percentage))}%` }}
          className={`h-full rounded-full transition-all duration-700 ease-out ${colors[status]}`}
        >
          <div className="w-full h-full bg-white opacity-20 blur-[1px] rounded-full"></div>
        </div>
      </div>

      <div className="flex justify-between mt-3 px-1">
         <span className={`text-[10px] font-bold uppercase tracking-widest ${status === 'critical' ? 'text-red-500' : 'text-slate-600'}`}>
           {status === 'critical' ? '¡Estado Crítico!' : 'Condición Estable'}
         </span>
         <span className="text-[10px] font-mono text-slate-600">{Math.round(percentage)}%</span>
      </div>
    </section>
  );
}