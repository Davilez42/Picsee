let isActive; 
window.onfocus = function () { isActive = 1; }; 
window.onblur = function () { isActive = 0; };

setInterval( async()=> { 
    if(isActive!=undefined){
        console.log("entra qui")
        const id = parseInt(JSON.parse(localStorage.getItem('loggedUser')).id_user)
        const token = JSON.parse(localStorage.getItem('loggedUser')).token
        const resp=  await fetch(`http://192.168.1.7:5000/state_sesion/?id_user=${id}&state_sesion=${isActive}`,{
            method:'PATCH',
            headers:{"auth":token},
            mode: "cors"
        })
        if (!resp.ok) {
            const data =  await resp.json()
            alert(data.messageError)
        }
    }

 }, 200000);