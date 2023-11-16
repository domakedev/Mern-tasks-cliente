import React, { useContext } from "react";

//Importo contexto de tareas
import tareaContext from "../../context/tareas/tareaContext";

//Importar el context de proyectos
import proyectoContext from '../../context/proyectos/proyectoContext'


const TareaEnLista = ({ tarea }) => {

  //Config context de proyectos
  const proyectosContext = useContext(proyectoContext)
  const { proyectoAbierto } = proyectosContext


  //Config context de tareas
  const tareasContext = useContext(tareaContext);
  const {
    eliminarTarea,
    actualizarTarea,
    subirTareaEditar,
  } = tareasContext;



  //Camiabr estado de tarea
  const toggleEstadoTarea = (tarea) => {
    //console.log(tarea.estado);
    tarea.estado = !tarea.estado;
    //console.log(tarea.estado);

    actualizarTarea(tarea);
  };

  

  //Subir tarea a Editar
  const onClickEditar = () => {
    subirTareaEditar(tarea)
  };



  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>




      <div className="estado">
        <button
          type="button"
          className={tarea.estado ? "completo" : "incompleto"}
          onClick={() => toggleEstadoTarea(tarea)}
        >
          {tarea.estado ? "Completo" : "Incompleto"}
        </button>
      </div>





      <div className="acciones">
        <button
          type="button"
          className="btn btn-primario"
          onClick={onClickEditar}
        >
          Editar
        </button>

        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => { eliminarTarea(tarea._id, proyectoAbierto[ 0 ]._id) }}
        >
          Eliminar
        </button>
      </div>



    </li>
  );
};

export default TareaEnLista;
