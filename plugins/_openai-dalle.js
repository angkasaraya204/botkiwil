let fetch = require('node-fetch')
let handler = async (m, { text, usedPrefix, command, conn }) => {
  if (!text.includes(',')) throw `Tolong gunakan prompt dengan benar. Gunakan koma *[ , ]* untuk memisahkan argumen.\n*Contoh:* ${usedPrefix}${command} 1girl, blush, looking to viewer, warm smile`;
  await conn.reply(m.chat, wait, m)
  await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
  try {
    let response = await fetch(`https://api.akuari.my.id/ai/dall-e2?prompt=${encodeURIComponent(text)}`).then(res => res.buffer());
    conn.sendFile(m.chat, response, 'image.jpg', `Result: ${text}`, m)
  } catch (e) {
    await conn.reply(m.chat, 'Maintenance 😅', m)
  }

}
handler.command = handler.help = ['dalle']
handler.tags = ['tools']

module.exports = handler
