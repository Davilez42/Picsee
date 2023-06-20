const ImageKit = require('imagekit')
const id = '6490af9206370748f29ced12'

const imagekit = new ImageKit({
    publicKey : "public_tN+GbIXQt6n+37QgX8Du6L7FSm4=",
    privateKey : "private_NPAxmrhLYKVEYAsfp5souoh/B5Y=",
    urlEndpoint : "https://ik.imagekit.io/picmont/",                   
})

imagekit.deleteFile(id).then(response => {
    console.log(response);
}).catch(error => {
    console.log(error);
});