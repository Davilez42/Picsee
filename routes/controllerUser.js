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
    imagenes =  {"imagenes":["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg","6.jpg","7.jpg","8.jpg","9.jpg","10.jpg","11.jpg","12.jpg","13.jpg","14.jpg","14.jpg"]}
    resp.render('homePage',imagenes)
 })


module.exports = router