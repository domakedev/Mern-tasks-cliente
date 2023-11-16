import React, { useState, useContext, useEffect } from "react";
import tareaContext from "../../context/tareas/tareaContext";
import proyectoContext from "../../context/proyectos/proyectoContext";

import { v4 as uuidv4 } from "uuid";

const FormTarea = () => {

    //Configurar context de tarea
    const tareaContexto = useContext(tareaContext);
    const {
        //Estados
        tareaParaEditar,
        editarTarea,
        //Funciones
        nuevaTarea,
        actualizarTarea
    } = tareaContexto;

    //Configurar context de proyecto
    const proyectoContexto = useContext(proyectoContext);
    const { proyectoAbierto } = proyectoContexto;



    const [nuevaTareaComponent, setNuevaTareaComponent] = useState({
        nombre: "",
        estado: false,
        idProyecto: "",
        id: ""
    });


    const onChange = (e) => {
        if (proyectoAbierto.length > 0) {
            setNuevaTareaComponent({
                ...nuevaTareaComponent,
                [e.target.name]: e.target.value,
                idProyecto: proyectoAbierto[0]._id
            });
        }
    };


    //Cargar tarea subida a form si editarTarea es true
    useEffect(() => {
        if (editarTarea) {
            setNuevaTareaComponent({
                ...tareaParaEditar
            })
        }
    }, [editarTarea, tareaParaEditar]);



    const agregarNuevaTarea = (e) => {
        e.preventDefault();

        //Validar tarea
        if (nuevaTareaComponent.nombre.trim() === "") {
            return;
        }


        //console.log(editarTarea, "editarTarea");

        //Tarea nueva o actualizar tarea vieja
        if (editarTarea === true) {
            //Actualizar tareaa
            //console.log("aquui?");
            actualizarTarea(nuevaTareaComponent)

            //Limpiar form
            setNuevaTareaComponent({
                nombre: "",
                estado: false,
                idProyecto: "",
                id: ""
            });

        }

        if (editarTarea === false) {
            //Nueva tarea
            //Agregar id uuid            
            //console.log("antes", nuevaTareaComponent);

            setNuevaTareaComponent({
                ...nuevaTareaComponent,
                id: uuidv4()
            });
        }
    };

    useEffect(() => {
        if (!editarTarea && 
            nuevaTareaComponent.id !== "" && 
            nuevaTareaComponent.id !== null) {

            nuevaTarea(nuevaTareaComponent);

            //Limpiar form
            setNuevaTareaComponent({
                nombre: "",
                estado: false,
                idProyecto: "",
                id: ""
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nuevaTareaComponent])



    return (
        <div className="formulario">
            <form
                onSubmit={agregarNuevaTarea}
            >

                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        name="nombre"
                        onChange={onChange}
                        value={nuevaTareaComponent.nombre}
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={editarTarea ? "Guardar Edicion" : "Añadir tarea nueva"}
                    />
                </div>
            </form>
        </div>
    );
};

export default FormTarea;
