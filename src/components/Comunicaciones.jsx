import React, {useEffect, useState} from 'react';
import { comunicaciones as api } from '../services/api';
export default function Comunicaciones(){
  const [list,setList]=useState([]);
  const [form,setForm]=useState({ tipo:'Creador Digital', destinatario:'', emailArchivo:'', detalle:'', fecha: new Date().toISOString().slice(0,10) });
  useEffect(()=>load(),[]);
  const load=async()=>{ const r=await api.list(); setList(r.data); };
  const submit=async(e)=>{ e.preventDefault(); await api.create(form); setForm({...form,detalle:''}); load(); };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Comunicaciones</h2>
      <form onSubmit={submit} className="bg-gray-800 p-6 rounded grid grid-cols-2 gap-3">
        <select value={form.tipo} onChange={e=>setForm({...form,tipo:e.target.value})} className="p-2 bg-gray-700 rounded">
          <option>Creador Digital</option><option>Influencer</option><option>Franquiciado</option><option>Otro</option>
        </select>
        <input placeholder="Destinatario (nombre)" value={form.destinatario} onChange={e=>setForm({...form,destinatario:e.target.value})} className="p-2 bg-gray-700 rounded" />
        <input placeholder="Email donde se archiva" value={form.emailArchivo} onChange={e=>setForm({...form,emailArchivo:e.target.value})} className="p-2 bg-gray-700 rounded" />
        <input type="date" value={form.fecha} onChange={e=>setForm({...form,fecha:e.target.value})} className="p-2 bg-gray-700 rounded" />
        <textarea value={form.detalle} onChange={e=>setForm({...form,detalle:e.target.value})} className="p-2 bg-gray-700 rounded col-span-2" placeholder="Detalle"></textarea>
        <div className="col-span-2 text-right">
          <button className="bg-indigo-600 px-4 py-2 rounded">Registrar Comunicación</button>
        </div>
      </form>
      <div className="mt-4 bg-gray-800 p-4 rounded">
        <div className="flex justify-end gap-2 mb-3">
          <button onClick={()=>{
            const csv = ['Fecha,Tipo,Destinatario,Mail,Detalle', ...list.map(l=>`${new Date(l.fecha).toLocaleDateString()},${l.tipo},${l.destinatario},${l.emailArchivo},${(l.detalle||'').replace(/\n/g,' ')}`)].join('\n');
            const blob = new Blob([csv], {type:'text/csv'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='comunicaciones.csv'; a.click(); URL.revokeObjectURL(url);
          }} className="bg-green-600 px-3 py-1 rounded">Exportar CSV</button>
          <button onClick={()=>{
            const doc = new window.jspdf.jsPDF(); let y=10; doc.text('Comunicaciones',10,y); y+=8; list.forEach((c,i)=>{ doc.text(`${i+1}. ${new Date(c.fecha).toLocaleDateString()} - ${c.destinatario} - ${c.tipo}`,10,y); y+=6; if(y>280){doc.addPage(); y=10;} }); doc.save('comunicaciones.pdf');
          }} className="bg-red-600 px-3 py-1 rounded">Exportar PDF</button>
        </div>
        <table className="w-full text-left">
          <thead><tr><th>Fecha</th><th>Tipo</th><th>Destinatario</th><th>Mail</th><th>Detalle</th></tr></thead>
          <tbody>{list.map(it=>(
            <tr key={it._id} className="border-t border-gray-700"><td className="p-2">{new Date(it.fecha).toLocaleDateString()}</td><td className="p-2">{it.tipo}</td><td className="p-2">{it.destinatario}</td><td className="p-2">{it.emailArchivo}</td><td className="p-2">{it.detalle}</td></tr>
          ))}</tbody>
        </table>
      </div>
    </div>
  );
}
