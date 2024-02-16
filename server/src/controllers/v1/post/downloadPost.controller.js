const { postRepository } = require('../../../database/dependencies')
const axios = require('axios')
const request = require('postman-request')
const errorHandler = require('../../../tools/errorHandler')

const downloadPostController = async (req, res) => {
    try {
        const { id_post } = req.params
        const post = await postRepository.find(parseInt(id_post))
        const buffer = await new Promise((resolve, reject) => {
            request.get(post.url_image, { encoding: null }, (err, resp, body) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(body)
                }
            })
        })

        res.set('content-Disposition', 'attachment')
        res.type('jpg')
        res.send(buffer)
    } catch (e) {
        errorHandler(e, req, res)
    }
}

module.exports = downloadPostController