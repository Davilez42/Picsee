const {Router, query} = require('express')
const {static}= require('express')
const ServiceEncrypted =require('../models/ServiceEncrypted')
const router = Router()
const RepositorioUser = require('../models/RepositorioUsers')



router.post('/login',async(req,resp)=>{  
   const user_bd = await RepositorioUser.get_user_Loguin(req.body.username)
   if(user_bd!=null){
         if (ServiceEncrypted.comparePassword(user_bd.passwrd,req.body.password)){
            return resp.json({
                              "id_user":user_bd.id_user,
                              "id_avatar":user_bd.id_avatar,
                              "username":user_bd.username,
                              "password":true})
         }
         return resp.json({"password":false})
   }
    return resp.sendStatus(404)
 })
 



router.post('/registro',async (req,resp)=>{
    console.log(req.body)
      const respuesta = await RepositorioUser.insert_user(req.body)      
      if(typeof respuesta != "object"){ 
            return resp.status(418).json({"valFail":respuesta})
         }
      return resp.json({
         "id_user":  respuesta[0][0].id_user,
         "id_avatar":'default_avatar.png',
         "username":req.body.username,
         "password":true})
 })
 

router.use(static('./storage/FotosPerfil'))//mainmidler 
router.get('/HomPage', async(req,resp)=>{
    imagenes =  {"imagenes":["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg","11.jpg","12.jpg","13.jpg","14.jpg","14.jpg"]}
    resp.render('homePage',imagenes)
 })

router.patch('/state_sesion/',(req,resp)=>{
   const datos = req.query
   RepositorioUser.changed_State(datos.id,datos.state_sesion,'x')
   resp.sendStatus(200)
})

router.delete('/Delete_User',(req,resp)=>{
   RepositorioUser.delet_user(req.query)
   return resp.sendStatus(200)
})






module.exports = router