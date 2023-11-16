import React,{useContext, useEffect} from 'react'
import ProyectoEnLista from './ProyectoEnLista'

import proyectoContext from "../../context/proyectos/proyectoContext"

const ListadoProyectos = () => {

    //Importamos(arriba) y creamos el context aqui
    const proyectosContext = useContext(proyectoContext)
    const {proyectosFalsos, obtenerProyectos} = proyectosContext

    useEffect(() => {
        //Se ejecuta 1 vez mientras carga el resto
        //Dandole a proyectos el valor de null o undefined
        obtenerProyectos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    //Revisar si proyectos tiene contenido
    if (proyectosFalsos.length===0) return <p>No hay proyecto, comienza creando uno</p>



    return (
        <ul className="listado-proyectos">
            {proyectosFalsos.map(proyecto => (
                <ProyectoEnLista
                    key={proyecto["_id"]}
                    proyecto={proyecto}
                />
            ))}
        </ul>
    )
}

export default ListadoProyectos
