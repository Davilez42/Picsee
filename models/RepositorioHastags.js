const getConection = require('./db')

const getHastags= async()=>{
    const conection  = await  getConection()
    const resp = await  conection.execute("SELECT id_hastag,name from hastags")
    return resp[0]
}

const setHastags = async (hastags)=>{
    const conection  = await  getConection()
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
    return conection.execute(consulta) 
 

}


const getIdHastagsByName = async(hastags)=>{
    const conection  = await  getConection()
    const respuesta = await conection.execute(`Select id_hastag from hastags where name in ("${hastags.join('","')}") `)  
    return respuesta[0].map(d=>d.id_hastag)

}


const  setRelationHastags =  async(id_post,hastags) => {
    const conection  = await  getConection()
    let ids = await getIdHastagsByName(hastags)
    ids = ids.map(d=>`(${id_post},${d})`)
    console.log(ids)
    return conection.execute(`INSERT into relation_post_to_hastags (id_post,id_hastag) VALUES ${ids.join(',')}`)
}

module.exports = {
    getHastags,
    setHastags,
    getIdHastagsByName,
    setRelationHastags
}
