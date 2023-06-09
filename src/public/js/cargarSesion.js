
const cargar_informacion= async ()=>{
        const user_logged = localStorage.getItem('loggedUser');
        if(user_logged!=undefined){
           const token =  JSON.parse(user_logged).token
         //window.location.href=`/HomPage?t_ken=${token}`;     

        fetch(`/HomPage?t_ken=${token}`,{method:"GET"}).then(x=>{
                window.location.href = x.url
        }).catch((res)=>{
               console.log("entra aqui al error")
               
        })
        }
    
}
cargar_informacion()