

document.querySelector("#btn_subirMomento").addEventListener('click',()=>{
document.getElementById("contenedor_galeria_perfil").style.display = "none";
document.getElementById("contenedor_etiquetas_hastags").style.display = "none";
document.getElementById("contenedor_subirmomento").style= "display:relative";
})

const uploadFile = async event => {
    const archivo =  event.target.files;
     const ar = archivo[0]
    if (!["image/png","image/jpeg"].includes(ar.type)){
        alert("Porfavor sube una imagen!")
        return
    }
    const form = new FormData()
    form.append("archivo",archivo[0])
    
    const id_user = JSON.parse(localStorage.getItem('loggedUser')).id_user 
    
    fetch(`http://localhost:5000/uploadFile/${id_user}`,{
        method:"POST",
        mode: "cors",
        body:form
    }).then((resp)=>{
        if (resp.ok) {
            alert('Momento cargado exitosamente')
            window.location.href = "/"
            return
        }
        alert('el Momento NO se ha cargado exitosamente')
        window.location.href = "/"
    }).catch((error)=>{
        alert(error)
    })
}

document.querySelector('#archivo').addEventListener('change',event=>{
    document.querySelector('#send').addEventListener('click',()=>{
    
        uploadFile(event)
    })
})


