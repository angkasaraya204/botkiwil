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

const qrcode = async (url, size) => new Promise((resolve, reject) => {
    axios.get(`http://api.qrserver.com/v1/create-qr-code/?data=${url}&size=${size}x${size}`)
        .then((res) => {
            resolve(`http://api.qrserver.com/v1/create-qr-code/?data=${url}&size=${size}x${size}`)
        })
        .catch((err) => {
            reject(err)
        })
})

const ktpmakers = async (nik, provinsi, kabupaten, namaktp, ttlktp, jkktp, jlktp, rtrw, lurah, camat, agama, nikah, pekerjaan, warga, untilktp, imgktp) => new Promise((resolve, reject) => {
    const apiurlKtp = `${urllolhuman}/api/ktpmaker?apikey=${lolhuman}&nik=${nik}&prov=${provinsi}&kabu=${kabupaten}&name=${encodeURIComponent(namaktp)}&ttl=${encodeURIComponent(ttlktp)}&jk=${encodeURIComponent(jkktp)}&jl=${encodeURIComponent(jlktp)}&rtrw=${encodeURIComponent(rtrw)}&lurah=${encodeURIComponent(lurah)}&camat=${encodeURIComponent(camat)}&agama=${encodeURIComponent(agama)}&nikah=${encodeURIComponent(nikah)}&kerja=${encodeURIComponent(pekerjaan)}&warga=${encodeURIComponent(warga)}&until=${encodeURIComponent(untilktp)}&img=${encodeURIComponent(imgktp)}`

    console.log('API URL:', apiurlKtp);
    axios.get(apiurlKtp)
        .then((res) => {
            resolve(res.data)
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

/**
 * @author Aruga <arugaastri@gmail.com>                                                                                                                                                                            <https://github.com/ArugaZ/whatsapp-bot>
 * @license MIT
 */

"use strict"
const cheerio = require('cheerio')

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


const matematika = async (soal) => new Promise((resolve, reject) => {
    axios.get(`https://www.symbolab.com/solver/simplify-calculator/${soal}`)
        .then((res) => {
            resolve(res.data.solution_step_result)
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

const artinama = async (nama) => new Promise((resolve, reject) => {
    axios.get(`${urllolhuman}/api/artinama?apikey=${lolhuman}&nama=${nama}`)
        .then((res) => {
            resolve(res.data.result)
        })
        .catch((err) => {
            reject(err)
        })
})

const cekjodoh = async (nama, pasangan) => new Promise((resolve, reject) => {
    axios.get(`${urllolhuman}/api/jodoh/${nama}/${pasangan}?apikey=${lolhuman}`)
        .then((res) => {
            const textc = `*Positif* : ${res.data.result.positif}\n*Negatif* : ${res.data.result.negatif}\n\n*Deskripsi* : ${res.data.result.deskripsi}`
            resolve({ link: res.data.result.image, text: textc })
        })
        .catch((err) => {
            reject(err)
        })
})

module.exports = {
    wiki,
    whatanime,
    artinama,
    cekjodoh,
    qrcode,
    qrread,
    brainly,
    matematika,
    sleep,
    ktpmakers
}