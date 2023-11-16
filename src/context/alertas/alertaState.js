import React, { useReducer } from 'react'
import alertaContext from './alertaContext'
import alertaReducer from './alertaReducer'
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types/index"


const AlertaState = (props) => {

    //State inicial
    const stateInicial = {
        alerta: null
    }

    //Dispatch para ejecutar las acciones
    const [ state, dispatch ] = useReducer(alertaReducer, stateInicial)


    //Funciones para el CRUD
    const controlarAlerta = (msj, categoria) => {
        dispatch({
            type: MOSTRAR_ALERTA,
            payload: {
                msj,
                categoria
            }
        })

        setTimeout(() => {
            dispatch({
                type: OCULTAR_ALERTA
            })
        },5000)
    }
 

    return (
        <alertaContext.Provider
            value={{
                //States
                alerta: state.alerta,
                //Funciones
                controlarAlerta
            }}
        >
            {props.children}
        </alertaContext.Provider>
    )
}

export default AlertaState
