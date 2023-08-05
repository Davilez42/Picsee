const request = require('postman-request')
const { createReadStream } = require('fs')
const FormData = require('form-data');
const { join } = require('path')
const moderator = async (file) => {
    const route = join(__dirname, 'temp/tempPic.jpg')
    file.mv(route, (err) => err)

    const formData = new FormData();
    formData.append('models', 'nudity-2.0,wad,offensive,face-attributes,gore');
    formData.append('media', createReadStream(route));
    formData.append('api_user', process.env.API_USER_MODERATOR);
    formData.append('api_secret', process.env.API_SECRET_MODERATOR);


    const data = {
        url: 'https://api.sightengine.com/1.0/check.json',
        body: formData,
        headers: formData.getHeaders(),
    }


    return new Promise((resolve, reject) => {
        request.post(data, (err, httpres, body) => {
            if (err) {
                return reject(err)
            }
            const { status, nudity, gore, weapon, drugs, medical_drugs, skull } = JSON.parse(body)

            if (status == "failure") {
                return reject('Error')
            }
            const porcentages = [nudity.sexual_activity, nudity.sexual_display, nudity.erotica, gore.prob, weapon, drugs, medical_drugs, skull.prob]
            const pors = porcentages.filter(d => d > 0.20);
            (pors.length == 0) ? resolve(true) : resolve(false)
        })

    })
}
module.exports = moderator
