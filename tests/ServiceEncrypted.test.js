const ServiceEncrypted = require('../src/services/encrypted.service')

test('test function set hastag on bd',async ()=>{
    const valor  = await ServiceEncrypted.encrypted('123456789')
    const result = await ServiceEncrypted.compare_(valor,'123456789')
    console.log(result);
});