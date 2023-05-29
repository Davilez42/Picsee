
const  cryptoJS = require('crypto-js')
require("dotenv").config();


const comparePassword=(password_encrypt,password_text)=>{
   const pa = cryptoJS.AES.decrypt(password_encrypt,process.env.keyEnc).toString(cryptoJS.enc.Utf8)
   return password_text==password_text 
}
const dencrypt=(password_encrypt)=>{
  return cryptoJS.AES.decrypt(password_encrypt,process.env.keyEnc).toString(cryptoJS.enc.Utf8)
}


const encrypted = (data)=>{
  return  data
}

module.exports ={
    comparePassword,
    encrypted,
    dencrypt
}