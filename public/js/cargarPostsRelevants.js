const cargarPosts =async ()=>{
    const contenedor_imagenes = document.querySelector('.contenedor-imagenes')

    const respuesta = await fetch("http://localhost:5000/Posts/relevants")
    if (respuesta.ok) {
        const datos =  await respuesta.json()
        const tamaño = datos["imagenes_"].length
        let j = 0
        const row = document.createElement("DIV")
        row.classList.add("row")
        for (let index = 0; index <2; index++) {
            console.log("entra")           
            let column = document.createElement("DIV")
            column.classList.add("column")             
            for (let k = 0;k<5;k++) {
                if(j<tamaño){          
                const imagen = document.createElement('IMG')
                console.log(datos["imagenes_"][j])
                imagen.setAttribute('src',datos["imagenes_"][j])
                imagen.setAttribute('alt',"")
                imagen.setAttribute('srcset',"")
                column.appendChild(imagen)
                j++;
             }
            }          
            row.appendChild(column)
        }
        
        contenedor_imagenes.appendChild(row)

    }
}
cargarPosts()