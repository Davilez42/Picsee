
const getConection = require("./ConfigDataBase");

const get_user_Loguin =async(username) => { 
    const conection = await  getConection()
    const result = await conection.execute(`SELECT id_user,id_avatar,username,passwrd from users WHERE username = '${username}'`)
    if (result[0].length ==0) {//verifico si el resultado no contiene nada
        return null        
    }
    return result[0][0]
};


module.exports = {
    get_user_Loguin
}