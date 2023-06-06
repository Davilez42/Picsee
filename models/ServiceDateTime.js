const getDateTimeNow=()=>{
    const date = new Date()
    const año = date.getFullYear()
    const dia = date.getDate().toString().length ==1 ? "0".concat(date.getDate()):date.getDate().toString()
    const mes = date.toLocaleDateString().split('/')[1].length ==1 ? "0".concat(date.toLocaleDateString().split('/')[1]):date.toLocaleDateString().split('/')[1].toString()
    const hora = date.toLocaleTimeString().split('p')[0]
    return `${año}-${mes}-${dia} ${hora}`
}

module.exports = {
    getDateTimeNow
}