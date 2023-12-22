const request = require('request');
const fs = require('fs');
const dm = require('@open-wa/wa-decrypt');
const multer = require('multer');
const upload = multer();

function voteadapter(piyo, message, pollfile, voterslistfile) {
    console.log('flag1')
    //voteadapter
    console.log(voterslistfile, 'Piyobot')
    if (isvoted(message, voterslistfile)) {
        piyo.reply(message.chatId, 'Kamu sudah memvote dalam polling ini!', message.id, true);
        return;
    }
    //console.log('flag2')
    let data = readJsonFile(pollfile)
    if (data['candis'] === 'null') {
        piyo.reply(message.chatId, 'Tidak ada kandidat dalam poll ini!', message.id, true);
        return;
    }
    let arr = data['candis']
    // console.log(arr)
    for (let i = 0; i < arr.length; i++) {
        if (message.body.includes((i + 1)
            .toString())) {
            //console.log(i)
            addvote(piyo, message, i, pollfile);
            return;
        }
    }
    console.log('here')
    piyo.reply(message.chatId, 'Salah!!!', message.id, true);
}
async function addcandidate(piyo, message, candi, pollfile, voterslistfile) {
    if (await isGroupAdmin(piyo, message, message, message.author)) {
        //  console.log('admin logging')
    } else {
        piyo.reply(message.chatId, `Hubungi admin grup untuk menambahkan ${candi}`, message.id, true);
        return;
    }
    let data = readJsonFile(pollfile)
    if (data['candis'] === 'null') {
        //  let arra=[];
        let cd = {
            name: candi,
            votes: 0
        };
        // cd.put('name',candi);
        // cd.put('votes',0);
        // arra.push(cd);
        delete data['candis'];
        // data.put('candis',arra);
        data['candis'] = [cd,]
    } else {
        if (data['candis'].length >= 9) {
            piyo.reply(message.chatId, 'Kamu tidak bisa menambahkan lebih dari 9 kandidat!', message.id, true);
            return;
        }
        let cd = {
            name: candi,
            votes: 0
        };
        data['candis'].push(cd);
    }
    //l(base.toString());
    saveJsonFile(pollfile, data)
    piyo.reply(message.chatId, `Berhasil menambahkan ${candi} sebagai kandidat`, message.id, true);
}

function addvote(piyo, message, num, pollfile, voterslistfile) {
    console.log(num)
    let data = readJsonFile(pollfile)
    let vts = data['candis'][num]['votes'];
    vts = vts + 1;
    delete data['candis'][num]['votes'];
    data['candis'][num]['votes'] = vts
    console.log(data)
    saveJsonFile(pollfile, data)
    let op;
    op = '*Kamu memilih ' + data['candis'][num]['name'] + '*\n 🎯️ Poll : *' + data['title'] + '*\n';
    let ls = '';
    let arr = data['candis'];
    for (let i = 0; i < arr.length; i++) {
        let cd = arr[i];
        ls = ls + ((i + 1)
            .toString()) + ')' + cd['name'] + ' : [' + cd['votes'] + ' Votes] \n';
    }
    op = op + ls;
    op = op + '\n Untuk memvote silakan ketik /vote <number> \n [Contoh */vote 2*]';
    piyo.reply(message.chatId, op, message.id, true);
    addvotedlog(message);
}

function isvoted(message, voterslistfile) {
    let data = readJsonFile(voterslistfile)
    // console.log(data['list'])
    return data['list'].includes(message.author);
}

function addvotedlog(message) {
    let data = readJsonFile(voterslistfile)
    data['list'].push(message.author)
    saveJsonFile(voterslistfile, data);
}

function getpoll(piyo, message, pollfile, voterslistfile) {
    let data = readJsonFile(pollfile)
    //console.log(data)
    let op = '';
    if (data['candis'] == 'null') {
        op = '🎯️ *Poll : ' + data['title'] + '*\n Tidak ada kandidat! \n gunakan /addv <kandidat> untuk menambahkan kandidat';
    } else {
        op = '🎯️ *Poll : ' + data['title'] + '*\n';
        let ls = '';
        let arr = data['candis'];
        for (let i = 0; i < arr.length; i++) {
            let cd = arr[i];
            ls = ls + (i + 1)
                .toString() + ')' + cd['name'] + ' : [' + cd['votes'] + ' Votes] \n';
        }
        op = op + ls;
        op = op + '\n Untuk memvote silakan ketik /vote <number> \n [Contoh */vote 2*]';
    }
    piyo.reply(message.chatId, op, message.id, true)
}
async function adminpollreset(piyo, message, polltitle, pollfile, voterslistfile) {
    if (await isGroupAdmin(piyo, message, message.author)) {
        var datetime = new Date();
        //  savefile(todaysdate+'.json',getFile(pollfile));
        try {
            saveJsonFile('poll_logs.json', readJsonFile(pollfile))
        } catch (e) {
            console.log('poll file not eist  for backup')
        }
        let base = {
            title: polltitle,
            polldate: datetime.toISOString()
                .slice(0, 10),
            candis: 'null'
        }
        //l(base.toString());
        saveJsonFile(pollfile, base)
        piyo.reply(message.chatId, `*🎉️ *Berhasil membuat poll\n\n 🎯️ *Title : ${polltitle}*\n \n⭐️ gunakan /addv <kandidat> untuk menambahkan kandidat`, message.id);
        //voterresetter
        let data = {
            list: ['testentry']
        }
        saveJsonFile(voterslistfile, data);
    } else {
        piyo.reply(message.chatId, '*Mohon maaf fitur ini hanya bisa digunakan oleh admin grup!*', message.id)
    }
}
var configFiles = './configFiles'

function readJsonFile(filename) {
    filename = configFiles + filename;
    let rawdata = fs.readFileSync(filename);
    return JSON.parse(rawdata);
}

function saveJsonFile(filename, object) {
    filename = configFiles + filename;
    // console.log('pokelog '+filename)
    var jsonContent = JSON.stringify(object);
    fs.writeFile(filename, jsonContent, 'utf8', function (err) {
        if (err) {
            console.log('An error occured while writing JSON Object to File.' + filename);
            return console.log(err);
        }
    });
}
async function isGroupAdmin(piyo, message, author) {
    let value = await piyo.getGroupAdmins(message.chatId)
    return value.toString()
        .includes(message.author)
}
module.exports = {
    addcandidate,
    voteadapter,
    getpoll,
    adminpollreset,
    readJsonFile,
    saveJsonFile
};
exports.textmenubaru = (pushname) => {
    return `
    ◪ 𝗜𝗡𝗙𝗢
    ❏ Hai Kak : ${pushname}
    ❏ Liberary : OPEN WA
    ❏ Prefix: 「  /  」
    ❏ ReCode: xKiwilx

    ◪ 𝗦𝗬𝗦𝗧𝗘𝗠
    │
    ├─ ❏ bcgrup
    ├─ ❏ bcimg
    ├─ ❏ bc
    ├─ ❏ botstat
    ├─ ❏ eval
    ├─ ❏ addupdate
    ├─ ❏ update
    ├─ ❏ getses
    ├─ ❏ bugreport
    ├─ ❏ ownerbot
    ├─ ❏ gantiprofile
    ├─ ❏ setpictmenu
    └─ ❏ ping
    
    ◪ 𝗠𝗘𝗗𝗜𝗔
    │
    ├─ ❏ tiktokstalk
    ├─ ❏ tomp3
    ├─ ❏ toptt
    ├─ ❏ bass
    ├─ ❏ tts <kodenegara> [text]
    ├─ ❏ film [query]

    ◪ *TOOLS*
    │
    ├─ ❏ addbacot
    ├─ ❏ listbacot
    ├─ ❏ artinama
    ├─ ❏ cekjodoh❌
    ├─ ❏ wasted
    ├─ ❏ shopee
    ├─ ❏ spekhp
    ├─ ❏ fakta
    ├─ ❏ pantun
    ├─ ❏ katabijak
    ├─ ❏ quote
    ├─ ❏ totext
    
    ◪ *ANIME*
    │
    ├─ ❏ dewabatch
    ├─ ❏ neko
    ├─ ❏ faceanime❌
    ├─ ❏ animeart
    ├─ ❏ whatanime
    ├─ ❏ rwpmobile
    ├─ ❏ rwpdesktop
    ├─ ❏ wpsearch
    
    ◪ *18+*
    |
    ├─ ❏ randomhentai
    ├─ ❏ neko18
    ├─ ❏ blowjob
    ├─ ❏ gifhentai
    ├─ ❏ pussy
    ├─ ❏ randomhentai
    ├─ ❏ randomilf
    ├─ ❏ pixiv

    ◪ *EDUKASI* + *TOBAT*
    │
    ├─ ❏ nuliskiri
    ├─ ❏ foliokiri
    ├─ ❏ nuliskanan
    ├─ ❏ foliokanan
    ├─ ❏ js
    ├─ ❏ ALaudio
    ├─ ❏ tafsir
    ├─ ❏ surah
    ├─ ❏ infosurah
    ├─ ❏ wiki
    ├─ ❏ quiziz <id>
    └─ ❏ brainly <query>

    ◪ *STICKER*
    │
    ├─ ❏ sticker
    ├─ ❏ stickergif
    ├─ ❏ stickergiphy
    ├─ ❏ ttp
    ├─ ❏ linesticker
    ├─ ❏ stikerteks
    ├─ ❏ takestick
    ├─ ❏ addsticker
    ├─ ❏ getsticker
    ├─ ❏ delsticker
    ├─ ❏ liststicker
    └─ ❏ stickermeme

    
    ◪ 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥
    │
    ├─ ❏ ytmp3
    ├─ ❏ ytmp4
    ├─ ❏ igstory
    ├─ ❏ playstore
    ├─ ❏ tiktoknowm
    ├─ ❏ tiktokmusic
    ├─ ❏ instagram
    └─ ❏ joox

    ◪ 𝗟𝗢𝗚𝗢
    │
    ├─ ❏ ninja
    ├─ ❏ phcomment
    ├─ ❏ trumptweet 
    ├─ ❏ hilang
    ├─ ❏ valentine

    ◪ *GAME*
    │
    ├─ ❏ tebakgambar
    ├─ ❏ stopkuiz (tebak gambar)
    ├─ ❏ TOD
    ├─ ❏ points
    └─ ❏ kuismtk

    ◪ 𝗚𝗥𝗢𝗨𝗣
    │
    ├─ ❏ mutegrup on|off
    ├─ ❏ promote
    ├─ ❏ demote
    ├─ ❏ mute
    ├─ ❏ profile
    ├─ ❏ antilink
    ├─ ❏ kick
    ├─ ❏ del
    ├─ ❏ getpic
    ├─ ❏ tagsemua
    ├─ ❏ santet
    ├─ ❏ kapankah
    ├─ ❏ jadian
    ├─ ❏ cantik
    ├─ ❏ slap
    ├─ ❏ peluk
    ├─ ❏ ganteng
    ├─ ❏ kutuk
    ├─ ❏ antiporn <FITUR VIP>
    ├─ ❏ antilink
    ├─ ❏ antisticker
    ├─ ❏ leave
    └─ ❏ afk
    
    xKiwilx Whatsapp Bot`
}
