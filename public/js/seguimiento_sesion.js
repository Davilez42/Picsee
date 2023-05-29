let isActive; 
window.onfocus = function () { isActive = 1; }; 
window.onblur = function () { isActive = 0; };

setInterval( ()=> { 
    if(isActive!=undefined){
        console.log("entra qui")
        const id =  JSON.parse(localStorage.getItem('loggedUser')).id_user[1]
        fetch(`http://192.168.1.7:5000/state_sesion/?id=${id}&state_sesion=${isActive}`,{
            method:'PATCH',
            mode: "cors"
        })
    }

 }, 20000);