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
    console.log()
    return resp.render('homePage')
 })


module.exports = router