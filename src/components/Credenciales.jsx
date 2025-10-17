import React, {useEffect, useState} from 'react';
import { credenciales as apiCred, clientes as apiClientes } from '../services/api';
export default function Credenciales(){
  const [list,setList]=useState([]); const [clientes,setClientes]=useState([]);
  const [form,setForm]=useState({ denominacion:'', tipoCliente:'Influencer', vencimiento:'' });
  useEffect(()=>{ load(); loadClientes(); },[]);
  const load=async()=>{ const r=await apiCred.list(); setList(r.data); };
  const loadClientes=async()=>{ const r=await apiClientes.list(); setClientes(r.data); };
  const submit=async(e)=>{ e.preventDefault(); await apiCred.create(form); setForm({ denominacion:'', tipoCliente:'Influencer', vencimiento:'' }); load(); };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Generador de Credenciales</h2>
      <form onSubmit={submit} className="bg-gray-800 p-4 rounded grid grid-cols-2 gap-3">
        <input placeholder="Denominación" value={form.denominacion} onChange={e=>setForm({...form,denominacion:e.target.value})} className="p-2 bg-gray-700 rounded" required />
        <select value={form.tipoCliente} onChange={e=>setForm({...form,tipoCliente:e.target.value})} className="p-2 bg-gray-700 rounded">
          <option>Influencer</option><option>Creador de Contenido</option><option>Franquicia</option><option>Staff</option><option>Otro</option>
        </select>
        <input type="date" value={form.vencimiento} onChange={e=>setForm({...form,vencimiento:e.target.value})} className="p-2 bg-gray-700 rounded" />
        <div className="col-span-2 text-right"><button className="bg-indigo-600 px-4 py-2 rounded">Generar Credencial</button></div>
      </form>
      <div className="mt-4 bg-gray-800 p-4 rounded">
        <h3 className="font-bold mb-2">Credenciales Generadas</h3>
        <table className="w-full text-left"><thead><tr><th>Denominación</th><th>Tipo</th><th>Vencimiento</th></tr></thead>
          <tbody>{list.map(c=><tr key={c._id} className="border-t border-gray-700"><td className="p-2">{c.denominacion}</td><td className="p-2">{c.tipoCliente}</td><td className="p-2">{c.vencimiento? new Date(c.vencimiento).toLocaleDateString():''}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
