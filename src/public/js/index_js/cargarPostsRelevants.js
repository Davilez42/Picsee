const cargarPosts =async ()=>{
    const contenedor_imagenes = document.querySelector('.contenedor-imagenes')

    const respuesta = await fetch("/Posts/relevants")
    if (respuesta.ok) {
        const datos =  await respuesta.json()
        const tamaño = datos["imagenes_"].length
        let j = 0
        const row = document.createElement("DIV")
        row.classList.add("row")
        for (let index = 0; index <2; index++) {
     
            let column = document.createElement("DIV")
            column.classList.add("column")             
            for (let k = 0;k<5;k++) {
                if(j<tamaño){          
                const imagen = document.createElement('IMG')
                console.log(datos["imagenes_"][j])
                imagen.setAttribute('data-src',datos["imagenes_"][j])
                imagen.setAttribute('alt',"")
                imagen.setAttribute('srcset',"")
                imagen.classList.add('img_publicacion')
                column.appendChild(imagen)
                j++;
             }
            }          
            row.appendChild(column)
        }
        
        contenedor_imagenes.appendChild(row)
        lazyloadin()
    }
}


const lazyloadin = ()=>{
    const images_ = document.querySelectorAll('.img_publicacion')//obtengo todas las imagenes cargadas
    const callback = (entries,observer)=>{
        entries.forEach(enty=>{
            
            if (enty.isIntersecting) {
                enty.target.src = enty.target.dataset.src
                observer.unobserve(enty.target)
            }
            
        })
    }
    const options = {
        root:document.querySelector('.contenedor-imagenes'),
        rootMargin:'0px',
        threshold:0
    }
    const ob = new IntersectionObserver(callback,options)//observador

    images_.forEach(i=>{//observo a cada una de las imagenes
        ob.observe(i)
  
    })

}


cargarPosts()