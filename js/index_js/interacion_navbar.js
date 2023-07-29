 document.querySelector('.nombreApp').addEventListener('click',()=>{
    document.querySelector('.contenedor').removeAttribute('hidden')
    document.querySelector('.contenedor-nosotros').setAttribute('hidden','')
 })
 
 document.querySelector('.sobreNosotros').addEventListener('click',()=>{
    document.querySelector('.contenedor').setAttribute('hidden','')
    document.querySelector('.contenedor-nosotros').removeAttribute('hidden')
 })