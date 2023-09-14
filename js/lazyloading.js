const lazyloadin = (class_images, root) => {
    const images_ = document.querySelectorAll(class_images); //obtengo todas las imagenes cargadas
    const callback = (entries, observer) => {
        entries.forEach((enty) => {
            if (enty.isIntersecting) {
                enty.target.src = enty.target.dataset.src;
                observer.unobserve(enty.target);
            }
        });
    };
    const options = {
        root,
        rootMargin: "0px",
        threshold: 0,
    };
    const ob = new IntersectionObserver(callback, options); //observador

    images_.forEach((i) => {
        //observo a cada una de las imagenes
        ob.observe(i);
    });
};