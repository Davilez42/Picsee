const getDateTimeNow=()=>{
     const date = new Date()
    const fecha_hora_actual = date.toLocaleString().split(' ')
    const hora = date.getHours()
    const minutos = date.getMinutes()
    const segundos = date.getSeconds()
    const fecha = fecha_hora_actual[0].replace(',','').split('/')
    const dia = fecha[0]
    const mes = fecha[1]
    const año = fecha[2]
    if (mes>12){
        return `${año}-${dia}-${mes}  ${hora}:${minutos}:${segundos}`; 
    }   
    return `${año}-${mes}-${dia}  ${hora}:${minutos}:${segundos}`; 

}

module.exports = {
    getDateTimeNow
}