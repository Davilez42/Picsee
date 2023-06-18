const mostrar_formulario_Registro=()=>{
    if(document.getElementById('formulario_ingreso').getAttribute('hidden')==null){
        document.getElementById('formulario_ingreso').setAttribute('hidden','') 
        document.getElementById('formulario_registro').removeAttribute('hidden')
    }else{
        document.getElementById('formulario_registro').setAttribute('hidden','') 
        document.getElementById('formulario_ingreso').removeAttribute('hidden')
    }

    
}