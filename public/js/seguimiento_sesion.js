var isActive; 
window.onfocus = function () { isActive = 1; }; 
window.onblur = function () { isActive = 0; };

setInterval( ()=> { 
    if(isActive!=undefined){
        const id =  JSON.parse(localStorage.getItem('loggedUser')).id_user
        fetch(`http://localhost:5000/state_sesion/?id=${id}&state_sesion=${isActive}`,{
            method:'PATCH',
            mode: "cors"
        })
    }

 }, 20000);