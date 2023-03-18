const getConection = require('../models/ConfigDataBase')

const getHastags= async()=>{
    const conection  = await  getConection()
    const resp = await  conection.execute("SELECT id_hastag,name from hastags")
    return resp[0]
}

module.exports = {
    getHastags
}
