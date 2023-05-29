const ServiceEncrypted = require('../models/ServiceEncrypted')

test('test function set hastag on bd',async ()=>{
    const valor  =  ServiceEncrypted.encrypted('123456789')
    const valor_d =  ServiceEncrypted.dencrypt(valor)
    console.log(valor_d);
});