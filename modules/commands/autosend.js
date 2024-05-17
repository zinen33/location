module.exports.config = {
    name: 'autosend',
    version: '10.02',
    hasPermssion: 3,
    credits: 'DC-Nam', // được fix bởi sơn pro
    description: 'Tự động gửi tin nhắn theo giờ đã cài!',
    commandCategory: 'Hệ thống',
    usages: '[]',
    cooldowns: 3
};
const r = a => a[Math.floor(Math.random()*a.length)],
{
    get
} = require('axios'),
config = [{
        timer: '9:13:00 PM',
    message: ['━━[ 𝐀𝐮𝐭𝐨 𝐓𝐡𝐨̂𝐧𝐠 𝐁𝐚́𝐨 𝐓𝐮̛̀ 𝐁𝐨𝐭 ]━━\n▱▱▱▱▱▱▱▱\n➝ 𝐁𝐚̂𝐲 𝐆𝐢𝐨̛̀ 𝐋𝐚̀ {time}\n➝ 𝐓𝐡𝐮𝐞̂ 𝐁𝐨𝐭 𝟐𝟎𝐊 - 𝟓𝟎𝐊 / 𝟏 𝐌𝐨𝐧𝐭𝐡\n➝ 𝐌𝐮𝐚 𝐅𝐢𝐥𝐞 𝐁𝐨𝐭 𝐋𝐢𝐞̂𝐧 𝐇𝐞̣̂ 𝐀𝐝𝐦𝐢𝐧\n▱▱▱▱▱▱▱▱\n• 𝐅𝐁: https://www.facebook.com/profile.php?id=100053481611146']
}, 
          {
        timer: '12:13:00 AM',
    message: ['━━[ 𝐀𝐮𝐭𝐨 𝐓𝐡𝐨̂𝐧𝐠 𝐁𝐚́𝐨 𝐓𝐮̛̀ 𝐁𝐨𝐭 ]━━\n▱▱▱▱▱▱▱▱\n➝ 𝐁𝐚̂𝐲 𝐆𝐢𝐨̛̀ 𝐋𝐚̀ {time}\n➝ 𝐓𝐡𝐮𝐞̂ 𝐁𝐨𝐭 𝟐𝟎𝐊 - 𝟓𝟎𝐊 / 𝟏 𝐌𝐨𝐧𝐭𝐡\n➝ 𝐌𝐮𝐚 𝐅𝐢𝐥𝐞 𝐁𝐨𝐭 𝐋𝐢𝐞̂𝐧 𝐇𝐞̣̂ 𝐀𝐝𝐦𝐢𝐧\n▱▱▱▱▱▱▱▱\n• 𝐅𝐁: https://www.facebook.com/profile.php?id=100053481611146']
},
          {
        timer: '9:48:00 AM',
    message: ['━━[ 𝐀𝐮𝐭𝐨 𝐓𝐡𝐨̂𝐧𝐠 𝐁𝐚́𝐨 𝐓𝐮̛̀ 𝐁𝐨𝐭 ]━━\n▱▱▱▱▱▱▱▱\n➝ 𝐁𝐚̂𝐲 𝐆𝐢𝐨̛̀ 𝐋𝐚̀ {time}\n➝ 𝐓𝐡𝐮𝐞̂ 𝐁𝐨𝐭 𝟐𝟎𝐊 - 𝟓𝟎𝐊 / 𝟏 𝐌𝐨𝐧𝐭𝐡\n➝ 𝐌𝐮𝐚 𝐅𝐢𝐥𝐞 𝐁𝐨𝐭 𝐋𝐢𝐞̂𝐧 𝐇𝐞̣̂ 𝐀𝐝𝐦𝐢𝐧\n▱▱▱▱▱▱▱▱\n• 𝐅𝐁: https://www.facebook.com/profile.php?id=100053481611146']
},
          {
        timer: '7:13:00 PM',
    message: ['━━[ 𝐀𝐮𝐭𝐨 𝐓𝐡𝐨̂𝐧𝐠 𝐁𝐚́𝐨 𝐓𝐮̛̀ 𝐁𝐨𝐭 ]━━\n▱▱▱▱▱▱▱▱\n➝ 𝐁𝐚̂𝐲 𝐆𝐢𝐨̛̀ 𝐋𝐚̀ {time}\n➝ 𝐓𝐡𝐮𝐞̂ 𝐁𝐨𝐭 𝟐𝟎𝐊 - 𝟓𝟎𝐊 / 𝟏 𝐌𝐨𝐧𝐭𝐡\n➝ 𝐌𝐮𝐚 𝐅𝐢𝐥𝐞 𝐁𝐨𝐭 𝐋𝐢𝐞̂𝐧 𝐇𝐞̣̂ 𝐀𝐝𝐦𝐢𝐧\n▱▱▱▱▱▱▱▱\n• 𝐅𝐁: https://www.facebook.com/profile.php?id=100053481611146']
},
          {
        timer: '7:13:00 AM',
    message: ['━━[ 𝐀𝐮𝐭𝐨 𝐓𝐡𝐨̂𝐧𝐠 𝐁𝐚́𝐨 𝐓𝐮̛̀ 𝐁𝐨𝐭 ]━━\n▱▱▱▱▱▱▱▱\n➝ 𝐁𝐚̂𝐲 𝐆𝐢𝐨̛̀ 𝐋𝐚̀ {time}\n➝ 𝐓𝐡𝐮𝐞̂ 𝐁𝐨𝐭 𝟐𝟎𝐊 - 𝟓𝟎𝐊 / 𝟏 𝐌𝐨𝐧𝐭𝐡\n➝ 𝐌𝐮𝐚 𝐅𝐢𝐥𝐞 𝐁𝐨𝐭 𝐋𝐢𝐞̂𝐧 𝐇𝐞̣̂ 𝐀𝐝𝐦𝐢𝐧\n▱▱▱▱▱▱▱▱\n• 𝐅𝐁: https://www.facebook.com/profile.php?id=100053481611146']
},
         {
        timer: '12:13:00 AM',
    message: ['━━[ 𝐀𝐮𝐭𝐨 𝐓𝐡𝐨̂𝐧𝐠 𝐁𝐚́𝐨 𝐓𝐮̛̀ 𝐁𝐨𝐭 ]━━\n▱▱▱▱▱▱▱▱\n➝ 𝐁𝐚̂𝐲 𝐆𝐢𝐨̛̀ 𝐋𝐚̀ {time}\n➝ 𝐓𝐡𝐮𝐞̂ 𝐁𝐨𝐭 𝟐𝟎𝐊 - 𝟓𝟎𝐊 / 𝟏 𝐌𝐨𝐧𝐭𝐡\n➝ 𝐌𝐮𝐚 𝐅𝐢𝐥𝐞 𝐁𝐨𝐭 𝐋𝐢𝐞̂𝐧 𝐇𝐞̣̂ 𝐀𝐝𝐦𝐢𝐧\n▱▱▱▱▱▱▱▱\n• 𝐅𝐁: https://www.facebook.com/profile.php?id=100053481611146']
}];
module.exports.onLoad = o => {
    if (!!global.autosendmessage_setinterval) clearInterval(global.autosendmessage_setinterval);
    global.autosendmessage_setinterval = setInterval(async function() {
        if (á = config.find(i => i.timer == new Date(Date.now()+25200000).toLocaleString().split(/,/).pop().trim())) {
            var msg = r(á.message);
            msg = msg.replace(/{time}/g, (require("moment-timezone")).tz("Asia/Ho_Chi_Minh").format("HH:mm:ss (D/MM/YYYY) (dddd)"))
            msg = {
                body: msg, attachment: (await get((await get(`https://apited-ed.chaunguyen53.repl.co`)).data.data, {
                    responseType: 'stream'
                })).data
            };
            global.data.allThreadID.forEach(i => o.api.sendMessage(msg, i));
        };
    }, 5000);
};
module.exports.run = () => {};