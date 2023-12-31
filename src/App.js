import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import Login from "./components/auth/Login"
import NuevaCuenta from "./components/auth/NuevaCuenta"
import Proyectos from "./components/proyectos/Proyectos"

import ProyectoState from "./context/proyectos/proyectoState"
import TareaState from "./context/tareas/tareaState"
import AlertaState from "./context/alertas/alertaState"
import AuthState from "./context/autenticacion/authState"

import tokenAuth from "./config/tokenAuth"


//Ver si tenemos un token disponible
const tokencito = localStorage.getItem("tokencito")
if (tokencito) {
  tokenAuth(tokencito)
}

function App() {

  console.log(process.env.REACT_APP_BACKEND_URL);
  

  return (
    <AuthState>
      <AlertaState>
        <ProyectoState>
          <TareaState>

            <Router>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <Route exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>

          </TareaState>
        </ProyectoState>
      </AlertaState>
    </AuthState>
  );
}

export default App;
