const request = require("request");
const fs = require("fs")
const axios = require("axios")
module.exports.config = {
  name: "hôn",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Lê Định Mod",
  description: "hôn người Bạn Muốn",
  commandCategory: "người dùng",
  usages: "@tag",
  cooldowns: 5,
  dependencies: {"request": "","fs": "","axios": ""}
};

module.exports.run = async({api,event,args,client,Users,Threads,__GLOBAL,Currencies}) => {
        const request = require('request')
                const fs = require('fs')
                  var mention = Object.keys(event.mentions)[0];
let tag = event.mentions[mention].replace("@", "");
        var link = [
          "https://drive.google.com/uc?id=17a6EUPIhPXc610CL2b0H857mvgKy_PYc&export=download",
             ];
   var callback = () => api.sendMessage({body: `${tag} 💋, hun cái nè 😘` , mentions: [{
          tag: tag,
          id: Object.keys(event.mentions)[0]
        }],
  attachment: fs.createReadStream(__dirname + "/cache/hon.mp4")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/hon.mp4"));
      return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname+"/cache/hon.mp4")).on("close",() => callback());
   };