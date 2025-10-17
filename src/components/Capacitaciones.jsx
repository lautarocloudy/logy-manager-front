import React, {useEffect, useState} from 'react';
import { cursos as api } from '../services/api';
export default function Capacitaciones(){
  const [cursosList,setCursos]=useState([]); const [alumnos,setAlumnos]=useState([]);
  const [cursoForm,setCursoForm]=useState({titulo:'', indice:'', horas:0, precio:0});
  const [inscForm,setInscForm]=useState({ nombre:'', tipoCliente:'Influencer', cursoId:'', precio:0, pagado:false });
  useEffect(()=>{ load(); },[]);
  const load=async()=>{ const r=await api.list(); setCursos(r.data); const a=await api.alumnos.list(); setAlumnos(a.data); };
  const addCurso=async(e)=>{ e.preventDefault(); await api.create(cursoForm); setCursoForm({titulo:'',indice:'',horas:0,precio:0}); load(); };
  const inscribir=async(e)=>{ e.preventDefault(); const curso = cursosList.find(c=>c._id===inscForm.cursoId); await api.alumnos.create({...inscForm, cursoTitulo:curso?.titulo, precio: curso?.precio || inscForm.precio}); setInscForm({nombre:'',tipoCliente:'Influencer',cursoId:'',precio:0}); load(); };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Capacitaciones</h2>
      <div className="grid grid-cols-2 gap-4">
        <form onSubmit={addCurso} className="bg-gray-800 p-4 rounded">
          <h3 className="font-bold mb-2">Agregar Curso</h3>
          <input placeholder="Título" value={cursoForm.titulo} onChange={e=>setCursoForm({...cursoForm,titulo:e.target.value})} className="p-2 bg-gray-700 rounded w-full mb-2" />
          <textarea placeholder="Índice" value={cursoForm.indice} onChange={e=>setCursoForm({...cursoForm,indice:e.target.value})} className="p-2 bg-gray-700 rounded w-full mb-2" />
          <input type="number" placeholder="Horas" value={cursoForm.horas} onChange={e=>setCursoForm({...cursoForm,horas:e.target.value})} className="p-2 bg-gray-700 rounded w-full mb-2" />
          <input type="number" placeholder="Precio" value={cursoForm.precio} onChange={e=>setCursoForm({...cursoForm,precio:e.target.value})} className="p-2 bg-gray-700 rounded w-full mb-2" />
          <button className="bg-indigo-600 px-3 py-1 rounded">Agregar Curso</button>
        </form>
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="font-bold mb-2">Cursos</h3>
          <table className="w-full text-left"><thead><tr><th>Curso</th><th>Horas</th><th>Precio</th></tr></thead>
            <tbody>{cursosList.map(c=><tr key={c._id} className="border-t border-gray-700"><td className="p-2">{c.titulo}</td><td className="p-2">{c.horas}</td><td className="p-2">{c.precio}</td></tr>)}</tbody>
          </table>
        </div>
        <form onSubmit={inscribir} className="bg-gray-800 p-4 rounded">
          <h3 className="font-bold mb-2">Inscribir Alumno</h3>
          <input placeholder="Nombre" value={inscForm.nombre} onChange={e=>setInscForm({...inscForm,nombre:e.target.value})} className="p-2 bg-gray-700 rounded w-full mb-2" />
          <select value={inscForm.cursoId} onChange={e=>setInscForm({...inscForm,cursoId:e.target.value})} className="p-2 bg-gray-700 rounded w-full mb-2"><option value="">-- Seleccionar curso --</option>{cursosList.map(c=><option key={c._id} value={c._id}>{c.titulo}</option>)}</select>
          <div className="text-right"><button className="bg-indigo-600 px-3 py-1 rounded">Inscribir</button></div>
        </form>
        <div className="bg-gray-800 p-4 rounded">
          <h3 className="font-bold mb-2">Inscriptos</h3>
          <table className="w-full text-left"><thead><tr><th>Alumno</th><th>Curso</th><th>Pago</th></tr></thead>
            <tbody>{alumnos.map(a=><tr key={a._id} className="border-t border-gray-700"><td className="p-2">{a.nombre}</td><td className="p-2">{a.cursoTitulo}</td><td className="p-2">{a.pagado?'Pagado':'Impago'}</td></tr>)}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
