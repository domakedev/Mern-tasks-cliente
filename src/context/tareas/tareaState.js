import React,{useReducer} from 'react'
import TareaContext from './tareaContext'
import TareaReducer from './tareaReducer'

import {
    AGREGAR_TAREA,
    ELIMINAR_TAREA,
    EDITAR_TAREA,
    ACTUALIZAR_TAREA
} from '../../types/index'

import clienteAxios from '../../config/axios'

const TareaState = props => {

    
    //State inicial
    const initialState = {
        ListaTareasFalsas: [],
        tareaParaEditar: null,
        editarTarea:false
    }

    //Dispatch
    const [state, dispatch] = useReducer(TareaReducer, initialState)

    ////////Funciones

    //Obtener tareas de la base de datos
    const obtenerTareas = async (proyecto) => {
    
        try {
            //console.log("!",proyecto );
            const respuesta =await clienteAxios.get('/api/tareas', {params: {proyecto}})

            //console.log("Respuesta de obtener tareas:",respuesta.data);
            
            dispatch({
                type: "Obtener-Tareas",
                payload: respuesta.data

            })
            
        } catch (error) {
            //console.log(error.response);
        }
    
    }

    //Agregar nueva tarea a la lista de tareas general
    const nuevaTarea = async (tarea) => {
        
        try {
            //console.log("tarea nueva:",tarea);

            const nuevaTareaApi = {
                nombre: tarea.nombre,
                proyecto: tarea.idProyecto
            }

            const respuesta = await clienteAxios.post('/api/tareas', nuevaTareaApi)

            //console.log("Respues de añadir tarea nueva",respuesta.data);

            dispatch({
                type: AGREGAR_TAREA,
                payload: respuesta.data
            })
        } catch (error) {
            //console.log(error);
        }
    }

    //Eliminar Tarea
    const eliminarTarea = async (id, proyecto) => {
        
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}})

            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            //console.log(error);
        }
        
        
    }

    //Cambiar el estado de una tarea por id
    // const cambiarEstadoTarea = tarea => {
    //     dispatch({
    //         type: CAMBIAR_ESTADO_TAREA,
    //         payload: tarea
    //     })
    // }

    //Subir tarea a Editar
    const subirTareaEditar = tarea => {
        dispatch({
            type:EDITAR_TAREA,
            payload: tarea
        })
    }

    //Actualizar Tarea
    const actualizarTarea =async(tarea) => {
        //console.log("tarea desde actualizar tarea", tarea);
        
        try {
            // eslint-disable-next-line no-unused-vars
            const respuesta = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)

            //console.log("Respuesta de tarea actualizada",respuesta.data);

            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: tarea
            })


        } catch (error) {
            //console.log(error);
        }
        
        
    }

    return (
        <TareaContext.Provider
            value={{
                //States
                ListaTareasFalsas: state.ListaTareasFalsas,
                tareaParaEditar: state.tareaParaEditar,
                editarTarea: state.editarTarea,
                //Funciones
                nuevaTarea,
                eliminarTarea,
                //cambiarEstadoTarea,
                subirTareaEditar,
                actualizarTarea,
                obtenerTareas
                
            }}
        >
            {props.children}
        </TareaContext.Provider>
    )
}

export default TareaState