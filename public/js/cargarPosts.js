const cargarPosts =async (query)=>{
    const token = JSON.parse(window.localStorage.getItem('loggedUser')).token
    const id_user = JSON.parse(window.localStorage.getItem('loggedUser')).id_user
    const respuesta = await fetch(`http://localhost:5000/Posts/${query}`,{method:"GET",headers:{"auth":token,"id":id_user}})
    if (respuesta.ok) {
        const datos =  await respuesta.json()    
        const tamaño = datos["imagenes_"].length
        let j = 0
        const row = document.querySelector(".row_galeria_perfil")
        row.innerHTML = ""

        for (let index = 0; index <4; index++) {          
            const column_galeria = document.createElement("DIV")
            column_galeria.classList.add("column_galeria_perfil")          
            for (let k = 0;k<6;k++) {
                if(j<tamaño){   
                    let column = document.createElement("DIV")
                     column.classList.add("contenedor_imagen")     

                    const imagen = document.createElement('IMG')
                    imagen.setAttribute('src',datos["imagenes_"][j].f_name)
                    imagen.classList.add('imagen_galeria')
                    column.appendChild(imagen)

                    const div = document.createElement("DIV")
                    const li = document.createElement("LI")
                    li.classList.add('opciones_imagenes')
                    const ul =  document.createElement("UL")
                    const a = document.createElement("DIV")
                    a.setAttribute("id",datos["imagenes_"][j].id_post)
                    a.classList.add("boton_like")
                    
                    const icon = document.createElement("IMG")
                    icon.classList.add('icono_opciones')
                    icon.setAttribute("id_post",datos["imagenes_"][j].id_post)
                    icon.setAttribute("liked",datos["imagenes_"][j].liked)
                    const icon_png = (datos["imagenes_"][j].liked==0)? './icons/corazon_like_desactivado.png' :'./icons/corazon.png'  
                    icon.setAttribute('src',icon_png)
                    

                    a.appendChild(icon)

                    const div_likes = document.createElement("DIV")
                    div_likes.setAttribute('idhl_post',datos["imagenes_"][j].id_post)
                    div_likes.classList.add('box_like')
                    div_likes.appendChild(document.createTextNode(datos["imagenes_"][j].likes))
                  

                    ul.appendChild(a)
                    ul.appendChild(div_likes)
                    li.appendChild(ul)
                    div.appendChild(li)
                    column.appendChild(div)
                    column_galeria.appendChild(column)
                j++;
             }
            }          
            row.appendChild(column_galeria)   
        }
        

    }
}


const cargarHastags=async()=>{
    const token = JSON.parse(window.localStorage.getItem('loggedUser')).token
    const respuesta = await fetch("/Hastags",{method:"GET",headers:{"auth":token}});
    if(respuesta.ok){
        const hastags =  await respuesta.json()
        const contenedor_hastags = document.querySelector("#contenedor_hastags");
        const frag =  document.createDocumentFragment();
        for (const hastag of hastags.hastags) {
            const a =  document.createElement("A");           
            a.setAttribute('id_hastag',hastag.id_hastag)
            a.classList.add('hastag')            
            const text_hastag = document.createTextNode(hastag.name)
            a.appendChild(text_hastag)
            frag.appendChild(a)
        }
        contenedor_hastags.appendChild(frag)   
    }
}

const iteraccion_like = async (event)=>{
    const component = event.target
        const id_user = JSON.parse(window.localStorage.getItem('loggedUser')).id_user
        const token = JSON.parse(window.localStorage.getItem('loggedUser')).token
        const respuesta = await fetch(`http://localhost:5000/lkd/post/${component.getAttribute("id_post")}/liked/user/${id_user}`,{method:"PATCH",headers:{"auth":token}})      
        if(respuesta.ok){
                component.setAttribute("liked","1")
                
                respuesta.json().then(d=>{
                   const box_like = document.querySelector(`div[idhl_post="${component.getAttribute("id_post")}"]`)
                    box_like.textContent = d.likes
                    console.log(d)
                    if(d.accion == 1) { 
                        component.setAttribute("src","./icons/corazon.png")
                    }
                    else
                    {component.setAttribute("src","./icons/corazon_like_desactivado.png")}
                })            
         }
         else{
            console.log("Error en el servidor")
         }

        }
 


const cargar_eventos = ()=>{
    const btn_likes = document.querySelectorAll('.boton_like')
    for (const btn of btn_likes) {
        btn.addEventListener('click',iteraccion_like)
    }  
}

cargarHastags().then(()=>{
const hastags =  document.querySelectorAll('.hastag')
    for (const g of hastags) {
        g.addEventListener('click',(event)=>{
            const id_g = event.target.getAttribute('id_hastag')
            cargarPosts(`filter?id_h=${id_g}`).then(cargar_eventos)
        })
    }

})

cargarPosts('currents').then(cargar_eventos)







