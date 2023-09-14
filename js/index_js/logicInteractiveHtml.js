const limpiarCamposLoguin = () => {
    document.getElementById("login-username-input").value = "";
    document.getElementById("login-password-input").value = "";
};


const limpiarFormInfouser = () => {
    document.getElementById("infoUsuario-pais-input").value = "";
    document.getElementById("infoUsuario-ciudad-input").value = "";
};

const limpiarFormRegistro = () => {
    document.getElementById("registro-nombres-input").value = "";
    document.getElementById("registro-apellidos-input").value = "";
    document.getElementById("registro-usuario-input").value = "";
    document.getElementById("registro-correo-input").value = "";
    document.getElementById("registro-contraseña-input").value = "";
    document.getElementById("registro-contraseña-input-2").value = "";
};

const mostrar_formulario_Registro = () => {
    if (document.getElementById("formulario_ingreso").style.display != "none") {
        document.getElementById("formulario_ingreso").style.display = "none";
        document.getElementById("formulario_registro").style.display = "flex";
    } else {
        document.getElementById("formulario_registro").style.display = "none";
        document.getElementById("formulario_ingreso").style.display = "flex";
    }
};


const show_error = (message, type) => {
    const container = document.getElementById("contenedor_error")
    container.innerHTML =
        `<h4 id="message_err">${message}</h4>`;

    const element = document.getElementById(`login-${type}-input`)
    element.style = " border: 1px solid #ff0033;";
    element.addEventListener('click', () => {
        element.style = " border: 1px solid #212121;"
        container.innerHTML = ``;
        element.removeEventListener('click')
    })
}