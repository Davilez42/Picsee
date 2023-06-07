
const dbconnection = require("./db");
const getDateTimeNow = require("./ServiceDateTime");
const serviceEncrypted = require('./ServiceEncrypted')


const get_user_Loguin =async(username) => { 
    const result = await dbconnection.query(`SELECT id_user,id_avatar,username,passwrd from users WHERE username = '${username}'`)     
    return result[0]
};

const insert_user =async(user)=>{
    const password_encrypt = await serviceEncrypted.encrypted(user.password)
     return await dbconnection.execute(`Insert Into users (username,first_name,last_name,email,passwrd,recent_sesion,state_sesion) VALUES (?,?,?,?,?,?,?)`,
        [user.username,user.first_names,user.last_names,user.email,password_encrypt,'2023-01-02',1])
        .then((data)=>{
            return data[0].insertId          
        })
}

const changed_Avatar = async (id_user,name_image)=>{
    const resp = await dbconnection.execute(`UPDATE users SET id_avatar = "${name_image}"  WHERE id_user = ${id_user} `)  
    return  resp
}

const delet_user= async(id_user)=>{
    return  dbconnection.execute(`DELETE from users where id_user = ${id_user}`)   
}

const existUser = async(id_user)=>{
    const resp = await dbconnection.execute(`SELECT * from users where id_user = ${id_user}`)  
    return resp[0].length != 0 

}


const changed_State= async(id,state)=>{
    //console.log('se cambia en baseDts:',id,state, getDateTimeNow.getDateTimeNow() )
    const resp = await  dbconnection.execute(`UPDATE users SET state_sesion=${state},recent_sesion= '${getDateTimeNow.getDateTimeNow()}' where id_user=${id}`);
    return resp
}


module.exports = {
    get_user_Loguin,
    insert_user,
    changed_State,
    delet_user,
    changed_Avatar,
    existUser
}