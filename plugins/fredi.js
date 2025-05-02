const util = require('util');
const fs = require('fs-extra');
const { ezra } = require(__dirname + "/../fredi/ezra");
const { format } = require(__dirname + "/../fredi/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206);
const readmore = more.repeat(4001);

zokou({ nomCom: "menu", categorie: "Menu" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre, prefixe, nomAuteurMessage, mybotpic } = commandeOptions;
    let { cm } = require(__dirname + "/../fredi/ezra");
    let coms = {};
    let mode = "public";

    if ((s.MODE).toLowerCase() !== "yes") {
        mode = "private";
    }

    cm.map((com) => {
        if (!coms[com.categorie]) {
            coms[com.categorie] = [];
        }
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');
    const temps = moment().format('HH:mm:ss');
    const date = moment().format('DD/MM/YYYY');

    let infoMsg = `
╭━═「 *${s.BOT}* 」═━❂
┃⊛╭────••••────➻
┃⊛│◆ 𝙾𝚠𝚗𝚎𝚛 : ${s.OWNER_NAME}
┃⊛│◆ 𝙿𝚛𝚎𝚏𝚒𝚡 : [ ${s.PREFIXE} ]
┃⊛│◆ 𝙼𝚘𝚍𝚎 : *${mode}*
┃⊛│◆ 𝚁𝚊𝚖  : 𝟴/𝟭𝟯𝟮 𝗚𝗕
┃⊛│◆ 𝙳𝚊𝚝𝚎  : *${date}*
┃⊛│◆ 𝙿𝚕𝚊𝚝𝚏𝚘𝚛𝚖 : ${os.platform()}
┃⊛│◆ 𝙲𝚛𝚎𝚊𝚝𝚘𝚛 : ғʀᴇᴅɪᴇ ᴛᴇᴄʜ
┃⊛│◆ 𝙲𝚘𝚖𝚖𝚊𝚗𝚍𝚜 : ${cm.length}
┃⊛│◆ 𝚃𝚑𝚎𝚖𝚎 : FRED
┃⊛└────••••────➻
╰─━━━━══──══━━━❂\n${readmore}
`;

    let menuMsg = `𝙻𝚞𝚌𝚔𝚢 𝙼𝚍 𝙲𝚖𝚍`;
    
    for (const cat in coms) {
        menuMsg += `
❁━━〔 *${cat}* 〕━━❁
╭━━══••══━━••⊷
║◆┊ `;
        for (const cmd of coms[cat]) {
            menuMsg += `          
║◆┊ ${s.PREFIXE}  *${cmd}*`;    
        }
        menuMsg += `
║◆┊
╰─━━═••═━━••⊷`;
    }
    
    menuMsg += `
> Made By ғʀᴇᴅɪᴇ ᴛᴇᴄʜ\n`;
        
        // Send message with an image
      try {
    await _0x4e9b73.sendMessage(_0x357aab, {
      'image': {
        'url': "https://files.catbox.moe/mair0k.jpg"
      },
      'caption': _0x970c0d + _0x628f4d,
      'contextInfo': {
        'isForwarded': true,
        'forwardedNewsletterMessageInfo': {
          'newsletterJid': "120363313124070136@newsletter",
          'newsletterName': "FrediEzra",
          'serverMessageId': 0x8f
        },
        'forwardingScore': 0x3e7,
        'externalAdReply': {
          'title': "☢️LUCKY MD X-FORCE☢️",
          'body': "📃Command List",
          'thumbnailUrl': "https://files.catbox.moe/bw9rme.jpg",
          'mediaType': 0x1,
          'mediaUrl': '',
          'sourceUrl': ''
        }
      }
    });
    await _0x4e9b73.sendMessage(_0x357aab, {
      'audio': {
        'url': "https://files.catbox.moe/vvlm4i.mp3"
      },
      'mimetype': "audio/mp4",
      'ptt': true,
      'caption': "LUCKY MD X-FORCE SONG",
      'contextInfo': {
        'isForwarded': true,
        'forwardedNewsletterMessageInfo': {
          'newsletterJid': "120363313124070136@newsletter",
          'newsletterName': "FrediEzra",
          'serverMessageId': -1
        }
      }
    });
  } catch (_0x56e837) {
    console.log("Error fetching data:", error);
    _0x53ed08("❌ Error fetching repository data. Please try again later.");
  }
});
