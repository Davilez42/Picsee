const cargarPosts =async (query)=>{
    const token = JSON.parse(window.localStorage.getItem('loggedUser')).token
    const id_user = JSON.parse(window.localStorage.getItem('loggedUser')).id_user
    const respuesta = await fetch(`http://192.168.1.7:5000/Posts/${query}`,{method:"GET",headers:{"auth":token,"id":id_user}})
    if (respuesta.ok) {
        const datos =  await respuesta.json()    
        const tamaño = datos["imagenes_"].length
        const contenedor_galeria_perfil = document.querySelector("#contenedor_galeria_perfil")
       contenedor_galeria_perfil.innerHTML = ""
      
        const fragmento = document.createDocumentFragment()

        let column_posts = document.createElement('DIV')
        column_posts.classList.add('column-posts')


        let top = 1
        console.log(tamaño)
        const limite_por_columna = parseInt(tamaño/3) 
        console.log(limite_por_columna)
        let columna_actual = 0
        console.log(datos)
        for (let index = 0; index <tamaño; index++) { 
                    if (columna_actual==3) {
                        break;
                    }
                            
                            let contenedor_post = document.createElement("DIV")
                            contenedor_post.classList.add("contenedor_post")
                            
                            let contenedor_imagen = document.createElement("DIV")
                            contenedor_imagen.classList.add("contenedor_imagen")  

                            const imagen = document.createElement('IMG')
                            imagen.setAttribute('src',datos["imagenes_"][index].f_name)
                            imagen.classList.add('imagen_galeria')

                            contenedor_imagen.appendChild(imagen)

                            contenedor_post.appendChild(contenedor_imagen)

                            const div = document.createElement("DIV")
                            div.classList.add('contenedor-opciones')
                            const li = document.createElement("LI")
                            li.classList.add('opciones_imagenes')
                            const ul =  document.createElement("UL")

                            const a = document.createElement("DIV")
                            a.setAttribute("id",datos["imagenes_"][index].id_post)
                            
                            
                            const icon = document.createElement("IMG")
                            icon.classList.add('icono_opciones')
                            icon.setAttribute("id_post",datos["imagenes_"][index].id_post)
                            icon.setAttribute("liked",datos["imagenes_"][index].liked)

                            const icon_png = (datos["imagenes_"][index].liked==0)? './icons/corazon_like_desactivado.png' :'./icons/corazon.png'  
                            icon.setAttribute('src',icon_png)
                            icon.classList.add("boton_like")
                            

                            a.appendChild(icon)

                            const div_likes = document.createElement("DIV")
                            div_likes.setAttribute('idhl_post',datos["imagenes_"][index].id_post)
                            div_likes.classList.add('box_like')
                            div_likes.appendChild(document.createTextNode(datos["imagenes_"][index].likes))

                            a.appendChild(div_likes)
                            li.appendChild(a)
                            
                            ul.appendChild(li)
                            div.appendChild(ul)
                            contenedor_post.appendChild(div)                                             
                            column_posts.appendChild(contenedor_post)
          
                    if(top ==limite_por_columna){
                        top=1
                        fragmento.appendChild(column_posts)
                        column_posts = document.createElement("DIV")
                        column_posts.classList.add('column-posts')
                        console.log(index,"crea Columna")
                        columna_actual++;
                        continue
                    }
                    top++;
        }
            
        contenedor_galeria_perfil.appendChild(fragmento)
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
        const id_post = component.getAttribute("id_post")


        const box_like = document.querySelector(`div[idhl_post="${component.getAttribute("id_post")}"]`)                            
      
        const op = component.getAttribute('liked')==='0'? '+' : '-'
        if(component.getAttribute("liked")==="0") { 
            component.setAttribute("liked",1)
            box_like.textContent = parseInt(box_like.textContent)+1 
            component.setAttribute("src","./icons/corazon.png")
        }
        else
        {
            component.setAttribute("liked",0)
            box_like.textContent = parseInt(box_like.textContent)-1 
            component.setAttribute("src","./icons/corazon_like_desactivado.png")
        }
        const respuesta = await fetch(`http://192.168.1.7:5000/lkd/post/${id_post}/liked/user/${id_user}/${op}`,{method:"PATCH", mode:'cors',headers:{"auth":token}})       
        if(respuesta.ok){                        
            
                    
         }else{
            console.log("Error en el servidor,No se pudo guardar el like")
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







