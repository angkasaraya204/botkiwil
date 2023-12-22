const axios = require('axios')
require('dotenv').config()
var needle = require('needle')
const { fetchJson } = require('../utils/fetcher')
const fs = require('fs-extra')
const setting = JSON.parse(fs.readFileSync('./settings/setting.json'))


let {
    lolhuman,
    urllolhuman
} = setting

/**
*
* Create shorturl
*
* @param  {String} url
*/
const shortener = (url) => new Promise((resolve, reject) => {
    console.log('Creating short url...')
    fetchText(`https://tinyurl.com/api-create.php?url=${url}`)
        .then((text) => resolve(text))
        .catch((err) => reject(err))
})

const qrcode = async (url, size) => new Promise((resolve, reject) => {
    axios.get(`http://api.qrserver.com/v1/create-qr-code/?data=${url}&size=${size}x${size}`)
        .then((res) => {
            resolve(`http://api.qrserver.com/v1/create-qr-code/?data=${url}&size=${size}x${size}`)
        })
        .catch((err) => {
            reject(err)
        })
})


const qrread = async (url) => new Promise((resolve, reject) => {
    axios.get(`http://api.qrserver.com/v1/read-qr-code/?fileurl=${url}`)
        .then((res) => {
            if (res.data[0].symbol[0].data == null) return resolve(`Link yang anda masukan salah`)
            const textqr = `Hasil : ${res.data[0].symbol[0].data}`
            resolve(textqr)
        })
        .catch((err) => {
            reject(err)
        })
})

const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const tosticker = (arguments) => {
    const phrase = arguments.map((result, index) => `${result}${index !== 0 && (index + 1) % 3 === 0 ? "%0A" : "%20"}`).join("");
    const APIURL = `https://raterian.sirv.com/New%20Project.png?text.0.text=${phrase}&text.0.position.y=-50%25&text.0.color=000000&text.0.font.family=Poppins&text.0.font.weight=600&text.0.outline.color=ffffff&text.0.outline.width=5`;
    return APIURL;
};

/**
 * @author Aruga <arugaastri@gmail.com>                                                                                                                                                                            <https://github.com/ArugaZ/whatsapp-bot>
 * @license MIT
 */

"use strict"
const cheerio = require('cheerio')

/**
 * Get latest videos from Nekopoi.
 * @returns {Promise} Return latest videos from Nekopoi.
 */
const getLatest = () => new Promise((resolve, reject) => {
    const url = 'http://nekopoi.care'
    axios.get(url)
        .then((req) => {
            const title = []
            const link = []
            const image = []
            const data = {}
            const soup = cheerio.load(req.data)
            soup('div.eropost').each((i, e) => {
                soup(e).find('h2').each((j, s) => {
                    title.push(soup(s).find('a').text().trim())
                    link.push(soup(s).find('a').attr('href'))
                })
                image.push(soup(e).find('img').attr('src'))
            })
            if (data == undefined) {
                reject('No result :(')
            } else {
                let i = Math.floor(Math.random() * title.length)
                let hehe = {
                    "title": title[i],
                    "image": image[i],
                    "link": link[i]
                }
                resolve(hehe)
            }
        })
        .catch((err) => reject(err))
})

/**
 * Get Nekopoi video metadata.
 * @param {String} url
 * @returns {Promise} Return metadata.
 */
const getVideo = (url) => new Promise((resolve, reject) => {
    axios.get(url)
        .then((req) => {
            try {
                const links = []
                let soup = cheerio.load(req.data)
                let title = soup("title").text()
                soup('div.liner').each((i, e) => {
                    soup(e).find('div.listlink').each((j, s) => {
                        soup(s).find('a').each((p, q) => {
                            links.push(soup(q).attr('href'))
                        })
                    })
                })
                const data = {
                    "title": title,
                    "links": links
                }
                resolve(data)
            } catch (err) {
                reject(err)
            }
        })
        .catch((err) => reject(err))
})

/**
 * Search anime source.
 * @param {Buffer} imageBase64 
 */
const whatanime = (imageBase64) => new Promise((resolve, reject) => {
    console.log('Searching for anime source...')
    fetchJson('https://trace.moe/api/search', {
        method: 'POST',
        body: JSON.stringify({ image: imageBase64 }),
        headers: { "Content-Type": "application/json" }
    })
        .then((result) => resolve(result))
        .catch((err) => reject(err))
})

const nowm = async (url) => new Promise((resolve, reject) => {
    axios.get(`https://arugaz.my.id/api/media/tiktok?url=${url}`)
        .then(res => {
            resolve(res.data)
        })
        .catch(err => {
            reject(err)
        })
})

const tiktok = (url) => new Promise((resolve, reject) => {
    console.log('Get metadata from =>', url)
    getVideoMeta(url, { noWaterMark: true, hdVideo: true })
        .then(async (result) => {
            if (result.videoUrlNoWaterMark) {
                result.url = result.videoUrlNoWaterMark
                result.NoWaterMark = true
            } else {
                result.url = result.videoUrl
                result.NoWaterMark = false
            }
            resolve(result)
        }).catch((err) => {
            console.error(err)
            reject(err)
        })
})

const brainly = (query) => new Promise((resolve, reject) => {
    var url = 'https://api.i-tech.id'
    var key = process.env.key

    if (query.length === 0) { reject('❌ Harap masukan query yang ingin dicari!') }
    needle(url + '/tools/brainly?key=' + key + '&query=' + query, async (err, resp, body) => {
        try {
            if (body.status !== 'error') {
                resolve(body.result)
            } else {
                reject(`Query *${query}* tidak ditemukan.`)
            }
        } catch (err) {
            reject(err)
        }
    })
})


const dewabatch = async (judul) => new Promise((resolve, reject) => {
    axios.get(`${link}/api/dewabatch?q=${judul}`)
        .then((res) => {
            const textdew = `${res.data.result}\n\nSinopsis: ${res.data.sinopsis}`
            resolve({ link: res.data.thumb, text: textdew })
        })
        .catch((err) => {
            reject(err)
        })
})

const cekzodiak = async (nama, tgl, bln, thn) => new Promise((resolve, reject) => {
    axios.get(`${link}/api/getzodiak?nama=${nama}&tgl-bln-thn=${tgl}-${bln}-${thn}`)
        .then((res) => {
            const text = `Nama: ${res.data.nama}\nUltah: ${res.data.ultah}\nZodiak: ${res.data.zodiak}`
            resolve(text)
        })
        .catch((err) => {
            reject(err)
        })
})

const cerpen = async () => new Promise((resolve, reject) => {
    axios.get(`${link}/api/cerpen`)
        .then((res) => {
            resolve(res.data)
        })
        .catch((err) => {
            reject(err)
        })
})

const peluk = () => new Promise((resolve, reject) => {
    console.log('Searching for pelukan...')
    fetchJson('https://nekos.life/api/v2/img/hug')
        .then((result) => resolve(result))
        .catch((err) => {
            reject(err)
        })
})

const bucin = async () => new Promise((resolve, reject) => {
    axios.get(`${link}/api/howbucins`)
        .then((res) => {
            resolve(res.data)
        })
        .catch((err) => {
            reject(err)
        })
})


const puisi = async () => new Promise((resolve, reject) => {
    const puiti = ['1', '3']
    const ranisi = puiti[Math.floor(Math.random() * puiti.length)]
    axios.get(`${link}/api/puisi${ranisi}`)
        .then((res) => {
            resolve(res.data)
        })
        .catch((err) => {
            reject(err)
        })
})


const matematika = async (soal) => new Promise((resolve, reject) => {
    axios.get(`https://www.symbolab.com/solver/simplify-calculator/${soal}`)
        .then((res) => {
            resolve(res.data.solution_step_result)
        })
        .catch((err) => {
            reject(err)
        })
})

const quote = async () => new Promise((resolve, reject) => {
    axios.get(`${link}/api/randomquotes`)
        .then((res) => {
            const text = `Author: ${res.data.author}\n\nQuote: ${res.data.quotes}`
            resolve(text)
        })
        .catch((err) => {
            reject(err)
        })
})

const wiki = async (url) => new Promise((resolve, reject) => {
    axios.get(`${link}/api/wiki?q=${url}`)
        .then((res) => {
            resolve(res.data.result)
        })
        .catch((err) => {
            reject(err)
        })
})

const daerah = async () => new Promise((resolve, reject) => {
    axios.get(`${link}/daerah`)
        .then((res) => {
            resolve(res.data.result)
        })
        .catch((err) => {
            reject(err)
        })
})

const chord = async (url) => new Promise((resolve, reject) => {
    axios.get(`${link}/api/chord?q=${url}`)
        .then((res) => {
            if (res.data.error) resolve(res.data.error)
            resolve(res.data.result)
        })
        .catch((err) => {
            reject(err)
        })
})

const tulis = async (teks) => new Promise((resolve, reject) => {
    axios.get(`${link}/api/nulis?text=${encodeURIComponent(teks)}`)
        .then((res) => {
            resolve(`${res.data.result}`)
        })
        .catch((err) => {
            reject(err)
        })
})

const artinama = async (nama) => new Promise((resolve, reject) => {
    axios.get(`${link}/api/artinama?nama=${nama}`)
        .then((res) => {
            resolve(res.data.result)
        })
        .catch((err) => {
            reject(err)
        })
})

const cekjodoh = async (nama1, nama2) => new Promise((resolve, reject) => {
    axios.get(`${link}/api/jodoh/${nama1}/${nama2}?apikey=${lolhuman}`)
        .then((res) => {
            const textc = `Nama : ${res.data.nama}\nPasangan : ${res.data.pasangan}\nPositif: ${res.data.positif}\nNegatif : ${res.data.negatif}`
            resolve({ link: res.data.gambar, text: textc })
        })
        .catch((err) => {
            reject(err)
        })
})

const bapakfont = async (kalimat) => new Promise((resolve, reject) => {
    axios.get(`${link}/api/bapakfont?kata=${kalimat}`)
        .then((res) => {
            resolve(res.data.result)
        })
        .catch((err) => {
            reject(err)
        })
})

const lirik = async (judul) => new Promise((resolve, reject) => {
    axios.get(`${link}/api/lirik?judul=${judul}`)
        .then((res) => {
            resolve(res.data.result)
        })
        .catch((err) => {
            reject(err)
        })
})

module.exports = {
    quote,
    wiki,
    daerah,
    whatanime,
    chord,
    tulis,
    artinama,
    cekjodoh,
    covidindo,
    bapakfont,
    qrcode,
    qrread,
    lirik,
    cerpen,
    peluk,
    bucin,
    tiktok,
    cekzodiak,
    dewabatch,
    brainly,
    matematika,
    getLatest,
    getVideo,
    tosticker,
    sleep,
    nowm,
    shortener,
    puisi
}
