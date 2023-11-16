import clienteAxios from "./axios";

const tokenAuth = (tokencito) => {
    if (tokencito) {
        clienteAxios.defaults.headers.common['x-auth-token'] = tokencito
    } else {
        delete clienteAxios.defaults.headers.common['x-auth-token']
    }
}

export default tokenAuth


