(async () => {
    require('./config')
    const {
        useMultiFileAuthState: _0x136dd3,
        DisconnectReason: _0x2b55e1,
        generateForwardMessageContent: _0x1db825,
        prepareWAMessageMedia: _0x39df5d,
        generateWAMessageFromContent: _0x23c580,
        generateMessageID: _0x405a54,
        downloadContentFromMessage: _0x421bd4,
        makeInMemoryStore: _0xa3736c,
        jidDecode: _0x116c35,
        PHONENUMBER_MCC: _0x449371,
        fetchLatestBaileysVersion: _0x295c62,
        proto: _0x49951a,
    } = require('@adiwajshing/baileys'),
        _0x703620 = require('pino'),
        _0x5da3ca = require('ws'),
        _0x3a8364 = require('path'),
        _0x4df9fe = require('fs'),
        _0x15868f = require('yargs/yargs'),
        _0x43dc58 = require('child_process'),
        _0x5e54b9 = require('lodash'),
        _0x5843a3 = require('syntax-error'),
        _0x52f9a2 = require('pino'),
        _0x1cc27f = require('os'),
        _0x3c1274 = require('node-fetch'),
        _0x19f2c5 = require('chalk')
    let _0x40fc0f = require('./lib/simple')
    var _0xa00ea5
    try {
        _0xa00ea5 = require('lowdb')
    } catch (_0x54ae25) {
        _0xa00ea5 = require('./lib/lowdb')
    }
    const { Low: _0x57c2b1, JSONFile: _0x2cadb7 } = _0xa00ea5,
        _0x4b1754 = require('./lib/mongoDB'),
        _0x1883f4 = require('readline'),
        _0x592431 =
            process.argv.includes('--code') || process.argv.includes('--pairing'),
        _0x15c0df = process.argv.includes('--mobile'),
        _0x7d35bb = _0x1883f4.createInterface({
            input: process.stdin,
            output: process.stdout,
        }),
        _0x276e81 = (_0x52c602) =>
            new Promise((_0x2071ff) => _0x7d35bb.question(_0x52c602, _0x2071ff))
    global.API = (_0x3f019b, _0x4d82e2 = '/', _0x2ecb9e = {}, _0x12c0ab) =>
        (_0x3f019b in global.APIs ? global.APIs[_0x3f019b] : _0x3f019b) +
        _0x4d82e2 +
        (_0x2ecb9e || _0x12c0ab
            ? '?' +
            new URLSearchParams(
                Object.entries({
                    ..._0x2ecb9e,
                    ...(_0x12c0ab
                        ? {
                            [_0x12c0ab]:
                                global.APIKeys[
                                _0x3f019b in global.APIs
                                    ? global.APIs[_0x3f019b]
                                    : _0x3f019b
                                ],
                        }
                        : {}),
                })
            )
            : '')
    global.timestamp = { start: new Date() }
    const _0x1fe69f = process.env.PORT || 3000
    global.opts = new Object(
        _0x15868f(process.argv.slice(2)).exitProcess(false).parse()
    )
    global.prefix = new RegExp(
        '^[' +
        (
            opts.prefix ||
            '\u200ExzXZ/i!#$%+\xA3\xA2\u20AC\xA5^\xB0=\xB6\u2206\xD7\xF7π\u221A\u2713\xA9\xAE:;?&.\\-'
        ).replace(/[|\\{}()[\]^$+*?.\-\^]/g, '\\$&') +
        ']'
    )
    global.db = new _0x57c2b1(
        /https?:\/\//.test(opts.db || '')
            ? new cloudDBAdapter(opts.db)
            : /mongodb/.test(opts.db)
                ? new _0x4b1754(opts.db)
                : new _0x2cadb7(
                    (opts['_'][0] ? opts['_'][0] + '_' : '') + 'database.json'
                )
    )
    global.DATABASE = global.db
    global.loadDatabase = async function _0x55b887() {
        if (global.db.READ) {
            return new Promise((_0x57aec5) =>
                setInterval(function () {
                    !global.db.READ
                        ? (clearInterval(this),
                            _0x57aec5(
                                global.db.data == null ? global.loadDatabase() : global.db.data
                            ))
                        : null
                }, 1000)
            )
        }
        if (global.db.data !== null) {
            return
        }
        global.db.READ = true
        await global.db.read()
        global.db.READ = false
        global.db.data = {
            users: {},
            chats: {},
            stats: {},
            msgs: {},
            sticker: {},
            ...(global.db.data || {}),
        }
        global.db.chain = _0x5e54b9.chain(global.db.data)
    }
    loadDatabase()
    const _0x1f1297 = '' + (opts['_'][0] || 'sessions')
    global.isInit = !_0x4df9fe.existsSync(_0x1f1297)
    const {
        state: _0x5aabb5,
        saveState: _0x3c7b93,
        saveCreds: _0x1bb584,
    } = await _0x136dd3(_0x1f1297),
        { version: _0x351ac2, isLatest: _0x32d7c3 } = await _0x295c62()
    console.log(
        _0x19f2c5.magenta(
            '-- using WA v' + _0x351ac2.join('.') + ', isLatest: ' + _0x32d7c3 + ' --'
        )
    )
    const _0x16fdbd = {
        printQRInTerminal: !_0x592431,
        syncFullHistory: true,
        markOnlineOnConnect: true,
        connectTimeoutMs: 60000,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 10000,
        generateHighQualityLinkPreview: true,
        patchMessageBeforeSending: (_0x49d23a) => {
            const _0x25ae62 = !!(
                _0x49d23a.buttonsMessage ||
                _0x49d23a.templateMessage ||
                _0x49d23a.listMessage
            )
            return (
                _0x25ae62 &&
                (_0x49d23a = {
                    viewOnceMessage: {
                        message: {
                            messageContextInfo: {
                                deviceListMetadataVersion: 2,
                                deviceListMetadata: {},
                            },
                            ..._0x49d23a,
                        },
                    },
                }),
                _0x49d23a
            )
        },
        auth: _0x5aabb5,
        browser: ['Chrome (Linux)'],
        logger: _0x703620({ level: 'silent' }),
        version: (
            await (
                await _0x3c1274(
                    'https://raw.githubusercontent.com/WhiskeySockets/Baileys/master/src/Defaults/baileys-version.json'
                )
            ).json()
        ).version,
    }
    global.conn = _0x40fc0f.makeWASocket(_0x16fdbd)
    if (!opts.test) {
        if (global.db) {
            setInterval(async () => {
            if (global.db.data) {
                await global.db.write();
            }
            if (!opts.tmp && (global.support || {}).find) {
                tmp = [_0x1cc27f.tmpdir(), 'tmp'];
                tmp.forEach(_0x3be028 => _0x43dc58.spawn('find', [_0x3be028, '-amin', '3', '-type', 'f', "-delete"]));
            }
            }, 30000);
        }
    }
    async function _0x3af8dc(_0x240b9a) {
        const { connection: _0x394db0, lastDisconnect: _0x3bdca2 } = _0x240b9a
        global.timestamp.connect = new Date()
        _0x3bdca2 &&
            _0x3bdca2.error &&
            _0x3bdca2.error.output &&
            _0x3bdca2.error.output.statusCode !== _0x2b55e1.loggedOut &&
            conn.ws.readyState !== _0x5da3ca.CONNECTING &&
            console.log(global.reloadHandler(true))
        if (global.db.data == null) {
            await loadDatabase()
        }
    }
    ; (_0x592431 || _0x15c0df) &&
        _0x4df9fe.existsSync('./sessions/creds.json') &&
        !conn.authState.creds.registered &&
        (console.log(
            _0x19f2c5.yellow(
                '-- WARNING: creds.json is broken, please delete it first --'
            )
        ),
            process.exit(0))
    if (_0x592431 && !conn.authState.creds.registered) {
        if (_0x15c0df) {
            throw new Error('Cannot use pairing code with mobile api')
        }
        const { registration: _0x435179 } = { registration: {} }
        let _0x69d10a = ''
        do {
            _0x69d10a = await _0x276e81(
                _0x19f2c5.blueBright(
                    'ENTER A VALID NUMBER START WITH REGION CODE. Example : 62xxx:\n'
                )
            )
        } while (
            !Object.keys(_0x449371).some((_0x21f2eb) =>
                _0x69d10a.startsWith(_0x21f2eb)
            )
        )
        _0x7d35bb.close()
        _0x69d10a = _0x69d10a.replace(/\D/g, '')
        console.log(
            _0x19f2c5.bgWhite(_0x19f2c5.blue('-- Please wait, generating code... --'))
        )
        setTimeout(async () => {
            let _0xa178a5 = await conn.requestPairingCode(_0x69d10a)
            _0xa178a5 = _0xa178a5?.match(/.{1,4}/g)?.join('-') || _0xa178a5
            console.log(
                _0x19f2c5.black(_0x19f2c5.bgGreen('Your Pairing Code : ')),
                _0x19f2c5.black(_0x19f2c5.white(_0xa178a5))
            )
        }, 3000)
    }
    process.on('uncaughtException', console.error)
    const _0x4298df = (_0x38d56f) => {
        _0x38d56f = require.resolve(_0x38d56f)
        let _0x36333b,
            _0x2b06b1 = 0
        do {
            if (_0x38d56f in require.cache) {
                delete require.cache[_0x38d56f]
            }
            _0x36333b = require(_0x38d56f)
            _0x2b06b1++
        } while (
            (!_0x36333b || Array.isArray(_0x36333b) || _0x36333b instanceof String
                ? !(_0x36333b || []).length
                : typeof _0x36333b == 'object' && !Buffer.isBuffer(_0x36333b)
                    ? !Object.keys(_0x36333b || {}).length
                    : true) &&
            _0x2b06b1 <= 10
        )
        return _0x36333b
    }
    let _0x2d0edc = true
    global.reloadHandler = function (_0x3c51f6) {
        let _0x5d4b85 = _0x4298df('./handler')
        if (_0x3c51f6) {
            try {
                global.conn.ws.close()
            } catch { }
            global.conn = {
                ...global.conn,
                ..._0x40fc0f.makeWASocket(_0x16fdbd),
            }
        }
        return (
            !_0x2d0edc &&
            (conn.ev.off('messages.upsert', conn.handler),
                conn.ev.off('group-participants.update', conn.participantsUpdate),
                conn.ev.off('message.delete', conn.onDelete),
                conn.ev.off('connection.update', conn.connectionUpdate),
                conn.ev.off('creds.update', conn.credsUpdate)),
            (conn.welcome =
                'Selamat datang @user di group @subject utamakan baca desk ya \n@desc'),
            (conn.bye = 'Selamat tinggal @user \uD83D\uDC4B'),
            (conn.promote = '@user sekarang admin!'),
            (conn.demote = '@user sekarang bukan admin!'),
            (conn.handler = _0x5d4b85.handler.bind(conn)),
            (conn.participantsUpdate = _0x5d4b85.participantsUpdate.bind(conn)),
            (conn.onDelete = _0x5d4b85.delete.bind(conn)),
            (conn.connectionUpdate = _0x3af8dc.bind(conn)),
            (conn.credsUpdate = _0x1bb584.bind(conn)),
            conn.ev.on('messages.upsert', conn.handler),
            conn.ev.on('group-participants.update', conn.participantsUpdate),
            conn.ev.on('message.delete', conn.onDelete),
            conn.ev.on('connection.update', conn.connectionUpdate),
            conn.ev.on('creds.update', conn.credsUpdate),
            (_0x2d0edc = false),
            true
        )
    }
    let _0x157df6 = _0x3a8364.join(__dirname, 'plugins'),
        _0x56c766 = (_0x49ec79) => /\.js$/.test(_0x49ec79)
    global.plugins = {}
    for (let _0x46d6cf of _0x4df9fe.readdirSync(_0x157df6).filter(_0x56c766)) {
        try {
            global.plugins[_0x46d6cf] = require(_0x3a8364.join(_0x157df6, _0x46d6cf))
        } catch (_0x1bbded) {
            conn.logger.error(_0x1bbded)
            delete global.plugins[_0x46d6cf]
        }
    }
    console.log(Object.keys(global.plugins))
    global.reload = (_0x45a333, _0x20bb89) => {
        if (_0x56c766(_0x20bb89)) {
            let _0x39f5e6 = _0x3a8364.join(_0x157df6, _0x20bb89)
            if (_0x39f5e6 in require.cache) {
                delete require.cache[_0x39f5e6]
                if (_0x4df9fe.existsSync(_0x39f5e6)) {
                    conn.logger.info("re - require plugin '" + _0x20bb89 + "'")
                } else {
                    return (
                        conn.logger.warn("deleted plugin '" + _0x20bb89 + "'"),
                        delete global.plugins[_0x20bb89]
                    )
                }
            } else {
                conn.logger.info("requiring new plugin '" + _0x20bb89 + "'")
            }
            let _0x3c5b47 = _0x5843a3(_0x4df9fe.readFileSync(_0x39f5e6), _0x20bb89)
            if (_0x3c5b47) {
                conn.logger.error(
                    "syntax error while loading '" + _0x20bb89 + "'\n" + _0x3c5b47
                )
            } else {
                try {
                    global.plugins[_0x20bb89] = require(_0x39f5e6)
                } catch (_0x9f0964) {
                    conn.logger.error(_0x9f0964)
                } finally {
                    global.plugins = Object.fromEntries(
                        Object.entries(global.plugins).sort(([_0x29729b], [_0x90f7ee]) =>
                            _0x29729b.localeCompare(_0x90f7ee)
                        )
                    )
                }
            }
        }
    }
    Object.freeze(global.reload)
    _0x4df9fe.watch(_0x3a8364.join(__dirname, 'plugins'), global.reload)
    global.reloadHandler()
    async function _0x205153() {
        let _0x4b1d90 = await Promise.all(
            [
                _0x43dc58.spawn('ffmpeg'),
                _0x43dc58.spawn('ffprobe'),
                _0x43dc58.spawn('ffmpeg', [
                    '-hide_banner',
                    '-loglevel',
                    'error',
                    '-filter_complex',
                    'color',
                    '-frames:v',
                    '1',
                    '-f',
                    'webp',
                    '-',
                ]),
                _0x43dc58.spawn('convert'),
                _0x43dc58.spawn('magick'),
                _0x43dc58.spawn('gm'),
                _0x43dc58.spawn('find', ['--version']),
            ].map((_0x3e40e2) => {
                return Promise.race([
                    new Promise((_0x56afce) => {
                        _0x3e40e2.on('close', (_0x2d4cd6) => {
                            _0x56afce(_0x2d4cd6 !== 127)
                        })
                    }),
                    new Promise((_0x26945c) => {
                        _0x3e40e2.on('error', (_0x1b9f56) => _0x26945c(false))
                    }),
                ])
            })
        ),
            [
                _0x1336f4,
                _0x438af3,
                _0x8ad4e0,
                _0x1e347a,
                _0x3d95be,
                _0x40c7dc,
                _0x260f15,
            ] = _0x4b1d90
        console.log(_0x4b1d90)
        let _0x56371e = (global.support = {
            ffmpeg: _0x1336f4,
            ffprobe: _0x438af3,
            ffmpegWebp: _0x8ad4e0,
            convert: _0x1e347a,
            magick: _0x3d95be,
            gm: _0x40c7dc,
            find: _0x260f15,
        })
        Object.freeze(global.support)
        if (!_0x56371e.ffmpeg) {
            conn.logger.warn(
                'Please install ffmpeg for sending videos (pkg install ffmpeg)'
            )
        }
        if (_0x56371e.ffmpeg && !_0x56371e.ffmpegWebp) {
            conn.logger.warn(
                'Stickers may not animated without libwebp on ffmpeg (--enable-ibwebp while compiling ffmpeg)'
            )
        }
        if (!_0x56371e.convert && !_0x56371e.magick && !_0x56371e.gm) {
            conn.logger.warn(
                'Stickers may not work without imagemagick if libwebp on ffmpeg doesnt isntalled (pkg install imagemagick)'
            )
        }
    }
    _0x205153()
        .then(() => conn.logger.info('Quick Test Done'))
        .catch('done')
})()
