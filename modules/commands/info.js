module.exports.config = {
    name: 'info',
    version: '1.1.1',
    hasPermssion: 0,
    credits: 'DC-Nam',// mod by Q.Huy
    description: 'Xem thông tin người dùng Facebook',
    commandCategory: 'imgur',
    usages: '[...|tag|reply|uid|username]',
    cooldowns: 2
};
const {
    get
} = require('axios');
const {
    image
} = require('image-downloader');
const {
    createReadStream
} = require('fs-extra');
module.exports.run = async function({
    api, event, args, Threads, Currencies
}) {
    try {      
        var uqID = event.type == 'message_reply' ? event.messageReply.senderID: Object.keys(event.mentions).length != 0 ? Object.keys(event.mentions)[0]: !!args[0] && !!args[0] ? args[0]: event.senderID;
        uqID = await get(`https://golike.com.vn/func-api.php?user=${uqID}`);
        const {threadInfo = {adminIDs: []}} = await Threads.getData(event.threadID) || {};
        const ban = global.data.userBanned.has(uqID.data.data.uid) ?  "Đang bị cấm" : "Không bị cấm";
        var permission;
        if (global.config.ADMINBOT.includes(uqID.data.data.uid)) permission = `Admin bot`;
else if
(global.config.NDH.includes(uqID.data.data.uid)) 
permission = `Người hỗ trợ`; else if (threadInfo.adminIDs.some(i => i.id == uqID.data.data.uid)) permission = `Quản trị viên`; else permission = `Thành viên`;
        const ciesData = await Currencies.getData(uqID.data.data.uid);
        const userInfo = await api.getUserInfo(uqID.data.data.uid);
        const j = ['2rNF2liL'];
        const res = await get(`https://nguyenmanh.name.vn/api/fbInfo?id=${uqID.data.data.uid}&apikey=${j[Math.floor(Math.random()*j.length)]}`);
        const {_id,id,name,firstName,vanity,birthday,follow,thumbSrc,profileUrl,gender,hometown,location,relationship,love,website,about,quotes} = res.data.result || {};
        const dest = `${__dirname}/cache/test.png`;
        await image({
            url: thumbSrc, dest
        });
        api.sendMessage({
            body: `
===『 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 𝗜𝗡𝗙𝗢 』===
━━━━━━━━━━━━━━━━━━
👤 𝗧𝗲̂𝗻: ${firstName}
🧸 𝗧𝗲̂𝗻 đ𝗮̂̀𝘆 đ𝘂̉: ${name}
🌸 𝗚𝗶𝗼̛́𝗶 𝘁𝗶́𝗻𝗵: ${gender}
📅 𝗡𝗴𝗮̀𝘆 𝘀𝗶𝗻𝗵: ${birthday}
━━━━━━━━━━━━━━━━
🏞️ đ𝗲̂́𝗻 𝘁𝘂̛̀: ${hometown}
🏘️ 𝗦𝗼̂́𝗻𝗴 𝘁𝗮̣𝗶: ${location}
💓 𝗠𝗼̂́𝗶 𝗾𝘂𝗮𝗻 𝗵𝗲̣̂: ${relationship} ${!relationship || !love ? '': 
`𝘃𝗼̛́𝗶 ${love}`
}
🔰 𝗖𝗼́ ${localeNum(follow)} 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝘁𝗵𝗲𝗼 𝗱𝗼̃𝗶
🔗 𝗧𝗿𝗮𝗻𝗴 𝘄𝗲𝗯: ${website}
🌟 𝗠𝗮̃ 𝗶𝗱: ${id}
💫 𝗧𝗲̂𝗻 𝗶𝗱: ${vanity}
🌐 𝗟𝗶𝗲̂𝗻 𝗸𝗲̂́𝘁 𝗧𝗖𝗡: ${profileUrl}
⏰ 𝗧𝗵𝗮𝗺 𝗴𝗶𝗮 𝗳𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝘃𝗮̀𝗼: ${uqID.data.data.date}
━━━━━━━━━━━━━━━━
🍄 𝗧𝗿𝗮̣𝗻𝗴 𝘁𝗵𝗮́𝗶: ${userInfo[uqID.data.data.uid].isFriend ? 'Có': 'Không'} kết bạn với bot
💬 𝗧𝗼̂̉𝗻𝗴 𝘁𝗶𝗻 𝗻𝗵𝗮̆́𝗻: ${localeNum(ciesData.exp)}
💵 𝗦𝗼̂́ 𝗱𝘂̛ 𝘁𝗿𝗲̂𝗻 𝗯𝗼𝘁: ${localeNum(ciesData.money)} $
💼 𝗖𝗵𝘂̛́𝗰 𝘃𝘂̣ 𝘁𝗿𝗼𝗻𝗴 𝗻𝗵𝗼́𝗺: ${permission}
🚫 𝗞𝗶𝗲̂̉𝗺 𝘁𝗿𝗮 𝗰𝗮̂́𝗺: ${ban} 𝗱𝘂̀𝗻𝗴 𝗯𝗼𝘁
`.replace(/null|undefined/g, 'Không có dữ liệu!').replace(/private/g, 'Riêng Tư!'), attachment: createReadStream(dest)
        }, event.threadID, event.messageID);
    }catch(e) {
        api.sendMessage(`${e}`, event.threadID, event.messageID);
    };
};
function localeNum(a){
    return (a.toLocaleString()).replace(/\,/g, '.');
};