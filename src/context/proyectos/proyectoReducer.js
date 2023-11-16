/* eslint-disable import/no-anonymous-default-export */
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO
} from "../../types";

//Lo unico que hace el reducer es cambiar el STATE

export default (state, action) => {
  switch (action.type) {
    case FORMULARIO_PROYECTO:
      return {
        ...state,
        formulario: true,
      };

    case OBTENER_PROYECTOS:
      return {
        ...state,
        proyectosFalsos: action.payload,
      };

    case AGREGAR_PROYECTO:
      return {
        ...state,
        proyectosFalsos: [...state.proyectosFalsos, action.payload],
        formulario: false,
        errorFormularioProyecto: false
      };

    case VALIDAR_FORMULARIO:
      return {
        ...state,
        errorFormularioProyecto:true
      };

    case PROYECTO_ACTUAL:
      //console.log(action.payload);
      //console.log(state.proyectosFalsos);
      return {
        ...state,
        proyectoAbierto: state.proyectosFalsos.filter(proyecto => proyecto._id === action.payload)
        
      };

    case ELIMINAR_PROYECTO:
      return {
        ...state,
        proyectosFalsos: state.proyectosFalsos.filter(p => p._id !== action.payload),
        proyectoAbierto: []
        
      };

    default:
      return state;
  }
};
