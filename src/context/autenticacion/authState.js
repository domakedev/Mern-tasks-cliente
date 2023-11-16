import React, { useReducer } from 'react'
import authContext from './authContext'
import authReducer from './authReducer'
import {
    REGISTRO_EXITOSO,
    REGISTRO_ERROR,
    OBTENER_USUARIO,
    LOGIN_EXITOSO,
    LOGIN_ERROR,
    CERRAR_SESION
} from "../../types/index"
//Importar Axios Cliente creado
import clienteAxios from '../../config/axios'
//Importar funcion que configura el header y pone el tokencito
import tokenAuth from '../../config/tokenAuth'



const AuthState = (props) => {


    //State inicial
    const stateInicial = {
        token: localStorage.getItem('token'),
        autenticado: null,
        usuario: null,
        mensaje: null,
        cargando: true
    }


    //Dispatch
    const [ state, dispatch ] = useReducer(authReducer, stateInicial)

    //Funciones

    const registrarUsuario = async data => {
        try {
            //console.log("Holis");
            const respuesta = await clienteAxios.post('/api/usuarios', data)

            //console.log("Usuario creado",respuesta);

            dispatch({
                type: REGISTRO_EXITOSO,
                payload: respuesta.data
            })

            //Obtener el usuario recien creado, dando el tokencito
            usuarioAutenticado()


        } catch (error) {
            console.log("Error:::::", error.response);
            const alerta = {
                mensaje: error.response,
                categoria: "alerta-error"
            }
            dispatch({
                type: REGISTRO_ERROR,
                payload: alerta
            })
        }
    }

    const usuarioAutenticado = async () => {
        const tokencito = localStorage.getItem('tokencito')

        if (tokencito) {
            //Funcion para enviar el token por header
             tokenAuth(tokencito)
        }

        try {
            const respuesta = await clienteAxios.get('/api/auth')
            //console.log("Respuesta de Get AUTH :)",respuesta);

            dispatch({
                type: OBTENER_USUARIO,
                payload: respuesta.data.usuario
            })
        } catch (error) {
            //console.log(error.response);
            dispatch({
                type: LOGIN_ERROR,
            })
        }

    }

    const iniciarSesion = async (datos) => {
        
        try {
            const respuesta = await clienteAxios.post('/api/auth', datos)
            //console.log("Respuesta de iniciar Sesion", respuesta)
            dispatch({
                type: LOGIN_EXITOSO,
                payload: respuesta.data               
            })

           usuarioAutenticado()

            
        } catch (error) {
            const error2 = error.response?error.response.data.message:null
            //console.log("Error al iniciar sesion:",error2?error2:"Hay un error al tratar de iniciar sesion" );
            const alerta = {
                mensaje: error2?error2:"Hay un error al tratar de iniciar sesion",
                categoria: "alerta-error"
            }
            dispatch({
                type: LOGIN_ERROR,
                payload: alerta
            })
        }
    }

    //Cierra la sesion del usuario
    const cerrarSesion = () => {
        dispatch({
            type: CERRAR_SESION
        })
    }


    return (
        <authContext.Provider
            value={{
                //States
                token: state.token,
                autenticado: state.autenticado,
                usuario: state.usuario,
                mensaje: state.mensaje,
                cargando: state.cargando,
                //Funciones
                registrarUsuario,
                iniciarSesion,
                usuarioAutenticado,
                cerrarSesion
            }}
        >
            {props.children}
        </authContext.Provider>
    )
}

export default AuthState