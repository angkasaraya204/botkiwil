const fetch = require('node-fetch');

let handler = async (m, { text, usedPrefix, command }) => {
  if (!text.includes(',')) throw `Tolong gunakan prompt dengan benar. Gunakan koma *[ , ]* untuk memisahkan argumen.\n*Contoh:* ${usedPrefix}${command} 1girl, blush, looking to viewer, warm smile`;
  await conn.reply(m.chat, wait, m)
  await conn.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key } });
  try {
    const res = await fetch(`https://api.akuari.my.id/ai/stablediffusion?prompt=${encodeURIComponent(text)}`).then(res => res.buffer());
    conn.sendFile(m.chat, res, 'image.jpg', `Result: ${text}`, m);
  } catch (error) {
    await conn.reply(m.chat, 'Maintenance 😅', m)
  }
};

handler.command = handler.help = ['diffusion'];
handler.tags = ['tools'];
handler.limit = true;
module.exports = handler;