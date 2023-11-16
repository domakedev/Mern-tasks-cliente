import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import AlertaContext from "../../context/alertas/alertaContext";
import authContext from "../../context/autenticacion/authContext";

const Login = (props) => {

    //Config context de auth para traer states y funciones
    const {
        //States
        mensaje,
        autenticado,
        //Funciones
        //registrarUsuario,
        iniciarSesion
    } = useContext(authContext);

    //Config context de Alertas
    const {
        //States
        alerta,
        //Funciones
        controlarAlerta,
    } = useContext(AlertaContext);

    const [ usuario, guardarUsuario ] = useState({
        email: '',
        password: ''
    })

    const {email, password} = usuario

    const onChange = (e) => {
        const value = e.target.value
        const name = e.target.name

        guardarUsuario({
            ...usuario,
            [ name ]: value,
        })
    }

    //Useffect para detectar cambios en los states o componentes
    useEffect(() => {
        if (autenticado) {
          props.history.push('/proyectos')
        }

        if (mensaje) {
          controlarAlerta(mensaje.mensaje, mensaje.categoria)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [mensaje, autenticado, props.history]);

    const enviarUsuario = (e) => {
        e.preventDefault()

        //Comprobar que no esten vacio los datos del usuario
        if (usuario.email.trim() === "" || usuario.password.trim() === "") {
            controlarAlerta("No dejes campos vacios", "alerta-error")
            return
        }

        //Enviar datos a App principal
        iniciarSesion({email, password})

    }

    return (
        <div className="form-usuario">
            {alerta ? (
                <div className={`alerta ${alerta.categoria}`}>{alerta.msj}</div>
              ) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesion</h1>

                <form
                    onSubmit={enviarUsuario}
                >
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu email"
                            value={usuario.email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu password"
                            value={usuario.password}
                            onChange={onChange}
                        />
                    </div>
                    <div className="campo-form">
                        <button
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesión"
                        >Iniciar Sesión</button>
                    </div>

                </form>

                <Link to={"/nueva-cuenta"} className="enlace-cuenta">Crear nueva cuenta</Link>

            </div>
        </div>
    )
}

export default Login
