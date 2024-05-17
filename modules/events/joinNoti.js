module.exports.config = {
    name: "joinNoti",
    eventType: ['log:subscribe'],
    version: "1.0.0",
    credits: "Mirai-Team",//inspire by miraibot
    description: "GROUP UPDATE NOTIFICATION"
};
const fs = require('fs-extra');
const { loadImage, createCanvas, registerFont } = require("canvas");
const request = require('request');
const { join } = require('path');
const axios = require('axios');
const jimp = require("jimp")
const fontlink = 'https://drive.google.com/u/0/uc?id=1OBlQ1lao3GAd_GfZIGynMTLCi-zUvVbl&export=download'
module.exports.circle = async (image) => {
    image = await jimp.read(image);
    image.circle();
    return await image.getBufferAsync("image/png");
  }
module.exports.run = async function({ api, event, Users }) {
   var fullYear = global.client.getTime("fullYear");
    var getHours = await global.client.getTime("hours");
      var session = `${getHours < 3 ? "𝗕𝘂𝗼̂̉𝗶 𝘁𝗼̂́𝗶" : getHours < 8 ? "𝗕𝘂𝗼̂̉𝗶 𝘀𝗮́𝗻𝗴" : getHours < 12 ? "𝗕𝘂𝗼̂̉𝗶 𝘁𝗿𝘂̛𝗮" : getHours < 17 ? "𝗕𝘂𝗼̂̉𝗶 𝗰𝗵𝗶𝗲̂̀𝘂" : getHours < 23 ? "𝗕𝘂𝗼̂̉𝗶 𝘁𝗼̂́𝗶" : "𝗕𝘂𝗼̂̉𝗶 𝘁𝗼̂́𝗶"}`
  const { threadID } = event;
  if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
    api.changeNickname(`〈 ${global.config.PREFIX} 〉 • ${(!global.config.BOTNAME) ? "Mirai Bot" : global.config.BOTNAME}`, threadID, api.getCurrentUserID());
    return api.sendMessage("", event.threadID, () => api.sendMessage('', threadID));
  }
  else {
    try {
        if(!fs.existsSync(__dirname+`/cache/canvas/Semi.ttf`)) { 
        let getfont = (await axios.get(fontlink, { responseType: "arraybuffer" })).data;
        fs.writeFileSync(__dirname+`/cache/canvas/Semi.ttf`, Buffer.from(getfont, "utf-8"));
        };
      const { createReadStream, existsSync, mkdirSync, readdirSync } = global.nodemodule["fs-extra"];
      let { threadName, participantIDs } = await api.getThreadInfo(threadID);
      const moment = require("moment-timezone");
      const hours = moment.tz("Asia/Ho_Chi_Minh").format("HH");
      const time = moment.tz("Asia/Ho_Chi_Minh").format("DD/MM/YYYY || HH:mm:ss");
      const threadData = global.data.threadData.get(parseInt(threadID)) || {};
      var mentions = [], nameArray = [], memLength = [], iduser = [], i = 0;
      var abx = [];
      for (id in event.logMessageData.addedParticipants) {
        const userName = event.logMessageData.addedParticipants[id].fullName; iduser.push(event.logMessageData.addedParticipants[id].userFbId.toString());
        nameArray.push(userName);
        mentions.push({ tag: userName, id: event.senderID });
        memLength.push(participantIDs.length - i++);
        console.log(userName)
      }
     // console.log(event.logMessageData.addedParticipants)
      var id = [];
      for(o = 0; o < event.logMessageData.addedParticipants.length; o++){
    let pathImg = __dirname + `/cache/canvas/${o}.png`;
  let pathAva = __dirname + `/cache/canvas/fbcover2.png`;
  let avtAnime = (await axios.get(encodeURI(
    `https://graph.facebook.com/${event.logMessageData.addedParticipants[o].userFbId}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,{
      headers:{
        cookie:'xs=13%3AlajUELLXiJWSGA%3A2%3A1670218018%3A-1%3A6326;c_user=100026039134645;fr=04yhWc9aZ2jCK6WYB.AWX6H8d2OYiFMQa_tmHEcMP9bNY.BjjYEe.-o.AAA.0.0.BjjYEi.AWW2404AO5I;sb=HoGNYx-MLHOu0FOMeC8kqttW;datr=HoGNY-xBBNLJjRghcnhN1hWA;'
      }
    }), { responseType: "arraybuffer" })).data;
    var ok = [
      'https://i.imgur.com/dDSh0wc.jpeg',
      'https://i.imgur.com/UucSRWJ.jpeg',
      'https://i.imgur.com/OYzHKNE.jpeg',
      'https://i.imgur.com/V5L9dPi.jpeg',
      'https://i.imgur.com/M7HEAMA.jpeg'
             ]
  let background = (await axios.get(encodeURI(`${ok[Math.floor(Math.random() * ok.length)]}`), { responseType: "arraybuffer", })).data;
  fs.writeFileSync(pathAva, Buffer.from(avtAnime, "utf-8"));
  fs.writeFileSync(pathImg, Buffer.from(background, "utf-8"));
    var avatar = await this.circle(pathAva);
  let baseImage = await loadImage(pathImg);
  let baseAva = await loadImage(avatar);
  registerFont(__dirname+`/cache/canvas/Semi.ttf`, {
        family: "Semi"
    });
  let canvas = createCanvas(1902, 1082);
    console.log(canvas.width, canvas.height)
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(baseAva, canvas.width / 2 - 188, canvas.height / 2 - 375, 375, 355);
  ctx.fillStyle = "#FFF";
  ctx.textAlign = "center";
  ctx.font = `195px Semi`;
  ctx.fillText(`${event.logMessageData.addedParticipants[o].fullName}`, canvas.width / 2 + 20 , canvas.height / 2 + 100);
  ctx.save();
  ctx.font = `125px Semi`;
  ctx.fillText(`Chào mừng đến với nhóm ${threadName}`, canvas.width / 2 - 15 , canvas.height / 2 + 235)
  ctx.fillText(`Thành Viên Thứ ${participantIDs.length - o}`, canvas.width / 2 - 15 , canvas.height / 2 + 350)
  ctx.restore();
  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  abx.push(fs.createReadStream(__dirname + `/cache/canvas/${o}.png`))
      }
      memLength.sort((a, b) => a - b);
      (typeof threadData.customJoin == "undefined") ? msg = "🇻🇳 💗𝙃𝙚𝙡𝙡𝙤 𝙘𝙤𝙣 𝙫𝙤̛̣ {name}💗.\n𝗖𝗵𝗮̀𝗼 𝗺𝘂̛̀𝗻𝗴 đã đến với {threadName}.\n{type} là 𝘁𝗵𝗮̀𝗻𝗵 𝘃𝗶𝗲̂𝗻 thứ {soThanhVien} 𝙘𝙪̉𝙖 𝙣𝙝𝙤́𝙢!. 𝙏𝙪̛𝙤̛𝙣𝙜 𝙩𝙖́𝙘 𝙣𝙝𝙞𝙚̂̀𝙪 𝙫𝙖̀𝙤 𝙣𝙝𝙖 𝙠𝙝𝙤̂𝙣𝙜 𝙡𝙖̀ 𝙖̆𝙣 𝙠𝙞𝙘𝙠 đ𝙖̂́𝙮 ♥\n\n𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗧𝗵𝗲̂𝗺: {author}\n\nChúc bạn 1 buổi {buoi} vui vẻ\n𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻: {time}" : msg = threadData.customJoin;
      var nameAuthor = await Users.getNameUser(event.author)
      msg = msg
        .replace(/\{name}/g, nameArray.join(', '))
				.replace(/\{type}/g, memLength.length > 1 ? '𝗖𝗮́𝗰 𝗰𝗮̣̂𝘂' : '𝗰𝗮̣̂𝘂')
				.replace(/\{soThanhVien}/g, memLength.join(', '))
				.replace(/\{threadName}/g, threadName)
				.replace(/\{author}/g, nameAuthor)
        .replace(/\{buoi}/g, session)
				.replace(/\{time}/g, time);
      var formPush = { body: msg, attachment: abx, mentions }
      api.sendMessage(formPush, threadID);
      for (let ii = 0; ii < parseInt(id.length); ii++) {
        fs.unlinkSync(__dirname + `/cache/canvas${ii}.png`)
    }
    } catch (e) { return console.log(e) };
  }
}