import axios from 'axios';

const tareaApi = axios.create({
    baseURL: 'http://localhost:8000/tareas/api/v1/tareas/',
})

const auth = axios.create({
    baseURL: 'http://localhost:8000/',
})

const recursosApi = axios.create({
    baseURL: 'http://localhost:8000/recursos',
})

export const getTodasTareas = () => {
    return tareaApi.get('/')
}

export const getTarea = (id) => {
    return tareaApi.get(`/${id}/`)  
}

export const crearTarea = (tarea) => {
    return tareaApi.post('/', tarea)    
}

export const eliminarTarea = (id) => {
    return tareaApi.delete(`/${id}`)    
}

export const actualizarTarea = (id, tarea) => {
    return tareaApi.put(`/${id}/`, tarea)    
}

export const getRecursos = () => {
    return recursosApi.get('')
}

export const register = (usuario) => {
    return auth.post('register', usuario)
}

export const login = (usuario) => {
    return auth.post('access', usuario)
}

export const logout = (refresh) => {
    return auth.post('logout', refresh)
}