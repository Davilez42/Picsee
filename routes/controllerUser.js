const {Router} = require('express')
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
 
router.post('/registro',(req,resp)=>{
    console.log(req.body)
    return resp.json({"username":req.body['username'],"password":true})
 })
 

router.use(static('./storage/FotosPerfil'))//mainmidler 
router.get('/HomPage', async(req,resp)=>{

  
    
    
    imagenes =  {"imagenes":["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg","11.jpg","12.jpg","13.jpg","14.jpg","14.jpg"]}
    resp.render('homePage',imagenes)
 })


module.exports = router