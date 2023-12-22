const { fetchJson, fetchBase64 } = require('../utils/fetcher')
const fs = require('fs-extra')
const { reject } = require('promise')
const {
    apiSS
} = JSON.parse(fs.readFileSync('./settings/api.json'))

/**
 * create custom meme
 * @param  {String} imageUrl
 * @param  {String} topText
 * @param  {String} bottomText
 */
const custom = async (imageUrl, top, bottom) => new Promise((resolve, reject) => {
    topText = top.trim().replace(/\s/g, '_').replace(/\?/g, '~q').replace(/\%/g, '~p').replace(/\#/g, '~h').replace(/\//g, '~s')
    bottomText = bottom.trim().replace(/\s/g, '_').replace(/\?/g, '~q').replace(/\%/g, '~p').replace(/\#/g, '~h').replace(/\//g, '~s')
    fetchBase64(`https://api.memegen.link/images/custom/${topText}/${bottomText}.png?background=${imageUrl}`, 'image/png')
        .then((result) => resolve(result))
        .catch((err) => {
            console.error(err)
            reject(err)
        })
})

const ss = async (url) => new Promise((resolve, reject) => {
    fetchBase64(`https://api.apiflash.com/v1/urltoimage?access_key=${apiSS}&url=${url}`)
    .then((res) => {
        resolve(res)
    })
    .catch((err) => {
        reject(err)
    })
})

module.exports = {
    custom,
    ss
}
