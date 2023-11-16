import React, { Fragment, useContext } from 'react'
import TareaEnLista from './TareaEnLista'

//Animaciones y CSS
import { CSSTransition, TransitionGroup } from 'react-transition-group'


//Importar el context de proyectos
import proyectoContext from '../../context/proyectos/proyectoContext'

//Importo contexto de tareas
import tareaContext from '../../context/tareas/tareaContext'


//Muestra la lista de tareas por proyecto unico
const ListadoTareas = () => {

    //Config context de proyectos
    const proyectosContext = useContext(proyectoContext)
    const { proyectoAbierto, eliminarProyecto } = proyectosContext

    //Config context de tareas
    const tareasContext = useContext(tareaContext)
    const { ListaTareasFalsas } = tareasContext


    return (
        <Fragment>

            {(proyectoAbierto.length > 0) ?
                <Fragment>
                    <h2>Proyecto: {proyectoAbierto[ 0 ].nombre}</h2>

                    <ul className="listado-tareas">
                        {(ListaTareasFalsas.length < 1) ?
                            (<li>No hay tareas</li>)

                            :

                            <TransitionGroup>
                                {ListaTareasFalsas.map(tarea => (
                                    <CSSTransition
                                        key={tarea._id}
                                        timeout={200}
                                        classNames="tarea"
                                    >
                                        <TareaEnLista
                                            tarea={tarea}
                                        />
                                    </CSSTransition>
                                ))}
                            </TransitionGroup>
                        }
                    </ul>

                    <button
                        type="button"
                        className="btn btn-eliminar"
                        onClick={() => eliminarProyecto(proyectoAbierto[ 0 ]._id)}
                    >Eliminar Proyecto &times;</button>
                </Fragment>
                :
                <h2>Selecciona un proyecto</h2>
            }




        </Fragment>
    )
}

export default ListadoTareas
