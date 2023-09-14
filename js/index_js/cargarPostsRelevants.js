const cargarPosts = async () => {
  const contenedor_imagenes = document.querySelector(".contenedor-imagenes");

  const respuesta = await fetch(
    "https://picmont-inc.onrender.com/api/v1/get_posts/top"
  );

  if (respuesta.ok) {
    const datos = await respuesta.json();
    const tamaño = datos["posts"].length;
    let j = 0;
    const row = document.createElement("DIV");
    row.classList.add("row");
    for (let index = 0; index < 2; index++) {
      let column = document.createElement("DIV");
      column.classList.add("column");
      for (let k = 0; k < 5; k++) {
        if (j < tamaño) {
          const imagen = document.createElement("IMG");
          imagen.setAttribute("data-src", datos["posts"][j]);
          imagen.setAttribute("alt", "");
          imagen.setAttribute("srcset", "");
          imagen.classList.add("img_publicacion");
          column.appendChild(imagen);
          j++;
        }
      }
      row.appendChild(column);
    }

    contenedor_imagenes.appendChild(row);
    lazyloadin(".img_publicacion", document.querySelector(".contenedor-imagenes"));
  }
};

cargarPosts();
