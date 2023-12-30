require('dotenv').config()
const { decryptMedia } = require('@open-wa/wa-automate')
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')
const axios = require('axios')
const { spawn } = require('child_process')
const fetch = require('node-fetch')
const appRoot = require('app-root-path')
const toMs = require('ms')
const low = require('lowdb')
const requests = require("node-fetch")
const ms = require('parse-ms')
const FileSync = require('lowdb/adapters/FileSync')
const feature = require('./lib/poll');
const ffmpeg = require('fluent-ffmpeg')
const util = require('util')
const quiziz = require('quizizz.js')
const canvas = require('canvacord')
const hackq = new quiziz.QuizizzClient();
const { Readable, Writable } = require('stream')
const db_group = new FileSync(appRoot + '/lib/data/group.json')
const db = low(db_group)
const notice = ['piyobot', 'piyobot']
const { getUser, getPost, searchUser } = require('./lib/Insta')
const path = require('path')
const bent = require('bent')
const Math_js = require('mathjs')
const fs = require('fs-extra')
const errorImg = 'https://i.imgur.com/VKoNMIR.png'
const errorImgg = 'https://i.ibb.co/jRCpLfn/user.png'
db.defaults({ group: [] }).write()
var tanggal = moment.tz('Asia/Jakarta').format('YYYY-MM-DD')

const {
    exec
} = require('child_process')
const {
    insert
} = require('././database')
const {
    menuId,
    urlShortener,
    meme,
    translate,
    getLocationData,
    kbbi,
    rugaapi,
} = require('./lib')

const {
    msgFilter,
    color,
    processTime,
    createcode,
    isUrl
} = require('./utils')

const { uploadImages } = require('./utils/fetcher')
const faceAnime = require('./lib/faceanime');

//////////////////////////////FOLDER SYSTEM///////////////////////////////////
const banned = JSON.parse(fs.readFileSync('./settings/banned.json'))
const chatt = JSON.parse(fs.readFileSync('./settings/piyo.json'))
const setting = JSON.parse(fs.readFileSync('./settings/setting.json'))
const isPorn = JSON.parse(fs.readFileSync('./settings/antiporn.json'))
const kuis = JSON.parse(fs.readFileSync('./settings/kuis.json'))
const kuismtk = JSON.parse(fs.readFileSync('./settings/kuismtk.json'))
const kuismtkk = JSON.parse(fs.readFileSync('./settings/kuismtkk.json'))
const code15 = JSON.parse(fs.readFileSync('./settings/code15.json'))
const code30 = JSON.parse(fs.readFileSync('./settings/code30.json'))
const code60 = JSON.parse(fs.readFileSync('./settings/code60.json'))
const bb = JSON.parse(fs.readFileSync('./settings/truth.json'))
const cc = JSON.parse(fs.readFileSync('./settings/dare.json'))
const _nsfw = JSON.parse(fs.readFileSync('./settings/nsfw.json'))
const _welcome = JSON.parse(fs.readFileSync('./settings/welcome.json'))
const _reminder = JSON.parse(fs.readFileSync('./settings/reminder.json'))
const _autostiker = JSON.parse(fs.readFileSync('./settings/autostiker.json'))
const _afk = JSON.parse(fs.readFileSync('./settings/afk.json'))
const _biodata = JSON.parse(fs.readFileSync('./settings/biodata.json'))
const _registered = JSON.parse(fs.readFileSync('./settings/registered.json'))
const _tebak = JSON.parse(fs.readFileSync('./settings/tebakgambar.json'))
const usermp3 = JSON.parse(fs.readFileSync('./settings/usermp3.json'))
const usermp4 = JSON.parse(fs.readFileSync('./settings/usermp4.json'))
///////////////////////////////////////////////////////////////////////////////


/////////////////////////////////LET SYSTEM////////////////////////////////////
let dbcot = JSON.parse(fs.readFileSync('./settings/bacot.json'))
let mtt = JSON.parse(fs.readFileSync('./settings/mtk.json'))
let mtkeasy = JSON.parse(fs.readFileSync('./settings/mtkeasy.json'))
let mtkmedium = JSON.parse(fs.readFileSync('./settings/mtkmedium.json'))
let mtkhard = JSON.parse(fs.readFileSync('./settings/mtkhard.json'))
let easy = JSON.parse(fs.readFileSync('./settings/easy.json'))
let medium = JSON.parse(fs.readFileSync('./settings/medium.json'))
let hard = JSON.parse(fs.readFileSync('./settings/hard.json'))
let updatepiyobot = JSON.parse(fs.readFileSync('./settings/update.json'))
let adminNumber = JSON.parse(fs.readFileSync('./settings/admin.json'))
let stickerspam = JSON.parse(fs.readFileSync('./settings/stickerspam.json'))
let antisticker = JSON.parse(fs.readFileSync('./settings/antisticker.json'))
///////////////////////////////////////////////////////////////////////////////

/////////////////////////////////SETTING///////////////////////////////////////
let {
    ownerNumber,
    groupLimit,
    limitCount,
    memberLimit,
    prefix,
    halal,
    lolhuman,
    urllolhuman,
    urlcaliph,
    caliph,
    urlvihan,
    akuari,
    zoner,
    urlzoner
} = setting

// Mendeklarasikan variabel global untuk menyimpan data pertanyaan dan jawaban
let questionAnswerPairs = [];

///////////////////////////////API JSON///////////////////////////////////////
const {
    apiNoBg,
    apiSimi
} = JSON.parse(fs.readFileSync('./settings/api.json'))
//////////////////////////////////////////////////////////////////////////////

async function convertVideoToGif(videoPath, gifPath) {
    const command = `ffmpeg -i ${videoPath} -vf "fps=10,scale=320:-1:flags=lanczos" ${gifPath}`;
    await exec(command);
}

function formatin(duit) {
    let reverse = duit.toString().split('').reverse().join('');
    let ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
}

const inArray = (needle, haystack) => {
    let length = haystack.length;
    for (let i = 0; i < length; i++) {
        if (haystack[i].id == needle) return i;
    }
    return false;
}

module.exports = HandleMsg = async (piyo, message) => {
    try {
        const { type, id, content, from, t, sender, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, author, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        var { items, name, formattedTitle } = chat
        let { text } = message
        let { pushname, verifiedName, formattedName } = sender
        pushname = pushname || verifiedName || formattedName // verifiedName is the name of someone who uses a business account
        const botNumber = await piyo.getHostNumber() + '@c.us'
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await piyo.getGroupAdmins(groupId) : ''
        const groupMembers = isGroupMsg ? await piyo.getGroupMembersId(groupId) : ''
        const isOwner = sender.id === ownerNumber.includes
        const isGroupAdmins = groupAdmins.includes(sender.id) || false
        const chats = (type === 'chat') ? body : (type === 'image' || type === 'video') ? caption : ''
        const pengirim = sender.id
        const pengirimm = JSON.parse(fs.readFileSync('./settings/registered.json'))
        const uwong = pengirimm[Math.floor(Math.random() * pengirimm.length)];
        const serial = sender.id
        const time = moment(t * 1000).format('DD/MM/YY HH:mm:ss')
        const timee = moment(t * 1000).format('HH:mm:ss')
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        const { ind } = require('./message/text/lang/')
        const isAdmin = adminNumber.includes(sender.id)
        const isDataURL = (s) => typeof s === 'string' && !!s.match(/^data:((?:\w+\/(?:(?!;).)+)?)((?:;[\w\W]*?[^;])*),(.+)$/);
        const gg = cc.includes(sender.id)
        const hh = bb.includes(sender.id)
        const userId = sender.id.substring(9, 13)
        const isRegistered = _registered.includes(sender.id)
        global.pollfile = 'poll_Config_' + chat.id + '.json'
        global.voterslistfile = 'poll_voters_Config_' + chat.id + '.json'
        const picmod = './media/mod.jpg'
        const isAutoStikerOn = isGroupMsg ? _autostiker.includes(chat.id) : false
        // Bot Prefix
        body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video') && caption) && caption.startsWith(prefix)) ? caption : ''
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const commandd = caption || body || ''
        const arg = body.substring(body.indexOf(' ') + 1)
        const validMessage = caption ? caption : body;
        const arguments = validMessage.trim().split(' ').slice(1)
        const args = body.trim().split(/ +/).slice(1)
        const argv = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const isCmd = body.startsWith(prefix)
        const arghh = commandd.split(' ')
        const argus = commandd.split(' ')
        const uaOverride = process.env.UserAgent
        const q = args.join(' ')
        const ar = body.trim().split(/ +/).slice(1)
        const url = args.length !== 0 ? args[0] : ''
        const errorurl2 = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
        const errorur121 = 'https://i.imgur.com/VKoNMIR.png'
        const _antilink = JSON.parse(fs.readFileSync('./settings/antilink.json'))
        const isNsfw = isGroupMsg ? _nsfw.includes(chat.id) : false
        const isWelcomeOn = isGroupMsg ? _welcome.includes(chat.id) : false
        const isKuis = isGroupMsg ? kuis.includes(chat.id) : false
        const isMtk = isGroupMsg ? kuismtk.includes(chat.id) : false
        const isMtkk = isGroupMsg ? kuismtkk.includes(chat.id) : false
        const isAntiPorn = isGroupMsg ? isPorn.includes(chat.id) : false
        const isImage = type === 'image'
        const reason = q ? q : 'Nothing.'
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedFile = quotedMsg && quotedMsg.type === 'file'
        const isQuotedAudio = quotedMsg && quotedMsg.type === 'audio'
        const isQuotedGif = quotedMsg && quotedMsg.type === 'gif'
        const isQuotedSticker = quotedMsg && quotedMsg.type === 'sticker'
        const stickermsg = message.type === 'sticker'
        
        const santet = [
            'Muntah Paku',
            'Meninggoy',
            'Berak Paku',
            'Muntah Rambut',
            'Ketempelan MONYET!!!',
            'Berak di Celana Terus',
            'Menjadi Gila',
            'Menjadi manusiawi',
            'jomblo selamanya',
            'ga bisa berak',
            'ketiban pesawat',
            'jadi anak mulung',
            'ga jadi pacar zeus',
            'jadi jelek'
        ]

        const kutuk = [
            'Sapi',
            'Batu',
            'Babi',
            'Anak soleh dan soleha',
            'pohon pisang',
            'janda',
            'bangsat',
            'buaya',
            'Jangkrik',
            'Kambbiingg',
            'Bajing',
            'kang seblak',
            'kang gorengan',
            'kang siomay',
            'badut ancol',
            'Tai',
            'Kebo',
            'Badak biar Asli',
            'tai kotok',
            'Bwebwek',
            'Orang Suksesss...... tapi boong',
            'Beban Keluarga' //tambahin  aja
        ]
        const estetek = [
            "https://i.ibb.co/Xk1kggV/Aesthetic-Wallpaper-for-Phone.jpg",
            "https://i.ibb.co/wBNyv8X/image.jpg",
            "https://i.ibb.co/hgcJbg7/Leaving-Facebook.jpg",
            "https://i.ibb.co/27TW3bT/Pinterest.jpg",
            "https://i.ibb.co/2MR16Ct/Image-about-vintage-in-ALittle-Bit-Of-This-And-That-by-Little-Nerdy-Gnome.jpg",
            "https://i.ibb.co/WfrzTWH/minteyroul-on-We-Heart-It.jpg",
            "https://i.ibb.co/dMpkfWT/1001-Kreative-Aesthetic-Wallpaper-Ideen-f-r-das-Handy.jpg",
            "https://i.ibb.co/cN3Br2J/red-grunge-wallpaper-dark-edgy-aesthetic-collage-background-trendy-cool-dark-red-iphone-wallpaper.jpg",
            "https://i.ibb.co/c8QMXZv/ee16de425985d4a1b628dddc1461b546.jpg"
        ]
        const kapan = [
            '1 Minggu lagi',
            '1 Bulan lagi',
            '1 Tahun lagi',
            '100 tahun lagi',
            'gatau',
            '2030'
        ]

        const rate = [
            '100%',
            '95%',
            '90%',
            '85%',
            '80%',
            '75%',
            '70%',
            '65%',
            '60%',
            '55%',
            '50%',
            '45%',
            '40%',
            '35%',
            '30%',
            '25%',
            '20%',
            '15%',
            '10%',
            '5%'
        ]
        const nomormutualan = ['Isi nomor yang ada di registered']
        // [IDENTIFY]
        const isOwnerBot = ownerNumber.includes(pengirim)
        const isBanned = banned.includes(pengirim)
        const isChat = chatt.includes(chatId)
        const isDetectorOn = _antilink.includes(chat.id)
        const usermp33 = usermp3.includes(sender.id)
        const usermp44 = usermp4.includes(sender.id)
        const isInviteLink = await piyo.inviteInfo(body)
        const AntiStickerSpam = antisticker.includes(chatId)
        // Log
        if (isCmd && !isGroupMsg && !isBanned) console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && isGroupMsg && !isBanned) console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))

        // IsBanned
        if (isCmd && isBanned && !isGroupMsg) return console.log(color('[BAN]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && isBanned && isGroupMsg) return console.log(color('[BAN]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))

        // Serial Number Generator
        function GenerateRandomNumber(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        // Generates a random alphanumberic character
        function GenerateRandomChar() {
            var chars = "1234567890";
            var randomNumber = GenerateRandomNumber(0, chars.length - 1);
            return chars[randomNumber];
        }
        // Generates a Serial Number, based on a certain mask
        function GenerateSerialNumber(mask) {
            var serialNumber = "";
            if (mask != null) {
                for (var i = 0; i < mask.length; i++) {
                    var maskChar = mask[i];
                    serialNumber += maskChar == "0" ? GenerateRandomChar() : maskChar;
                }
            }
            return serialNumber;
        }

        /////////////////////////////////GAME TRUTH OF DARE//////////////////////////////////
        if (chats == 'truth') {
            if (!isGroupMsg) return piyo.reply(from, 'Perintah ini hanya bisa digunakan didalam grup!', id);
            
            bb.push(sender.id);
            fs.writeFileSync('./settings/truth.json', JSON.stringify(bb));
        
            fetch('https://raw.githubusercontent.com/Andrewij21/Truth-or-Dare/main/data.json')
                .then(res => res.json()) // Parsing respon sebagai JSON
                .then(data => {
                    let truthArray = data.truth;
                    let selectedTruth = truthArray[Math.floor(Math.random() * truthArray.length)];
        
                    piyo.reply(from, selectedTruth, id);
                    piyo.reply(from, 'Jika pengirim sudah melakukan apa yang disuruh\nSilahkan temannya ketik *sudahtod*');
                })
        }
        if (chats == 'Dare') {
            await piyo.reply(from, 'hurufnya kecil semua ya', id)
        }
        if (chats == 'Truth') {
            await piyo.reply(from, 'hurufnya kecil semua ya', id)
        }
        if (chats == 'dare') {
            if (!isGroupMsg) return piyo.reply(from, 'Perintah ini hanya bisa digunakan didalam grup!', id);
            
            bb.push(sender.id);
            fs.writeFileSync('./settings/dare.json', JSON.stringify(bb));
        
            fetch('https://raw.githubusercontent.com/Andrewij21/Truth-or-Dare/main/data.json')
                .then(res => res.json()) // Parsing respon sebagai JSON
                .then(data => {
                    let dareArray = data.dare;
                    let selectedDare = dareArray[Math.floor(Math.random() * dareArray.length)];
        
                    piyo.reply(from, selectedDare, id);
                    piyo.reply(from, 'Jika pengirim sudah melakukan apa yang disuruh\nSilahkan temannya ketik *sudahtod*');
                })
        }
        if (isGroupMsg) {
            if (!gg && !hh) {
                if (chats == 'sudahtod') {
                    await piyo.sendText(from, `Terimakasih sudah menggunakan game truth or dare`, id)
                    let sudah = cc.indexOf(sender.id);
                    cc.splice(sudah, 1)
                    fs.writeFileSync('./settings/truth.json', JSON.stringify(cc, null, 2))
                    let belom = bb.indexOf(sender.id);
                    bb.splice(belom, 1)
                    fs.writeFileSync('./settings/dare.json', JSON.stringify(bb, null, 2))
                }
            }
        }

        /////////////////////////////////GAME Tebak Kata//////////////////////////////////
        // if (chats === 'mainkankata') {
        //     // if (!isGroupMsg) return piyo.reply(from, 'Perintah ini hanya bisa digunakan didalam grup!', id);
        //     bb.push(sender.id);
        //     fs.writeFileSync('./settings/pertanyaan.json', JSON.stringify(bb));
        
        //     fetch(`${urllolhuman}/api/tebak/kata?apikey=${lolhuman}`)
        //         .then(res => res.json()) // Parsing respon sebagai JSON
        //         .then(data => {
        //             if (data && data.result) {
        //                 const tkatas = data.result;
        //                 if (tkatas && tkatas.pertanyaan) {
        //                     piyo.reply(from, `*Pertanyaan* : ${tkatas.pertanyaan}`, id);
        //                 }
        //             }
        //         })
        // }
        // if (chats === 'jawabankata') {
        //     // if (!isGroupMsg) return piyo.reply(from, 'Perintah ini hanya bisa digunakan didalam grup!', id);
        //     bb.push(sender.id);
        //     fs.writeFileSync('./settings/jawaban.json', JSON.stringify(bb));
        
        //     fetch(`${urllolhuman}/api/tebak/kata?apikey=${lolhuman}`)
        //         .then(res => res.json()) // Parsing respon sebagai JSON
        //         .then(data => {
        //             if (data && data.result) {
        //                 const tkatas = data.result;
        //                 if (tkatas && tkatas.jawaban) {
        //                     piyo.reply(from, `*Jawaban* : ${tkatas.jawaban}`, id);
        //                 }
        //             }
        //         })
        // }
        if (chats === 'mainkankata') {
            bb.push(sender.id);
            fs.writeFileSync('./settings/pertanyaankata.json', JSON.stringify(bb));
        
            fetch(`${urllolhuman}/api/tebak/kata?apikey=${lolhuman}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.result && data.result.pertanyaan) {
                    const currentQuestion = data.result.pertanyaan;

                    // Menyimpan pertanyaan ke dalam struktur data sementara
                    questionAnswerPairs.push({ pertanyaan: currentQuestion, jawaban: null });

                    piyo.reply(from, `*Pertanyaan* : ${currentQuestion}`, id);
                }
            })
        } else if (chats === 'jawabankata') {
            // Jika belum ada pertanyaan yang dijawab
            if (questionAnswerPairs.length === 0 || questionAnswerPairs[0].jawaban !== null) {
                piyo.reply(from, 'Anda harus memulai dengan perintah `mainkankata` terlebih dahulu atau pertanyaan sudah dijawab.', id);
                return;
            }
        
            bb.push(sender.id);
            fs.writeFileSync('./settings/jawabankata.json', JSON.stringify(bb));
        
            fetch(`${urllolhuman}/api/tebak/kata?apikey=${lolhuman}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.result && data.result.jawaban) {
                    const currentAnswer = data.result.jawaban;

                    // Menetapkan jawaban ke dalam struktur data sementara
                    questionAnswerPairs[0].jawaban = currentAnswer;

                    // Memproses jawaban dan melakukan apa yang diperlukan (misalnya, menyimpan ke file JSON atau database)
                    piyo.reply(from, `*Jawaban* : ${currentAnswer}`, id);

                    // Membersihkan struktur data sementara setelah pertanyaan dijawab
                    questionAnswerPairs = [];
                }
            })
        }
        if (chats === 'Mainkankata') {
            await piyo.reply(from, 'hurufnya kecil semua ya', id)
        }
        if (chats === 'Jawabankata') {
            await piyo.reply(from, 'hurufnya kecil semua ya', id)
        }
        if (isGroupMsg) {
            if (!gg && !hh) {
                if (chats === 'sudahkata') {
                    await piyo.sendText(from, `Terimakasih sudah menggunakan game tebak kata`, id)
                    let sudah = cc.indexOf(sender.id);
                    cc.splice(sudah, 1)
                    fs.writeFileSync('./settings/pertanyaan.json', JSON.stringify(cc, null, 2))
                    let belom = bb.indexOf(sender.id);
                    bb.splice(belom, 1)
                    fs.writeFileSync('./settings/jawaban.json', JSON.stringify(bb, null, 2))
                }
            }
        }

        /////////////////////////////////STAY HALAL BROTHER//////////////////////////////////
        function banChat() {
            return halal !== true;
        }

        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        const SN = GenerateSerialNumber("000000000000000000000000")
        ////////////////////////////////////////AFK///////////////////////////////////////////
        const addAfk = (userId, time) => {
            let obj = { id: `${userId}`, time: `${time}`, reason: `${reason}` }
            _afk.push(obj)
            fs.writeFileSync('./settings/afk.json', JSON.stringify(_afk))
        }

        const getAfk = (userId) => {
            let isAfk = false
            Object.keys(_afk).forEach((i) => {
                if (_afk[i].id === userId) {
                    isAfk = true
                }
            })
            return isAfk
        }

        const getAfkReason = (userId) => {
            let position = false
            Object.keys(_afk).forEach((i) => {
                if (_afk[i].id === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _afk[position].reason
            }
        }

        const getAfkTime = (userId) => {
            let position = false
            Object.keys(_afk).forEach((i) => {
                if (_afk[i].id === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _afk[position].time
            }
        }

        const getAfkId = (userId) => {
            let position = false
            Object.keys(_afk).forEach((i) => {
                if (_afk[i].id === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _afk[position].id
            }
        }
        ////////////////////////////////////////AFK///////////////////////////////////////////
        ////////////////////////////////REPLY WITH AUDIO////////////////////////////////////////
        const vn = [
            './media/an2.ogg',
            './media/an1.ogg',
            './media/ana4.ogg'
        ]
        //AUTOMATE
        if (chats == 'assalamualaikum') {
            piyo.sendPtt(from, './media/ana3.ogg', id)
        }
        if (chats == 'Assalamualaikum') {
            piyo.sendPtt(from, './media/ana3.ogg', id)
        }
        if (chats == 'p') {
            if (!isGroupMsg) {
                let randomvn = vn[Math.floor(Math.random() * vn.length)]
                piyo.sendPtt(from, randomvn, id)
            }
        }
        if (chats == 'P') {
            if (!isGroupMsg) {
                let randomvn = vn[Math.floor(Math.random() * vn.length)]
                piyo.sendPtt(from, randomvn, id)
            }
        }
        if (chats == 'bot') {
            if (!isGroupMsg) {
                let randomvn = vn[Math.floor(Math.random() * vn.length)]
                piyo.sendPtt(from, randomvn, id)
            }
        }
        if (chats == 'bot') {
            if (isGroupMsg) {
                let randomvn = vn[Math.floor(Math.random() * vn.length)]
                piyo.sendPtt(from, randomvn, id)
            }
        }
        if (chats == 'bot ini owner') {
            if (isOwnerBot) {
                piyo.sendPtt(from, './media/owner.ogg', id)
            }
        }
        if (chats == 'kontol') {
            piyo.sendPtt(from, './media/ana2.ogg', id)
        }
        if (chats == 'memek') {
            piyo.sendPtt(from, './media/ana2.ogg', id)
        }
        if (chats == 'anjing') {
            piyo.sendPtt(from, './media/ana2.ogg', id)
        }
        if (chats == 'bangsat') {
            piyo.sendPtt(from, './media/ana2.ogg', id)
        }
        if (chats == 'ngentot') {
            piyo.sendPtt(from, './media/ana2.ogg', id)
        }
        if (chats == 'babi') {
            piyo.sendPtt(from, './media/ana2.ogg', id)
        }
        if (chats == 'monyet') {
            piyo.sendPtt(from, './media/ana2.ogg', id)
        }
        if (chats == 'Bot') {
            let randomvn = vn[Math.floor(Math.random() * vn.length)]
            piyo.sendPtt(from, randomvn, id)
        }
        //////////////////////////////////////REMINDER///////////////////////////////////////
        const addReminder = (userId, message, time) => {
            const obj = { id: userId, msg: message, time: Date.now() + toMs(time) }
            _reminder.push(obj)
            fs.writeFileSync('./settings/reminder.json', JSON.stringify(_reminder))
        }

        const getReminderTime = (userId) => {
            let position = false
            Object.keys(_reminder).forEach((i) => {
                if (_reminder[i].id === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _reminder[position].time
            }
        }

        const getReminderMsg = (userId) => {
            let position = false
            Object.keys(_reminder).forEach((i) => {
                if (_reminder[i].id === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _reminder[position].msg
            }
        }

        const getReminderPosition = (userId) => {
            let position = false
            Object.keys(_reminder).forEach((i) => {
                if (_reminder[i].id === userId) {
                    position = i
                }
            })
            return position
        }
        //////////////////////////////////////TEBAK GAMBAR/////////////////////////////////
        if (isGroupMsg) {
            if (_tebak.includes(chats)) {
                await piyo.reply(from, `Jawaban Benar , Kamu mendapatkan 5 Points`, id)
                let tebak = _tebak.indexOf(chats);
                _tebak.splice(tebak, 1)
                point.addCooldown(sender.id)
                point.addLevelingPoint(sender.id, 5, _point)
                fs.writeFileSync('./settings/tebakgambar.json', JSON.stringify(_tebak, null, 2))
                let kuiis = kuis.indexOf(chatId)
                kuis.splice(kuiis, 1)
                fs.writeFileSync('./settings/kuis.json', JSON.stringify(kuis, null, 2))
            }
        }
        ///////////////////////////////////////KUIZ MTK//////////////////////////////////////
        if (isGroupMsg) {
            if (easy.includes(chats)) {
                await piyo.reply(from, `Jawaban Benar, Selamat Anda Mendapatkan 5 Points\nMau Lanjut ? Silahkan Ketik Next`, id)
                await clearTimeout(30000)
                point.addCooldown(sender.id)
                point.addLevelingPoint(sender.id, 5, _point)
                let tebakeasy = easy.indexOf(chats);
                easy.splice(tebakeasy, 1)
                fs.writeFileSync('./settings/easy.json', JSON.stringify(easy, null, 2))
                let kues = kuismtk.indexOf(chatId)
                kuismtk.splice(kues, 1)
                fs.writeFileSync('./settings/kuismtk.json', JSON.stringify(kuismtk, null, 2))
            }

            if (medium.includes(chats)) {
                await piyo.reply(from, `Jawaban Benar, Selamat Anda Mendapatkan 5 Points\nMau Lanjut ? Silahkan Ketik Next`, id)
                point.addCooldown(sender.id)
                point.addLevelingPoint(sender.id, 5, _point)
                let tebakmedium = medium.indexOf(chats);
                medium.splice(tebakmedium, 1)
                fs.writeFileSync('./settings/medium.json', JSON.stringify(medium, null, 2))
                let kues = kuismtk.indexOf(chatId)
                kuismtk.splice(kues, 1)
                fs.writeFileSync('./settings/kuismtk.json', JSON.stringify(kuismtk, null, 2))
            }
            if (hard.includes(chats)) {
                await piyo.reply(from, `Jawaban Benar, Selamat Anda Mendapatkan 5 Points\nMau Lanjut ? Silahkan Ketik Next`, id)
                point.addCooldown(sender.id)
                point.addLevelingPoint(sender.id, 5, _point)
                let tebakhard = hard.indexOf(chats);
                hard.splice(tebakhard, 1)
                fs.writeFileSync('./settings/hard.json', JSON.stringify(hard, null, 2))
                let kues = kuismtk.indexOf(chatId)
                kuismtk.splice(kues, 1)
                fs.writeFileSync('./settings/kuismtk.json', JSON.stringify(kuismtk, null, 2))
            }
        }
        if (chats == 'Next') {
            if (!isGroupMsg) return piyo.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
            await piyo.reply(from, ind.wait(), id)
            await piyo.reply(from, `Silahkan Pilih Level Kuiz\n*Easy*\n*Medium*\n*Hard*`, id)
            kuismtkk.push(chat.id)
            fs.writeFileSync('./settings/kuismtkk.json', JSON.stringify(kuismtkk))
        }
        if (isGroupMsg) {
            if (chats == 'Easy') {
                if (!isMtkk) return
                if (isMtk) return piyo.reply(from, `Kuis Mtk Sedang Berlangsung`, id)
                const kuil = mtkeasy[Math.floor(Math.random() * (mtkeasy.length))];
                const kuil2 = mtkeasy[Math.floor(Math.random() * (mtkeasy.length))];
                const nova = ['+', '-']
                const noval = nova[Math.floor(Math.random() * (nova.length))]
                await piyo.reply(from, `Hasil Dari : \n${kuil} ${noval} ${kuil2} adalah`, id)
                kuismtk.push(chat.id)
                fs.writeFileSync('./settings/kuismtk.json', JSON.stringify(kuismtk))
                if (typeof Math_js.evaluate(`${kuil} ${noval} ${kuil2}`) !== "number") {
                    await piyo.reply(from, ind.notNum(`${kuil}`), id)
                } else {
                    easy.push(`${Math_js.evaluate(`${kuil}${noval}${kuil2}`)}`)
                    fs.writeFileSync('./settings/easy.json', JSON.stringify(easy))
                }
                let kuos = kuismtkk.indexOf(chatId)
                kuismtkk.splice(kuos, 1)
                fs.writeFileSync('./settings/kuismtkk.json', JSON.stringify(kuismtkk, null, 2))
                await rugaapi.sleep(30000)
                if (kuismtk.includes(chat.id)) {
                    await piyo.reply(from, `Jawabannya : ${Math_js.evaluate(`${kuil}${noval}${kuil2}`)}`, id)
                    let kuii = kuismtk.indexOf(chatId)
                    kuismtk.splice(kuii, 1)
                    fs.writeFileSync('./settings/kuismtk.json', JSON.stringify(kuismtk, null, 2))
                    easy.splice(`${Math_js.evaluate(`${kuil}${noval}${kuil2}`)}`, 1)
                    fs.writeFileSync('./settings/easy.json', JSON.stringify(easy, null, 2))
                }
            }
            if (chats == 'Medium') {
                if (!isMtkk) return
                if (isMtk) return piyo.reply(from, `Kuis Mtk Sedang Berlangsung`, id)
                const kuli = mtkmedium[Math.floor(Math.random() * (mtkmedium.length))]
                const kuli2 = mtkmedium[Math.floor(Math.random() * (mtkmedium.length))]
                const mety = ['+', '*']
                const meti = mety[Math.floor(Math.random() * (mety.length))]
                await piyo.reply(from, `Hasil Dari : \n${kuli} ${meti.replace('*', 'x')} ${kuli2} adalah`, id)
                kuismtk.push(chat.id)
                fs.writeFileSync('./settings/kuismtk.json', JSON.stringify(kuismtk))
                if (typeof Math_js.evaluate(`${kuli} ${meti} ${kuli2}`) !== "number") {
                    await piyo.reply(from, ind.notNum(`${kuli}`), id)
                } else {
                    medium.push(`${Math_js.evaluate(`${kuli}${meti}${kuli2}`)}`)
                    fs.writeFileSync('./settings/medium.json', JSON.stringify(medium))
                }
                let kuos = kuismtkk.indexOf(chatId)
                kuismtkk.splice(kuos, 1)
                fs.writeFileSync('./settings/kuismtkk.json', JSON.stringify(kuismtkk, null, 2))
                await rugaapi.sleep(30000)
                if (kuismtk.includes(chat.id)) {
                    await piyo.reply(from, `Jawabannya : ${Math_js.evaluate(`${kuli}${meti}${kuli2}`)}`, id)
                    let kuii = kuismtk.indexOf(chatId)
                    kuismtk.splice(kuii, 1)
                    fs.writeFileSync('./settings/kuismtk.json', JSON.stringify(kuismtk, null, 2))
                    medium.splice(`${Math_js.evaluate(`${kuli}${meti}${kuli2}`)}`, 1)
                    fs.writeFileSync('./settings/medium.json', JSON.stringify(medium, null, 2))
                }
            }
            if (chats == 'Hard') {
                if (!isMtkk) return
                if (isMtk) return piyo.reply(from, `Kuis Mtk Sedang Berlangsung`, id)
                const kull = mtkhard[Math.floor(Math.random() * (mtkhard.length))]
                const kull2 = mtkhard[Math.floor(Math.random() * (mtkhard.length))]
                const udin = ['+', '*']
                const dinu = udin[Math.floor(Math.random() * (udin.length))]
                await piyo.reply(from, `Hasil Dari : \n${kull} ${dinu.replace('*', 'x')} ${kull2} adalah`, id)
                kuismtk.push(chat.id)
                fs.writeFileSync('./settings/kuismtk.json', JSON.stringify(kuismtk))
                if (typeof Math_js.evaluate(`${kull}${dinu}${kull2}`) !== "number") {
                    await piyo.reply(from, ind.notNum(`${kull}`), id)
                } else {
                    hard.push(`${Math_js.evaluate(`${kull}${dinu}${kull2}`)}`)
                    fs.writeFileSync('./settings/hard.json', JSON.stringify(hard))
                }
                let kuos = kuismtkk.indexOf(chatId)
                kuismtkk.splice(kuos, 1)
                fs.writeFileSync('./settings/kuismtkk.json', JSON.stringify(kuismtkk, null, 2))
                await rugaapi.sleep(30000)
                if (kuismtk.includes(chat.id)) {
                    await piyo.reply(from, `Jawabannya : ${Math_js.evaluate(`${kull}${dinu}${kull2}`)}`, id)
                    let kuii = kuismtk.indexOf(chatId)
                    kuismtk.splice(kuii, 1)
                    fs.writeFileSync('./settings/kuismtk.json', JSON.stringify(kuismtk, null, 2))
                    hard.splice(`${Math_js.evaluate(`${kull}${dinu}${kull2}`)}`, 1)
                    fs.writeFileSync('./settings/hard.json', JSON.stringify(hard, null, 2))
                }
            }
        }
        /////////////////////////////////////////YTMP3///////////////////////////////////////

        if (chats == 'dlmp3') {
            if (!usermp3) return
            await piyo.sendFile(from, `./media/audio/${sender.id}.mp3`, 'inifile.mp3', '', id)
            fs.unlinkSync(`./media/audio/${sender.id}.mp3`)
            usermp3.splice(sender.id)
            fs.writeFileSync('./settings/usermp3.json', JSON.stringify(usermp3, null, 2))
        }
        if (chats == 'dlmp4') {
            if (!usermp4) return
            await piyo.sendFile(from, `./media/video/${sender.id}.mp4`, 'inifile.mp4','', id)
            fs.unlinkSync(`./media/video/${sender.id}.mp4`)
            usermp4.splice(sender.id)
            fs.writeFileSync('./settings/usermp4.json', JSON.stringify(usermp4, null, 2))
        }
        
        //////////////////////////////////////REMINDER///////////////////////////////////////
        const isAfkOn = getAfk(sender.id)
        // AFK
        if (isGroupMsg) {
            const checking = getAfk(sender.id)
            for (let ment of mentionedJidList) {
                if (getAfk(ment)) {
                    const getId = getAfkId(ment)
                    const getReason = getAfkReason(getId)
                    const getTime = getAfkTime(getId)
                    await piyo.reply(from, ind.afkMentioned(getReason, getTime), id)
                }
            }
            if (checking && !isCmd) {
                _afk.splice(sender.id, 1)
                fs.writeFileSync('./settings/afk.json', JSON.stringify(_afk))
                await piyo.sendText(from, ind.afkDone(pushname))
            }
        }
        //////////////////////////////////////FUNCTION BALANCE/////////////////////////////////////
        const addATM = (serial) => {
            const obj = { id: serial, uang: 0 }
            uang.push(obj)
            fs.writeFileSync('./settings/uang.json', JSON.stringify(uang))
        }

        const addKoinUser = (serial, amount) => {
            let position = false
            Object.keys(uang).forEach((i) => {
                if (uang[i].id === serial) {
                    position = i
                }
            })
            if (position !== false) {
                uang[position].uang += amount;
                fs.writeFileSync('./settings/uang.json', JSON.stringify(uang))
            }
        }

        const checkATMuser = (serial) => {
            let position = false
            Object.keys(uang).forEach((i) => {
                if (uang[i].id === serial) {
                    position = i
                }
            })
            if (position !== false) {
                return uang[position].uang
            }
        }

        const bayarLimit = (serial, amount) => {
            let position = false
            Object.keys(limit).forEach((i) => {
                if (limit[i].id === serial) {
                    position = i
                }
            })
            if (position !== false) {
                limit[position].limit -= amount;
                fs.writeFileSync('./settings/limit.json', JSON.stringify(limit))
            }
        }

        const confirmATM = (serial, amount) => {
            let position = false
            Object.keys(uang).forEach((i) => {
                if (uang[i].id === serial) {
                    position = i
                }
            })
            if (position !== false) {
                uang[position].uang -= amount
                fs.writeFileSync('./settings/uang.json', JSON.stringify(uang))
            }
        }

        if (isRegistered) {
            const checkATM = checkATMuser(serial)
            try {
                if (checkATM === undefined) addATM(serial)
                const uangsaku = Math.floor(Math.random() * 10) + 50
                addKoinUser(serial, uangsaku)
            } catch (err) {
                console.error(err)
            }
        }
        //////////////////////////////////////ANTI STICKER SPAM////////////////////////////////
        function isStickerMsg(id) {
            if (isOwnerBot, isAdmin) { return false; }
            let found = false;
            for (let i of stickerspam) {
                if (i.id === id) {
                    if (i.msg >= 5) {
                        found === true
                        piyo.reply(from, '*「 𝗔𝗡𝗧𝗜 𝗦𝗣𝗔𝗠 𝗦𝗧𝗜𝗖𝗞𝗘𝗥 」*\nKamu telah SPAM STICKER di grup, kamu akan di kick otomatis oleh xKiwilxbot', message.id).then(() => {
                            piyo.removeParticipant(groupId, id)
                        }).then(() => {
                            const cus = id
                            var found = false
                            Object.keys(stickerspam).forEach((i) => {
                                if (stickerspam[i].id == cus) {
                                    found = i
                                }
                            })
                            if (found !== false) {
                                stickerspam[found].msg = 1;
                                const resultx = 'Database telah direset!'
                                console.log(stickerspam[found])
                                fs.writeFileSync('./settings/stickerspam.json', JSON.stringify(stickerspam));
                                piyo.reply(from, resultx)
                            } else {
                                piyo.reply(from, `Nomor itu tidak terdaftar didalam database!`, id)
                            }
                        })
                        return true;
                    } else {
                        found === true
                        return false;
                    }
                }
            }
            if (found === false) {
                let obj = { id: `${id}`, msg: 1 };
                stickerspam.push(obj);
                fs.writeFileSync('./settings/stickerspam.json', JSON.stringify(stickerspam));
                return false;
            }
        }
        function addStickerCount(id) {
            if (isOwnerBot, isAdmin) { return; }
            var found = false
            Object.keys(stickerspam).forEach((i) => {
                if (stickerspam[i].id == id) {
                    found = i
                }
            })
            if (found !== false) {
                stickerspam[found].msg += 1;
                fs.writeFileSync('./settings/stickerspam.json', JSON.stringify(stickerspam));
            }
        }

        if (isGroupMsg && AntiStickerSpam && !isGroupAdmins && !isAdmin && !isOwner) {
            if (stickermsg === true) {
                if (isStickerMsg(serial)) return
                addStickerCount(serial)
            }
        }
        ///////////////////////////////////////////////////////////BASS////////////////////////////////////
        function stream2Buffer(cb = noop) {
            return new Promise(resolve => {
                let write = new Writable()
                write.data = []
                write.write = function (chunk) {
                    this.data.push(chunk)
                }
                write.on('finish', function () {
                    resolve(Buffer.concat(this.data))
                })

                cb(write)
            })
        }

        /**
         * Convert Buffer to Readable Stream
         * @param {Buffer} buffer
         * @returns {ReadableStream}
         */
        function buffer2Stream(buffer) {
            return new Readable({
                read() {
                    this.push(buffer)
                    this.push(null)
                }
            })
        }

        //////////////
        if (isAutoStikerOn && isMedia && isImage && !isCmd) {
            const mediaData = await decryptMedia(message, uaOverride)
            const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
            await piyo.sendImageAsSticker(from, imageBase64)
                .then(async () => {
                    console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                })
                .catch(async (err) => {
                    console.error(err)
                    await piyo.reply(from, `Error!\n${err}`, id)
                })
        }
        // Anti-Porn Lol Human , Diusahakan apikeya beli premium atau vip
        // Thanks to Vide Frelan  / vide fikri 
        // Kalo mau yang detek sticker juga , chat saya aja
        if (isGroupMsg && isAntiPorn && !isGroupAdmins && isBotGroupAdmins) {
            if (type === 'image') {
                const datafacol = await decryptMedia(message)
                const fotofacol = await uploadImages(datafacol, `fotoface.${sender.id}`)
                const getnsfw = await axios.get(`${urllolhuman}/api/nsfwcheck?apikey=${lolhuman}&img=${fotofacol}`)
                const persen = getnsfw.data.result
                console.log(persen)
                if (Number(getnsfw.data.result.split('%')[0]) >= 30.00) return piyo.reply(from, `*Terdeteksi Mengirim Gambar Yang Berbau Porno*\nKeyakinan Gambar : ${persen}`, id).then(() => piyo.removeParticipant(groupId, sender.id))
            }
        }
        // Anti-group link detector
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isDetectorOn && !isOwner) {
            if (chats.match(new RegExp(/(https:\/\/chat.whatsapp.com)/gi))) {
                await piyo.reply(from, ind.linkDetected(), id)
                await piyo.removeParticipant(groupId, sender.id)
            }
        }
        function baseURI(buffer = Buffer.from([]), metatype = 'text/plain') {
            return `data:${metatype};base64,${buffer.toString('base64')}`
        }
        if (!gg && !hh) {
            switch (command) {
                // Menu and TnC

                ///////////////////////////////////////////////////MENU////////////////////////////////////////////////////////////
                case 'speed':
                case 'ping':
                    await piyo.sendText(from, `Pong!!!!\nSpeed: ${processTime(t, moment())} _Second_`)
                    break
                case 'tnc':
                    await piyo.sendText(from, menuId.textTnC())
                    break
                case 'menuhiburan':
                    await piyo.sendText(from, menuId.textmenuhiburan(pushname))
                    break
                    break
                case 'mentol':
                    await piyo.sendText(from, menuId.textmentol(pushname))
                    break
                case 'menulogo':
                    await piyo.sendText(from, menuId.menulogo(pushname))
                    break
                case 'menusticker':
                    await piyo.sendText(from, menuId.menusticker(pushname))
                    break
                case 'menuhiburan':
                    await piyo.sendText(from, menuId.textmenuhiburan(pushname))
                    break
                case 'menutobat':
                    await piyo.sendText(from, menuId.textmenutobat(pushname))
                    break
                case 'wibuarea':
                    await piyo.sendText(from, menuId.textwibuarea(pushname))
                    break
                case 'menupenting':
                    await piyo.sendText(from, menuId.textmenupenting(pushname))
                    break
                case 'help':
                    await piyo.sendFile(from, picmod, 'inifile.jpg', menuId.textmenubaru(pushname))
                    break
                case 'menubaru':
                    await piyo.sendFile(from, picmod, 'inifile.jpg', menuId.textmenubaru(pushname))
                    break
                case 'setpictmenu':
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const set = await decryptMedia(encryptMedia, uaOverride)
                    fs.writeFileSync(`./media/pphana.jpg`, set)
                    await piyo.reply(from, `Sudah Kak`, id)
                    break
                case 'menulama':
                    const updater = updatepiyobot ? 'yes' : 'no'
                    await piyo.sendText(from, menuId.textmenulama(pushname, updater))
                        .then(() => ((isGroupMsg) && (isGroupAdmins)) ? piyo.sendText(from, `Menu Admin Grup: *${prefix}menuadmin*`) : null)
                    break
                case 'menu':
                    const coloo = await piyo.getAllChatIds()
                    let tod = `${timee}`;
                    await piyo.sendFile(from, picmod, 'inifile.jpg', menuId.textmenubaru(pushname, _registered, coloo, tod))
                    break
                case 'rules':
                case 'rule':
                    await piyo.sendText(from, menuId.textRules())
                    break
                case 'ownermenu':
                    if (!isOwnerBot) return piyo.reply(from, 'Fitur ini hanya untuk owner', id)
                    await piyo.sendText(from, menuId.textownermenu())
                    break
                case 'menuadmin':
                    if (!isGroupMsg) return piyo.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                    if (!isGroupAdmins) return piyo.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                    await piyo.sendText(from, menuId.textAdmin())
                    break
                case 'ownerbot':
                    await piyo.sendContact(from, ownerNumber)
                        .then(() => piyo.sendText(from, 'Jika kalian ingin request fitur silahkan chat nomor owner!'))
                    break
                ///////////////////////////////////////////////////MENU STICKER////////////////////////////////////////////////////
                case 'stickermeme':
                    if ((isMedia || isQuotedImage) && args.length >= 2) {
                        const top = arg.split('|')[0]
                        const bottom = arg.split('|')[1]
                        const encryptMedia = isQuotedImage ? quotedMsg : message
                        const mediaData = await decryptMedia(encryptMedia, uaOverride)
                        const getUrl = await uploadImages(mediaData, false)
                        const ImageBase64 = await meme.custom(getUrl, top, bottom)
                        piyo.sendImageAsSticker(from, ImageBase64, '', null, true)
                            .then(() => {
                                piyo.reply(from, 'Ini makasih!', id)
                            })
                            .catch(() => {
                                piyo.reply(from, 'Ada yang error!')
                            })
                    } else {
                        await piyo.reply(from, `Tidak ada gambar! Silahkan kirim gambar dengan caption ${prefix}meme <teks_atas> | <teks_bawah>\ncontoh: ${prefix}meme teks atas | teks bawah`, id)
                    }
                    break
                case 'addsticker':
                    if (!q) return piyo.reply(from, `Hai  Kak ${pushname} untuk menggunakan fitur save stiker ketik */addsticker* _Nama nya_`, id)
                    if (quotedMsg) {
                        if (quotedMsg.type === 'sticker') {
                            try {
                                mediaData = await decryptMedia(quotedMsg, uaOverride)
                                fs.writeFileSync(`./media/sticker/${encodeURIComponent(q)}.jpg`, mediaData)
                                piyo.reply(from, `Stiker berhasil tersimpan!\n\nUntuk melihat list ketik */liststiker*`, id)
                            } catch (err) {
                                piyo.reply(from, `Gagal save sticker!`, id)
                                piyo.reply(ownerNumber, util.format(err), id)
                            }
                        } else {
                            piyo.reply(from, `Harus reply stiker!`, id)
                        }
                    } else {
                        piyo.reply(from, `Gaada data yang direply gan`, id)
                    }
                    break
                case 'liststicker':
                    const liststicker = fs.readdirSync('./media/sticker/')
                    let capliststik = `Ketik perintah */getstiker _Nama nya_* untuk mengambil data stiker\n\n*Jumlah stiker* : ${liststicker.length}\n\n*Stiker tersimpan :*\n`
                    for (let i = 0; i < liststicker.length; i++) {
                        capliststik += `\n➣ ${liststicker[i].replace('.jpg', '')}`
                    }
                    piyo.reply(from, capliststik, id)
                    break

                case 'getsticker':
                    if (!q) return piyo.reply(from, `Hai Kak ${pushname} untuk menggunakan fitur get stiker ketik */getstiker* _Nama nya_`, id)
                    try {
                        const datastick = await fs.readFileSync('./media/sticker/' + q + '.jpg', { encoding: "base64" })
                        const imageBase64 = `data:image/jpeg;base64,${datastick.toString('base64')}`
                        await piyo.sendImageAsSticker(from, imageBase64, { author: 'xKiwilx', pack: 'xKiwilx BOT' })
                    } catch (err) {
                        piyo.reply(from, `Kesalahan mengambil stiker! cek kembali nama stiker dengan ketik */liststiker*`)
                    }
                    break

                case 'delsticker':
                    if (isOwnerBot) return piyo.reply(from, `Hanya untuk owner bot!`, id)
                    try {
                        await fs.unlinkSync('./media/sticker/' + q + '.jpg').then(() => {
                            piyo.reply(from, `Menghapus Stiker ${encodeURIComponent(q)}`, id)
                        })
                    } catch (err) {

                    }
                    break

                case 'takestick':
                    if (quotedMsg && quotedMsg.type == 'sticker') {
                        if (!q.includes('|')) return await piyo.reply(from, `Untuk mengubah watermark sticker, reply sticker dengan caption ${prefix}takestick package_name | author_name\n\nContoh: ${prefix}takestick piyo | bot`, id)
                        await piyo.reply(from, ind.wait(), id)
                        const packnames = q.substring(0, q.indexOf('|') - 1)
                        const authors = q.substring(q.lastIndexOf('|') + 2)
                        const mediaData = await decryptMedia(quotedMsg)
                        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await piyo.sendImageAsSticker(from, imageBase64, { author: `${authors}`, pack: `${packnames}` })
                            .catch(async (err) => {
                                console.error(err)
                                await piyo.reply(from, 'Error!', id)
                            })
                    } else {
                        await piyo.reply(from, `Reply sticker yang ingin dicolong dengan caption ${prefix}takestick package_name | author_name\n\nContoh: ${prefix}takestick piyo | bot`, id)
                    }
                    break
                case 'stimg':
                case 'toimg':
                    if (quotedMsg && quotedMsg.type == 'sticker') {
                        const mediaData = await decryptMedia(quotedMsg)
                        piyo.reply(from, `Sedamg di proses! Silahkan tunggu sebentar...`, id)
                        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await piyo.sendFile(from, imageBase64, 'imgsticker.jpg', 'Berhasil convert Sticker to Image!', id)
                            .then(() => {
                                console.log(`Sticker to Image Processed for ${processTime(t, moment())} Seconds`)
                            })
                    } else if (!quotedMsg) return piyo.reply(from, `Format salah, silahkan tag sticker yang ingin dijadikan gambar!`, id)
                    break
                case 'sticker':
                case 'stiker':
                    if (isMedia && isImage || isQuotedImage) {
                        try {
                            await piyo.reply(from, ind.wait(), id)
                            const encryptMedia = isQuotedImage ? quotedMsg : message
                            const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                            const author = ''
                            const pack = 'bot'
                            const mediaData = await decryptMedia(encryptMedia, uaOverride)
                            const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                            await piyo.sendImageAsSticker(from, imageBase64, { author: `${author}`, pack: `${pack}` })
                            console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                        } catch (err) {
                            console.error(err)
                            await piyo.reply(from, 'Error!', id)
                        }
                    } else if (args[0] === 'nobg') {
                        if (isMedia || isQuotedImage) {
                            const encryptMedia = isQuotedImage ? quotedMsg : message
                            const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                            const mediaData = await decryptMedia(encryptMedia, uaOverride)
                            const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                            await piyo.sendImageAsSticker(from, imageBase64, { keepScale: true, removebg: true })
                        } else {
                            await piyo.reply(from, 'Format pesan salah...', id)
                        }
                    } else if (args.length === 1) {
                        if (!isUrl(url)) { await piyo.reply(from, 'Maaf, link yang kamu kirim tidak valid.', id) }
                        piyo.sendStickerfromUrl(from, url).then((r) => (!r && r !== undefined)
                            ? piyo.sendText(from, 'Maaf, link yang kamu kirim tidak memuat gambar.')
                            : piyo.reply(from, 'Here\'s your sticker')).then(() => console.log(`Sticker Processed for ${processTime(t, moment())} Second`))
                    } else {
                        await piyo.reply(from, `Tidak ada gambar! Untuk menggunakan ${prefix}sticker\n\n\nKirim gambar dengan caption\n${prefix}sticker <biasa>\n${prefix}sticker nobg <tanpa background>\n\natau Kirim pesan dengan\n${prefix}sticker <link_gambar>`, id)
                        await piyo.sendFile(from, './media/tutorial.png', id)
                    } if (isMedia && type === 'video' || mimetype === 'image/gif') {
                        await piyo.reply(from, ind.wait(), id)
                        try {
                            const mediaData = await decryptMedia(message, uaOverride)
                            await piyo.sendMp4AsSticker(from, mediaData, { fps: 24, startTime: `00:00:00.0`, endTime: `00:00:05.0`, loop: 0 })
                                .then(async () => {
                                    console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                    await piyo.sendText(from, ind.ok())
                                })
                        } catch (err) {
                            console.error(err)
                            await piyo.reply(from, ind.videoLimit(), id)
                        }
                    } else if (isQuotedGif || isQuotedVideo) {
                        await piyo.reply(from, ind.wait(), id)
                        try {
                            const mediaData = await decryptMedia(quotedMsg, uaOverride)
                            await piyo.sendMp4AsSticker(from, mediaData, { fps: 24, startTime: `00:00:00.0`, endTime: `00:00:05.0`, loop: 0 })
                                .then(async () => {
                                    console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                    await piyo.sendText(from, ind.ok())
                                })
                        } catch (err) {
                            console.error(err)
                            await piyo.reply(from, ind.videoLimit(), id)
                        }
                    }
                    break
                case 'stickergif':
                case 'stikergif':
                    if (isMedia && type === 'video' || mimetype === 'image/gif') {
                        await piyo.reply(from, ind.wait(), id)
                        try {
                            const mediaData = await decryptMedia(message, uaOverride)
                            await piyo.sendMp4AsSticker(from, mediaData, { fps: 24, startTime: `00:00:00.0`, endTime: `00:00:05.0`, loop: 0 })
                                .then(async () => {
                                    console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                    await piyo.sendText(from, ind.ok())
                                })
                        } catch (err) {
                            console.error(err)
                            await piyo.reply(from, ind.videoLimit(), id)
                        }
                    } else if (isQuotedGif || isQuotedVideo) {
                        await piyo.reply(from, ind.wait(), id)
                        try {
                            const mediaData = await decryptMedia(quotedMsg, uaOverride)
                            await piyo.sendMp4AsSticker(from, mediaData, { fps: 24, startTime: `00:00:00.0`, endTime: `00:00:05.0`, loop: 0 })
                                .then(async () => {
                                    console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                    await piyo.sendText(from, ind.ok())
                                })
                        } catch (err) {
                            console.error(err)
                            await piyo.reply(from, ind.videoLimit(), id)
                        }
                    } else {
                        await piyo.reply(from, ind.wrongFormat(), id)
                    }
                    break
                case 'stikergiphy':
                case 'stickergiphy':
                    if (args.length !== 1) return piyo.reply(from, `Maaf, format pesan salah.\nKetik pesan dengan ${prefix}stickergiphy <link_giphy>`, id)
                    const isGiphy = url.match(new RegExp(/https?:\/\/(www\.)?giphy.com/, 'gi'))
                    const isMediaGiphy = url.match(new RegExp(/https?:\/\/media.giphy.com\/media/, 'gi'))
                    if (isGiphy) {
                        const getGiphyCode = url.match(new RegExp(/(\/|\-)(?:.(?!(\/|\-)))+$/, 'gi'))
                        if (!getGiphyCode) { return piyo.reply(from, 'Gagal mengambil kode giphy', id) }
                        const giphyCode = getGiphyCode[0].replace(/[-\/]/gi, '')
                        const smallGifUrl = 'https://media.giphy.com/media/' + giphyCode + '/giphy-downsized.gif'
                        piyo.sendGiphyAsSticker(from, smallGifUrl).then(() => {
                            piyo.reply(from, 'Here\'s your sticker')
                            console.log(`Sticker Processed for ${processTime(t, moment())} Second`)
                        }).catch((err) => console.log(err))
                    } else if (isMediaGiphy) {
                        const gifUrl = url.match(new RegExp(/(giphy|source).(gif|mp4)/, 'gi'))
                        if (!gifUrl) { return piyo.reply(from, 'Gagal mengambil kode giphy', id) }
                        const smallGifUrl = url.replace(gifUrl[0], 'giphy-downsized.gif')
                        piyo.sendGiphyAsSticker(from, smallGifUrl)
                            .then(() => {
                                piyo.reply(from, 'Here\'s your sticker')
                                console.log(`Sticker Processed for ${processTime(t, moment())} Second`)
                            })
                            .catch(() => {
                                piyo.reply(from, `Ada yang error!`, id)
                            })
                    } else {
                        await piyo.reply(from, 'Maaf, command sticker giphy hanya bisa menggunakan link dari giphy.  [Giphy Only]', id)
                    }
                    break
                case 'stickertottext':
                case 'stikerteks':
                    if (arguments.length < 1) return await piyo.reply(from, '_⚠️ Contoh Penggunaan Perintah : /stikerteks <kalimat>_', id);
                    const teksLink = rugaapi.tosticker(arguments);
                    await piyo.sendStickerfromUrl(from, teksLink);
                    break
                case 'linesticker':
                    await piyo.reply(from, ind.wait(), id)
                    rugaapi.linesticker()
                        .then(async ({ result }) => {
                            let lines = `_*Hasil Pencarian*_\n`
                            for (let i = 0; i < result.hasil.length; i++) {
                                lines += `\n\n*Judul* : ${result.hasil[i].title}\n\nURL: ${result.hasil[i].uri}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                            }
                            piyo.reply(from, lines, id);
                        })
                    break
                case 'stickerlightning':
                case 'slightning':
                    if (isMedia && type === 'image' || isQuotedImage) {
                        await piyo.reply(from, ind.wait(), id)
                        const encryptMedia = isQuotedImage ? quotedMsg : message
                        const mediaData = await decryptMedia(encryptMedia, uaOverride)
                        const imageLink = await uploadImages(mediaData, `lightning.${sender.id}`)
                        rugaapi.stickerLight(imageLink)
                            .then(async ({ result }) => {
                                await piyo.sendStickerfromUrl(from, result.imgUrl)
                                    .then(async () => {
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        await piyo.sendText(from, ind.ok())
                                    })
                            })
                            .catch(async (err) => {
                                console.error(err)
                                await piyo.reply(from, `Error!\n${err}`, id)
                            })
                    } else {
                        await piyo.reply(from, ind.wrongFormat(), id)
                    }
                    break
                case 'stickerfire':
                case 'sfiree':

                    if (isMedia && type === 'image' || isQuotedImage) {
                        await piyo.reply(from, ind.wait(), id)
                        const encryptMedia = isQuotedImage ? quotedMsg : message
                        const mediaData = await decryptMedia(encryptMedia, uaOverride)
                        const imageLink = await uploadImages(mediaData, `fire.${sender.id}`)
                        rugaapi.stickerFire(imageLink)
                            .then(async ({ result }) => {
                                await piyo.sendStickerfromUrl(from, result.imgUrl)
                                    .then(async () => {
                                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                                        await piyo.sendText(from, ind.ok())
                                    })
                            })
                            .catch(async (err) => {
                                console.error(err)
                                await piyo.reply(from, `Error!\n${err}`, id)
                            })
                    } else {
                        await piyo.reply(from, ind.wrongFormat(), err)
                    }
                    break

                /////////////////////////////////////////////MENU LOGO////////////////////////////////////////////////////////////
                case 'phcomment':
                    if (!isxKiwilxganteng) return piyo.sendText(from, 'chat owner dulu coba:v\nKetik /ownerbot', id)
                    if (!q.includes('|')) return await piyo.reply(from, ind.wrongFormat(), id)
                    const usernamePh = q.substring(0, q.indexOf('|') - 1)
                    const commentPh = q.substring(q.lastIndexOf('|') + 2)
                    const ppPhRaw = await piyo.getProfilePicFromServer(sender.id)
                    const dataPpPh = await bent('buffer')(ppPhRaw)
                    const linkPpPh = await uploadImages(dataPpPh, `${sender.id}_ph`)
                    await piyo.reply(from, ind.wait(), id)
                    const preproccessPh = await axios.get(`https://nekobot.xyz/api/imagegen?type=phcomment&image=${linkPpPh}&text=${commentPh}&username=${usernamePh}`)
                    await piyo.sendFileFromUrl(from, preproccessPh.data.message, 'ph.jpg', '', id)
                    break

                case 'valentine':

                    if (isMedia && type === 'image' || isQuotedImage) {
                        await piyo.reply(from, ind.wait(), id)
                        const nama = q.substring(0, q.indexOf('|'))
                        const pasangan = q.substring(q.lastIndexOf('|') + 2)
                        const encryptMedia = isQuotedImage ? quotedMsg : message
                        const dataPasangan = await decryptMedia(encryptMedia, uaOverride)
                        const foto = await piyo.getProfilePicFromServer(sender.id)
                        const dataMu = await bent('buffer')(foto)
                        const fotoMu = await uploadImages(dataMu)
                        const fotoPasangan = await uploadImages(dataPasangan)
                        rugaapi.valentine(nama, pasangan, fotoMu, fotoPasangan)
                            .then(async ({ result }) => {
                                await piyo.sendFileFromUrl(from, result.imgUrl, `${nama}_${pasangan}.jpg`, '', id)
                                    .then(() => console.log('Success creating image!'))
                            })
                            .catch(async (err) => {
                                console.error(err)
                                await piyo.reply(from, 'Error!', id)
                            })
                    } else {
                        await piyo.reply(from, ind.wrongFormat(), id)
                    }
                    break

                case 'trumptweet':

                    if (args.length == 0) return piyo.reply(from, `Kirim perintah /trumptweet [ Teks ], contoh /trumptweet xKiwilx`, id)
                    piyo.reply(from, ind.wait(), id)
                    const tump = body.slice(12)
                    const trumj = await axios.get(`https://nekobot.xyz/api/imagegen?type=trumptweet&text=${tump}`)
                    const tumh = trumj.data
                    if (tumh.message.endsWith('.png')) {
                        var ext = '.png'
                    } else {
                        var ext = '.jpg'
                    }
                    piyo.sendFileFromUrl(from, tumh.message, `Nekonime${ext}`, 'Noh mhank', id)
                    await limitAdd(serial)
                    break
                //////////////////////////////////////////////////MENU GRUP////////////////////////////////////////////////////////
                case 'afk':
                    if (!isGroupMsg) return await piyo.reply(from, ind.groupOnly(), id)
                    if (isAfkOn) return await piyo.reply(from, ind.afkOnAlready(), id)
                    addAfk(sender.id, time, reason)
                    await piyo.reply(from, ind.afkOn(pushname, reason), id)
                    break

                case 'welcome':
                    if (!isGroupMsg) return await piyo.reply(from, ind.groupOnly(), id)
                    if (!isGroupAdmins) return await piyo.reply(from, ind.adminOnly(), id)
                    if (ar[0] === 'enable') {
                        if (isWelcomeOn) return await piyo.reply(from, ind.welcomeOnAlready(), id)
                        _welcome.push(chat.id)
                        fs.writeFileSync('./settings/welcome.json', JSON.stringify(_welcome))
                        await piyo.reply(from, ind.welcomeOn(), id)
                    } else if (ar[0] === 'disable') {
                        _welcome.splice(chat.id, 1)
                        fs.writeFileSync('./settings/welcome.json', JSON.stringify(_welcome))
                        await piyo.reply(from, ind.welcomeOff(), id)
                    } else {
                        await piyo.reply(from, ind.wrongFormat(), id)
                    }
                    break

                case 'reminder': // by Slavyan
                    if (!q.includes('|')) return await piyo.reply(from, ind.wrongFormat(), id)
                    const timeRemind = q.substring(0, q.indexOf('|') - 1)
                    const messRemind = q.substring(q.lastIndexOf('|') + 2)
                    const parsedTime = ms(toMs(timeRemind))
                    addReminder(sender.id, messRemind, timeRemind)
                    await piyo.sendTextWithMentions(from, `*「 REMINDER 」*\n\nReminder diaktifkan! :3\n\n➸ *Pesan*: ${messRemind}\n➸ *Durasi*: ${parsedTime.hours} jam ${parsedTime.minutes} menit ${parsedTime.seconds} detik\n➸ *Untuk*: @${sender.id.replace('@c.us', '')}`, id)
                    const intervRemind = setInterval(async () => {
                        if (Date.now() > getReminderTime(sender.id)) {
                            await piyo.sendTextWithMentions(from, `⏰ *「 REMINDER 」* ⏰\n\nAkhirnya tepat waktu~ @${sender.id.replace('@c.us', '')}\n\n➸ *Pesan*: ${getReminderMsg(sender.id)}`)
                            _reminder.splice(getReminderPosition(sender.id), 1)
                            fs.writeFileSync('./settings/reminder.json', JSON.stringify(_reminder))
                            clearInterval(intervRemind)
                        }
                    }, 1000)
                    break
                case 'antisticker':
                    if (!isGroupMsg) return piyo.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                    if (!isGroupAdmins) return piyo.reply(from, `Perintah ini hanya bisa di gunakan oleh Admin group!`, id)
                    if (!isBotGroupAdmins) return piyo.reply(from, `Perintah ini hanya bisa di gunakan jika Bot menjadi Admin!`, id)
                    if (ar[0] === 'enable') {
                        var cek = antisticker.includes(chatId);
                        if (cek) {
                            return piyo.reply(from, `*「 ANTI SPAM STICKER 」*\nStatus : Sudah Aktif`, id)
                        } else {
                            antisticker.push(chatId)
                            fs.writeFileSync('./settings/antisticker.json', JSON.stringify(antisticker))
                            piyo.reply(from, `*「 ANTI SPAM STICKER 」*\nStatus : Aktif`, id)
                        }
                    } else if (ar[0] === 'disable') {
                        var cek = antisticker.includes(chatId);
                        if (cek) {
                            return piyo.reply(from, `*「 ANTI SPAM STICKER 」*\nStatus : Sudak DiNonaktif`, id) //if number already exists on database
                        } else {
                            let nixx = antisticker.indexOf(chatId)
                            antisticker.splice(nixx, 1)
                            fs.writeFileSync('./settings/antisticker.json', JSON.stringify(antisticker))
                            piyo.reply(from, `*「 ANTI SPAM STICKER 」*\nStatus : Nonaktif`, id)
                            limitAdd(serial)
                        }
                    }
                    break
                case 'antiporn': //ini antipornnya beli dulu apikenya, cuma support gambar / kalo mau support sticker dan video bisa ke saya , wa.me/6281414046576
                    if (!isGroupMsg) return piyo.reply(from, `Fitur ini hanya bisa diaktifkan didalam grup!`, id)
                    if (!isGroupAdmins) return piyo.reply(from, 'Perintah ini hanya bisa digunakan oleh Admin Grup!', id)
                    if (!isBotGroupAdmins) return piyo.reply(from, 'Jadikan bot sebagai Admin terlebih dahulu!', id)
                    if (ar[0] == 'on') {
                        if (isAntiPorn) return piyo.reply(from, 'Anti-porn sudah pernah diaktifkan di grup ini sebelumnya!', id)
                        isPorn.push(chatId)
                        fs.writeFileSync('./settings/antiporn.json', JSON.stringify(isPorn))
                        piyo.reply(from, '*ANTI PORN*\n\nPerhatian untuk member grup\nJika ada member yang mengirimkan porn, maka otomatis akan dikick dari grup ini!\n\n*xKiwilxbot*', id)
                    } else if (ar[0] == 'off') {
                        let inlink = isPorn.indexOf(chatId)
                        isPorn.splice(inlink, 1)
                        fs.writeFileSync('./settings/antiporn.json', JSON.stringify(isPorn))
                        piyo.reply(from, 'Anti Porn Sudah Dimatikan Di Grup Ini', id)
                    } else {
                        piyo.reply(from, `Untuk mengaktifkan antiporn gunakan\n${prefix}antiporn on \n${prefix}antiporn off `, id)
                    }
                    break
                case 'antilink':
                    if (!isGroupMsg) return await piyo.reply(from, ind.groupOnly(), id)
                    if (!isGroupAdmins) return await piyo.reply(from, ind.adminOnly(), id)
                    if (!isBotGroupAdmins) return await piyo.reply(from, ind.botNotAdmin(), id)
                    if (ar[0] === 'enable') {
                        if (isDetectorOn) return await piyo.reply(from, ind.detectorOnAlready(), id)
                        _antilink.push(chat.id)
                        fs.writeFileSync('./settings/antilink.json', JSON.stringify(_antilink))
                        await piyo.reply(from, ind.detectorOn(name, formattedTitle), id)
                    } else if (ar[0] === 'disable') {
                        _antilink.splice(chat.id, 1)
                        fs.writeFileSync('./settings/antilink.json', JSON.stringify(_antilink))
                        await piyo.reply(from, ind.detectorOff(), id)
                    } else {
                        await piyo.reply(from, ind.wrongFormat(), id)
                    }
                    break

                case 'nsfw':
                    if (!isGroupMsg) return await piyo.reply(from, ind.groupOnly(), id)
                    if (!isGroupAdmins) return await piyo.reply(from, ind.adminOnly(), id)
                    if (ar[0] === 'enable') {
                        _nsfw.push(chat.id)
                        fs.writeFileSync('./settings/nsfw.json', JSON.stringify(_nsfw))
                        await piyo.reply(from, ind.nsfwOn(), id)
                    } else if (ar[0] === 'disable') {
                        _nsfw.splice(chat.id, 1)
                        fs.writeFileSync('./settings/nsfw.json', JSON.stringify(_nsfw))
                        await piyo.reply(from, ind.nsfwOff(), id)
                    } else {
                        await piyo.reply(from, ind.wrongFormat(), id)
                    }
                    break

                case 'jadian':
                    if (!isGroupMsg) return piyo.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)
                    const mem = groupMembers
                    const aku = mem[Math.floor(Math.random() * mem.length)];
                    const kamu = mem[Math.floor(Math.random() * mem.length)];
                    const sapa = `Cieee... @${aku.replace(/[@c.us]/g, '')} (💘) @${kamu.replace(/[@c.us]/g, '')} baru jadian nih\nBagi pj nya dong`
                    await piyo.sendTextWithMentions(from, sapa)
                    break
                case 'suit':
                    if (!isGroupMsg) return piyo.reply(from, 'perintah ini hanya dapat digunakan di dalam grup', id)

                    const batu = await fs.readFileSync(`./media/suit/batu.png`, { encoding: "base64" })
                    const gunting = await fs.readFileSync(`./media/suit/gunting.png`, { encoding: "base64" })
                    const kertas = await fs.readFileSync(`./media/suit/kertas.png`, { encoding: "base64" })

                    const suitacak = Math.floor(Math.random() * 3)

                    console.log(suitacak)

                    if (suitacak === 0) {
                        await piyo.sendImageAsSticker(from, `data:image/png;base64,${batu.toString('base64')}`)
                    } else if (suitacak === 1) {
                        await piyo.sendImageAsSticker(from, `data:image/png;base64,${gunting.toString('base64')}`)
                    } else {
                        await piyo.sendImageAsSticker(from, `data:image/png;base64,${kertas.toString('base64')}`)
                    }
                    break
                case 'getpic':

                    if (mentionedJidList.length !== 0) {
                        const userPic = await piyo.getProfilePicFromServer(mentionedJidList[0])
                        if (userPic === undefined) {
                            pek = errorImg
                        } else {
                            pek = userPic
                        }
                        await piyo.sendFileFromUrl(from, pek, 'pic.jpg', '', id)
                    } else if (args.length !== 0) {
                        const userPic = await piyo.getProfilePicFromServer(args[0] + '@c.us')
                        if (userPic === undefined) {
                            peks = errorImg
                        } else {
                            peks = userPic
                        }
                        await piyo.sendFileFromUrl(from, peks, 'pic.jpg', '', id)
                    } else {
                        await piyo.reply(from, ind.wrongFormat(), id)
                    }
                    break

                case 'santet':

                    if (!isGroupMsg) return piyo.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                    if (mentionedJidList.length === 0) return piyo.reply(from, 'Tag member yang mau disantet\n\nContoh : /santet @tag | kalo berak kaga di siram', id)
                    if (args.length === 1) return piyo.reply(from, 'Masukkan alasan kenapa menyantet dia!!\n\nContoh : /santet @tag | kalo berak kaga di siram', id)
                    const terima1 = santet[Math.floor(Math.random() * (santet.length))]
                    const target = arg.split('|')[0]
                    const alasan = arg.split('|')[1]
                    await piyo.sendTextWithMentions(from, `Santet terkirim ke ${target}, Dengan alasan${alasan}\n\nJenis Santet Yang di Terima Korban adalah *${terima1}*`)
                    break

                case 'kutuk':
                    if (!isGroupMsg) return piyo.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)

                    if (mentionedJidList.length === 0) return piyo.reply(from, 'Tag member yang mau dikutuk\n\nContoh : /kutuk @tag | kalo berak kaga di siram', id)
                    if (args.length === 1) return piyo.reply(from, 'Masukkan alasan kenapa menyantet dia!!\n\nContoh : /kutuk @tag | kalo berak kaga di siram', id)
                    const terima2 = kutuk[Math.floor(Math.random() * (kutuk.length))]
                    const target2 = arg.split('|')[0]
                    const alasan2 = arg.split('|')[1]
                    await piyo.sendTextWithMentions(from, `Kutuk kau ${target2} jadi *${terima2}*`)
                    break

                case 'stopkuiz':
                    if (!isKuis) return piyo.reply(from, `Main Stop Stop Aja , Kuisnya gk ada bre\nBilang aja lu mau  liat cewe piyo kan`, id)
                    if (!isGroupMsg) return piyo.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    try {
                        let stop = _tebak.indexOf(chats);
                        _tebak.splice(stop, 1)
                        fs.writeFileSync('./settings/tebakgambar.json', JSON.stringify(_tebak, null, 2))
                        let stopis = kuis.indexOf(chatId)
                        kuis.splice(stopis, 1)
                        fs.writeFileSync('./settings/kuis.json', JSON.stringify(kuis, null, 2))
                        piyo.sendFileFromUrl(from, 'https://i.imgur.com/qkIGnR1.jpg', 'inifile.jpg', 'Yah kok udahan sih :(\nNanti Main Kuis Lagi Yak', id)
                    } catch (err) {
                    }
                    break

                case 'sider':
                    if (!isGroupMsg) return piyo.reply(from, `Perintah ini hanya bisa di gunakan dalam group!`, id)
                    if (!quotedMsg) return piyo.reply(from, `Tolong Reply Pesan Bot`, id)
                    if (!quotedMsgObj.fromMe) return piyo.reply(from, `Tolong Reply Pesan Bot`, id)
                    try {
                        const reader = await piyo.getMessageReaders(quotedMsgObj.id)
                        let list = ''
                        for (let pembaca of reader) {
                            list += `- @${pembaca.id.replace(/@c.us/g, '')}\n`
                        }
                        await piyo.sendTextWithMentions(from, `Ngeread doangg.. Nimbrung kagaa\n${list}`)
                    } catch (err) {
                        console.log(err)
                        piyo.reply(from, `Maaf, Belum Ada Yang Membaca Pesan Bot atau Mereka Menonaktifkan Read Receipts`, id)
                    }
                    break

                case 'koin':
                    if (!isGroupMsg) return piyo.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    const side = Math.floor(Math.random() * 2) + 1
                    if (side == 1) {
                        piyo.sendStickerfromUrl(from, 'https://i.ibb.co/YTWZrZV/2003-indonesia-500-rupiah-copy.png', { method: 'get' })
                    } else {
                        piyo.sendStickerfromUrl(from, 'https://i.ibb.co/bLsRM2P/2003-indonesia-500-rupiah-copy-1.png', { method: 'get' })
                    }
                    break

                case 'dadu':
                    if (!isGroupMsg) return piyo.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    const dice = Math.floor(Math.random() * 6) + 1
                    await piyo.sendStickerfromUrl(from, 'https://www.random.org/dice/dice' + dice + '.png', { method: 'get' })
                    break

                case 'slap':
                    piyo.reply(from, `sebentar cuk`, id);
                    const person = author.replace('@c.us', '')
                    await piyo.sendGiphyAsSticker(from, 'https://media.giphy.com/media/S8507sBJm1598XnsgD/source.gif')
                    piyo.sendTextWithMentions(from, '@' + person + ' *slapped* ')
                    break;

                case 'peluk': //thanks to SASHA BOT
                    const janjing = author.replace('@c.us', '')
                    await piyo.sendGiphyAsSticker(from, 'https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif')
                    piyo.sendTextWithMentions(from, `@` + janjing + ' *peyuuuk* ')
                    break;

                case 'pollresult':
                    if (!isRegistered) return piyo.reply(from, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user xKiwilxbot, untuk pendaftaran bisa menggunakan /register nama | Jenis Kelamin. Contoh: /register ${pushname}|cewe`, id)
                    feature.getpoll(piyo, message, pollfile, voterslistfile)
                    break

                case 'vote':
                    if (!isRegistered) return piyo.reply(from, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user xKiwilxbot, untuk pendaftaran bisa menggunakan /register nama | Jenis Kelamin. Contoh: /register ${pushname}|cewe`, id)
                    feature.voteadapter(piyo, message, pollfile, voterslistfile)
                    break

                case 'addpoll':
                    if (!isRegistered) return piyo.reply(from, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user xKiwilxbot, untuk pendaftaran bisa menggunakan /register nama | Jenis Kelamin. Contoh: /register ${pushname}|cewe`, id)
                    feature.adminpollreset(piyo, message, message.body.slice(9), pollfile, voterslistfile)
                    break

                case 'addv':
                    if (!isRegistered) return piyo.reply(from, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user xKiwilxbot, untuk pendaftaran bisa menggunakan /register nama | Jenis Kelamin. Contoh: /register ${pushname}|cewe`, id)
                    feature.addcandidate(piyo, message, message.body.slice(6), pollfile, voterslistfile)
                    break

                case 'edotensei':

                    if (!isGroupMsg) return piyo.reply(from, 'Fitur ini hanya bisa di gunakan dalam group', id)
                    if (!isGroupAdmins) return piyo.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                    if (!isBotGroupAdmins) return piyo.reply(from, 'Wahai admin, jadikan saya sebagai admin grup dahulu :)', id)
                    if (mentionedJidList.length === 0) return piyo.reply(from, 'Fitur untuk menghapus member lalu menambahkan member kembali,kirim perintah ${prefix}edotensei @tagmember', id)
                    for (let i = 0; i < mentionedJidList.length; i++) {
                        if (groupAdmins.includes(mentionedJidList[i])) return piyo.reply(from, ind.error, id)
                        if (ownerNumber.includes(mentionedJidList[i])) return piyo.reply(from, ind.error, id)
                        await piyo.removeParticipant(groupId, mentionedJidList[i])
                        piyo.reply(from, 'EDOTENSEI', id)
                        await piyo.sendGiphyAsSticker(from, 'https://media.giphy.com/media/bq6o9H4ryyZzw2WiSA/giphy.gif')
                        await rugaapi.sleep(4000)
                        await piyo.addParticipant(from, `${mentionedJidList}`)
                        await piyo.sendTextWithMentions(from, `Selamat datang ngab @${mentionedJidList}`, id)
                    }
                    break
                case 'ganteng':
                    if (!isGroupMsg) return piyo.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                    const gmekk = await piyo.getGroupMembersId(groupId)
                    let gmikk = gmekk[Math.floor(Math.random() * gmekk.length)]
                    const mmkkkk = `YANG PALING GANTENG DISINI ADALAH @${gmikk.replace(/@c.us/g, '')}`
                    piyo.sendTextWithMentions(from, mmkkkk, id)
                    break
                case 'gay':
                    if (!isGroupMsg) return piyo.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                    const gmekkkk = await piyo.getGroupMembersId(groupId)
                    let gmikkkk = gmekkk[Math.floor(Math.random() * gmekkkk.length)]
                    const mmkkkkkk = `YANG PALING GAY DISINI ADALAH @${gmikkkk.replace(/@c.us/g, '')}`
                    piyo.sendTextWithMentions(from, mmkkkkkk, id)
                    break
                ////////////////////////////////////////////////////////MENU ADMIN GRUP/////////////////////////////////////////
                case 'add':
                    if (!isOwnerBot) return piyo.reply(from, 'Maaf, perintah ini hanya Buaat xKiwilx', id)
                    if (!isGroupMsg) return piyo.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                    if (!isGroupAdmins) return piyo.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                    if (!isBotGroupAdmins) return piyo.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
                    if (args.length !== 1) return piyo.reply(from, `Untuk menggunakan ${prefix}add\nPenggunaan: ${prefix}add <nomor>\ncontoh: ${prefix}add 628xxx`, id)
                    try {
                        await piyo.addParticipant(from, `${args[0]}@c.us`)
                            .then(() => piyo.reply(from, 'Hai selamat datang', id))
                    } catch {
                        piyo.reply(from, 'Tidak dapat menambahkan target', id)
                    }
                    break
                case 'kick':

                    if (!isGroupMsg) return piyo.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                    if (!isGroupAdmins) return piyo.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                    if (!isBotGroupAdmins) return piyo.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
                    if (mentionedJidList.length === 0) return piyo.reply(from, 'Maaf, format pesan salah.\nSilahkan tag satu atau lebih orang yang akan dikeluarkan', id)
                    if (mentionedJidList[0] === botNumber) return await piyo.reply(from, 'Maaf, format pesan salah.\nTidak dapat mengeluarkan akun bot sendiri', id)
                    await piyo.sendTextWithMentions(from, `Request diterima, mengeluarkan:\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
                    for (let i = 0; i < mentionedJidList.length; i++) {
                        if (groupAdmins.includes(mentionedJidList[i])) return await piyo.sendText(from, 'Gagal, kamu tidak bisa mengeluarkan admin grup.')
                        await piyo.removeParticipant(groupId, mentionedJidList[i])
                    }
                    break
                case 'promote':
                    if (!isGroupMsg) return piyo.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                    if (!isGroupAdmins) return piyo.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                    if (!isBotGroupAdmins) return piyo.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
                    if (mentionedJidList.length !== 1) return piyo.reply(from, 'Maaf, hanya bisa mempromote 1 user', id)
                    if (groupAdmins.includes(mentionedJidList[0])) return await piyo.reply(from, 'Maaf, user tersebut sudah menjadi admin.', id)
                    if (mentionedJidList[0] === botNumber) return await piyo.reply(from, 'Maaf, format pesan salah.\nTidak dapat mempromote akun bot sendiri', id)
                    await piyo.promoteParticipant(groupId, mentionedJidList[0])
                    await piyo.sendTextWithMentions(from, `Request diterima, menambahkan @${mentionedJidList[0].replace('@c.us', '')} sebagai admin.`)
                    break
                case 'demote':
                    if (!isGroupMsg) return piyo.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                    if (!isGroupAdmins) return piyo.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                    if (!isBotGroupAdmins) return piyo.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
                    if (mentionedJidList.length !== 1) return piyo.reply(from, 'Maaf, hanya bisa mendemote 1 user', id)
                    if (!groupAdmins.includes(mentionedJidList[0])) return await piyo.reply(from, 'Maaf, user tersebut belum menjadi admin.', id)
                    if (mentionedJidList[0] === botNumber) return await piyo.reply(from, 'Maaf, format pesan salah.\nTidak dapat mendemote akun bot sendiri', id)
                    await piyo.demoteParticipant(groupId, mentionedJidList[0])
                    await piyo.sendTextWithMentions(from, `Request diterima, menghapus jabatan @${mentionedJidList[0].replace('@c.us', '')}.`)
                    break
                case 'bye':
                    if (!isGroupMsg) return piyo.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                    if (!isGroupAdmins) return piyo.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                    piyo.sendText(from, 'Good bye... ( ⇀‸↼‶ )').then(() => piyo.leaveGroup(groupId))
                    break
                case 'del':
                    if (!isGroupAdmins) return piyo.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                    if (!quotedMsg) return piyo.reply(from, `Maaf, format pesan salah silahkan.\nReply pesan bot dengan caption ${prefix}del`, id)
                    if (!quotedMsgObj.fromMe) return piyo.reply(from, `Maaf, format pesan salah silahkan.\nReply pesan bot dengan caption ${prefix}del`, id)
                    piyo.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
                    break
                case 'tagsemua':
                case 'everyone':
                    if (!isGroupMsg) return piyo.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                    if (!isGroupAdmins) return piyo.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                    const groupMem = await piyo.getGroupMembers(groupId)
                    let hehex = '╔══✪〘 Mention All 〙✪══\n'
                    for (let i = 0; i < groupMem.length; i++) {
                        hehex += '╠➥'
                        hehex += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
                    }
                    hehex += '╚═〘 *xKiwilx Bot Telah Aktif* 〙'
                    await piyo.sendTextWithMentions(from, hehex)
                    break
                case 'mutegrup':
                    if (!isGroupMsg) return piyo.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                    if (!isGroupAdmins) return piyo.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                    if (!isBotGroupAdmins) return piyo.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
                    if (args.length !== 1) return piyo.reply(from, `Untuk mengubah settingan group chat agar hanya admin saja yang bisa chat\n\nPenggunaan:\n${prefix}mutegrup on --aktifkan\n${prefix}mutegrup off --nonaktifkan`, id)
                    if (args[0] == 'on') {
                        piyo.setGroupToAdminsOnly(groupId, true).then(() => piyo.sendText(from, 'Berhasil mengubah agar hanya admin yang dapat chat!'))
                    } else if (args[0] == 'off') {
                        piyo.setGroupToAdminsOnly(groupId, false).then(() => piyo.sendText(from, 'Berhasil mengubah agar semua anggota dapat chat!'))
                    } else {
                        piyo.reply(from, `Untuk mengubah settingan group chat agar hanya admin saja yang bisa chat\n\nPenggunaan:\n${prefix}mutegrup on --aktifkan\n${prefix}mutegrup off --nonaktifkan`, id)
                    }
                    break
                case 'setprofile':
                    if (!isGroupMsg) return piyo.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                    if (!isGroupAdmins) return piyo.reply(from, 'Gagal, perintah ini hanya dapat digunakan oleh admin grup!', id)
                    if (!isBotGroupAdmins) return piyo.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
                    if (isMedia && type == 'image' || isQuotedImage) {
                        const dataMedia = isQuotedImage ? quotedMsg : message
                        const _mimetype = dataMedia.mimetype
                        const mediaData = await decryptMedia(dataMedia, uaOverride)
                        const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                        await piyo.setGroupIcon(groupId, imageBase64)
                    } else if (args.length === 1) {
                        if (!isUrl(url)) { await piyo.reply(from, 'Maaf, link yang kamu kirim tidak valid.', id) }
                        piyo.setGroupIconByUrl(groupId, url).then((r) => (!r && r !== undefined)
                            ? piyo.reply(from, 'Maaf, link yang kamu kirim tidak memuat gambar.', id)
                            : piyo.reply(from, 'Berhasil mengubah profile group', id))
                    } else {
                        piyo.reply(from, `Commands ini digunakan untuk mengganti icon/profile group chat\n\n\nPenggunaan:\n1. Silahkan kirim/reply sebuah gambar dengan caption ${prefix}setprofile\n\n2. Silahkan ketik ${prefix}setprofile linkImage`)
                    }
                    break
                ///////////////////////////////////////////////////MENU SENDER//////////////////////////////////////////////////
                case 'leaderboard':
                    if (!isGroupMsg) return await piyo.reply(from.ind.groupOnly(), id)
                    const resp = _point
                    _point.sort((a, b) => (a.point < b.point) ? 1 : -1)
                    let leaderboard = '*── 「 LEADERBOARDS 」 ──*\n\n'
                    try {
                        for (let i = 0; i < 10; i++) {
                            var roles = 'Copper V'
                            if (resp[i].level >= 5) {
                                roles = 'Copper IV'
                            } else if (resp[i].level >= 10) {
                                roles = 'Copper III'
                            } else if (resp[i].level >= 15) {
                                roles = 'Copper II'
                            } else if (resp[i].level >= 20) {
                                roles = 'Copper I'
                            } else if (resp[i].level >= 25) {
                                roles = 'Silver V'
                            } else if (resp[i].level >= 30) {
                                roles = 'Silver IV'
                            } else if (resp[i].level >= 35) {
                                roles = 'Silver III'
                            } else if (resp[i].level >= 40) {
                                roles = 'Silver II'
                            } else if (resp[i].level >= 45) {
                                roles = 'Silver I'
                            } else if (resp[i].level >= 50) {
                                roles = 'Gold V'
                            } else if (resp[i].level >= 55) {
                                roles = 'Gold IV'
                            } else if (resp[i].level >= 60) {
                                roles = 'Gold III'
                            } else if (resp[i].level >= 65) {
                                roles = 'Gold II'
                            } else if (resp[i].level >= 70) {
                                roles = 'Gold I'
                            } else if (resp[i].level >= 75) {
                                roles = 'Platinum V'
                            } else if (resp[i].level >= 80) {
                                roles = 'Platinum IV'
                            } else if (resp[i].level >= 85) {
                                roles = 'Platinum III'
                            } else if (resp[i].level >= 90) {
                                roles = 'Platinum II'
                            } else if (resp[i].level >= 95) {
                                roles = 'Platinum I'
                            } else if (resp[i].level > 100) {
                                roles = 'Exterminator'
                            }
                            leaderboard += `${i + 1}. wa.me/${_point[i].id.replace('@c.us', '')}\n➸ *XP*: ${_point[i].point} *Level*: ${_point[i].level}\n➸ *Role*: ${roles}\n\n`
                        }
                        await piyo.reply(from, leaderboard, id)
                    } catch (err) {
                        console.error(err)
                        await piyo.reply(from, ind.minimalDb(), id)
                    }
                    break
                case 'tod':
                    await piyo.reply(from, `Sebelum bermain berjanjilah akan melaksanakan apapapun perintah yang di berikan`, id)
                    await piyo.sendText(from, `Silahkan pilih \n\n*truth*\n\n*dare*`, id)
                    break
                case 'tebakata':
                    await piyo.reply(from, `Sebelum bermain usahakan jangan curang`, id)
                    await piyo.sendText(from, `Ketik *mainkankata*`, id)
                    break
                case 'gantiprofile':
                    if (!isOwnerBot) return piyo.reply(from, `Khusus owner`, id)
                    if (!q) return piyo.reply(from, `Ketik ${prefix}gantiprofile nama | biostatus `, id)
                    const pof = q.substring(0, q.indexOf('|') - 1)
                    const pof2 = q.substring(q.lastIndexOf('|') + 2)
                    await piyo.setMyName(pof)
                    await piyo.setMyStatus(pof2)
                    console.log('Succes To Change Name And Info')
                    piyo.sendText(from, 'Succes To Change Name And Info', id)
                    if (isMedia && type == 'image' || isQuotedImage) {
                        const dataMedia = isQuotedImage ? quotedMsg : message
                        const _mimetype = dataMedia.mimetype
                        const mediaData = await decryptMedia(dataMedia, uaOverride)
                        const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                        await piyo.setProfilePic(imageBase64)
                        console.log('Succes To Change Profile Picture')
                        piyo.sendText(from, 'Succes To Change Profile Picture', id)
                        await piyo.sendText(from, `Sudah kak >_<`, id)
                    }
                    break
                case 'mystat': {
                    const userid = sender.id
                    const ban = banned.includes(userid)
                    const blocked = await piyo.getBlockedIds()
                    const isblocked = blocked.includes(userid)
                    const ct = await piyo.getContact(userid)
                    const isOnline = await piyo.isChatOnline(userid) ? '✔' : '❌'
                    var sts = await piyo.getStatus(userid)
                    const bio = sts
                    const admins = groupAdmins.includes(userid) ? 'Admin' : 'Member'
                    var found = false
                    Object.keys(pengirim).forEach((i) => {
                        if (pengirim[i].id == userid) {
                            found = i
                        }
                    })
                    var adm = admins
                    if (ct == null) {
                        return await piyo.reply(from, 'Nomor WhatsApp tidak valid [ Tidak terdaftar di WhatsApp ]', id)
                    } else {
                        const contact = ct.pushname
                        const dp = await piyo.getProfilePicFromServer(userid)
                        if (dp == undefined) {
                            var pfp = 'https://raw.githubusercontent.com/Gimenz/line-break/master/profil.jpg'
                        } else {
                            var pfp = dp
                        }
                        if (contact == undefined) {
                            var namacontact = '_Dia pemalu, tidak mau menampilkan namanya_'
                        } else {
                            var namacontact = contact
                        }
                        const caption = `*Detail Member* ✨ \n\n● *Name :* ${namacontact}\n● *Bio :* ${bio.status}\n● *Chat link :* wa.me/${sender.id.replace('@c.us', '')}\n● *Role :* ${adm}\n● *Banned by Bot :* ${ban ? '✔' : '❌'}\n● *Blocked by Bot :* ${isblocked ? '✔' : '❌'}\n● *Chat with bot :* ${isOnline}`
                        piyo.sendFileFromUrl(from, pfp, 'dp.jpg', caption)
                    }
                }
                break

                case 'bugreport': {

                    if (args.length == 0) return piyo.reply(from, `[❗] Kirim perintah */bugreport [teks]*\ncontoh : */bugreport Permisi Owner, Ada bug pada command /otakudesu, Tolong diperbaiki*`, id)
                    const bug = body.slice(11)
                    piyo.sendText(ownerNumber, `*[BUG REPORT]*\n*WAKTU* : ${time}\nNO PENGIRIM : wa.me/${sender.id.match(/\d+/g)}\nGroup : ${formattedTitle}\n\n${bug}`)
                    piyo.reply(from, 'Masalah telah di laporkan ke owner BOT, laporan palsu/main2 tidak akan ditanggapi.', id)
                }
                    break
                case 'join':

                    if (args.length == 0) return piyo.reply(from, `Jika kalian ingin mengundang bot kegroup silahkan invite atau dengan\nketik ${prefix}join [link group]`, id)
                    let linkgrup = body.slice(6)
                    let islink = linkgrup.match(/(https:\/\/chat.whatsapp.com)/gi)
                    let chekgrup = await piyo.inviteInfo(linkgrup)
                    if (!islink) return piyo.reply(from, 'Maaf link group-nya salah! silahkan kirim link yang benar', id)
                    if (isOwnerBot) {
                        await piyo.joinGroupViaLink(linkgrup)
                            .then(async () => {
                                await piyo.sendText(from, 'Berhasil join grup via link!')
                                await piyo.sendText(chekgrup.id, `Halo Anjg~, Im xKiwilxbot. Untuk Memulai Bot silahkan ketik  ${prefix}menu`)
                            })
                    } else {
                        let cgrup = await piyo.getAllGroups()
                        if (cgrup.length > groupLimit) return piyo.reply(from, `Sorry, the group on this bot is full\nMax Group is: ${groupLimit}`, id)
                        await piyo.sendContact(from, ownerNumber)
                        if (cgrup.size < memberLimit) return piyo.reply(from, `Apanih member dikit bat ngentot ${memberLimit} people`, id)
                        await piyo.joinGroupViaLink(linkgrup)
                            .then(async () => {
                                await piyo.reply(from, 'Berhasil join grup via link!', id)
                            })
                            .catch(() => {
                                piyo.reply(from, 'Gagal!', id)
                            })
                    }
                    break
                case 'botstat':
                    {

                        const loadedMsg = await piyo.getAmountOfLoadedMessages()
                        const chatIds = await piyo.getAllChatIds()
                        const groups = await piyo.getAllGroups()
                        piyo.sendText(from, `Status :\n- *${loadedMsg}* Loaded Messages\n- *${groups.length}* Group Chats\n- *${chatIds.length - groups.length}* Personal Chats\n- *${chatIds.length}* Total Chats`)
                        break
                    }
                case 'mutualan':
                    await limitAdd(pengirim)
                    if (!chatId) return await piyo.reply(from, 'mutualan tidak bisa dalam grup', id)
                    await piyo.reply(from, ind.waitmutualan(), id)
                    const ganteng = nomormutualan[Math.floor(Math.random() * (nomormutualan.length))]
                    await piyo.sendContact(from, ganteng)
                        .then(() => piyo.sendText(from, 'Partner found :🙉\n/next — find a new Partner'))
                    break
                case 'next':
                    await limitAdd(pengirim)
                    if (!isRegistered) return await piyo.reply(from, 'mutualan tidak bisa dalam grup', id)
                    await piyo.reply(from, ind.waitmutualan(), id)
                    const cantik = nomormutualan[Math.floor(Math.random() * (nomormutualan.length))]
                    await piyo.sendContact(from, cantik)
                        .then(() => piyo.sendText(from, 'Partner found :🙉\n/next — find a new partner'))
                    break
                case 'send':
                    if (!isRegistered) return piyo.reply(from, `Maaf ${pushname}, sepertinya kamu belum terdaftar sebagai user xKiwilxbot, untuk pendaftaran bisa menggunakan */register* nama | no hp.    Contoh: /register |${pushname}|cewe/cowo`, id)
                    if (isGroupMsg) return piyo.reply(from, 'Perintah ini hanya bisa dilakukan di chat personal!', id)
                    var cek = pengirimm.includes(sender.id);
                    if (!cek) {
                        return piyo.reply(from, 'kamu belum terdaftar, untuk mendaftar kirim /register no wa kamu\ncontoh : /register namakamu | cewe / cowo ', id) //if user is not registered
                    } else {
                        if (isMedia && arghh.length >= 1) {
                            const mediaData = await decryptMedia(message, uaOverride)
                            const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                            const opo = body.slice(6)
                            piyo.sendImage(uwong, imageBase64, 'gambar.jpeg', `${opo}\n\npesan dari : ${pushname}\nNomornya: wa.me/${serial.replace(/@c.us/g, '')}`)
                                .then(() => piyo.reply(from, 'Berhasil mengirim pesan\nTunggu pesan dari seseorang, kalo ga di bales coba lagi aja\nKalo pesan nya ada di kamu ulang lagi aja', id))
                        } else if (isQuotedImage && argus.length >= 1) {
                            const mediaData = await decryptMedia(quotedMsg, uaOverride)
                            const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                            const opo = body.slice(6)
                            piyo.sendImage(uwong, imageBase64, 'gambar.jpeg', `${opo}\n\npesan dari : ${pushname}\nNomornya: wa.me/${serial.replace(/@c.us/g, '')}`)
                                .then(() => piyo.reply(from, 'Berhasil mengirim pesan\nTunggu pesan dari seseorang, kalo ga di bales coba lagi aja\nKalo pesan nya ada di kamu ulang lagi aja', id))
                        } else if (argus.length >= 1) {
                            const opo = body.slice(6)
                            piyo.sendText(uwong, `${opo}\n\npesan dari : ${pushname}\nNomornya: wa.me/${serial.replace(/@c.us/g, '')}`)
                                .then(() => piyo.reply(from, 'Berhasil mengirim pesan\nTunggu pesan dari seseorang, kalo ga di bales coba lagi aja\nKalo pesan nya ada di kamu ulang lagi aja', id))
                        } else {
                            await piyo.reply(from, 'Format salah! Untuk membuka daftar perintah kirim /help', id)
                        }
                    }

                    break
                case 'addupdate':
                    {
                        if (!isOwnerBot) return piyo.reply(from, 'Maaf, perintah ini hanya dapat dipakai oleh owner!', id)
                        const update = body.slice(10)
                        updatepiyobot.push(update)
                        fs.writeFileSync('./settings/update.json', JSON.stringify(updatepiyobot))
                        piyo.reply(from, `Sukses menambahkan update :)`, id)
                    }
                    break
                case 'update': {
                    const updaterr = updatepiyobot
                    let updatee = `╔══✪〘 *update* 〙✪══\n`
                    for (let i = 0; i < updaterr.length; i++) {
                        updatee += '╠➥'
                        updatee += ` ${updaterr[i]}\n`
                    }
                    updatee += '╚═〘 *xKiwilx Bot* 〙'
                    await piyo.sendText(from, updatee)
                }
                    break
                case 'cekzodiak':
                    if (args.length !== 4) return piyo.reply(from, `Untuk mengecek zodiak, gunakan ${prefix}cekzodiak nama tanggallahir bulanlahir tahunlahir\nContoh: ${prefix}cekzodiak fikri 13 06 2004`, id)
                    const cekzodiak = await rugaapi.cekzodiak(args[0], args[1], args[2])
                    await piyo.reply(from, cekzodiak, id)
                        .catch(() => {
                            piyo.reply(from, 'Ada yang Error!', id)
                        })
                    break
                case 'quiziz':
                    if (!q) return piyo.reply(from, `Kirim perintah */quiziz idnya* , Contoh : */quiziz 16126165*`, id)
                    const quiz = await hackq.fetchQuiz(`${encodeURIComponent(q)}`)
                    await piyo.sendText(from, quiz, id)
                    break

                ///////////////////////////////////////////Owner Group////////////////////////////////////////////////////////////
                case 'kickall': //mengeluarkan semua member
                    if (!isGroupMsg) return piyo.reply(from, 'Maaf, perintah ini hanya dapat dipakai didalam grup!', id)
                    let isOwner = chat.groupMetadata.owner == pengirim
                    if (!isOwner) return piyo.reply(from, 'Maaf, perintah ini hanya dapat dipakai oleh owner grup!', id)
                    if (!isBotGroupAdmins) return piyo.reply(from, 'Gagal, silahkan tambahkan bot sebagai admin grup!', id)
                    const allMem = await piyo.getGroupMembers(groupId)
                    for (let i = 0; i < allMem.length; i++) {
                        if (groupAdmins.includes(allMem[i].id)) {

                        } else {    
                            await piyo.removeParticipant(groupId, allMem[i].id)
                        }
                    }
                    piyo.reply(from, 'Success kick all member', id)
                    break
                //////////////////////////////////////////////MENU IMAGE/////////////////////////////////////////////////////////
                case 'faceanime':
                    await piyo.reply(from, ind.wait(), id)
                    if (isMedia && type === 'image' || isQuotedImage) {
                        const faceanimeMedia = isQuotedImage ? quotedMsg : message
                        const mediaFaceanime = await decryptMedia(faceanimeMedia, uaOverride)
                        const faceanimeLink = await uploadImages(mediaFaceanime, `faceanime.${sender.id}`)

                        if (isDataURL) {
                            faceAnime.faceAnimes(faceanimeLink)
                            .then(res => res.buffer())
                            .then(data => {
                                piyo.sendFile(from, data, 'faceanime.jpg', '');
                            })
                        }
                    } else {
                        await piyo.reply(from, 'Harap kirim gambar!', id);
                    }
                    break
                case 'wasted':
                    if (isMedia && type === 'image' || isQuotedImage) {
                        const encryptMediaWt = isQuotedImage ? quotedMsg : message
                        const dataPotoWt = await decryptMedia(encryptMediaWt, uaOverride)
                        const fotoWtNya = await uploadImages(dataPotoWt, `fotoProfilWt.${sender.id}`)
                        await piyo.reply(from, ind.wait(), id)
                        await piyo.sendFileFromUrl(from, `https://some-random-api.ml/canvas/wasted?avatar=${fotoWtNya}`, 'Wasted.jpg', 'Ini..., sticker nya lagi di kirim', id).then(() => piyo.sendStickerfromUrl(from, `https://some-random-api.ml/canvas/wasted?avatar=${fotoWtNya}`))
                        console.log('Berhasil kirim Wasted image!')
                    } else {
                        await piyo.reply(from, ind.wrongFormat(), id)
                    }
                    break
                case 'totext':
                    if (isMedia && type === 'image' || isQuotedImage) {
                        await piyo.reply(from, ind.wait(), id)
                        const encryptMedia = isQuotedImage ? quotedMsg : message
                        mediaData = await decryptMedia(encryptMedia, uaOverride)
                        fs.writeFileSync(`./media/images/ocr.jpg`, mediaData)
                        imagetotext(`./media/images/ocr.jpg`)
                            .then(data => {
                                piyo.sendText(from, `*Image To Text* \n\nHasil: \n\n${data}`, id)
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }
                    else if (type === 'sticker' || isQuotedSticker) {
                        const dataMedia = isQuotedSticker ? quotedMsg : message
                        const _mimetype = dataMedia.mimetype
                        const mediaData = await decryptMedia(dataMedia, uaOverride)
                        fs.writeFileSync(`./media/sticker/ocr.jpg`, mediaData)
                        imagetotext(`./media/sticker/ocr.jpg`)
                            .then(data => {
                                piyo.sendText(from, `*Read Data Text in Sticker* \n\nHasil: \n\n${data}`, id)
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    }
                    break

                case 'whatanime':
                    await piyo.reply(from, ind.wait(), id)
                    if (isMedia && type === 'image' || isQuotedImage) {
                        const whatanimeMedia = isQuotedImage ? quotedMsg : message
                        const whatanimeData = await decryptMedia(whatanimeMedia, uaOverride)
                        const whatanimeLink = await uploadImages(whatanimeData, `whatanime.${sender.id}`)

                        const ank = await axios.get(`${urllolhuman}/api/wait?apikey=${lolhuman}&img=${whatanimeLink}`)
                        const anj = ank.data.result
                        await piyo.sendFileFromUrl(from, anj.video, `inifile.mp4`);

                        await piyo.reply(from, `*Terdeteksi Anime Berikut :* \n*AniList :* ${anj.anilist_id}\n*MAL :* ${anj.mal_id}\n*Nama :* ${anj.title_romaji}\n*Jp :* ${anj.title_native}\n*Eng :* ${anj.title_english}\n*DiWaktu :* ${anj.at}\n*Episode :* ${anj.episode}\n*Mirip :* ${anj.similarity}`, id)
                    } else if (q) {
                        const ank = await axios.get(`${urllolhuman}/api/wait?apikey=${lolhuman}&img=${encodeURIComponent(q)}`)

                        const anj = ank.data.result
                        await piyo.sendFileFromUrl(from, anj.video, `inifile.mp4`);

                        await piyo.reply(from, `*Terdeteksi Anime Berikut :* \n*AniList :* ${anj.anilist_id}\n*MAL :* ${anj.mal_id}\n*Nama :* ${anj.title_romaji}\n*Jp :* ${anj.title_native}\n*Eng :* ${anj.title_english}\n*DiWaktu :* ${anj.at}\n*Episode :* ${anj.episode}\n*Mirip :* ${anj.similarity}`, id)
                    }
                    break
                case 'sauceanime':
                    await piyo.reply(from, ind.wait(), id)
                    if (isMedia && type === 'image' || isQuotedImage) {
                        const sauceanimeMedia = isQuotedImage ? quotedMsg : message
                        const sauceanimeData = await decryptMedia(sauceanimeMedia, uaOverride)
                        const sauceanimeLink = await uploadImages(sauceanimeData, `sauceanime.${sender.id}`)

                        const sauceanime = await axios.get(`${urlzoner}/api/webanime/sauce?url=${sauceanimeLink}&apikey=${zoner}`)
                        let sauceanimeMessage = "Terdeteksi Sumber Berikut :";

                        if (sauceanime.data && sauceanime.data.result && sauceanime.data.result.length > 0) {
                            for (const resultsauce of sauceanime.data.result) {
                                await piyo.sendFileFromUrl(from, resultsauce.thumbnail, 'inifile.jpg', '', id)
                                sauceanimeMessage += `\n\n• *Url :* ${resultsauce.url}\n• *Web :* ${resultsauce.site}\n• *Mirip :* ${resultsauce.similarity}\n• *Author :* ${resultsauce.authorName}\n• *AuthorUrl :* ${resultsauce.authorUrl}`
                            }
                            await piyo.reply(from, sauceanimeMessage, id);
                        } else {
                            await piyo.reply(from, 'Judul tidak ditemukan.', id);
                        }
                    } else if (q) {
                        const sauceanime = await axios.get(`${urlzoner}/api/webanime/sauce?url=${encodeURIComponent(q)}&apikey=${zoner}`)
                        let sauceanimeMessage = "";

                        if (sauceanime.data && sauceanime.data.result && sauceanime.data.result.length > 0) {
                            for (const resultsauce of sauceanime.data.result) {
                                await piyo.sendFileFromUrl(from, resultsauce.thumbnail, 'inifile.jpg', '', id)
                                responsauceMessage += `\n\n*Url :* ${resultsauce.url}\n*Web :* ${resultsauce.site}\n*Mirip :* ${resultsauce.similarity}\n*Author :* ${resultsauce.authorName}\n*AuthorUrl :* ${resultsauce.authorUrl}`
                            }
                            await piyo.reply(from, sauceanimeMessage, id);
                        } else {
                            await piyo.reply(from, 'Judul tidak ditemukan.', id);
                        }
                    }
                    break
                case 'cartoon':
                    await piyo.reply(from, ind.wait(), id)
                    if (isMedia && type === 'image' || isQuotedImage) {
                        const cartoonMedia = isQuotedImage ? quotedMsg : message
                        const cartoonData = await decryptMedia(cartoonMedia, uaOverride)
                        const cartoonLink = await uploadImages(cartoonData, `cartoon.${sender.id}`)

                        await piyo.sendFileFromUrl(from, `${urllolhuman}/api/editor/cartoon?apikey=${lolhuman}&img=${cartoonLink}`, 'cartoon.jpg', '', id)
                    } else if (q) {
                        await piyo.sendFileFromUrl(from, `${urllolhuman}/api/editor/cartoon?apikey=${lolhuman}&img=${encodeURIComponent(q)}`, 'cartoon.jpg', '', id)
                    }
                    break
                    
                case 'animeart':
                    await piyo.reply(from, ind.wait(), id);
                    await piyo.sendFileFromUrl(from, `${urllolhuman}/api/random/art?apikey=${lolhuman}`, 'anime.jpg')
                    await limitAdd(serial)
                    break

                case 'rhentai':
                    await piyo.reply(from, ind.wait(), id)
                    await piyo.sendFileFromUrl(from, `${urllolhuman}/api/random2/hentai?apikey=${lolhuman}`, 'rhentai.jpg')
                    break

                case 'fetish':
                    if (args.length === 0) {
                        return piyo.reply(from, `Untuk mencari fetish melalui tag\nketik: ${prefix}fetish tag\n\ncontoh: ${prefix}fetish armpits\n\nhanya bisa pakai tag (satu kata)\n\nList:\n• armpits\n• feets\n• thighs\n• cum\n• ecchi\n• blowjob\n• anal\n• ahegao`, id)
                    }

                    const tagHandlers = {
                        'armpits': 'armpits',
                        'feets': 'feets',
                        'thighs': 'thighs',
                        'ecchi': 'ecchi',
                        'blowjob': 'blowjob',
                        'anal': 'anal',
                        'ahegao': 'ahegao',
                    };
                
                    const tag = args[0].toLowerCase();
                    const handler = tagHandlers[tag];
                
                    if (handler) {
                        const apiUrl = `${urllolhuman}/api/random/nsfw/${handler}?apikey=${lolhuman}`;
                        await piyo.reply(from, ind.wait(), id);
                        await piyo.sendFileFromUrl(from, apiUrl, `${tag}.jpg`);
                    } else {
                        await piyo.reply(from, 'Tag tidak ditemukan.', id);
                    }
                    break

                case 'random':
                    if (args.length === 0) {
                        return piyo.reply(from, `Untuk mencari random melalui tag\nketik: ${prefix}random tag\n\ncontoh: ${prefix}random milf\n\nhanya bisa pakai tag (satu kata)\n\nList:\n• milf\n• neko\n• pussy\n• waifu\n• tits`, id)
                    }

                    const tagHandlers2 = {
                        'milf': 'milf',
                        'neko': 'neko',
                        'pussy': 'pussy',
                        'waifu': 'waifu',
                        'tits': 'tits',
                        'cosplay': 'cosplay',
                    };
                
                    const tag2 = args[0].toLowerCase();
                    const handler2 = tagHandlers2[tag2];
                
                    if (handler2) {
                        await piyo.reply(from, ind.wait(), id);
                        if (tag2 === 'tits') {
                            const apiUrl2 = `${urllolhuman}/api/random2/${handler2}?apikey=${lolhuman}`;
                            await piyo.sendFileFromUrl(from, apiUrl2, `${tag2}.jpg`, '', id);
                        } else if (tag2 === 'cosplay') {
                            // if (isDataURL) {
                            //     fetch('https://api.akuari.my.id/randomimganime/cosplay')
                            //     .then(res => res.buffer())
                            //     .then(buffer => {
                            //         piyo.sendFile(from, buffer, 'cosplay.jpg');
                            //     })
                            // }
                            const apiUrl2 = `${urlzoner}/api/hanime/${handler2}?apikey=${zoner}`;
                            await piyo.sendFileFromUrl(from, apiUrl2, `${tag2}.jpg`, '', id);
                        } else {
                            const apiUrl2 = `${urllolhuman}/api/random/nsfw/${handler2}?apikey=${lolhuman}`;
                            await piyo.sendFileFromUrl(from, apiUrl2, `${tag2}.jpg`, '', id);
                        }
                    } else {
                        await piyo.reply(from, 'Tag tidak ditemukan.', id);
                    }
                    break;
                
                case 'dewabatch':
                    if (args.length == 0) return piyo.reply(from, `Untuk mencari anime batch, ketik ${prefix}dewabatch judul\n\nContoh: ${prefix}dewabatch naruto`, id)
                    rugaapi.dewabatch(args[0])
                        .then(async (res) => {
                            await piyo.sendFileFromUrl(from, `${res.link}`, '', `${res.text}`, id)
                        })
                    break

                case 'meme':
                    if ((isMedia || isQuotedImage) && args.length >= 2) {
                        const top = arg.split('|')[0]
                        const bottom = arg.split('|')[1]
                        const encryptMedia = isQuotedImage ? quotedMsg : message
                        const mediaData = await decryptMedia(encryptMedia, uaOverride)
                        const getUrl = await uploadImages(mediaData, false)
                        const ImageBase64 = await meme.custom(getUrl, top, bottom)
                        piyo.sendFile(from, ImageBase64, 'image.png', '', null, true)
                            .then(() => {
                                piyo.reply(from, 'Ini makasih!', id)
                            })
                            .catch(() => {
                                piyo.reply(from, 'Ada yang error!')
                            })
                    } else {
                        await piyo.reply(from, `Tidak ada gambar! Silahkan kirim gambar dengan caption ${prefix}meme <teks_atas> | <teks_bawah>\ncontoh: ${prefix}meme teks atas | teks bawah`, id)
                    }
                    break
                case 'quotesmaker':
                    if (!q) return piyo.reply(from, 'Ketik /quotemaker quotesnya\nExample: /quotemaker aku kiwil', id)
                    {
                        await piyo.reply(from, ind.wait(), id)
                        piyo.sendFileFromUrl(from, `${urllolhuman}/api/quotemaker?apikey=${lolhuman}&text=${encodeURIComponent(q)}`, 'inifile.jpg', 'Ini Kak', id)
                    }
                    break
                case 'textospeak':
                    if (!q) return piyo.reply(from, 'Ketik /textospeak teks\nExample: /textospeak aku bot', id)
                    {
                        await piyo.reply(from, ind.wait(), id)
                        piyo.sendPtt(from, `${urllolhuman}/api/gtts/id?apikey=${lolhuman}&text=${encodeURIComponent(q)}`, id)
                    }
                    break
                
                case 'quotesnime':
                    await piyo.reply(from, ind.wait(), id)
                    const quo = await axios.get(`${urllolhuman}/api/random/quotesnime?apikey=${lolhuman}`);

                    // Tampilkan hasil
                    await piyo.sendText(from, `*Quote* : _❝${quo.data.result.quote}❞_\n*Char* : ${quo.data.result.character}\n*Anime* : ${quo.data.result.anime}\n*Ep* : ${quo.data.result.episode}`, id);
                    break
                case 'rwpanime':
                    await piyo.reply(from, ind.wait(), id)
                    await piyo.sendFileFromUrl(from, `${urllolhuman}/api/random/wallnime?apikey=${lolhuman}`, 'rwpanime.jpg', id)
                    break
                case 'cecancina':
                    await piyo.reply(from, ind.wait(), id)
                    const cecancina = await axios.get(`${urlzoner}/api/china?apikey=${zoner}`)
                    await piyo.sendFileFromUrl(from, cecancina.data.result, 'cecancina.jpg', '', id)
                    break
                case 'cecanjp':
                    await piyo.reply(from, ind.wait(), id)
                    const cecanjp = await axios.get(`${urlzoner}/api/japan?apikey=${zoner}`)
                    await piyo.sendFileFromUrl(from, cecanjp.data.result, 'cecanjp.jpg', '', id)
                    break
                case 'cecankr':
                    await piyo.reply(from, ind.wait(), id)
                    const cecankr = await axios.get(`${urlzoner}/api/korea?apikey=${zoner}`)
                    await piyo.sendFileFromUrl(from, cecankr.data.result, 'cecankr.jpg', '', id)
                    break
                case 'rwpdesktop':
                    await piyo.reply(from, ind.wait(), id)
                    await piyo.sendFileFromUrl(from, `${urllolhuman}/api/random2/wallpaper?apikey=${lolhuman}`, 'rwpdesktop.jpg', id)
                    break
                case 'wpsearch':
                    if (args.length === 0){
                        return piyo.reply(from, `Untuk mencari wallpaper melalui nama\nketik: ${prefix}wpsearch nama wallpaper\n\ncontoh: ${prefix}wpsearch mobil`, id)
                    }

                    await piyo.reply(from, ind.wait(), id)
                    await piyo.sendFileFromUrl(from, `${urllolhuman}/api/wallpaper?apikey=${lolhuman}&query=${encodeURIComponent(q)}`, 'wpsearch.jpg')
                case 'deskripimg':
                    await piyo.reply(from, ind.wait(), id)
                    if (isMedia && type === 'image' || isQuotedImage) {
                        const deskimgMedia = isQuotedImage ? quotedMsg : message
                        const deskimgData = await decryptMedia(deskimgMedia, uaOverride)
                        const deskimgLink = await uploadImages(deskimgData, `deskimg.${sender.id}`)

                        const deskimg = await axios.get(`${akuari}/ai/isigambar?img=${deskimgLink}`)
                        if (deskimg.data && deskimg.data.creator && deskimg.data.respon) {
                            const deskimg2 = deskimg.data.respon
                            await piyo.reply(from, `*Penjelasan* : ${deskimg2}`, id)
                        }
                    } else if (q) {
                        const deskimg = await axios.get(`${akuari}/ai/isigambar?img=${encodeURIComponent(q)}`)
                        if (deskimg.data && deskimg.data.creator && deskimg.data.respon) {
                            const deskimg2 = deskimg.data.respon
                            await piyo.reply(from, `*Penjelasan* : ${deskimg2}`, id)
                        }
                    }
                    break
                case 'bingimg':
                    if (args.length === 0){
                        return piyo.reply(from, `Untuk membuat gambar dengan teks\nketik: ${prefix}bingimg teks\n\ncontoh: ${prefix}bingimg kota jakarta 2035`, id)
                    }

                    await piyo.reply(from, ind.wait(), id)
                    const bingimgs = await axios.get(`${akuari}/ai/bing-ai?prompt=${encodeURIComponent(q)}`)
                    
                    try {
                        if (bingimgs.data && deskimg.data.creator && bingimgs.data.result) {
                            const imageUrl = bingimgs.data.result;
                            console.log('API Response:', bingimgs.data.result);
                            await piyo.reply(from, imageUrl, 'bingimg.jpg', '', id);
                        } 
                    } catch (error) {
                        console.error('Error accessing API:', error.message);
                    }
                    break
                case 'lexicaart':
                    if (args.length === 0){
                        return piyo.reply(from, `Untuk membuat gambar dengan teks\nketik: ${prefix}lexicaart teks\n\ncontoh: ${prefix}lexicaart anime naruto dengan hinata`, id)
                    }

                    await piyo.reply(from, ind.wait(), id)
                    // Ekstrak teks dari argumen
                    const searchText2 = args.join(' ');
                    const lexicaart = await axios.get(`${urlvihan}/tools/lexicaart?q=${encodeURIComponent(searchText2)}`)

                    if (lexicaart.data && lexicaart.data.status && lexicaart.data.status === true && lexicaart.data.data && lexicaart.data.data.images && lexicaart.data.data.images.length > 0) {
                        // Dapatkan URL pertama dari array 'data'
                        const imageUrl2 = lexicaart.data.data.images[1].url[0];
                        // Kirim file gambar ke obrolan
                        await piyo.sendFileFromUrl(from, imageUrl2, 'lexicaart.jpg', '', id);
                    } 
                    break
                case 'danbooru':
                    if (args.length === 0){
                        return piyo.reply(from, `Untuk mencari danbooru melalui nama\nketik: ${prefix}danbooru nama\n\ncontoh: ${prefix}danbooru azur_lane`, id)
                    }

                    await piyo.reply(from, ind.wait(), id)
                    await piyo.sendFileFromUrl(from, `${urllolhuman}/api/danbooru?apikey=${lolhuman}&query=${encodeURIComponent(q)}`, 'danbooru.jpg')
                    break
                case 'dldoudesu':
                    if (args.length === 0){
                        return piyo.reply(from, `Untuk mencari doudesu melalui url\nketik: ${prefix}dldoudesu url`, id)
                    }


                    await piyo.reply(from, ind.wait(), id);
                    const dldou = await axios.get(`${urllolhuman}/api/doujindesu?apikey=${lolhuman}&url=${encodeURIComponent(q)}`);

                    // Ambil data pertama dari array result
                    const douData = dldou.data.result;
                    // Tampilkan hasil
                    await piyo.reply(from, `*Judul* : ${douData.title}\n*Link* : ${douData.link_dl}`, id);
                    break
                case 'kucingpoi':
                    if (args.length === 0){
                        return piyo.reply(from, `Untuk mencari kucingpoi melalui judul\nketik: ${prefix}kucingpoi judul\n\ncontoh: ${prefix}kucingpoi my mother`, id)
                    }

                    await piyo.reply(from, ind.wait(), id);
                    const kucingpoi = await axios.get(`${urllolhuman}/api/nekopoisearch?apikey=${lolhuman}&query=${encodeURIComponent(q)}`)
                    let kucingpoiMessage = "Terdeteksi Nama Berikut :";

                    if (kucingpoi.data && kucingpoi.data.result && kucingpoi.data.result.length > 0) {
                        for (const resultneko of kucingpoi.data.result) {
                            await piyo.sendFileFromUrl(from, resultneko.thumbnail, 'inifile.jpg', '', id)
                            kucingpoiMessage += `\n\n• *Judul* : ${resultneko.title}\n• *Link* : ${resultneko.link}`;
                        }
                        await piyo.reply(from, kucingpoiMessage, id)
                    } else {
                        await piyo.reply(from, 'Judul tidak ditemukan.', id)
                    }
                    break
                case 'dlkucingpoi':

                    if (args.length == 0) return piyo.reply(from, `Untuk download kucingpeduli\n\nPenggunaan: ${prefix}dlkucingpoi link`, id)
                    await piyo.reply(from, ind.wait(), id)
                    const dlkucing = await axios.get(`${urllolhuman}/api/nekopoi?apikey=${lolhuman}&url=${encodeURIComponent(q)}`)

                    // Ambil link download untuk masing-masing kualitas
                    const downloadLinks = dlkucing.data.result.link;

                    // Format pesan dengan link download
                    const messages = Object.entries(downloadLinks).map(([quality, links]) => {
                        const linkMessage = Object.entries(links).map(([source, link]) => {
                            return `    • ${source}: (${link})`;
                        }).join('\n');
                        return `• *${quality.toUpperCase()}*:\n${linkMessage}`;
                    }).join('\n\n');

                    await piyo.sendFileFromUrl(from, dlkucing.data.result.thumbnail, 'inifile.jpg', `• *Judul* : ${dlkucing.data.result.title}\n• *Produser* : ${dlkucing.data.result.producers}\n• *Durasi* : ${dlkucing.data.result.duration}\n• *Genre* : ${dlkucing.data.result.genre}\n• *Sinopsis* : ${dlkucing.data.result.sinopsis}\n\n• *Link Download* : \n${messages}`, id)
                    break
                case 'searchnhen':
                    if (args.length === 0){
                        return piyo.reply(from, `Untuk mencari nhentai melalui judul\nketik: ${prefix}searchnhen judul\n\ncontoh: ${prefix}searchnhen hentai`, id)
                    }

                    await piyo.reply(from, ind.wait(), id);
                    const respondlhen = await axios.get(`${urllolhuman}/api/nhentaisearch?apikey=${lolhuman}&query=${encodeURIComponent(q)}`);
                    let searchnhenMessage = "Terdeteksi Nama Berikut :";

                    if (respondlhen.data && respondlhen.data.result && respondlhen.data.result.length > 0) {
                        for (const resultnhen of respondlhen.data.result) {
                            searchnhenMessage += `\n\n• *Kode* : ${resultnhen.id}\n• *Judul* : ${resultnhen.title_native}\n• *Eng* : ${resultnhen.title_english}\n• *Jp* : ${resultnhen.title_japanese}\n• *Hal* : ${resultnhen.page}`
                        }
                        await piyo.reply(from, searchnhenMessage, id);
                    } else {
                        await piyo.reply(from, 'Judul tidak ditemukan.', id);
                    }
                    break
                case 'kodenhen':
                    if (args.length === 0){
                        return piyo.reply(from, `Untuk mencari detail nhentai melalui kode\nketik: ${prefix}kodenhen kode\n\ncontoh: ${prefix}kodenhen 344253`, id)
                    }

                    await piyo.reply(from, ind.wait(), id)
                    const responhen = await axios.get(`${urllolhuman}/api/nhentai/${encodeURIComponent(q)}?apikey=${lolhuman}`)
                    
                    const downloadLinksnhen = responhen.data.result.image;
                    const messagesnhen = downloadLinksnhen.map((imageUrl, index) => {
                        return `    • *Image ${index + 1}*: ${imageUrl}`;
                    }).join('\n');
                    
                    await piyo.reply(from, `• *Judul* : ${responhen.data.result.title_native}\n• *Jp* : ${responhen.data.result.title_romaji}\n• *Tags* : ${responhen.data.result.tags}\n\n• *Link Gambar* : \n${messagesnhen}`, id)
                    break
                case 'dlnhen':
                    if (args.length === 0){
                        return piyo.reply(from, `Untuk mencari dlnhen melalui kode\nketik: ${prefix}dlnhen kode\n\ncontoh: ${prefix}dlnhen 344253`, id)
                    }

                    await piyo.reply(from, ind.wait(), id)
                    const dlnhen = await axios.get(`${urllolhuman}/api/nhentaipdf/${encodeURIComponent(q)}?apikey=${lolhuman}`)
                    await piyo.sendFileFromUrl(from, dlnhen.data.result, 'inifile.pdf', '', id)
                    break

                case 'pixiv':
                    if (args.length === 0){
                        return piyo.reply(from, `Untuk mencari pixiv melalui nama\nketik: ${prefix}pixiv nama\n\ncontoh: ${prefix}pixiv milf\n\nDownload?\n${prefix}pixivdl ID`, id)
                    }

                    await piyo.reply(from, ind.wait(), id)
                    const pxv = await axios.get(`${urllolhuman}/api/pixiv?apikey=${lolhuman}&query=${encodeURIComponent(q)}`)
                    let pixivMessage = "Terdeteksi Nama Berikut :";

                    if (pxv.data && pxv.data.result && pxv.data.result.length > 0) {
                        for (const resultpixiv of pxv.data.result) {
                            await piyo.sendFileFromUrl(from, resultpixiv.image, 'inifile.jpg', '', id)
                            pixivMessage += `\n\n• *ID* : ${resultpixiv.id}\n• *Judul* : ${resultpixiv.title}`
                        }
                        await piyo.reply(from, pixivMessage, id)
                    } else {
                        await piyo.reply(from, 'Nama tidak ditemukan.', id);
                    }
                    break
                case 'pixivdl':
                    if (args.length === 0){
                        return piyo.reply(from, `Untuk mencari pixiv melalui nama\nketik: ${prefix}pixiv nama\n\ncontoh: ${prefix}pixiv milf\n\nDownload?\n${prefix}pixivdl ID`, id)
                    }

                    await piyo.reply(from, ind.wait(), id)
                    const pxvdl = await axios.get(`${urllolhuman}/api/pixivdl/${encodeURIComponent(q)}?apikey=${lolhuman}`)
                    console.log('Pixiv API Response:', pxvdl.data);
                    let pixivdlMessage = "Terdeteksi Nama Berikut :";

                    if (pxvdl.data && pxvdl.data.result && pxvdl.data.result.length > 0) {
                        for (const resultpixivdl of pxvdl.data.result) {
                            await piyo.sendFile(from, resultpixivdl.images, 'inifile.jpg', '', id)
                            pixivdlMessage += `\n\n*ID* : ${resultpixivdl.id}\n*Judul* : ${resultpixivdl.title}`;
                        }
                        await piyo.reply(from, pixivdlMessage, id)
                    } else {
                        await piyo.reply(from, 'Nama tidak ditemukan.', id);
                    }
                    break
                // case 'ktpmaker':
                //     if (args.length === 0){
                //         return piyo.reply(from, `Untuk membuat ktp palsu\nketik: \n\n${prefix}ktpmaker\nnik: \nprovinsi: \nkabupaten: \nnama: \nttl: \njenisKelamin: \nalamat: \nagama: \nstatusKawin: \npekerjaan: \nkewarganegaraan: \nbatasBerlaku: \nlinkGambar: \n\nEmang banyak jadi jangan ngeluh.`, id)
                //     }

                //     const ktpParams = body.slice(11).split(' ');
                //     if (ktpParams.length !== 13) {
                //         await piyo.reply(from, 'Mohon sertakan semua parameter yang diperlukan.', id);
                //         break;
                //     }

                //     await piyo.reply(from, ind.wait(), id)
                //     const [nik, provinsi, kabupaten, nama, ttl, jenisKelamin, alamat, agama, statusKawin, pekerjaan, kewarganegaraan, batasBerlaku, linkGambar] = ktpParams;

                //     const ktpmakerResponse = await axios.get(`${urllolhuman}/api/ktpmaker?apikey=${lolhuman}&nik=${nik}&prov=${provinsi}&kabu=${kabupaten}&name=${encodeURIComponent(nama)}&ttl=${encodeURIComponent(ttl)}&jk=${encodeURIComponent(jenisKelamin)}&jl=${encodeURIComponent(alamat)}&agama=${encodeURIComponent(agama)}&nikah=${encodeURIComponent(statusKawin)}&kerja=${encodeURIComponent(pekerjaan)}&warga=${encodeURIComponent(kewarganegaraan)}&until=${encodeURIComponent(batasBerlaku)}&img=${encodeURIComponent(linkGambar)}`);
                //     const ktpmakerResult = ktpmakerResponse.data;

                //     // const formattedMessage = `/ktpmaker\nnik: ${ktpmakerResult.nik}\nprovinsi: ${ktpmakerResult.provinsi}\nkabupaten: ${ktpmakerResult.kabupaten}\nnama: ${ktpmakerResult.nama}\nttl: ${ktpmakerResult.ttl}\njenisKelamin: ${ktpmakerResult.jenisKelamin}\nalamat: ${ktpmakerResult.alamat}\nagama: ${ktpmakerResult.agama}\nstatusKawin: ${ktpmakerResult.statusKawin}\npekerjaan: ${ktpmakerResult.pekerjaan}\nkewarganegaraan: ${ktpmakerResult.kewarganegaraan}\nbatasBerlaku: ${ktpmakerResult.batasBerlaku}\nlinkGambar: ${ktpmakerResult.linkGambar}`;

                //     await piyo.reply(from, ktpmakerResult.result, 'ktp.jpg', '', id);
                //     // if (ktpmakerResult && ktpmakerResult.result && ktpmakerResult.result.length > 0) {
                //     //     const ktpData = ktpmakerResult.result;
                //     //     console.log('ktpData:', ktpData);
                //     // } else {
                //     //     await piyo.reply(from, 'Gagal membuat KTP. Mohon cek kembali parameter yang diberikan.', id);
                //     // }
                //     break;
                case 'ktpmaker':
                    if (args.length === 0) {
                        return piyo.reply(from, `Untuk membuat ktp palsu\nketik: \n\n${prefix}ktpmaker\nnik: \nprovinsi: \nkabupaten: \nnama: \nttl: \njenisKelamin: \nalamat: \nagama: \nstatusKawin: \npekerjaan: \nkewarganegaraan: \nbatasBerlaku: \nlinkGambar: \n\nEmang banyak jadi jangan ngeluh.`, id);
                    }
                
                    const [nik, provinsi, kabupaten, namaktp, ttlktp, jkktp, jlktp, rtrw, lurah, camat, agama, nikah, pekerjaan, warga, untilktp, imgktp] = args;
                    await piyo.reply(from, ind.wait(), id);
                
                    try {
                        const resultss = await rugaapi.ktpmakers(nik, provinsi, kabupaten, namaktp, ttlktp, jkktp, jlktp, rtrw, lurah, camat, agama, nikah, pekerjaan, warga, untilktp, imgktp);
                        await piyo.reply(from, resultss, id);
                    } catch (error) {
                        console.error(error);
                        await piyo.reply(from, 'Terjadi kesalahan saat membuat KTP palsu.', id);
                    }
                    break
                
                /////////////////////////////////////////////////////////MENU EDUKASI////////////////////////////////////////////////////////////
                case 'kbbi':

                    await piyo.reply(from, ind.wait(), id)
                    kbbi(q)
                        .then(async ({ status, result, pesan }) => {
                            if (status === 'error') {
                                await piyo.reply(from, pesan, id)
                            } else {
                                await piyo.reply(from, result, id)
                                    .then(() => console.log('Berhasil kirim definition!'))
                            }
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await piyo.reply(from, 'Error!', id)
                        })
                    break
                case 'brainly':

                    if (args.length >= 2) {
                        const BrainlySearch = require('./lib/brainly')
                        let tanya = body.slice(9)
                        let jum = Number(tanya.split('.')[1]) || 2
                        if (jum > 10) return piyo.reply(from, 'Max 10!', id)
                        if (Number(tanya[tanya.length - 1])) {
                            tanya
                        }
                        piyo.reply(from, `➸ *Pertanyaan* : ${tanya.split('.')[0]}\n\n➸ *Jumlah jawaban* : ${Number(jum)}`, id)
                        await BrainlySearch(tanya.split('.')[0], Number(jum), function (res) {
                            res.forEach(x => {
                                if (x.jawaban.fotoJawaban.length == 0) {
                                    piyo.reply(from, `➸ *Pertanyaan* : ${x.pertanyaan}\n\n➸ *Jawaban* : ${x.jawaban.judulJawaban}\n`, id)
                                } else {
                                    piyo.reply(from, `➸ *Pertanyaan* : ${x.pertanyaan}\n\n➸ *Jawaban* 〙: ${x.jawaban.judulJawaban}\n\n➸ *Link foto jawaban* : ${x.jawaban.fotoJawaban.join('\n')}`, id)
                                }
                            })
                        })
                    } else {
                        piyo.reply(from, 'Usage :\n/brainly [pertanyaan] [.jumlah]\n\nEx : \n/brainly NKRI .2', id)
                    }
                    break
                //////////////////////////////////////////////Islam Command//////////////////////////////////////////////////////
                case 'listsurah':
                    try {
                        axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                            .then((response) => {
                                let hehex = '╔══✪〘 List Surah 〙✪══\n'
                                for (let i = 0; i < response.data.data.length; i++) {
                                    hehex += '╠➥ '
                                    hehex += response.data.data[i].name.transliteration.id.toLowerCase() + '\n'
                                }
                                hehex += '╚═〘 *A R U G A  B O T* 〙'
                                piyo.reply(from, hehex, id)
                            })
                    } catch (err) {
                        piyo.reply(from, err, id)
                    }
                    break
                case 'infosurah':

                    if (args.length == 0) return piyo.reply(from, `*_${prefix}infosurah <nama surah>_*\nMenampilkan informasi lengkap mengenai surah tertentu. Contoh penggunan: ${prefix}infosurah al-baqarah`, message.id)
                    var responseh = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                    var { data } = responseh.data
                    var idx = data.findIndex(function (post, index) {
                        if ((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase()) || (post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
                            return true;
                    });
                    var pesan = ""
                    pesan = pesan + "Nama : " + data[idx].name.transliteration.id + "\n" + "Asma : " + data[idx].name.short + "\n" + "Arti : " + data[idx].name.translation.id + "\n" + "Jumlah ayat : " + data[idx].numberOfVerses + "\n" + "Nomor surah : " + data[idx].number + "\n" + "Jenis : " + data[idx].revelation.id + "\n" + "Keterangan : " + data[idx].tafsir.id
                    piyo.reply(from, pesan, message.id)
                    break
                case 'surah':

                    if (args.length == 0) return piyo.reply(from, `*_${prefix}surah <nama surah> <ayat>_*\nMenampilkan ayat Al-Quran tertentu beserta terjemahannya dalam bahasa Indonesia. Contoh penggunaan : ${prefix}surah al-baqarah 1\n\n*_${prefix}surah <nama surah> <ayat> en/id_*\nMenampilkan ayat Al-Quran tertentu beserta terjemahannya dalam bahasa Inggris / Indonesia. Contoh penggunaan : ${prefix}surah al-baqarah 1 id`, message.id)
                    var responseh = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                    var { data } = responseh.data
                    var idx = data.findIndex(function (post, index) {
                        if ((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase()) || (post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
                            return true;
                    });
                    nmr = data[idx].number
                    if (!isNaN(nmr)) {
                        var responseh2 = await axios.get('https://api.quran.sutanlab.id/surah/' + nmr + "/" + args[1])
                        var { data } = responseh2.data
                        var last = function last(array, n) {
                            if (array == null) return void 0;
                            if (n == null) return array[array.length - 1];
                            return array.slice(Math.max(array.length - n, 0));
                        };
                        bhs = last(args)
                        pesan = ""
                        pesan = pesan + data.text.arab + "\n\n"
                        if (bhs == "en") {
                            pesan = pesan + data.translation.en
                        } else {
                            pesan = pesan + data.translation.id
                        }
                        pesan = pesan + "\n\n(Q.S. " + data.surah.name.transliteration.id + ":" + args[1] + ")"
                        piyo.reply(from, pesan, message.id)
                    }
                    break
                case 'tafsir':

                    if (args.length == 0) return piyo.reply(from, `*_${prefix}tafsir <nama surah> <ayat>_*\nMenampilkan ayat Al-Quran tertentu beserta terjemahan dan tafsirnya dalam bahasa Indonesia. Contoh penggunaan : ${prefix}tafsir al-baqarah 1`, message.id)
                    var responsh = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                    var { data } = responsh.data
                    var idx = data.findIndex(function (post, index) {
                        if ((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase()) || (post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
                            return true;
                    });
                    nmr = data[idx].number
                    if (!isNaN(nmr)) {
                        var responsih = await axios.get('https://api.quran.sutanlab.id/surah/' + nmr + "/" + args[1])
                        var { data } = responsih.data
                        pesan = ""
                        pesan = pesan + "Tafsir Q.S. " + data.surah.name.transliteration.id + ":" + args[1] + "\n\n"
                        pesan = pesan + data.text.arab + "\n\n"
                        pesan = pesan + "_" + data.translation.id + "_" + "\n\n" + data.tafsir.id.long
                        piyo.reply(from, pesan, message.id)
                    }
                    break
                case 'alaudio':

                    if (args.length == 0) return piyo.reply(from, `*_${prefix}ALaudio <nama surah>_*\nMenampilkan tautan dari audio surah tertentu. Contoh penggunaan : ${prefix}ALaudio al-fatihah\n\n*_${prefix}ALaudio <nama surah> <ayat>_*\nMengirim audio surah dan ayat tertentu beserta terjemahannya dalam bahasa Indonesia. Contoh penggunaan : ${prefix}ALaudio al-fatihah 1\n\n*_${prefix}ALaudio <nama surah> <ayat> en_*\nMengirim audio surah dan ayat tertentu beserta terjemahannya dalam bahasa Inggris. Contoh penggunaan : ${prefix}ALaudio al-fatihah 1 en`, message.id)
                    ayat = "ayat"
                    bhs = ""
                    var responseh = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah.json')
                    var surah = responseh.data
                    var idx = surah.data.findIndex(function (post, index) {
                        if ((post.name.transliteration.id.toLowerCase() == args[0].toLowerCase()) || (post.name.transliteration.en.toLowerCase() == args[0].toLowerCase()))
                            return true;
                    });
                    nmr = surah.data[idx].number
                    if (!isNaN(nmr)) {
                        if (args.length > 2) {
                            ayat = args[1]
                        }
                        if (args.length == 2) {
                            var last = function last(array, n) {
                                if (array == null) return void 0;
                                if (n == null) return array[array.length - 1];
                                return array.slice(Math.max(array.length - n, 0));
                            };
                            ayat = last(args)
                        }
                        pesan = ""
                        if (isNaN(ayat)) {
                            var responsih2 = await axios.get('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/islam/surah/' + nmr + '.json')
                            var { name, name_translations, number_of_ayah, number_of_surah, recitations } = responsih2.data
                            pesan = pesan + "Audio Quran Surah ke-" + number_of_surah + " " + name + " (" + name_translations.ar + ") " + "dengan jumlah " + number_of_ayah + " ayat\n"
                            pesan = pesan + "Dilantunkan oleh " + recitations[0].name + " : " + recitations[0].audio_url + "\n"
                            pesan = pesan + "Dilantunkan oleh " + recitations[1].name + " : " + recitations[1].audio_url + "\n"
                            pesan = pesan + "Dilantunkan oleh " + recitations[2].name + " : " + recitations[2].audio_url + "\n"
                            piyo.reply(from, pesan, message.id)
                        } else {
                            var responsih2 = await axios.get('https://api.quran.sutanlab.id/surah/' + nmr + "/" + ayat)
                            var { data } = responsih2.data
                            var last = function last(array, n) {
                                if (array == null) return void 0;
                                if (n == null) return array[array.length - 1];
                                return array.slice(Math.max(array.length - n, 0));
                            };
                            bhs = last(args)
                            pesan = ""
                            pesan = pesan + data.text.arab + "\n\n"
                            if (bhs == "en") {
                                pesan = pesan + data.translation.en
                            } else {
                                pesan = pesan + data.translation.id
                            }
                            pesan = pesan + "\n\n(Q.S. " + data.surah.name.transliteration.id + ":" + args[1] + ")"
                            await piyo.sendFileFromUrl(from, data.audio.secondary[0])
                            await piyo.reply(from, pesan, message.id)
                        }
                    }
                    break
                case 'jsolat':

                    if (args.length == 0) return piyo.reply(from, `Untuk melihat jadwal solat dari setiap daerah yang ada\nketik: ${prefix}jsolat [daerah]\n\nuntuk list daerah yang ada\nketik: ${prefix}daerah`, id)
                    const solatx = body.slice(8)
                    const solatj = await rugaapi.jadwaldaerah(solatx)
                    await piyo.reply(from, solatj, id)
                        .catch(() => {
                            piyo.reply(from, 'Sudah input daerah yang ada dilist?', id)
                        })
                    break

                    //////////////////////////////////////////////MENU MEDIA//////////////////////////////////////////////////////////
                case 'instagram': //RECODE BY ALVIO ADJI JANUAR
                case 'ig':
                    try {
                        if (arghh.length === 1) return piyo.reply(from, 'Kirim perintah *!ig [linkIg]* untuk contoh silahkan kirim perintah *!readme*', id)
                        if (!arghh[1].includes('instagram.com')) return piyo.reply(from, `Salah linknya kak`, id)
                        piyo.reply(from, ind.wait(), id)
                        let arrBln = ["Januari", "Februaru", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
                        const idRegex = /([-_0-9A-Za-z]{11})/
                        const idIGG = arghh[1].match(idRegex)
                        await getPost(idIGG[0]).then((post) => {
                            let a = new Date(post.date * 1000)
                            const jam = a.getHours()
                            const menit = a.getMinutes()
                            const bulan = a.getMonth()
                            const tanggal = a.getDate()
                            const tahun = a.getFullYear()
                            const captig = `*Media berhasil terkirim!*\n\n*Username* : ${post.owner_user}\n*Waktu Publish* : ${jam}:${menit} ${tanggal}-${arrBln[bulan - 1]}-${tahun}\n*Capt* : ${post.capt}`
                            piyo.sendFileFromUrl(from, post.url, `Insta`, captig, id)
                        })
                    } catch (err) {
                        ERRLOG(err)
                    }
                    await piyo.sendSeen(from)
                    break
                    case 'ytmp3':
                        if (args.length == 0) return piyo.reply(from, `Untuk download yt ke mp3\n\nPenggunaan: ${prefix}ytmp3 link`, id)
                        await piyo.reply(from, ind.wait(), id)
                        
                        const yte = await axios.get(`${urllolhuman}/api/ytaudio?apikey=${lolhuman}&url=${encodeURIComponent(q)}`)
                        await piyo.sendFileFromUrl(from, yte.data.result.thumbnail, 'inifile.jpg', `*「 YOUTUBE MP3 」*\n\nSilahkan tunggu konfirmasi sedang dikirim mungkin butuh beberapa waktu\n\n• *Judul* : ${yte.data.result.title}\n• *Uploader* : ${yte.data.result.uploader}\n• *Size* : ${yte.data.result.link.size}\n• *Duration* : ${yte.data.result.duration}\n• *Dilihat* : ${yte.data.result.view}\n• *Deskripsi* : ${yte.data.result.description}`, id)

                        const bufmp3 = await fetch(yte.data.result.link.link)
                        const mp3buf = await bufmp3.buffer()
                        await fs.writeFile(`./media/audio/${sender.id}.mp3`, mp3buf)
                        await piyo.reply(from, `Apakah mau dikirim file berbentuk mp3 ?\nKetik dlmp3`, id)
                        usermp3.push(sender.id)
                        fs.writeFileSync('./settings/usermp3.json', JSON.stringify(usermp3))
                    break
    
                    case 'ytmp4':
                        if (args.length == 0) return piyo.reply(from, `Untuk download yt ke mp4\n\nPenggunaan: ${prefix}ytmp4 link`, id)
                        await piyo.reply(from, ind.wait(), id)
                        
                        const yte2 = await axios.get(`${urllolhuman}/api/ytvideo?apikey=${lolhuman}&url=${encodeURIComponent(q)}`)
                        await piyo.sendFileFromUrl(from, yte2.data.result.thumbnail, 'inifile.jpg', `*「 YOUTUBE MP4 」*\n\nSilahkan tunggu konfirmasi sedang dikirim mungkin butuh beberapa waktu\n\n• *Judul* : ${yte2.data.result.title}\n• *Uploader* : ${yte2.data.result.uploader}\n• *Size* : ${yte2.data.result.link.size}\n• *Duration* : ${yte2.data.result.duration}\n• *Dilihat* : ${yte2.data.result.view}\n• *Deskripsi* : ${yte2.data.result.description}`, id)

                        const bufmp4 = await fetch(yte2.data.result.link.link)
                        const mp4buf = await bufmp4.buffer()
                        await fs.writeFile(`./media/video/${sender.id}.mp4`, mp4buf)
                        await piyo.reply(from, `Apakah mau dikirim file berbentuk mp4 ?\nKetik dlmp4`, id)
                        usermp4.push(sender.id)
                        fs.writeFileSync('./settings/usermp4.json', JSON.stringify(usermp4))
                    break

                case 'tiktokstalk':
                    piyo.reply(from, ind.wait(), id)
                    if (arghh.length === 1) return piyo.reply(from, 'Kirim perintah */tiktokstalk @username*\nContoh */tiktokstalk @duar_amjay*', id)
                    argz = body.trim().split(' ')
                    console.log(...argz[1])
                    var slicedArgs = Array.prototype.slice.call(argz, 1);
                    console.log(slicedArgs)
                    const tstalk = await slicedArgs.join(' ')
                    console.log(tstalk)
                    try {
                        const tstalk2 = await axios.get(`${urllolhuman}/api/stalktiktok/${encodeURIComponent(q)}?apikey=${lolhuman}`)
                        const { username, bio, followings, follower, nickname, likes, video, user_picture } = tstalk2.data.result
                        const tiktod = `*User Ditemukan!*
                            ➸ *Username:* ${username}
                            ➸ *Nickname:* ${nickname}
                            ➸ *Bio:* ${bio}
                            ➸ *Mengikuti:* ${followings}
                            ➸ *Pengikut:* ${follower}
                            ➸ *Jumlah Like*: ${likes}
                            ➸ *Jumlah Postingan:* ${video}`
                        const pictk = await bent("buffer")(user_picture)
                        const base64 = `data:image/jpg;base64,${pictk.toString("base64")}`
                        piyo.sendImage(from, base64, 'inifile.jpg', tiktod)
                        await limitAdd(serial)
                    } catch (err) {
                        console.error(err.message)
                        await piyo.sendFileFromUrl(from, errorurl2, 'error.png', '💔️ Maaf, User tidak ditemukan')
                        piyo.sendText(from, 'Error Tiktokstalk : ' + err)
                    }
                    break
                //////////////////////////////////////////FUN MENU/////////////////////////////////////////////////////////////////

                case 'artinama':
                    if (args.length == 0) {
                        return piyo.reply(from, `Untuk mengetahui artinama seseorang\nketik: ${prefix}artinama nama\n\ncontoh: ${prefix}artinama kiwil`, id)
                    }
                    await piyo.reply(from, ind.wait(), id)

                    rugaapi.artinama(body.slice(10))
                        .then(async (res) => {
                            await piyo.reply(from, `Arti : ${res}`, id)
                        })
                    break
                case 'nulis':
                    if (args.length == 0) {
                        return piyo.reply(from, `Untuk menulis dikertas\nketik: ${prefix}nulis teks\n\ncontoh: ${prefix}nulis lorem ipsum`, id)
                    }

                    await piyo.reply(from, ind.wait(), id)
                    await piyo.sendFileFromUrl(from, `${urllolhuman}/api/nulis?apikey=${lolhuman}&text=${encodeURIComponent(q)}`, 'nulis.jpg', `Ditulis selama: ${processTime(t, moment())} _detik_`, id)
                    break
                case 'openai':
                    if (args.length == 0) {
                        return piyo.reply(from, `Untuk ngobrol dengan OpenAi\nketik: ${prefix}openai teks\n\ncontoh: ${prefix}openai Ai adalah?`, id)
                    }

                    await piyo.reply(from, ind.wait(), id)
                    const openais = await axios.get(`${urllolhuman}/api/openai-turbo?apikey=${lolhuman}&text=${encodeURIComponent(q)}&system=${encodeURIComponent(q)}`)
                    await piyo.reply(from, openais.data.result, id)
                    break
                case 'simi':
                    if (args.length == 0) {
                        return piyo.reply(from, `Untuk ngobrol dengan Simi\nketik: ${prefix}simi teks\n\ncontoh: ${prefix}simi pakabs?`, id)
                    }

                    // await piyo.reply(from, ind.wait(), id)
                    const simis = await axios.get(`${urllolhuman}/api/simi?apikey=${lolhuman}&text=${encodeURIComponent(q)}&badword=true`)
                    await piyo.reply(from, simis.data.result, id)
                    break
                case 'nulis':
                    if (args.length == 0) {
                        return piyo.reply(from, `Untuk menulis dikertas\nketik: ${prefix}nulis teks\n\ncontoh: ${prefix}nulis lorem ipsum`, id)
                    }

                    await piyo.reply(from, ind.wait(), id)
                    await piyo.sendFileFromUrl(from, `${urllolhuman}/api/nulis?apikey=${lolhuman}&text=${encodeURIComponent(q)}`, 'nulis.jpg', `Ditulis selama: ${processTime(t, moment())} _detik_`, id)
                    break
                case '2xscale':
                    await piyo.reply(from, ind.wait(), id)
                    if (isMedia && type === 'image' || isQuotedImage) {
                        const xscaleMedia = isQuotedImage ? quotedMsg : message
                        const data2x = await decryptMedia(xscaleMedia, uaOverride)
                        const foto2xscl = await uploadImages(data2x, `2xscale.${sender.id}`)

                        await piyo.sendFileFromUrl(from, `${urllolhuman}/api/upscale?apikey=${lolhuman}&img=${foto2xscl}`, '2xscale.jpg', '', id)
                    } else if (q) {
                        await piyo.sendFileFromUrl(from, `${urllolhuman}/api/upscale?apikey=${lolhuman}&img=${encodeURIComponent(q)}`, '2xscale.jpg', '', id)
                    }
                    break
                case 'removebg':
                    await piyo.reply(from, ind.wait(), id)
                    if (isMedia && type === 'image' || isQuotedImage) {
                        const rmvbg = isQuotedImage ? quotedMsg : message
                        const datarmvbg = await decryptMedia(rmvbg, uaOverride)
                        const fotormvbg = await uploadImages(datarmvbg, `removebg.${sender.id}`)

                        await piyo.sendFileFromUrl(from, `${urllolhuman}/api/removebg?apikey=${lolhuman}&img=${fotormvbg}`, 'removebg.jpg', '', id)
                    } else if (q) {
                        await piyo.sendFileFromUrl(from, `${urllolhuman}/api/removebg?apikey=${lolhuman}&img=${encodeURIComponent(q)}`, 'removebg.jpg', '', id)
                    }
                    break
                case 'cekjodoh':
                    if (args.length == 0) {
                        return piyo.reply(from, `Untuk mengecek jodoh melalui nama\nketik: ${prefix}cekjodoh nama pasangan\n\ncontoh: ${prefix}cekjodoh aku kamu\n\nhanya bisa pakai nama panggilan (satu kata)`, id)
                    }

                    await piyo.reply(from, ind.wait(), id)
                    rugaapi.cekjodoh(args[0], args[1])
                        .then(async (res) => {
                            await piyo.sendFileFromUrl(from, `${res.link}`, 'inifile.jpg', `${res.text}`, id)
                        })
                    break
                case 'spekhp':

                    await piyo.reply(from, ind.wait(), id)
                    try {
                        rugaapi.gsmarena(q)
                            .then(async ({ result }) => {
                                await piyo.sendFileFromUrl(from, result.image, `${result.title}.jpg`, ind.gsm(result), id)
                                    .then(() => console.log('Berhasil kirim phone info!'))
                            })
                    } catch (err) {
                        console.error(err)
                        await piyo.reply(from, `Error!\n${err}`, id)
                    }
                    break
                //////////////////////////////////////////// Random Kata////////////////////////////////////////////////////////
                case 'liriklagu':
                    await piyo.reply(from, ind.wait(), id)
                    const lirikk = await axios.get(`${urllolhuman}/api/lirik?apikey=${lolhuman}&query=${encodeURIComponent(q)}`)
                    const lik = lirikk.data.result
                    await piyo.reply(from, `*LIRIK*:\n${lik.lirik}`, id)
                    break
                case 'buatgrup':
                    argos = body.trim().split(' ')
                    const gcname = argos[1]
                    piyo.createGroup(gcname, sender.id)
                    await piyo.sendText(from, `Sukses membuat grup`, id)
                    break

                case 'fakta':
                    fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/faktaunix.txt')
                        .then(res => res.text())
                        .then(body => {
                            let splitnix = body.split('\n')
                            let randomnix = splitnix[Math.floor(Math.random() * splitnix.length)]
                            piyo.reply(from, randomnix, id)
                        })
                        .catch(() => {
                            piyo.reply(from, 'Ada yang Error!', id)
                        })
                    break
                case 'katabijak':
                    fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/katabijax.txt')
                        .then(res => res.text())
                        .then(body => {
                            let splitbijak = body.split('\n')
                            let randombijak = splitbijak[Math.floor(Math.random() * splitbijak.length)]
                            piyo.reply(from, randombijak, id)
                        })
                        .catch(() => {
                            piyo.reply(from, 'Ada yang Error!', id)
                        })
                    break
                case 'pantun':
                    fetch('https://raw.githubusercontent.com/ArugaZ/grabbed-results/main/random/pantun.txt')
                        .then(res => res.text())
                        .then(body => {
                            let splitpantun = body.split('\n')
                            let randompantun = splitpantun[Math.floor(Math.random() * splitpantun.length)]
                            piyo.reply(from, randompantun.replace(/piyo-line/g, "\n"), id)
                        })
                        .catch(() => {
                            piyo.reply(from, 'Ada yang Error!', id)
                        })
                    break

                case 'cersex':
                    await piyo.sendText(from, ind.wait(), id)
                    rugaapi.cersex()
                        .then(async ({ result }) => {
                            await piyo.sendText(from, `𝘊𝘦𝘳𝘪𝘵𝘢 𝘕𝘨𝘦𝘯𝘵𝘰𝘵~\nJudul : ${result.judul}\n${result.cerita}`, id)
                        })
                    break
                case 'nickepep':
                    await piyo.sendText(from, ind.wait(), id)
                    rugaapi.nick()
                        .then(async ({ result }) => {
                            await piyo.sendText(from, `${result}`, id)
                        })
                    break

                case 'nhpdf':
                    if (args.length === 0) return piyo.reply(from, `Pake Kodenya mas`, id)

                    await piyo.reply(from, ind.wait(), id)
                    const nh = await axios.get(`${urllolhuman}/api/nhentaipdf/${encodeURIComponent(q)}?apikey=${lolhuman}`)
                    await piyo.sendFileFromUrl(from, nh.data.result, 'piyo.pdf', '', id)
                    break

                case 'listhero':
                    await piyo.sendText(from, ind.wait(), id)
                    rugaapi.epep()
                        .then(async ({ result }) => {
                            let tode = body.split('\n')
                            await piyo.reply(from, `Nih gan : ${result}`, id)
                        })
                    break
                case 'nekopoiapp':
                    await piyo.reply(from, ind.wait(), id)
                    await piyo.sendFileFromUrl(from, `https://bit.ly/nekopoiapp`, 'nekopoi.apk', `Nih apk nya mas`, id)
                        .then(() => console.log('Success send apk'))
                    break
                case 'register':
                    if (isRegistered) return await piyo.reply(from, ind.registeredAlready(), id)
                    if (!q.includes('|')) return await piyo.sendFile(from, './media/register.png', id)
                    const dataDiri = q.split('|').join('-')
                    if (!dataDiri) return await piyo.sendFile(from, './media/register.png', id)
                    _registered.push(sender.id)
                    _biodata.push(dataDiri)
                    fs.writeFileSync('./settings/registered.json', JSON.stringify(_registered))
                    fs.writeFileSync('./settings/biodata.json', JSON.stringify(_biodata))
                    await piyo.reply(from, ind.registered(), id)
                    break
                case 'kapankah':
                    const when = args.join(' ')
                    const ans = kapan[Math.floor(Math.random() * (kapan.length))]
                    if (!when) piyo.reply(from, `⚠️ Format salah! Ketik *${prefix}kapankah* pertanyaanya`)
                    await piyo.sendTextWithMentions(from, `Pertanyaan Dari @${sender.id}\nKapan *${when}* \n\nJawaban: ${ans}`)
                    break

                // Other Command
                case 'lk21':

                    await piyo.reply(from, ind.wait(), id)
                    rugaapi.movie(q)
                        .then(async ({ result }) => {
                            let movies = `Hasil Pencarian film: *${result.judul}*\n`
                            for (let i = 0; i < result.data.length; i++) {
                                movies += `\n\n*Resolusi:* : ${result.data[i].resolusi}\nURL: ${result.data[i].urlDownload}\nBy: xKiwilxbot\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                            }
                            piyo.reply(from, movies, id);
                        })
                    break
                case 'cekongkir':

                    await piyo.reply(from, ind.wait(), id)
                    const kurir = q.substring(0, q.indexOf('|') - 1)
                    const askot = q.substring(q.indexOf('|') + 2, q.lastIndexOf('|') - 1)
                    const tukot = q.substring(q.lastIndexOf('|') + 2)
                    rugaapi.ongkir(kurir, askot, tukot)
                        .then(async ({ result }) => {
                            let onkir = `_*${result.title}*_\n`
                            for (let i = 0; i < result.data.length; i++) {
                                onkir += `\n\n*Layanan:* : ${result.data[i].layanan}\nEstimated pengiriman: ${result.data[i].etd}\nTarif: ${result.data[i].tarif}\n\nBy: xKiwilxbotInfo: ${result.informasi}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                            }
                            piyo.reply(from, onkir, id);
                        })
                    break
                case 'shopee':

                    const namaBarang = q.substring(0, q.indexOf('|') - 1)
                    const jumlahBarang = q.substring(q.lastIndexOf('|') + 2)
                    await piyo.reply(from, ind.wait(), id)
                    try {
                        rugaapi.shopee(namaBarang, jumlahBarang)
                            .then(async ({ result }) => {
                                for (let i = 0; i < 1; i++) {
                                    const { nama, harga, terjual, shop_location, description, link_product, image_cover } = result.items[i]
                                    await piyo.sendFileFromUrl(from, image_cover, `${nama}.jpg`, ind.shopee(nama, harga, terjual, shop_location, description, link_product))
                                }
                                console.log('Berhasil kirim Shopee data!')
                            })
                    } catch (err) {
                        console.error(err)
                        await piyo.reply(from, `Error!\n\n${err}`, id)
                    }
                    break
                case 'film':
                    piyo.reply(from, ind.wait(), id)
                    try {
                        rugaapi.film()
                            .then(async ({ result }) => {
                                await piyo.reply(from, result.data, id)
                                console.log('sukses')
                            })
                    } catch (err) {
                        console.error(err)
                        await piyo.reply(from, `Error!\n\n${err}`, id)
                    }
                    break
                case 'playstore':
                case 'ps':
                    await piyo.reply(from, ind.wait(), id)
                    try {
                        rugaapi.playstore(q)
                            .then(async ({ result }) => {
                                for (let i = 0; i < 1; i++) {
                                    const { app_id, icon, title, developer, description, price, free } = result[i]
                                    await piyo.sendFileFromUrl(from, icon, `${title}.jpg`, ind.playstore(app_id, title, developer, description, price, free))
                                }
                                console.log('Berhasil kirim PlayStore result!')
                            })
                    } catch (err) {
                        console.error(err)
                        await piyo.reply(from, `Error!\n\n${err}`, id)
                    }
                    break
                case 'resi':
                    if (args.length !== 2) return piyo.reply(from, `Maaf, format pesan salah.\nSilahkan ketik pesan dengan ${prefix}resi <kurir> <no_resi>\n\nKurir yang tersedia:\njne, pos, tiki, wahana, jnt, rpx, sap, sicepat, pcp, jet, dse, first, ninja, lion, idl, rex`, id)
                    const kurirs = ['jne', 'pos', 'tiki', 'wahana', 'jnt', 'rpx', 'sap', 'sicepat', 'pcp', 'jet', 'dse', 'first', 'ninja', 'lion', 'idl', 'rex']
                    if (!kurirs.includes(args[0])) return piyo.sendText(from, `Maaf, jenis ekspedisi pengiriman tidak didukung layanan ini hanya mendukung ekspedisi pengiriman ${kurirs.join(', ')} Tolong periksa kembali.`)
                    console.log('Memeriksa No Resi', args[1], 'dengan ekspedisi', args[0])
                    cekResi(args[0], args[1]).then((result) => piyo.sendText(from, result))
                    break
                case 'bass':
                    if (isQuotedAudio) {
                        let dB = 58
                        let freq = 75
                        console.log(color('[WAPI]', 'green'), 'Downloading and decrypt media...')
                        const mediaData = await decryptMedia(quotedMsg)
                        const bass = await stream2Buffer(write => {
                            ffmpeg(buffer2Stream(mediaData))
                                .audioFilter('equalizer=f=' + freq + ':width_type=o:width=2:g=' + dB)
                                .format('mp3')
                                .on('start', commandLine => console.log(color('[FFmpeg]'), commandLine))
                                .on('progress', progress => console.log(color('[FFmpeg]'), progress))
                                .on('end', () => console.log(color('[FFmpeg]'), 'Processing finished!'))
                                .stream(write)
                        })
                        piyo.sendPtt(from, baseURI(bass, 'audio/mp3'), id)
                    } else {
                        piyo.reply(from, `Hanya tag data audio!`, id)
                    }
                    break

                case 'tomp3':
                    if ((isMedia || isQuotedVideo || isQuotedFile)) {
                        piyo.reply(from, ind.wait(), id)
                        const encryptMedia = isQuotedVideo || isQuotedFile ? quotedMsg : message
                        const _mimetype = isQuotedVideo || isQuotedFile ? quotedMsg.mimetype : mimetype
                        console.log(color('[WAPI]', 'green'), 'Downloading and decrypt media...')
                        const mediaData = await decryptMedia(encryptMedia)
                        let temp = './temp'
                        let name = new Date() * 1
                        let fileInputPath = path.join(temp, 'video', `${name}.${_mimetype.replace(/.+\//, '')}`)
                        let fileOutputPath = path.join(temp, 'audio', `${name}.mp3`)
                        console.log(color('[fs]', 'green'), `Downloading media into '${fileInputPath}'`)
                        fs.writeFile(fileInputPath, mediaData, err => {
                            if (err) return piyo.sendText(from, 'Ada yang error saat menulis file\n\n' + err)
                            // ffmpeg -y -t 5 -i <input_file> -vf "scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease" -qscale 100 <output_file>.webp
                            ffmpeg(fileInputPath)
                                .format('mp3')
                                .on('start', function (commandLine) {
                                    console.log(color('[FFmpeg]', 'green'), commandLine)
                                })
                                .on('progress', function (progress) {
                                    console.log(color('[FFmpeg]', 'green'), progress)
                                })
                                .on('end', function () {
                                    console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                    // fs.readFile(fileOutputPath, { encoding: 'base64' }, (err, base64) => {
                                    // if (err) return piyo.sendText(from, 'Ada yang error saat membaca file .mp3') && console.log(color('[ERROR]', 'red'), err)
                                    piyo.sendFile(from, fileOutputPath, 'audio.mp3', '', id)
                                    // })
                                    setTimeout(() => {
                                        try {
                                            fs.unlinkSync(fileInputPath)
                                            fs.unlinkSync(fileOutputPath)
                                        } catch (e) {
                                            console.log(color('[ERROR]', 'red'), e)
                                        }
                                    }, 30000)
                                })
                                .save(fileOutputPath)
                        })
                    }
                    limitAdd(serial)
                    break
                case 'toptt':
                    if (quotedMsg) {
                        if (quotedMsg.type === 'audio') {
                            try {
                                await piyo.reply(from, `Tunggu sebentar`, id)
                                mediaData = await decryptMedia(quotedMsg, uaOverride)
                                fs.writeFileSync(`./media/vn.mp3`, mediaData)
                                piyo.reply(from, `Lagu berhasil di convert ke voice not\ntunggu sebentar bot akan mengirim voice notnya`, id)
                                await piyo.sendPtt(from, `./media/asu.mp3`, id)
                            } catch (err) {
                                piyo.reply(from, `Gagal Convert Audio`, id)
                            }
                        } else {
                            piyo.reply(from, `Harus reply audio!`, id)
                        }
                    } else {
                        piyo.reply(from, `Gaada data yang direply gan`, id)
                    }
                    break
                case 'translate':

                    if (args.length != 1) return piyo.reply(from, `Maaf, format pesan salah.\nSilahkan reply sebuah pesan dengan caption ${prefix}translate <kode_bahasa>\ncontoh ${prefix}translate id`, id)
                    if (!quotedMsg) return piyo.reply(from, `Maaf, format pesan salah.\nSilahkan reply sebuah pesan dengan caption ${prefix}translate <kode_bahasa>\ncontoh ${prefix}translate id`, id)
                    const quoteText = quotedMsg.type == 'chat' ? quotedMsg.body : quotedMsg.type == 'image' ? quotedMsg.caption : ''
                    translate(quoteText, args[0])
                        .then((result) => piyo.sendText(from, result))
                        .catch(() => piyo.sendText(from, 'Error, Kode bahasa salah.'))
                    break
                case 'ceklokasi':
                    if (quotedMsg.type !== 'location') return piyo.reply(from, `Maaf, format pesan salah.\nKirimkan lokasi dan reply dengan caption ${prefix}ceklokasi`, id)
                    console.log(`Request Status Zona Penyebaran Covid-19 (${quotedMsg.lat}, ${quotedMsg.lng}).`)
                    const zoneStatus = await getLocationData(quotedMsg.lat, quotedMsg.lng)
                    if (zoneStatus.kode !== 200) piyo.sendText(from, 'Maaf, Terjadi error ketika memeriksa lokasi yang anda kirim.')
                    let datax = ''
                    for (let i = 0; i < zoneStatus.data.length; i++) {
                        const { zone, region } = zoneStatus.data[i]
                        const _zone = zone == 'green' ? 'Hijau* (Aman) \n' : zone == 'yellow' ? 'Kuning* (Waspada) \n' : 'Merah* (Bahaya) \n'
                        datax += `${i + 1}. Kel. *${region}* Berstatus *Zona ${_zone}`
                    }
                    const toll = `*CEK LOKASI PENYEBARAN COVID-19*\nHasil pemeriksaan dari lokasi yang anda kirim adalah *${zoneStatus.status}* ${zoneStatus.optional}\n\nInformasi lokasi terdampak disekitar anda:\n${datax}`
                    piyo.sendText(from, toll)
                    break
                case 'shortlink':

                    if (args.length == 0) return piyo.reply(from, `ketik ${prefix}shortlink <url>`, id)
                    if (!isUrl(args[0])) return piyo.reply(from, 'Maaf, url yang kamu kirim tidak valid.', id)
                    const shortlink = await urlShortener(args[0])
                    await piyo.sendText(from, shortlink)
                        .catch(() => {
                            piyo.reply(from, 'Ada yang Error!', id)
                        })
                    break
                case 'mtk':
                    if (typeof Math_js.evaluate(q) !== "number") {
                        await piyo.reply(from, ind.notNum(q), id)
                    } else {
                        await piyo.reply(from, `*「 MATH 」*\n\n${encodeURIComponent(q)} = ${Math_js.evaluate(q)}`, id)
                    }
                    break
                case 'kuismtk':
                    if (isMtk) return piyo.reply(from, `Kuis Sedang Berlangsung`, id)
                    if (!isGroupMsg) return piyo.reply(from, 'Perintah ini hanya bisa di gunakan dalam group!', id)
                    await piyo.reply(from, ind.wait(), id)
                    await piyo.reply(from, `Silahkan Pilih Level Kuiz\n*Easy*\n*Medium*\n*Hard*`, id)
                    kuismtkk.push(chat.id)
                    fs.writeFileSync('./settings/kuismtkk.json', JSON.stringify(kuismtkk))
                    break

                case 'hilih':

                    if (args.length == 0) return piyo.reply(from, `Mengubah kalimat menjadi hilih\n\nketik ${prefix}hilih kalimat`, id)
                    rugaapi.hilih(body.slice(11))
                        .then(async (res) => {
                            await piyo.reply(from, res.kata, id)
                        })
                    break
                case 'nhdl':

                    if (isGroupMsg) {
                        if (!isNsfw) return await piyo.reply(from, ind.notNsfw(), id)
                    }
                case 'wiki':

                    if (args.length == 0) return piyo.reply(from, `Untuk mencari suatu kata dari wikipedia\nketik: ${prefix}wiki [kata]`, id)
                    const wikip = body.slice(6)
                    const wikis = await rugaapi.wiki(wikip)
                    await piyo.reply(from, wikis, id)
                        .catch(() => {
                            piyo.reply(from, 'Ada yang Error!', id)
                        })
                    break
                case 'listbacot':
                    const bacul = dbcot
                    let bacotanmu = `╔══✪〘 *List Bacot!* 〙✪══\n`
                    for (let i = 0; i < bacul.length; i++) {
                        bacotanmu += '╠➥'
                        bacotanmu += ` ${bacul[i]}\n`
                    }
                    bacotanmu += '╚═〘 *xKiwilx Bot* 〙'
                    await piyo.sendText(from, bacotanmu)
                    break
                case 'addbacot': {
                    if (!args.length >= 1) return piyo.reply(from, 'salah kak, /addbacot teksnya', id)
                    const bacot = body.slice(10)
                    dbcot.push(bacot)
                    fs.writeFileSync('./settings/bacot.json', JSON.stringify(dbcot))
                    piyo.reply(from, `Sukses menambahkan Kata bacot ke database\nTotal data bacot sekarang : *${dbcot.length - 1}*`, id)
                }
                    break
                //Fun Menu
                case 'chat':
                    piyo.reply(from, `Untuk mengaktifkan piyobot chat\n\n penggunannya\n${prefix}piyo on --mengaktifkan\n${prefix}piyo off --menonatifkan\n`, id)
                    break
                    break
                case 'piyo':
                    if (isGroupMsg) {
                        return await piyo.reply(from, `Fitur ini khusus private chat`, id)
                    } else {
                        if (args.length !== 1) return piyo.reply(from, `Untuk mengaktifkan piyo pada  Chat\n\nPenggunaan\n${prefix}piyo on --mengaktifkan\n${prefix}piyo off --nonaktifkan\n`, id)
                        if (args[0] == 'on') {
                            chatt.push(chatId)
                            fs.writeFileSync('./settings/piyo.json', JSON.stringify(chatt))
                            piyo.reply(from, 'Mengaktifkan bot piyo-piyo!', id)
                        } else if (args[0] == 'off') {
                            let inxx = chatt.indexOf(chatId)
                            chatt.splice(inxx, 1)
                            fs.writeFileSync('./settings/piyo.json', JSON.stringify(chatt))
                            piyo.reply(from, 'Menonaktifkan bot piyo-piyo!', id)
                        } else {
                            piyo.reply(from, `Untuk mengaktifkan piyo \n\nPenggunaan\n${prefix}piyo on --mengaktifkan\n${prefix}piyo off --nonaktifkan\n`, id)
                        }
                    }
                    break
                
                //////////////////////////////////////////////////////Owner Bot////////////////////////////////////////////////////
                case 'getses':
                    if (!isOwnerBot) return piyo.reply(dari, 'Perintah ini hanya untuk Owner xKiwilx', id)
                    const sesPic = await piyo.getSnapshot()
                    piyo.sendFile(from, sesPic, 'session.png', 'Nih boss', id)
                    break
                case 'haram':
                    if (!isOwnerBot) return piyo.reply(from, 'buat orang ganss aja', id)
                    if (setting.halal === true) return
                    setting.halal = true
                    halal = true
                    fs.writeFileSync('./settings/setting.json', JSON.stringify(setting, null, 2))
                    await piyo.reply(from, '*Sukses aktif Haram*', id)
                    break
                case 'halal':
                    if (!isOwnerBot) return piyo.reply(from, 'buat orang ganss aja', id)
                    if (setting.halal === false) return
                    setting.halal = false
                    halal = false
                    fs.writeFileSync('./settings/setting.json', JSON.stringify(setting, null, 2))
                    await piyo.reply(from, '*Sukses aktif Halal*', id)
                    break
                case 'eval':
                case 'ev':
                    if (!isOwnerBot) return await piyo.reply(from, ind.ownerOnly(), id)

                    try {
                        let evaled = await eval(q)
                        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                        await piyo.sendText(from, evaled)
                    } catch (err) {
                        console.error(err)
                        await piyo.reply(from, 'Error!', id)
                    }
                    break
                case 'getcode': {
                    if (!isOwnerBot) return await piyo.reply(from, ind.ownerOnly(), id)
                    if (!q) return await piyo.reply(from, `Silahkan ketik /getcode harinya\nContoh: /getcode 15`, id)
                    if (ar[0] === '15') {
                        await piyo.reply(from, ind.wait(), id)
                        const codeuser = createcode(15)
                        code15.push(codeuser)
                        fs.writeFileSync('./settings/code15.json', JSON.stringify(code15))
                        await piyo.sendText(ownerNumber, `*「 PREMIUM 15 HARI 」*\n\n➸ *CODE :* ${codeuser}\n➸ *CARA PAKAI*\n➸ Ketik /premiumcode codenya`, id)
                        premiumcode.push(codeuser)
                        fs.writeFileSync('./settings/premiumcode.json', JSON.stringify(premiumcode))
                    } else {
                        if (ar[0] === '30') {
                            await piyo.reply(from, ind.wait(), id)
                            const codeuserr = createcode(15)
                            code30.push(codeuserr)
                            fs.writeFileSync('./settings/code30.json', JSON.stringify(code30))
                            await piyo.sendText(ownerNumber, `*「 PREMIUM 30 HARI 」*\n\n➸ *CODE :* ${codeuserr}\n➸ *CARA PAKAI*\n➸ Ketik /premiumcode codenya`, id)
                            premiumcode.push(codeuserr)
                            fs.writeFileSync('./settings/premiumcode.json', JSON.stringify(premiumcode))
                        }
                    }
                    if (ar[0] === '60') {
                        await piyo.reply(from, ind.wait(), id)
                        const codeuserrr = createcode(15)
                        code60.push(codeuserrr)
                        fs.writeFileSync('./settings/code60.json', JSON.stringify(code60))
                        await piyo.sendText(ownerNumber, `*「 PREMIUM 60 HARI 」*\n\n➸ *CODE :* ${codeuserrr}\n➸ *CARA PAKAI*\n➸ Ketik /premiumcode codenya`, id)
                        premiumcode.push(codeuserrr)
                        fs.writeFileSync('./settings/premiumcode.json', JSON.stringify(premiumcode))
                    }
                }
                    break
                case 'sewa':

                    if (!isOwnerBot) return await piyo.reply(from, ind.ownerOnly(), id)
                    if (ar.length == 0) return piyo.reply(from, `Ketik /sewa add/del harinya\nContoh: /sewa add 30d`, id)
                    if (ar.length == 1) return piyo.reply(from, `Ketik /sewa add/del harinya\nContoh: /sewa add 30d`, id)
                    if (ar[0] === 'add') {
                        sewa.addSewaGroup(chat.id, args[1], _sewa)
                        await piyo.reply(from, ` *「 SEWA ADDED 」*\n\n➸ *ID*: ${chat.id}\n➸ *Expired*: ${ms(toMs(args[1])).days} day(s) ${ms(toMs(args[1])).hours} hour(s) ${ms(toMs(args[1])).minutes} minute(s)\n\nBot Akan Keluar Secara Otomatis\nDalam waktu yang sudah di tentukan`, id)
                        await piyo.sendContact(from, ownerNumber)
                        await piyo.sendText(from, `*CHAT OWNER JIKA INGIN PERPANJANG DURASI*`, id)
                        await piyo.sendTextWithMentions(from, `@${ownerNumber} Silahkan Baca Pesan Pribadi Saya`)
                        await piyo.sendText(ownerNumber, `Sukses Menyewakan bot kedalam grup ${formattedTitle}\nSalin ID Dibawah Untuk Mendelete Sewaan Di Grup Tersebut\nDengan Ketik /sewa del IDnya`, id)
                        await piyo.sendText(ownerNumber, `${chat.id}`)
                    }
                    else if (ar[0] === 'del') {
                        _sewa.splice(sewa.getSewaPosition(chat.id, _sewa), 1)
                        fs.writeFileSync('./settings/sewa.json', JSON.stringify(_sewa))
                        await piyo.reply(from, ind.doneOwner(), id)
                    }
                    else {
                        _sewa.splice(sewa.getSewaPosition(args[1], _sewa), 1)
                        fs.writeFileSync('./settings/sewa.json', JSON.stringify(_sewa))
                        await piyo.reply(from, ind.doneOwner(), id)
                    }
                    break
                case 'sendsewa':
                    let linkRegex = /chat\.whatsapp\.com\/(?:invite\/)?([0-9A-Za-z]{20,24})/i
                    if (ar.length == 0) return piyo.reply(from, `Ketik /sendsewa linknya harinya\n\nExample: /sendsewa link 30d`, id)
                    if (ar.length == 1) return piyo.reply(from, `Ketik /sendsewa linknya harinya\n\nExample: /sendsewa link 30d`, id)
                    let [, code] = q.match(linkRegex) || []
                    if (!code) throw 'Link invalid'
                    let res = await piyo.inviteInfo(code)
                    if (!res) throw res
                    piyo.reply(from, 'Tunggu Sebentar' , id)
                    sewa.addSewaGroup(res.id , args[1], _sewa)
                    await piyo.reply(from, ` *「 SEWA ADDED 」*\n\n➸ *NAMA*: ${res.subject}\n➸ *ID*: ${res.id}\n➸ *Expired*: ${ms(toMs(args[1])).days} day(s) ${ms(toMs(args[1])).hours} hour(s) ${ms(toMs(args[1])).minutes} minute(s)\n\nBot Akan Keluar Secara Otomatis\nDalam waktu yang sudah di tentukan` , id)
                    console.log(res.owner)
                    await piyo.sendText(`${res.owner}`, `Group Anda ${res.subject} Telah Menyewakan Bot xKiwilx`,  id)
                    await piyo.joinGroupViaLink(code)
                    await rugaapi.sleep(10000)
                    await piyo.sendText(res.id , `Bot Activated In Group\n\n➸ *Expired*: ${ms(toMs(args[1])).days} day(s) ${ms(toMs(args[1])).hours} hour(s) ${ms(toMs(args[1])).minutes} minute(s)` , id)
                    break   
                    
                case 'bc': //untuk broadcast atau promosi

                    if (!isOwnerBot) return piyo.reply(from, 'Perintah ini hanya untuk Owner bot!', id)
                    if (args.length == 0) return piyo.reply(from, `Untuk broadcast ke semua chat ketik:\n${prefix}bc [isi chat]`)
                    let msg = body.slice(4)
                    const chatz = await piyo.getAllChatIds()
                    for (let idk of chatz) {
                        var cvk = await piyo.getChatById(idk)
                        if (!cvk.isReadOnly) piyo.sendText(idk, `${msg}`)
                        if (cvk.isReadOnly) piyo.sendText(idk, `${msg}`)
                    }
                    piyo.reply(from, 'Broadcast Success!', id)
                    break
                case 'bcgrup':
                    if (!isOwnerBot) return piyo.reply(from, 'Perintah ini hanya untuk Owner bot', id)
                    const allGrouppz = await piyo.getAllGroups()
                    for (let gclistt of allGrouppz) {
                        await piyo.sendText(gclistt.contact.id, `${encodeURIComponent(q)}`)
                    }
                    piyo.reply(from, 'Succes Bc all group!', id)
                    break
                case 'bcimg':
                    if (!isOwnerBot) return piyo.reply(from, `Khususs Owner `, id)
                    if (!q) return piyo.reply(from, `Hai  Kak ${pushname} untuk menggunakan fitur bcimg, Silahkan kirim gambar/reply gambarnya , ketik /bcimg teksna`, id)
                    if (isMedia && type === 'image' || isQuotedImage) {
                        await piyo.reply(from, ind.wait(), id)
                        const encryptMedia = isQuotedImage ? quotedMsg : message
                        const mediaData = await decryptMedia(encryptMedia, uaOverride)
                        fs.writeFileSync(`./media/images/bc.jpg`, mediaData)
                        const chaim = await piyo.getAllChatIds()
                        for (let grp of chaim) {
                            var cukk = await piyo.getChatById(grp)
                            if (!cukk.isReadOnly) piyo.sendFile(grp, `./media/images/bc.jpg`, 'inifile.jpg', `[PIYOBOT BROADCAST]\n\n${encodeURIComponent(q)}`, '', id)
                            if (cukk.isReadOnly) piyo.sendFile(grp, `./media/images/bc.jpg`, 'inifile.jpg', `[PIYOBOT BROADCAST]\n\n${encodeURIComponent(q)}`, '', id)
                        }
                        await piyo.reply(from, 'Broadcast Success!', id)
                        fs.unlinkSync(`./media/images/bc.jpg`)
                    }
                    break
                case 'ban':

                    if (!isOwnerBot) return piyo.reply(from, 'Perintah ini hanya untuk Owner bot!', id)
                    if (args.length == 0) return piyo.reply(from, `Untuk banned seseorang agar tidak bisa menggunakan commands\n\nCaranya ketik: \n${prefix}ban add 628xx --untuk mengaktifkan\n${prefix}ban del 628xx --untuk nonaktifkan\n\ncara cepat ban banyak digrup ketik:\n${prefix}ban @tag @tag @tag`, id)
                    if (ar[0] === 'add') {
                        if (mentionedJidList.length !== 0) {
                            for (let benet of mentionedJidList) {
                                if (benet === botNumber) return await piyo.reply(from, ind.wrongFormat(), id)
                                banned.push(benet)
                                fs.writeFileSync('./settings/banned.json', JSON.stringify(banned))
                            }
                            await piyo.reply(from, 'Mampus gua ban lu anjg!', id)
                        } else {
                            banned.push(args[1] + '@c.us')
                            fs.writeFileSync('./settings/banned.json', JSON.stringify(banned))
                            await piyo.reply(from, 'Mampus gua ban lu anjg!', id)
                        }
                    } else if (ar[0] === 'del') {
                        if (mentionedJidList.length !== 0) {
                            if (mentionedJidList[0] === botNumber) return await piyo.reply(from, ind.wrongFormat(), id)
                            banned.splice(mentionedJidList[0], 1)
                            fs.writeFileSync('./settings/banned.json', JSON.stringify(banned))
                            await piyo.reply(from, 'Nih gua udh unbaned!', id)
                        } else {
                            banned.splice(args[1] + '@c.us', 1)
                            fs.writeFileSync('./settings/banned.json', JSON.stringify(banned))
                            await piyo.reply(from, 'Nih gua udh unbaned!', id)
                        }
                    } else {
                        await piyo.reply(from, ind.wrongFormat(), id)
                    }
                    break
                // AUTO STIKER
                case 'autostiker':
                case 'autostik':
                case 'autstik':

                    if (!isGroupMsg) return await piyo.reply(from, ind.groupOnly(), id)
                    if (!isGroupAdmins) return await piyo.reply(from, ind.adminOnly(), id)
                    if (ar[0] === 'enable') {
                        if (isAutoStikerOn) return await piyo.reply(from, ind.autoStikOnAlready(), id)
                        _autostiker.push(chat.id)
                        fs.writeFileSync('./settings/autostiker.json', JSON.stringify(_autostiker))
                        await piyo.reply(from, ind.autoStikOn(), id)
                    } else if (ar[0] === 'disable') {
                        _autostiker.splice(chat.id, 1)
                        fs.writeFileSync('./settings/autostiker.json', JSON.stringify(_autostiker))
                        await piyo.reply(from, ind.autoStikOff(), id)
                    } else {
                        await piyo.reply(from, ind.wrongFormat(), id)
                    }
                    break

                case 'bacot':
                    if (args.length == 1) {
                        const no = args[0]
                        const cekdb = dbcot.length
                        if (cekdb <= no) return await piyo.reply(from, `Total data saat ini hanya sampai *${cekdb - 1}*`, id)
                        const res = dbcot[no]
                        piyo.sendText(from, res)
                    } else {
                        const kata = dbcot[Math.floor(Math.random() * (dbcot.length))];
                        piyo.sendText(from, kata)
                    }
                    break
                case 'leaveall': //mengeluarkan bot dari semua group serta menghapus chatnya
                    if (!isOwnerBot) return piyo.reply(from, 'Perintah ini hanya untuk Owner bot', id)
                    const allChatz = await piyo.getAllChatIds()
                    const allGroupz = await piyo.getAllGroups()
                    for (let gclist of allGroupz) {
                        await piyo.sendText(gclist.contact.id, `Maaf bot sedang pembersihan, total chat aktif : ${allChatz.length}`)
                        await piyo.leaveGroup(gclist.contact.id)
                        await piyo.deleteChat(gclist.contact.id)
                    }
                    piyo.reply(from, 'Success leave all group!', id)
                    break
                case 'clearall': //menghapus seluruh pesan diakun bot
                    if (!isOwnerBot) return piyo.reply(from, 'Perintah ini hanya untuk Owner bot', id)
                    const allChatx = await piyo.getAllChats()
                    for (let dchat of allChatx) {
                        await piyo.deleteChat(dchat.id)
                    }
                    piyo.reply(from, 'Success clear all chat!', id)
                    break
                default:
                    if (commandd.startsWith('/')) {
                        await piyo.reply(from, `Maaf ${pushname}, Command *${arghh[0]}* Tidak Terdaftar Di Dalam */menu*!`, id)
                    }
            }
            // xKiwilxbot Function
            if ((!isCmd && chatId && isChat) && message.type === 'chat') {
                await piyo.sendSeen(from, true)
                const piyoget = await axios.get(`${urllolhuman}/api/simi?apikey=${lolhuman}&text=${encodeURIComponent(message.body)}`)
                await piyo.simulateTyping(from, true)
                const rancok = [1000, 2000, 3000, 4000, 5000]
                const matcok = rancok[Math.floor(Math.random() * rancok.length)]
                await rugaapi.sleep(matcok)
                await piyo.reply(from, `xKiwilxbot Menjawab: ${piyoget.data.result}`, id)
            }
        }
    } catch (err) {
        console.log(color('[EROR]', 'red'), err)
    }
}