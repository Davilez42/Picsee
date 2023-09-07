document.querySelector("#btn_cerrarSesion").addEventListener("click", () => {
    sessionStorage.removeItem("loggedUser");
    window.location.href = "/";
});

document.querySelector("#btn_eliminarCuenta").addEventListener("click", async () => {
    const user = JSON.parse(sessionStorage.getItem("loggedUser"));
    if (user != undefined) {
        const resp = await fetch(
            `https://picmont-inc.onrender.com/api/v1/delete_user?id_user=${user.id_user}`,
            {
                method: "DELETE",
                mode: "cors",
                headers: { auth: user.token },
            }
        );
        if (resp.ok) {
            sessionStorage.removeItem("loggedUser");
            window.location.href = "/";
        } else {
            const mensaje = await resp.json();
            alert(mensaje.messageError);
        }
    } else {
        alert("NO SEAS MAMON BORRANDO CUENTAAS AJENAS :D");
    }
});


document.querySelector("#btn_subirMomento").addEventListener("click", () => {
    document.getElementById("contenedor_galeria_perfil").style.display = "none";
    document.getElementById("contenedor_etiquetas_hastags").style.display =
        "none";
    document.getElementById("contenedor_subirmomento").style =
        "display:relative";
    document
        .querySelector(".barra_navegacion_desplegable")
        .setAttribute("hidden", "");
});


document.querySelector("#icono_perfil").addEventListener("click", () => {
    if (
        document
            .querySelector(".barra_navegacion_desplegable")
            .getAttribute("hidden") === ""
    ) {
        document
            .querySelector(".barra_navegacion_desplegable")
            .removeAttribute("hidden");
    } else {
        document
            .querySelector(".barra_navegacion_desplegable")
            .setAttribute("hidden", "");
    }
});