import React, { useState } from 'react';

function Login({ onLogin }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) onLogin(name.trim());
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center">
      <h1 className="text-3xl font-black mb-6 text-white tracking-tighter italic">RICOTA</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-xs space-y-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Tu nombre o 'Master'"
          className="w-full bg-neutral-900 border border-neutral-800 p-4 rounded-2xl text-white outline-none focus:border-amber-500"
        />
        <button type="submit" className="w-full bg-white text-black font-black py-4 rounded-2xl uppercase text-xs tracking-widest">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login; // <-- Ponlo así, separado al final del archivo