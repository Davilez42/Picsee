const getConection = require('../models/ConfigDataBase')

const getHastags= async()=>{
    const conection  = await  getConection()
    const resp = await  conection.execute("SELECT id_hastag,name from hastags")
    return resp[0]
}

const setHastags = async (hastags)=>{
    const conection  = await  getConection()
    let hastags_bd = await getHastags()
    hastags_bd = hastags_bd.map(d=>d.name)
    //console.log(hastags_bd)   
    let values = [] 
    for(n of hastags){
        if(!hastags_bd.includes(n)){
            values.push( `("${n}",1)`)
        }
    }
    let consulta = `Insert Into hastags (name,used) values ${values.join(',')}`
    return await conection.execute(consulta)

}

module.exports = {
    getHastags,
    setHastags
}
