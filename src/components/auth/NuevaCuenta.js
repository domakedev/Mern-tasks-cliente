import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertaContext";
import authContext from "../../context/autenticacion/authContext";

const NuevaCuenta = (props) => {
  //Config context de auth para traer states y funciones
  const {
    //States
    mensaje,
    autenticado,
    //Funciones
    registrarUsuario,
  } = useContext(authContext);

  //Config context de Alertas
  const {
    //States
    alerta,
    //Funciones
    controlarAlerta,
  } = useContext(AlertaContext);

  const [usuario, guardarUsuario] = useState({
    name: "",
    email: "",
    password1: "",
    password2: "",
  });

  const { name, email, password1, password2 } = usuario;


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


  const onChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    guardarUsuario({
      ...usuario,
      [name]: value,
    });
  };

  const onsubmit = (e) => {
    e.preventDefault();

    //Comprobar que no esten vacio los datos del usuario
    if (
      name.trim() === "" ||
      email.trim() === "" ||
      password1.trim() === "" ||
      password2.trim() === ""
    ) {
      controlarAlerta("No dejes campos vacios", "alerta-error");
      return;
    }

    //Password iguales
    if (password2 !== password1) {
      controlarAlerta("La constraseña debe ser la misma", "alerta-error");
      return;
    }

    //Password minimo de 6 caracteres
    if (password1.length < 6 || password2.length < 6) {
      controlarAlerta(
        "El password debe ser de al menos 6 caracteres",
        "alerta-error"
      );
      return;
    }

    //Enviar datos a App principal, pasarlo al Action!
    registrarUsuario({ nombre: name, email, password: password1 });
  };

  return (
    <div className="form-usuario">
      {alerta ? (
        <div className={`alerta ${alerta.categoria}`}>{alerta.msj}</div>
      ) : null}
      <div className="contenedor-form sombra-dark">
        <h1>Crear Cuenta</h1>

        <form onSubmit={onsubmit}>
          <div className="campo-form">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Tu nombre completo"
              value={usuario.name}
              onChange={onChange}
            />
          </div>
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
            <label htmlFor="password1">Password</label>
            <input
              type="password"
              id="password1"
              name="password1"
              placeholder="Tu password"
              value={usuario.password1}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <label htmlFor="password2">Password</label>
            <input
              type="password"
              id="password2"
              name="password2"
              placeholder="Tu password nuevamente"
              value={usuario.password2}
              onChange={onChange}
            />
          </div>
          <div className="campo-form">
            <button type="submit" className="btn btn-primario btn-block">
              Crear Cuenta
            </button>
          </div>
        </form>

        <Link to={"/"} className="enlace-cuenta">
          Iniciar Sesión
        </Link>
      </div>
    </div>
  );
};

export default NuevaCuenta;
