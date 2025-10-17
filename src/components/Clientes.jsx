import React, { useEffect, useState } from 'react';
import { clientes as api } from '../services/api';
export default function Clientes(){
  const [list, setList] = useState([]);
  const [form, setForm] = useState({ nombre:'', tipo_cliente:'Creador Digital', contacto:'', email:'', telefono:'', redes:'', tema:'', actividad_economica:'', notas:'' });
  useEffect(()=>{ load(); },[]);
  const load = async ()=>{ const res = await api.list(); setList(res.data); };
  const submit = async (e)=>{ e.preventDefault(); await api.create(form); setForm({...form, nombre:''}); load(); };
  const remove = async (id)=>{ await api.remove(id); load(); };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Gestión de Clientes</h2>
      <form onSubmit={submit} className="grid grid-cols-2 gap-4 bg-gray-800 p-6 rounded">
        <input required value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})} placeholder="Nombre / Razón Social" className="p-2 bg-gray-700 rounded" />
        <select value={form.tipo_cliente} onChange={e=>setForm({...form,tipo_cliente:e.target.value})} className="p-2 bg-gray-700 rounded">
          <option>Creador Digital</option><option>Franquicia</option><option>Influencer</option><option>Otro</option>
        </select>
        <input value={form.contacto} onChange={e=>setForm({...form,contacto:e.target.value})} placeholder="Contacto" className="p-2 bg-gray-700 rounded" />
        <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="Email" className="p-2 bg-gray-700 rounded" />
        <input value={form.telefono} onChange={e=>setForm({...form,telefono:e.target.value})} placeholder="Teléfono" className="p-2 bg-gray-700 rounded" />
        <input value={form.redes} onChange={e=>setForm({...form,redes:e.target.value})} placeholder="Redes / Website" className="p-2 bg-gray-700 rounded" />
        <input value={form.tema} onChange={e=>setForm({...form,tema:e.target.value})} placeholder="Tema" className="p-2 bg-gray-700 rounded" />
        <input value={form.actividad_economica} onChange={e=>setForm({...form,actividad_economica:e.target.value})} placeholder="Actividad Económica" className="p-2 bg-gray-700 rounded" />
        <textarea value={form.notas} onChange={e=>setForm({...form,notas:e.target.value})} placeholder="Notas" className="p-2 bg-gray-700 rounded col-span-2"></textarea>
        <div className="col-span-2 text-right">
          <button className="bg-indigo-600 px-4 py-2 rounded">Agregar Cliente</button>
        </div>
      </form>
      <div className="mt-6 bg-gray-800 p-4 rounded">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold">Clientes</h3>
          <div className="flex gap-2">
            <button onClick={()=>{
              // export csv
              const csv = ['Nombre,Tipo,Email,Teléfono', ...list.map(i=>`${i.nombre},${i.tipo_cliente},${i.email || ''},${i.telefono || ''}`)].join('\n');
              const blob = new Blob([csv], {type:'text/csv'});
              const url = URL.createObjectURL(blob);
              const a=document.createElement('a'); a.href=url; a.download='clientes.csv'; a.click();
              URL.revokeObjectURL(url);
            }} className="bg-green-600 px-3 py-1 rounded">Exportar CSV</button>
            <button onClick={()=>{
              // basic pdf via jsPDF + text
              const doc = new window.jspdf.jsPDF();
              doc.setFontSize(12);
              let y=10;
              doc.text('Clientes', 10, y); y+=8;
              list.forEach((c,i)=>{ doc.text(`${i+1}. ${c.nombre} - ${c.tipo_cliente} - ${c.email || ''}`, 10, y); y+=6; if(y>280){ doc.addPage(); y=10;} });
              doc.save('clientes.pdf');
            }} className="bg-red-600 px-3 py-1 rounded">Exportar PDF</button>
          </div>
        </div>
        <table className="w-full text-left">
          <thead><tr><th>Nombre</th><th>Tipo</th><th>Email</th><th>Tel</th><th></th></tr></thead>
          <tbody>
            {list.map(c=>(
              <tr key={c._id} className="border-t border-gray-700">
                <td className="p-2">{c.nombre}</td>
                <td className="p-2">{c.tipo_cliente}</td>
                <td className="p-2">{c.email}</td>
                <td className="p-2">{c.telefono}</td>
                <td className="p-2 text-right">
                  <button onClick={()=>removeConfirm(c._id)} className="bg-red-500 px-2 py-1 rounded text-sm">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  function removeConfirm(id){ if(window.confirm('Eliminar?')) api.remove(id).then(()=>load()); }
}
