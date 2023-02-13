const {Router} = require('express')
const router = Router()

router.post('/login',(req,resp)=>{  
    return resp.json({"username":req.body['username'],"password":true})
 })
 
router.post('/registro',(req,resp)=>{
    console.log(req.body)
    return resp.json({"username":req.body['username'],"password":true})
 })
 
 
 
router.get('/HomPage',(req,resp)=>{
    imagenes =  {"imagenes":["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg"]}
    resp.render('homePage',imagenes)
 })


module.exports = router