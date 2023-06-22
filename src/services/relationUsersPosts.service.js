const dbconnection = require("./db.service");

const insertRelation = async(id_post,id_user)=>{
    try {
            await dbconnection.query(`INSERT INTO artgalery.users_post_liked (id_post,id_user)
                        VALUES(${id_post},${id_user})`)
            return true
                        console.log('INSERT'.green);
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            await  dbconnection.query(`DELETE FROM artgalery.users_post_liked WHERE id_post = ${id_post} and id_user = ${id_user}`)
            return false
            console.log('delete'.red);
        }else{
            return error
        }
    }

    
}

module.exports = {insertRelation}