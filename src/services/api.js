import axios from 'axios';
const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api' });
export const clientes = { list: () => API.get('/clientes'), create: (d)=>API.post('/clientes', d), update:(id,d)=>API.put(`/clientes/${id}`, d), remove:(id)=>API.delete(`/clientes/${id}`) };
export const stock = { list: ()=>API.get('/stock'), create:(d)=>API.post('/stock', d), remove:(id)=>API.delete(`/stock/${id}`) };
export const comunicaciones = { list: ()=>API.get('/comunicaciones'), create:(d)=>API.post('/comunicaciones', d) };
export const contratos = { list: ()=>API.get('/contratos'), create:(d)=>API.post('/contratos', d) };
export const cursos = { list: ()=>API.get('/cursos'), create:(d)=>API.post('/cursos', d), alumnos:{ list: ()=>API.get('/cursos/alumnos'), create:(d)=>API.post('/cursos/alumnos', d) } };
export const archivos = { list: ()=>API.get('/archivos'), upload: (form)=> API.post('/archivos/upload', form, { headers:{'Content-Type':'multipart/form-data'} }) };

export const registro = { list: ()=> API.get('/registro'), create:(d)=>API.post('/registro', d), remove:(id)=>API.delete(`/registro/${id}`) };
export const credenciales = { list: ()=> API.get('/credenciales'), create: (d)=>API.post('/credenciales', d) };
