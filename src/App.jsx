import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Clientes from './components/Clientes';
import Stock from './components/Stock';
import Comunicaciones from './components/Comunicaciones';
import Contratos from './components/Contratos';
import Capacitaciones from './components/Capacitaciones';
import RegistroContacto from './components/RegistroContacto';
import Credenciales from './components/Credenciales';
import Archivos from './components/Archivos';

export default function App(){
  const [view, setView] = useState('clientes');
  return (
    <div className="min-h-screen flex">
      <Sidebar setView={setView} view={view} />
      <main className="flex-1 p-8 overflow-auto">
        {view==='clientes' && <Clientes />}
        {view==='stock' && <Stock />}
        {view==='comunicaciones' && <Comunicaciones />}
        {view==='contratos' && <Contratos />}
        {view==='capacitaciones' && <Capacitaciones />}
                {view==='registro' && <RegistroContacto />}
                {view==='credenciales' && <Credenciales />}
        {view==='archivos' && <Archivos />}
      </main>
    </div>
  );
}
