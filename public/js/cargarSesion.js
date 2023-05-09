
const cargar_informacion= async ()=>{
        const user_logged = localStorage.getItem('loggedUser');
        if(user_logged!=undefined){
           const token =  JSON.parse(user_logged).token
           window.location.href=`/HomPage?t_ken=${token}`;       
        }
    
}
cargar_informacion()