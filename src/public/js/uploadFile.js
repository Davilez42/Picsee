

document.querySelector("#btn_subirMomento").addEventListener('click',()=>{
    document.getElementById("contenedor_galeria_perfil").style.display = "none";
    document.getElementById("contenedor_etiquetas_hastags").style.display = "none";
    document.getElementById("contenedor_subirmomento").style= "display:relative";
})

const uploadFile = async (event,pet,meth) => {
    const archivo =  event.target.files; 
    const ar = archivo[0]
    if (!["image/png","image/jpeg"].includes(ar.type)){
        alert("Porfavor sube una imagen!")
        return
    }
    

   

    const form = new FormData()
    
    form.append("archivo",archivo[0])
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    const id_user = user.id_user
    const token = user.token  
    

    let hastags = null;
     if(pet =='uploadFile'){
    hastags =  document.getElementById('input_hastags').value
    hastags = hastags.split(' ').map(h => h.slice(1))
    }
    console.log("SE OBTIENEN ",hastags)
    const respuesta = await fetch(`http://192.168.1.7:5000/${pet}/${id_user}`,{
        method:meth,
        mode: "cors",
        headers:{"auth":token,"hastags":hastags},
        body:form
    })

    
    if(pet=='uploadFile'){
        if (respuesta.ok) {
            alert('Momento cargado exitosamente')
            window.location.href = "/"
            return
        }
        const rason = await  respuesta.json();
        alert(`el Momento NO se ha cargado exitosamente debido a: ${rason['messageError']}`)
        window.location.href = "/"
        
    }
    if(pet=='changedAvatar'){
        if (respuesta.ok) {

            const resp_img = await respuesta.json();
            user.id_avatar = resp_img.id_avatar
            window.localStorage.setItem('loggedUser',JSON.stringify(user))
            alert('avatar cargado exitosamente')
            window.location.href = "/"
            return
        }else{
            const data =  await respuesta.json()
            alert(`el avatar NO se ha cambiado exitosamente debido a: ${data.messageError}`)
        }
        
        window.location.href = "/"
        
    }
    
}





document.querySelector('#archivo').addEventListener('change',event=>{
    document.querySelector('#send_post').addEventListener('click',()=>{   
        uploadFile(event,'uploadFile','POST')
    })
})

document.querySelector('#archivo_avatar').addEventListener('change',event=>{
    document.querySelector('#send_avatar').addEventListener('click',()=>{        
        uploadFile(event,'changedAvatar','PATCH')
    })
})



