import React,{useContext} from 'react'

//Importar el context general
import proyectoContext from '../../context/proyectos/proyectoContext'

//Importo contexto de tareas
import tareaContext from '../../context/tareas/tareaContext'



const ProyectoEnLista = ({proyecto}) => {

    //Config context de tareas
    const tareasContext = useContext(tareaContext)
    const { obtenerTareas } = tareasContext



    //Obtener State del Formulario, en () le decimos que context queremos usar
    const proyectosContext = useContext(proyectoContext)
    const { mostrarProyectoAbierto } = proyectosContext


    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => {
                    mostrarProyectoAbierto(proyecto["_id"])

                    obtenerTareas(proyecto["_id"])
                }}
            >
                {proyecto.nombre}
            </button>  
        </li>
    )
}

export default ProyectoEnLista
