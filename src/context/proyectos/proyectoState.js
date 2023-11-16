import React, { useReducer } from "react";

//Creamos context
import proyectoContext from "./proyectoContext";

//Creamos reducer
import proyectoReducer from "./proyectoReducer";

//Importamos los types, como el archivo se llama index.js se lo trae por defecto
import {
  FORMULARIO_PROYECTO,
  OBTENER_PROYECTOS,
  AGREGAR_PROYECTO,
  VALIDAR_FORMULARIO,
  PROYECTO_ACTUAL,
  ELIMINAR_PROYECTO,
} from "../../types";

//Importamos el cliente de Axios
import clienteAxios from "../../config/axios"

//State inicial de la administracion del proyecto, creacion, eliminacion, etc.
const ProyectoState = (props) => {

  // const proyectosFalsos = [
  //   { id: 1, name: "Tigod Home" },
  //   { id: 2, name: "Experience" },
  //   { id: 3, name: "Youtube Bot" },
  // ];

  const initialState = {
    proyectosFalsos: [],
    formulario: false,
    errorFormularioProyecto: false,
    proyectoAbierto: [],
  };

  //console.log(initialState.proyectosFalsos.length);

  //Distpatch para ejecutar las acciones
  const [ state, dispatch ] = useReducer(proyectoReducer, initialState);

  //Serie de funciones para el CRUD

  //Mostrar formulario
  const mostrarFormulario = () => {
    dispatch({
      type: FORMULARIO_PROYECTO,
    });
  };

  //Obtener los proyectos
  const obtenerProyectos = async() => {
    try {
      const respuestaProyectos = await clienteAxios.get('/api/proyectos')
      //console.log("respuestaProyectos:::",respuestaProyectos);

      dispatch({
        type: OBTENER_PROYECTOS,
        payload: respuestaProyectos.data,
      });

    } catch (error) {
      //console.log(error);
      
    }
   
  };

  //Agregar nuevo proyecto
  const agregarProyecto = async (nuevoProyecto) => {
    //nuevoProyecto.id = uuidv4();

    try {
      const respuesta = await clienteAxios.post('/api/proyectos', nuevoProyecto)
      //console.log(respuesta);

      // const proyectoRespuesta = {
      //   id: respuesta.data[ "_id" ],
      //   nombre: respuesta.data[ "nombre" ],
      //   fechaCreacion: respuesta.data[ "fechaCreacion" ],
      //   creador: respuesta.data[ "creador" ]
      // }

      dispatch({
        type: AGREGAR_PROYECTO,
        payload: respuesta.data,
      });

    } catch (error) {
      //console.log(error.response);
    }


  };

  //Modificar si hay error en form de proyecto
  const errorEnFormProyecto = () => {
    dispatch({
      type: VALIDAR_FORMULARIO,
    });
  };

  //Definir el proyecto Actual segun el click donde se haga
  const mostrarProyectoAbierto = (id) => {
    dispatch({
      type: PROYECTO_ACTUAL,
      payload: id,
    });
  };

  //Eliminar Proyecto de Proyectos
  const eliminarProyecto = async (proyectoId) => {
    try {

      // eslint-disable-next-line no-unused-vars
      const respuesta =  await clienteAxios.delete(`/api/proyectos/${proyectoId}`)
      //console.log("respuesta::::",respuesta.data.message);
      dispatch({
        type: ELIMINAR_PROYECTO,
        payload: proyectoId,
      });
    } catch (error) {
      
    }
    
  };

  return (
    //El proyectoContext.Provider enviara los datos a sus hijos cuando sea invocado.
    <proyectoContext.Provider
      //Este value es un objeto y le vamos a pasar el state inicial
      value={{
        //States
        proyectosFalsos: state.proyectosFalsos,
        formulario: state.formulario,
        errorFormularioProyecto: state.errorFormularioProyecto,
        proyectoAbierto: state.proyectoAbierto,
        //Funciones
        mostrarProyectoAbierto,
        errorEnFormProyecto,
        mostrarFormulario,
        obtenerProyectos,
        agregarProyecto,
        eliminarProyecto,
      }}
    >
      {props.children}
    </proyectoContext.Provider>
  );
};

export default ProyectoState;
