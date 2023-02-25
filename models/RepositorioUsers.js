
const getConection = require("./ConfigDataBase");
const getDateTimeNow = require("./ServiceDateTime")
const get_user_Loguin =async(username) => { 
    const conection = await  getConection()
    const result = await conection.execute(`SELECT id_user,id_avatar,username,passwrd from users WHERE username = '${username}'`)
    if (result[0].length ==0) {//verifico si el resultado no contiene nada
        return null        
    }
    return result[0][0]
};



const insert_user =async(user)=>{
        const conection = await getConection()
     return await conection.execute(`Insert Into users (username,first_name,last_name,email,passwrd,recent_sesion,state_sesion) VALUES (?,?,?,?,?,?,?)`,
        [user.username,user.first_names,user.last_names,user.email,user.password,'2023-01-02',1])
        .then(()=>{
            return   conection.execute(`SELECT id_user from users WHERE username = '${user.username}' `)
           
        })
        .catch( (rason)=>{
            console.log("pasa por qui")
            return  rason.sqlMessage.split(' ').pop().slice(1,-1);
        })
              

}

const delet_user= async(user)=>{
    const conection = await getConection()
    conection.execute(`DELETE from users where id_user = ${user.id_user}`)
}


const changed_State= async(id,state)=>{
  const conection = await getConection()
   console.log('se cambia en baseDts:',id,state, getDateTimeNow.getDateTimeNow() )
   conection.execute(`UPDATE users SET state_sesion=${state},recent_sesion= '${getDateTimeNow.getDateTimeNow()}' where id_user=${id}`);
}


module.exports = {
    get_user_Loguin,
    insert_user,
    changed_State,
    delet_user
}