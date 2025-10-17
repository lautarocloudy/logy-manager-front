import React, {useState, useEffect} from 'react';
import { archivos as api } from '../services/api';
export default function Archivos(){
  const [files,setFiles]=useState([]); const [file,setFile]=useState(null);
  useEffect(()=>load(),[]);
  const load=async()=>{ const r=await api.list(); setFiles(r.data); };
  const submit=async(e)=>{ e.preventDefault(); if(!file) return; const form=new FormData(); form.append('file', file); await api.upload(form); setFile(null); load(); };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Archivos</h2>
      <form onSubmit={submit} className="bg-gray-800 p-4 rounded">
        <input type="file" onChange={e=>setFile(e.target.files[0])} className="mb-3" />
        <div className="text-right"><button className="bg-indigo-600 px-3 py-1 rounded">Subir Archivo</button></div>
      </form>
      <div className="mt-4 bg-gray-800 p-4 rounded">
        <h3 className="font-bold mb-2">Archivos guardados</h3>
        <table className="w-full text-left"><thead><tr><th>Nombre</th><th>Tamaño</th><th>Acción</th></tr></thead>
          <tbody>{files.map(f=><tr key={f._id} className="border-t border-gray-700"><td className="p-2">{f.originalName}</td><td className="p-2">{f.size}</td><td className="p-2"><a className="bg-teal-600 px-2 py-1 rounded" href={f.url} target="_blank">Ver</a></td></tr>)}</tbody>
        </table>
      </div>
    </div>
  );
}
