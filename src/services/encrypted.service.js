
const  bcryptjs = require('bcryptjs')

const compare_= (password_encrypt,password_textplain)=>{
  return  bcryptjs.compare(password_textplain,password_encrypt)
}

const encrypted =async (data)=>{
  return await bcryptjs.hash(data,13)
}

module.exports ={
    encrypted,
    compare_
}