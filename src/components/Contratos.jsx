import React, {useState, useEffect} from 'react';
import { contratos as api, clientes as apiClientes } from '../services/api';
export default function Contratos(){
  const [list,setList]=useState([]); const [clientes,setClientes]=useState([]);
  const [form,setForm]=useState({ clienteId:'', clienteNombre:'', representanteAgencia:'', tipoCliente:'Influencer', tipoAcuerdo:'Monetario', inversion:0, anticipo:0, cuotasCantidad:0, cuotaMonto:0, bonificacion:0, comision:0, tribunales:'', auditoria:'', fechaInicio:'', fechaVencimiento:'' });
  useEffect(()=>{ load(); loadClientes(); },[]);
  const load=async()=>{ const r=await api.list(); setList(r.data); };
  const loadClientes=async()=>{ const r=await apiClientes.list(); setClientes(r.data); };
  const submit=async(e)=>{ e.preventDefault(); // compute total
    const subtotal = (Number(form.cuotasCantidad)||0)*(Number(form.cuotaMonto)||0);
    const total = subtotal - (Number(form.bonificacion)||0) + (Number(form.inversion)||0);
    await api.create({...form, clienteNombre: clientes.find(c=>c._id===form.clienteId)?.nombre || form.clienteNombre, total});
    load();
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Generador de Contratos</h2>
      <form onSubmit={submit} className="bg-gray-800 p-6 rounded grid grid-cols-2 gap-3">
        <select value={form.clienteId} onChange={e=>setForm({...form,clienteId:e.target.value})} className="p-2 bg-gray-700 rounded"><option value="">-- Seleccionar cliente --</option>{clientes.map(c=><option key={c._id} value={c._id}>{c.nombre}</option>)}</select>
        <input value={form.representanteAgencia} onChange={e=>setForm({...form,representanteAgencia:e.target.value})} placeholder="Representante Agencia" className="p-2 bg-gray-700 rounded" />
        <select value={form.tipoCliente} onChange={e=>setForm({...form,tipoCliente:e.target.value})} className="p-2 bg-gray-700 rounded"><option>Influencer</option><option>Creador de Contenido</option></select>
        <select value={form.tipoAcuerdo} onChange={e=>setForm({...form,tipoAcuerdo:e.target.value})} className="p-2 bg-gray-700 rounded"><option>Monetario</option><option>Canje</option></select>
        <input type="number" value={form.inversion} onChange={e=>setForm({...form,inversion:e.target.value})} placeholder="Inversión" className="p-2 bg-gray-700 rounded" />
        <input type="number" value={form.anticipo} onChange={e=>setForm({...form,anticipo:e.target.value})} placeholder="Anticipo" className="p-2 bg-gray-700 rounded" />
        <input type="number" value={form.cuotasCantidad} onChange={e=>setForm({...form,cuotasCantidad:e.target.value})} placeholder="Cantidad de Cuotas" className="p-2 bg-gray-700 rounded" />
        <input type="number" value={form.cuotaMonto} onChange={e=>setForm({...form,cuotaMonto:e.target.value})} placeholder="Monto de la Cuota" className="p-2 bg-gray-700 rounded" />
        <input type="number" value={form.bonificacion} onChange={e=>setForm({...form,bonificacion:e.target.value})} placeholder="Bonificación" className="p-2 bg-gray-700 rounded" />
        <input type="number" value={form.comision} onChange={e=>setForm({...form,comision:e.target.value})} placeholder="Comisión (%)" className="p-2 bg-gray-700 rounded" />
        <input type="text" value={form.tribunales} onChange={e=>setForm({...form,tribunales:e.target.value})} placeholder="Tribunales" className="p-2 bg-gray-700 rounded" />
        <input type="text" value={form.auditoria} onChange={e=>setForm({...form,auditoria:e.target.value})} placeholder="Auditoría" className="p-2 bg-gray-700 rounded" />
        <input type="date" value={form.fechaInicio} onChange={e=>setForm({...form,fechaInicio:e.target.value})} className="p-2 bg-gray-700 rounded" />
        <input type="date" value={form.fechaVencimiento} onChange={e=>setForm({...form,fechaVencimiento:e.target.value})} className="p-2 bg-gray-700 rounded" />
        <div className="col-span-2 text-right"><button className="bg-indigo-600 px-4 py-2 rounded">Generar Borrador</button></div>
      </form>
      <div className="mt-4 bg-gray-800 p-4 rounded">
        <h3 className="font-bold mb-2">Contratos Generados</h3>
        <table className="w-full text-left"><thead><tr><th>Cliente</th><th>Tipo</th><th>Total</th><th>Vencimiento</th></tr></thead>
          <tbody>{list.map(it=><tr key={it._id} className="border-t border-gray-700"><td className="p-2">{it.clienteNombre}</td><td className="p-2">{it.tipoAcuerdo}</td><td className="p-2">{it.total}</td><td className="p-2">{it.fechaVencimiento? new Date(it.fechaVencimiento).toLocaleDateString():''}</td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
