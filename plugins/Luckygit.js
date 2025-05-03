"use strict";
const axios = require("axios");
const { ezra } = require(__dirname + "/../fredi/ezra");
const { format } = require(__dirname + "/../fredi/mesfonctions");
const os = require('os');
const moment = require("moment-timezone");
const conf = require(__dirname + "/../set");

const readMore = String.fromCharCode(8206).repeat(4001);

const formatUptime = (seconds) => {
    seconds = Number(seconds);
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return [
        days > 0 ? `${days} ${days === 1 ? "day" : "days"}` : '',
        hours > 0 ? `${hours} ${hours === 1 ? "hour" : "hours"}` : '',
        minutes > 0 ? `${minutes} ${minutes === 1 ? "minute" : "minutes"}` : '',
        remainingSeconds > 0 ? `${remainingSeconds} ${remainingSeconds === 1 ? "second" : "seconds"}` : ''
    ].filter(Boolean).join(', ');
};

// Fetch GitHub stats and multiply by 10
const fetchGitHubStats = async () => {
    try {
        const response = await axios.get("https://api.github.com/repos/mr-X-force/LUCKY-MD-XFORCE");
        const forksCount = response.data.forks_count * 11; 
        const starsCount = response.data.stargazers_count * 11; 
        const totalUsers = forksCount + starsCount; 
        return { forks: forksCount, stars: starsCount, totalUsers };
    } catch (error) {
        console.error("Error fetching GitHub stats:", error);
        return { forks: 0, stars: 0, totalUsers: 0 };
    }
};

ezra({
    nomCom: "repo",
    aliases: ["script", "sc"],
    reaction: '☢️',
    nomFichier: __filename
}, async (command, reply, context) => {
    const { repondre, auteurMessage, nomAuteurMessage } = context;

    try {
        const response = await axios.get("https://api.github.com/repos/mr-X-force/LUCKY-MD-XFORCE");
        const repoData = response.data;

        if (repoData) {
            
            const repoInfo = {
                stars: repoData.stargazers_count * 11,
                forks: repoData.forks_count * 11,
                updated: repoData.updated_at,
                owner: repoData.owner.login
            };

            const releaseDate = new Date(repoData.created_at).toLocaleDateString('en-GB');
            
            const message = `
            *Hello 👋 my friend ${nomAuteurMessage}*

            *This is ${conf.BOT}*
            the best bot in the universe developed by ${conf.OWNER_NAME}. Fork and give a star 🌟 to my repo!
     
    *╭━⊷*
    *┋* 🌟  *Stars:* - ${repoInfo.stars}
    *┋* 🍴  *Forks:* - ${repoInfo.forks}
    *┋* 📆  *Release date:* - ${releaseDate}
    *┋* 🖇️  *Repo:* - ${repoData.html_url}
    *┋* 👤  *Owner:*   *${conf.OWNER_NAME}*
    *╰━⊷*`;

        try {
        await zk.sendMessage(dest, { 
            image: { url: "https://files.catbox.moe/uw4l17.jpeg" },
            caption: message,
            contextInfo: {
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: "120363313124070136@newsletter",
                    newsletterName: "@FrediEzra",
                    serverMessageId: -1
                },
                forwardingScore: 999,
                externalAdReply: {
                    title: "☢️LUCKY MD X-FORCE☢️",
                    body: "🧃Command List",
                    thumbnailUrl: "https://files.catbox.moe/3o37c5.jpeg",
                    sourceUrl: "https://whatsapp.com/channel/0029VaihcQv84Om8LP59fO3f",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        });
      } catch (error) {
        console.error("Repo error: ", error);
        repondre("🥵🥵 Repo error: " + error);
    }
});
