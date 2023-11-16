import React, { useContext, useEffect } from 'react'
import SideBar from '../layout/SideBar'
import Barra from '../layout/Barra'
import FormTarea from '../tareas/FormTarea'
import ListadoTareas from '../tareas/ListadoTareas'

//Importar Context
import authContext from '../../context/autenticacion/authContext'

//Importar el context de proyectos
import proyectoContext from '../../context/proyectos/proyectoContext'


const Proyectos = () => {

    console.log("Desde proyectos F5");
    //Obtener State del Formulario, en () le decimos que context queremos usar
    const { proyectoAbierto } = useContext(proyectoContext)

    //Obtener contexzt de autenticacion
    const { usuarioAutenticado, autenticado } = useContext(authContext)

    useEffect(() => {
        usuarioAutenticado()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    if (autenticado !== true) {
        return (
            <a href="/"><button
            className="btn btn-primario btn-margin"
            >Vuelve a iniciar sesion</button></a>
        )
    }

    return (
        <div className="contenedor-app">

            <SideBar />

            <div className="seccion-principal">
                <Barra />

                <main>

                    {(proyectoAbierto.length > 0) ?
                        <FormTarea />
                        :
                        null
                    }

                    <div className="contenedor-tareas">
                        <ListadoTareas />
                    </div>

                </main>
            </div>

        </div>
    )
}

export default Proyectos
