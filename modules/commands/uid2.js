module.exports.config = {
    name: 'uid2',
    version: '1.1.1',
    hasPermssion: 0,
    credits: 'leak cc dm',
    description: 'Lấy thời gian người dùng tạo tài khoản Facebook!',
    commandCategory: 'Tiện ích',
    usages: '[...|reply|tag|url]'
};
const {get} = require('axios');
module.exports.run = function({ api, event, args }){
  const uid = event.type == 'message_reply' ? event.messageReply.senderID: !!Object.keys(event.mentions)[0] ? Object.keys(event.mentions)[0]: !!args[0] ? args[0]: event.senderID;
  get(`https://api-caochungdat.bokdepzai.repl.co/facebook/act?user=${uid}`).then(response => {
      var txt;
      if (response.data.status == 404) txt = `Die acc or khóa wall`;
      if (response.data.status == 200) txt = `𝗔𝗰𝗰 𝗳𝗮𝗰𝗲𝗯𝗼𝗼𝗸 𝗱𝘂̛𝗼̛̣𝗰 𝘁𝗮̣𝗼 𝘃𝗮̀𝗼 𝗸𝗵𝗼𝗮̉𝗻𝗴: ${response.data.data.date.replace(' ', ' | ')}\n𝗖𝗼́ 𝗨𝗜𝗗: ${response.data.data.uid}`;
      api.sendMessage(txt, event.threadID, event.messageID);
  }).catch(e => api.sendMessage(e, event.threadID, event.messageID));
};
