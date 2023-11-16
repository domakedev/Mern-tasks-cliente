import React,{Fragment, useState, useContext} from 'react'

//Importar el context general
import proyectoContext from '../../context/proyectos/proyectoContext'

const NuevoProyecto = () => {

    //Obtener State del Formulario, en () le decimos que context queremos usar
    const proyectosContext = useContext(proyectoContext)
    const {
        formulario, 
        errorFormularioProyecto,
        mostrarFormulario,
        agregarProyecto,
        errorEnFormProyecto
    } = proyectosContext

    const [proyecto, setProyecto] = useState({
        name: ''
    })

    //Leer y guardar valores del form
    const onChange = e => {
        const name = e.target.name
        const value = e.target.value

        setProyecto({
            ...proyecto,
            [name]: value
        })

    }

    //Validar datos del nuevo proyecto y enviarlo al state principal
    const enviarNuevoProyecto = e => {
        e.preventDefault()

        //Validar que los datos sean correctos
        if (proyecto.name.trim()==="") {
            errorEnFormProyecto()
            return
        }

        //Enviar al State Principal
        agregarProyecto({nombre: proyecto.name})

        //Limpiar formulario
        setProyecto({
            name: ''
        })
    }

    const formNuevoProyecto = (
        <form
                className="formulario-nuevo-proyecto"
                onSubmit={enviarNuevoProyecto}
            >
                <input 
                    type="text"
                    className="input-text"
                    placeholder="Nombre proyecto"
                    name="name"
                    onChange={onChange}
                    value={proyecto.name}
                />

                <input 
                    type="submit"
                    className="btn btn-primario btn-block"
                    value="Agregar Proyecto"
                />

            </form>
    )

    const onClickFormulario = () => {
        mostrarFormulario()
    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={onClickFormulario}
            >
                Nuevo Proyecto
            </button>

            {formulario? formNuevoProyecto : null}

            {errorFormularioProyecto? <p className="mensaje error">Completa el nombre del proyecto</p>:null}
        </Fragment>
    )
}

export default NuevoProyecto
