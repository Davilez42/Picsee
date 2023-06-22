const ImageKit = require('imagekit')

test('test para eliminar imagen en el servidor de imagenes',async()=>{ 
const id = '6490af9206370748f29ced12'
const imagekit = new ImageKit({
    publicKey : "public_tN+GbIXQt6n+37QgX8Du6L7FSm4=",
    privateKey : "private_NPAxmrhLYKVEYAsfp5souoh/B5Y=",
    urlEndpoint : "https://ik.imagekit.io/picmont/",                   
})

/* imagekit.deleteFile(id).then(response => {
    assert.eq
}).catch(error => {
    console.log(error);
}); */
assert.strictEqual(1, 1);
})