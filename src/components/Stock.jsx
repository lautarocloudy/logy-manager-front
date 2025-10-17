import React, {useEffect, useState} from 'react';
import { stock as apiStock, clientes as apiClientes } from '../services/api';
export default function Stock(){
  const [items,setItems]=useState([]);
  const [clientes,setClientes]=useState([]);
  const [form,setForm]=useState({ clienteId:'', clienteNombre:'', clienteEmail:'', destinatarioTipo:'Influencer', destinatarioNombre:'', destinatarioEmail:'', producto:'', cantidad:1, tipoMovimiento:'Venta' });
  useEffect(()=>{ load(); loadClientes(); },[]);
  const load = async ()=>{ const r=await apiStock.list(); setItems(r.data); };
  const loadClientes = async ()=>{ const r=await apiClientes.list(); setClientes(r.data); };
  const submit = async (e)=>{ e.preventDefault(); if(form.clienteId){ const sel = clientes.find(c=>c._id===form.clienteId); form.clienteNombre=sel?.nombre||form.clienteNombre; form.clienteEmail=sel?.email||form.clienteEmail; } await apiStock.create(form); setForm({...form,producto:''}); load(); };
  const exportCSV = ()=>{ const csv = ['Producto,Cantidad,Tipo,Cliente,Destinatario', ...items.map(i=>`${i.producto},${i.cantidad},${i.tipoMovimiento},${i.clienteNombre||''},${i.destinatarioNombre||''}`)].join('\n'); downloadCSV(csv,'stock.csv'); };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Control de Stock</h2>
      <form onSubmit={submit} className="bg-gray-800 p-6 rounded grid grid-cols-2 gap-3">
        <select value={form.clienteId} onChange={e=>setForm({...form,clienteId:e.target.value})} className="p-2 bg-gray-700 rounded">
          <option value="">-- Seleccionar cliente --</option>
          {clientes.map(c=><option key={c._id} value={c._id}>{c.nombre}</option>)}
        </select>
        <input placeholder="Mail del cliente" value={form.clienteEmail} onChange={e=>setForm({...form,clienteEmail:e.target.value})} className="p-2 bg-gray-700 rounded" />
        <select value={form.destinatarioTipo} onChange={e=>setForm({...form,destinatarioTipo:e.target.value})} className="p-2 bg-gray-700 rounded">
          <option>Influencer</option><option>Creador Digital</option><option>Franquiciante</option><option>Franquiciado</option><option>Otro</option>
        </select>
        <input placeholder="Nombre destinatario" value={form.destinatarioNombre} onChange={e=>setForm({...form,destinatarioNombre:e.target.value})} className="p-2 bg-gray-700 rounded" />
        <input placeholder="Email destinatario" value={form.destinatarioEmail} onChange={e=>setForm({...form,destinatarioEmail:e.target.value})} className="p-2 bg-gray-700 rounded" />
        <input placeholder="Producto" value={form.producto} onChange={e=>setForm({...form,producto:e.target.value})} className="p-2 bg-gray-700 rounded" />
        <input type="number" min="1" value={form.cantidad} onChange={e=>setForm({...form,cantidad:Number(e.target.value)})} className="p-2 bg-gray-700 rounded" />
        <select value={form.tipoMovimiento} onChange={e=>setForm({...form,tipoMovimiento:e.target.value})} className="p-2 bg-gray-700 rounded col-span-2">
          <option>Venta</option><option>Canje</option><option>Promoción</option>
        </select>
        <div className="col-span-2 text-right">
          <button className="bg-indigo-600 px-4 py-2 rounded">Agregar al Stock</button>
        </div>
      </form>
      <div className="mt-4 bg-gray-800 p-4 rounded">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold">Stock</h3>
          <div className="flex gap-2">
            <button onClick={exportCSV} className="bg-green-600 px-3 py-1 rounded">Exportar CSV</button>
            <button onClick={()=>{
              const doc = new window.jspdf.jsPDF();
              let y=10; doc.text('Stock',10,y); y+=8; items.forEach((it,i)=>{ doc.text(`${i+1}. ${it.producto} - ${it.cantidad} - ${it.tipoMovimiento}`,10,y); y+=6; if(y>280){doc.addPage();y=10;} }); doc.save('stock.pdf');
            }} className="bg-red-600 px-3 py-1 rounded">Exportar PDF</button>
          </div>
        </div>
        <table className="w-full text-left">
          <thead><tr><th>Producto</th><th>Cantidad</th><th>Tipo</th><th>Cliente</th><th>Destinatario</th></tr></thead>
          <tbody>
            {items.map(it=>(
              <tr key={it._id} className="border-t border-gray-700">
                <td className="p-2">{it.producto}</td>
                <td className="p-2">{it.cantidad}</td>
                <td className="p-2">{it.tipoMovimiento}</td>
                <td className="p-2">{it.clienteNombre}</td>
                <td className="p-2">{it.destinatarioNombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  function downloadCSV(csv, filename){
    const blob = new Blob([csv], {type:'text/csv'});
    const url = URL.createObjectURL(blob);
    const a=document.createElement('a'); a.href=url; a.download=filename; a.click(); URL.revokeObjectURL(url);
  }
}
