import React from 'react';
export default function Sidebar({setView, view}){
  const items = [
    ['clientes','Alta de Clientes'],
    ['contratos','Seguimiento Contratos'],
    ['comunicaciones','Comunicaciones'],
    ['stock','Manejo de Stock'],
    ['capacitaciones','Capacitaciones'],
            ['registro','Registro Contacto'],
            // ['credenciales','Credenciales'],
  ];
  return (
    <aside className="w-64 bg-gray-800 p-6 text-gray-200">
      <h1 className="text-xl font-bold mb-6">LOGY MANAGER</h1>
      <nav className="flex flex-col gap-2">
        {items.map(([id,label])=>(
          <button key={id} onClick={()=>setView(id)} className={'text-left px-3 py-2 rounded '+(view===id?'bg-indigo-600':'hover:bg-indigo-500')}>
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
