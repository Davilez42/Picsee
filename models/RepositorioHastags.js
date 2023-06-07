const dbconnection = require('./db')

const getHastags= async()=>{
    const resp = await  dbconnection.execute("SELECT id_hastag,name from hastags")
    return resp[0]
}

const setHastags = async (hastags)=>{
    let hastags_bd = await getHastags()
    hastags_bd = hastags_bd.map(d=>d.name.toLowerCase())
    console.log(hastags_bd)   
    let values = [] 
    for(n of hastags){
        if(!hastags_bd.includes(n.toLowerCase())){
            values.push( `("${n}",1)`)
        }
    }

    if (values.length ==0) {
        return
    }

    let consulta = `Insert Into hastags (name,used) values ${values.join(',')}`
    return dbconnection.execute(consulta) 
 

}


const getIdHastagsByName = async(hastags)=>{
    const respuesta = await dbconnection.execute(`Select id_hastag from hastags where name in ("${hastags.join('","')}") `)  
    return respuesta[0].map(d=>d.id_hastag)

}


const  setRelationHastags =  async(id_post,hastags) => {
    let ids = await getIdHastagsByName(hastags)
    ids = ids.map(d=>`(${id_post},${d})`)
    console.log(ids)
    return dbconnection.execute(`INSERT into relation_post_to_hastags (id_post,id_hastag) VALUES ${ids.join(',')}`)
}

module.exports = {
    getHastags,
    setHastags,
    getIdHastagsByName,
    setRelationHastags
}
