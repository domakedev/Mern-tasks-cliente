/* eslint-disable import/no-anonymous-default-export */
//Importamos types
import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../../types/index"

//Lo unico que hace el reducer es cambiar el  segun la funcion que se le pase

export default (state, action) => {
    switch (action.type) {
        case MOSTRAR_ALERTA:
            return {
                //No hay copia de state porque solo tendremos alerta
                alerta: action.payload
            }

        case OCULTAR_ALERTA:
            return {
                alerta: null
            }

        default:
            return 
            

    }
}

