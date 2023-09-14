const activateLoader = () => {
    const loader = document.querySelector('.container-loader ')
    const contenedor_imagenes = document.querySelector('.contenedor-imagenes')
    const contenedor_forms = document.querySelector('.contenedor_ingresar')
    loader.setAttribute('style', 'display:block;')
    if (contenedor_forms && contenedor_imagenes) {
        contenedor_imagenes.setAttribute('class', 'contenedor-imagenes blur-loader')
        contenedor_forms.setAttribute('class', 'contenedor_ingresar blur-loader')
    } else {
        const contenedor_galeria_perfil = document.getElementById('contenedor_galeria_perfil')
        contenedor_galeria_perfil.setAttribute('class', 'contenedor_galeria_perfil blur-loader')
    }

}

const desactivateLoader = () => {
    const loader = document.querySelector('.container-loader ')
    const contenedor_imagenes = document.querySelector('.contenedor-imagenes')
    const contenedor_forms = document.querySelector('.contenedor_ingresar')
    loader.setAttribute('style', 'display:none;')
    if (contenedor_forms && contenedor_imagenes) {
        contenedor_imagenes.setAttribute('class', 'contenedor-imagenes')
        contenedor_forms.setAttribute('class', 'contenedor_ingresar')
    } else {
        const contenedor_galeria_perfil = document.getElementById('contenedor_galeria_perfil')
        contenedor_galeria_perfil.setAttribute('class', 'contenedor_galeria_perfil')
    }
}
