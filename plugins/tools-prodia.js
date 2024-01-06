const fetch = require('node-fetch');

let handler = async (m, { text, usedPrefix, command, conn }) => {
  if (command == 'aiprodia') {
    if (!text.includes(',')) throw `Tolong gunakan prompt dengan benar. Gunakan koma *[ , ]* untuk memisahkan argumen.\n*Contoh:* ${usedPrefix}${command} 1girl, blush, looking to viewer, warm smile`;
    try {
      const res = await fetch(`https://api.akuari.my.id/ai/prodia?prompt=${encodeURIComponent(text)}`).then(res => res.buffer());
      await conn.reply(m.chat, wait, m)
      await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
      conn.sendFile(m.chat, res, 'image.jpg', `Result: ${text}`, m);
    } catch (error) {
      await conn.reply(m.chat, 'Maintenance 😅', m)
    }
  }

  if (command == 'aiprodia2') {
    try {
      if (!text.includes('?')) {
        throw `Tolong gunakan prompt dengan benar. Gunakan koma *[ ? ]* untuk memisahkan argumen.\n*Contoh:* ${usedPrefix}${command} hanya ganti warna baju menjadi merah?https://radarpekalongan.disway.id/upload/27264892365cfdcac039267a2f6251c4.jpeg`;
      }

      let response = await fetch(`https://api.akuari.my.id/ai/prodia2?prompt=${encodeURIComponent(text)}?imageurl=${encodeURIComponent(text)}`).then(res => res.buffer());
      await conn.reply(m.chat, wait, m)
      await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
      conn.sendFile(m.chat, response, 'image.jpg', `Result: ${text}`, m)
    } catch (error) {
      await conn.reply(m.chat, 'Maintenance 😅', m)
    }
  }
};

handler.command = handler.help = ['aiprodia', 'aiprodia2'];
handler.tags = ['tools'];
handler.limit = true;
module.exports = handler;