const dbconnection = require("./db.service");
const insertAvatar= async(id_user,avatar)=>{
    return await dbconnection.execute(`INSERT INTO avatars_users (url,id_cnd)  VALUES('${avatar.url}','${avatar.id_cnd}')`)
    .then(res=>{
        dbconnection.execute(`update users  set id_avatar =${res[0].insertId} where id_user=${id_user}`)
    })
}

const getAvatar= async(id_user)=>{
    const resp = await dbconnection.execute(`SELECT id_avatar,url,id_cnd from avatars_users
    join users u using(id_avatar)
    where u.id_user = ${id_user}`)  
    return resp[0][0]
}
const deleteAvatarByidCnd = async(id_cnd)=>{
    return await dbconnection.execute(`DELETE FROM avatars_users WHERE id_cnd = '${id_cnd}'`)
}

const updateAvatar=async(id_avatar,avatar)=>{
    return await dbconnection.execute(`UPDATE avatars_users SET url='${avatar.url}', id_cnd='${avatar.id_cnd}' WHERE id_avatar=${id_avatar};`)
}

module.exports= {
    insertAvatar,getAvatar,updateAvatar,deleteAvatarByidCnd
}