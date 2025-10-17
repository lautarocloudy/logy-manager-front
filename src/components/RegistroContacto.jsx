import React, {useEffect, useState} from 'react';
import { registro as apiRegistro, clientes as apiClientes } from '../services/api';
export default function RegistroContacto(){
  const [items,setItems]=useState([]); const [clientes,setClientes]=useState([]);
  const [form,setForm]=useState({ clienteId:'', clienteNombre:'', contactoNombre:'', medio:'', detalle:'' });
  useEffect(()=>{ load(); loadClientes(); },[]);
  const load=async()=>{ const r=await apiRegistro.list(); setItems(r.data); };
  const loadClientes=async()=>{ const r=await apiClientes.list(); setClientes(r.data); };
  const submit=async(e)=>{ e.preventDefault(); if(form.clienteId){ const sel=clientes.find(c=>c._id===form.clienteId); form.clienteNombre=sel?.nombre||form.clienteNombre; } await apiRegistro.create(form); setForm({ clienteId:'', clienteNombre:'', contactoNombre:'', medio:'', detalle:'' }); load(); };
  const remove=async(id)=>{ if(window.confirm('Eliminar registro?')){ await apiRegistro.remove(id); load(); } };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Registro de Contactos</h2>
      <form onSubmit={submit} className="bg-gray-800 p-4 rounded grid grid-cols-2 gap-3">
        <select value={form.clienteId} onChange={e=>setForm({...form,clienteId:e.target.value})} className="p-2 bg-gray-700 rounded">
          <option value="">-- Seleccionar cliente --</option>
          {clientes.map(c=><option key={c._id} value={c._id}>{c.nombre}</option>)}
        </select>
        <input placeholder="Nombre de contacto" value={form.contactoNombre} onChange={e=>setForm({...form,contactoNombre:e.target.value})} className="p-2 bg-gray-700 rounded" />
        <input placeholder="Medio (WhatsApp / Mail / Llamada)" value={form.medio} onChange={e=>setForm({...form,medio:e.target.value})} className="p-2 bg-gray-700 rounded" />
        <textarea placeholder="Detalle" value={form.detalle} onChange={e=>setForm({...form,detalle:e.target.value})} className="p-2 bg-gray-700 rounded col-span-2" />
        <div className="col-span-2 text-right"><button className="bg-indigo-600 px-4 py-2 rounded">Agregar Registro</button></div>
      </form>
      <div className="mt-4 bg-gray-800 p-4 rounded">
        <h3 className="font-bold mb-2">Registros</h3>
        <table className="w-full text-left"><thead><tr><th>Fecha</th><th>Cliente</th><th>Contacto</th><th>Medio</th><th>Detalle</th><th></th></tr></thead>
          <tbody>{items.map(it=><tr key={it._id} className="border-t border-gray-700"><td className="p-2">{new Date(it.fecha).toLocaleString()}</td><td className="p-2">{it.clienteNombre}</td><td className="p-2">{it.contactoNombre}</td><td className="p-2">{it.medio}</td><td className="p-2">{it.detalle}</td><td className="p-2 text-right"><button onClick={()=>remove(it._id)} className="bg-red-500 px-2 py-1 rounded text-sm">Eliminar</button></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
