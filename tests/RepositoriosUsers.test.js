
const repositorioUsers = require('../models/RepositorioUsers')

test("tst to changed avatar in bd", async ()=>{
    //const manejador = await repositorioUsers.changed_Avatar(134,"1000.png")
    //const valor = manejador[0].affectedRows
    expect((await repositorioUsers.changed_Avatar(134,"1020.png"))[0].affectedRows).toBe(1)
    expect((await repositorioUsers.changed_Avatar(200,"1020.png"))[0].affectedRows).toBe(0)
})