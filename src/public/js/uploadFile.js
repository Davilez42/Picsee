



let imagenes_cargadas = []
const uploadFile = async (pet,meth) => {
    const form = new FormData()
    for (const ar of imagenes_cargadas) {
        if (!["image/png","image/jpeg"].includes(ar.type)){
            alert("Porfavor sube una imagen!")
            return
        }
        form.append("archivo",ar)
    }
    
    
    
    const user = JSON.parse(localStorage.getItem('loggedUser'));
    const id_user = user.id_user
    const token = user.token  
    

    let hastags = null;
     if(pet =='uploadFile'){
        hastags =  document.getElementById('input_hastags').value
        hastags = hastags.split(' ').map(h => h.slice(1))
    }

    const respuesta = await fetch(`http://192.168.1.7:5000/${pet}/${id_user}`,{
        method:meth,
        mode: "cors",
        headers:{"auth":token,"hastags":hastags,"id_avatar":user.id_avatar},
        body:form
    })

    
    if(pet=='uploadFile'){
        if (respuesta.ok) {
            imagenes_cargadas = []
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
            imagenes_cargadas = []
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
    file = event.target.files
    if (file.length>0 && imagenes_cargadas.length<5) {

        imagenes_cargadas.push(file[0])
        
        const filereader = new FileReader()
        filereader.onload = (event)=>{
          const element =   document.querySelector('.previews')
          element.removeAttribute('hidden')
            const img = document.createElement('IMG')
            img.setAttribute('src',event.target.result)
            img.setAttribute('id','preview')
            element.appendChild(img)
        }
        filereader.readAsDataURL(file[0])
    }
    else{
        alert('Limite excedido por subida')
        return
    }
    console.log(imagenes_cargadas);
    
   
})


document.querySelector('#send_post').addEventListener('click',()=>{   
    uploadFile('uploadFile','POST')
})


document.querySelector('#archivo_avatar').addEventListener('change',event=>{
    document.querySelector('#send_avatar').addEventListener('click',()=>{        
        imagenes_cargadas.push(event.target.files[0])
        uploadFile('changedAvatar','PATCH')
    })
})



