document.querySelector('#icono_perfil').addEventListener('click',()=>{
    if(document.querySelector('.barra_navegacion_desplegable').getAttribute('hidden')===''){
        document.querySelector('.barra_navegacion_desplegable').removeAttribute('hidden')
       
    }else{
        document.querySelector('.barra_navegacion_desplegable').setAttribute('hidden','')
    }
})