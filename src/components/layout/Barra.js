import React, { useContext } from 'react'
import authContext from '../../context/autenticacion/authContext'


const Barra = () => {

    //Crear contexto de auth
    const { usuario, cerrarSesion } = useContext(authContext)

    //Detectar cambios en el usuario
    // useEffect(() => {

    //     if (usuario) {

    //     }

    // }, [usuario])


    return (
        <div>
            <header className="app-header">
                <p className="nombre-usuario">Hola 
                    <span> {usuario ? usuario.nombre : null}</span>
                </p>

                <nav className="nav-principal">
                    <button
                        className="btn btn-blank cerrar-sesion"
                        onClick={()=>cerrarSesion()}
                    >Cerrar Sesión</button>
                </nav>
            </header>
        </div>
    )
}

export default Barra
