/* eslint-disable import/no-anonymous-default-export */
import {
  AGREGAR_TAREA,
  ELIMINAR_TAREA,
  CAMBIAR_ESTADO_TAREA,
  EDITAR_TAREA,
  ACTUALIZAR_TAREA
} from '../../types/index'

export default (state, action) => {
  switch (action.type) {
    case AGREGAR_TAREA:
      return {
        ...state,
        ListaTareasFalsas: [...state.ListaTareasFalsas,action.payload],
      };

    case ELIMINAR_TAREA:
      return {
        ...state,
        ListaTareasFalsas: state.ListaTareasFalsas.filter(
          (tarea) => tarea._id !== action.payload
        ),
      };    

      ////////////////////////
    case CAMBIAR_ESTADO_TAREA:
      return {
        ...state,
        ListaTareasFalsas: state.ListaTareasFalsas.map(t=>t.id===action.payload.id?action.payload:t)
      };

    case EDITAR_TAREA:
      return {
        ...state,
        tareaParaEditar: action.payload,
        editarTarea: true
      };


      ////////////////////////
    case ACTUALIZAR_TAREA:
      return {
        ...state,
        tareaParaEditar: null,
        editarTarea: false,
        ListaTareasFalsas: state.ListaTareasFalsas.map(t=>t._id===action.payload._id?action.payload:t)
      };

    case "Obtener-Tareas":
      return {
        ...state,
        ListaTareasFalsas: action.payload
      };

    default:
      return state;
  }
};
