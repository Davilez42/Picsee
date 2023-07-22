const cargarPosts = async (query) => {
  const token = JSON.parse(sessionStorage.getItem("loggedUser")).token;
  const id_user = JSON.parse(sessionStorage.getItem("loggedUser")).id_user;
  const respuesta = await fetch(
    `http://localhost:5000/api/v1/get_posts/${query}`,
    { method: "GET", headers: { auth: token, id: id_user } }
  );

  if (respuesta.ok) {
    const datos = await respuesta.json();
    console.log(datos);
    const tamaño = datos["posts"].length;
    const contenedor_galeria_perfil = document.querySelector(
      "#contenedor_galeria_perfil"
    );
    contenedor_galeria_perfil.innerHTML = "";

    const fragmento = document.createDocumentFragment();

    let column_posts = document.createElement("DIV");
    column_posts.classList.add("column-posts");

    let top = 1;

    const limite_por_columna = parseInt(tamaño / 3);

    let columna_actual = 0;

    for (let index = 0; index < tamaño; index++) {
      if (columna_actual == 3) {
        break;
      }

      let contenedor_post = document.createElement("DIV");
      contenedor_post.classList.add("contenedor_post");

      let contenedor_imagen = document.createElement("DIV");
      contenedor_imagen.classList.add("contenedor_imagen");

      contenedor_imagen.addEventListener("mouseenter", mostrar_info);
      contenedor_imagen.addEventListener("mouseleave", ocultar_info);

      let contenedor_info_autor = document.createElement("DIV");
      contenedor_info_autor.classList.add("contenedor_info_autor");

      contenedor_info_autor.setAttribute("hidden", "");

      let avatar_autor = document.createElement("IMG");
      avatar_autor.classList.add("image_avatar_autor");
      avatar_autor.setAttribute("data-src", datos["posts"][index].avatar_autor);

      contenedor_info_autor.appendChild(avatar_autor);
      const username_autor = document.createTextNode(
        datos["posts"][index].username_autor
      );
      contenedor_info_autor.appendChild(username_autor);

      const imagen = document.createElement("IMG");
      imagen.setAttribute("data-src", datos["posts"][index].url_image);
      imagen.classList.add("imagen_galeria");

      contenedor_imagen.appendChild(imagen);
      contenedor_imagen.appendChild(contenedor_info_autor);

      contenedor_post.appendChild(contenedor_imagen);

      const div = document.createElement("DIV");
      div.classList.add("contenedor-opciones");
      const li = document.createElement("LI");
      li.classList.add("opciones_imagenes");
      const ul = document.createElement("UL");

      const a = document.createElement("DIV");
      a.setAttribute("id", datos["posts"][index].id_post);

      const icon = document.createElement("IMG");
      icon.classList.add("icono_opciones");
      icon.setAttribute("id_post", datos["posts"][index].id_post);
      icon.setAttribute("liked", datos["posts"][index].liked);

      const icon_png =
        datos["posts"][index].liked == 0
          ? "https://ik.imagekit.io/picmont/icons/corazon_like_activado.png?updatedAt=1687206842846"
          : "https://ik.imagekit.io/picmont/icons/corazon.png?updatedAt=1687206842813";
      icon.setAttribute("src", icon_png);
      icon.classList.add("boton_like");

      a.appendChild(icon);

      const div_likes = document.createElement("DIV");
      div_likes.setAttribute("idhl_post", datos["posts"][index].id_post);
      div_likes.classList.add("box_like");
      div_likes.appendChild(
        document.createTextNode(datos["posts"][index].likes)
      );

      a.appendChild(div_likes);
      li.appendChild(a);

      ul.appendChild(li);
      div.appendChild(ul);
      contenedor_post.appendChild(div);
      column_posts.appendChild(contenedor_post);

      if (top == limite_por_columna) {
        top = 1;
        fragmento.appendChild(column_posts);
        column_posts = document.createElement("DIV");
        column_posts.classList.add("column-posts");

        columna_actual++;
        continue;
      }
      top++;
    }

    contenedor_galeria_perfil.appendChild(fragmento);

    lazyloadin(); //cargo el lazy loader para las imaganes cargadas
  }
};

const lazyloadin = () => {
  const images_ = document.querySelectorAll(".imagen_galeria"); //obtengo todas las imagenes cargadas
  const callback = (entries, observer) => {
    entries.forEach((enty) => {
      if (enty.isIntersecting) {
        enty.target.src = enty.target.dataset.src;
        observer.unobserve(enty.target);
      }
    });
  };
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0,
  };
  const ob = new IntersectionObserver(callback, options); //observador

  images_.forEach((i) => {
    //observo a cada una de las imagenes
    ob.observe(i);
  });
};

//mostrar avatar y nombre del autor del post
const mostrar_info = (event) => {
  //console.log(event.target.childNodes);
  event.target.childNodes[1].removeAttribute("hidden");
  event.target.childNodes[1].childNodes[0].src =
    event.target.childNodes[1].childNodes[0].dataset.src;
};

const ocultar_info = (event) => {
  // console.log(event.target.childNodes);
  event.target.childNodes[1].setAttribute("hidden", "");
};

const cargarHastags = async () => {
  const token = JSON.parse(window.sessionStorage.getItem("loggedUser")).token;
  const respuesta = await fetch("http://localhost:5000/api/v1/get_hastags", {
    method: "GET",
    headers: { auth: token },
  });
  if (respuesta.ok) {
    const hastags = await respuesta.json();
    const contenedor_hastags = document.querySelector("#contenedor_hastags");
    const frag = document.createDocumentFragment();
    for (const hastag of hastags.hastags) {
      const a = document.createElement("A");
      a.setAttribute("id_hastag", hastag.id_hastag);
      a.classList.add("hastag");
      const text_hastag = document.createTextNode(hastag.name);
      a.appendChild(text_hastag);
      frag.appendChild(a);
    }
    contenedor_hastags.appendChild(frag);
  }
};
//logica like
let estados = [];
const iteraccion_like = async (event) => {
  const component = event.target;
  const box_like = document.querySelector(
    `div[idhl_post="${component.getAttribute("id_post")}"]`
  );
  estados.push(component.getAttribute("liked"));
  if (component.getAttribute("liked") === "0") {
    component.setAttribute("liked", 1);
    box_like.textContent = parseInt(box_like.textContent) + 1;
    component.setAttribute(
      "src",
      "https://ik.imagekit.io/picmont/icons/corazon.png?updatedAt=1687206842813"
    );
  } else {
    component.setAttribute("liked", 0);
    box_like.textContent = parseInt(box_like.textContent) - 1;
    component.setAttribute(
      "src",
      "https://ik.imagekit.io/picmont/icons/corazon_like_activado.png?updatedAt=1687206842846"
    );
  }
};
const send_like = async (event) => {
  const id_user = JSON.parse(
    window.sessionStorage.getItem("loggedUser")
  ).id_user;
  const token = JSON.parse(window.sessionStorage.getItem("loggedUser")).token;
  const id_post = event.target.getAttribute("id_post");
  console.log(id_user, id_post);
  if (estados.length == 1 || estados.shift() === estados.pop()) {
    const respuesta = await fetch(
      `http://localhost:5000/api/v1/setlike/${id_post}/by/${id_user}`,
      { method: "PATCH", mode: "cors", headers: { auth: token } }
    );
    if (!respuesta.ok) {
      console.log(respuesta);
      console.log("Error en el servidor,No se pudo guardar el like");
    }
  }
  estados = [];
  event.target.removeEventListener("mouseout", send_like);
};
const cargar_evento_like = () => {
  const btn_likes = document.querySelectorAll(".boton_like");
  btn_likes.forEach((btn) =>
    btn.addEventListener("click", (event) => {
      iteraccion_like(event);
      event.target.addEventListener("mouseout", send_like);
    })
  );
};

cargarHastags().then(() => {
  const hastags = document.querySelectorAll(".hastag");
  for (const g of hastags) {
    g.addEventListener("click", (event) => {
      const id_g = event.target.getAttribute("id_hastag");
      cargarPosts(`byhastag?hst=${id_g}`).then(cargar_evento_like);
    });
  }
});

cargarPosts("currents").then(cargar_evento_like);
