
const getConection = require("./ConfigDataBase");

const get_user_Loguin =async(username) => { 
    const conection = await  getConection()
    const result = await conection.execute(`SELECT id_user,id_avatar,username,passwrd from users WHERE username = '${username}'`)
    if (result[0].length ==0) {//verifico si el resultado no contiene nada
        return null        
    }
    return result[0][0]
};



/* const  insert_user= async(user)=>{
    const conection = await getConection()
   const result = await conection.execute(`SELECT  username FROM users WHERE username = '${user.username}'`)
    
   if (result[0].length==0){
        const result = await conection.execute(`SELECT  email FROM users WHERE email = '${user.email}'`) 
        if (result[0].length==0) {
                 conection.execute(`Insert Into users (username,first_name,last_name,email,passwrd,recent_sesion,state_sesion) VALUES (?,?,?,?,?,?,?)`,
                 [user.username,user.first_names,user.last_names,user.email,user.password,'2023-01-02',1])
                 const id = await conection.execute(`SELECT id_user from users WHERE username = '${user.username}'`)
                 return {"id":id,"username":true,"email":true}
        }
        return {"username":true,"email":false}
    }
    return {"username":false,"email":false}

} */

const insert_user =async(user)=>{
        const conection = await getConection()
     return await conection.execute(`Insert Into users (username,first_name,last_name,email,passwrd,recent_sesion,state_sesion) VALUES (?,?,?,?,?,?,?)`,
        [user.username,user.first_names,user.last_names,user.email,user.password,'2023-01-02',1])
        .then(()=>{
           return 'ok'
        })
        .catch( (rason)=>{
          return   rason.sqlMessage.split(' ').pop().slice(1,-1);
        })
              

}



module.exports = {
    get_user_Loguin,
    insert_user
}