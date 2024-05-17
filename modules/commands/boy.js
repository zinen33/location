module.exports.config = {
	name:"boy",
	version: "1.0.0",
	hasPermssion: 0,
	credits: "",
	description: "nsfw",
	commandCategory: "media",
	cooldowns: 3
};
module.exports.run = async ({ api, event,}) => {
	const axios = require('axios');
	const request = require('request');
	const fs = require("fs");
	axios.get('https://jrt-api.nguyenhaidang.ml/trai').then(res => {
	let ext = res.data.data.substring(res.data.data.lastIndexOf(".") + 1);
	let callback = function () {
					api.sendMessage({
                                                body: `𝗕𝗼̛́𝘁 𝗠𝗲̂ 𝗧𝗿𝗮𝗶 𝗟𝗮̣𝗶 -.-`,
						attachment: fs.createReadStream(__dirname + `/cache/trai.${ext}`)
					}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/trai.${ext}`), event.messageID);
				};
				request(res.data.data).pipe(fs.createWriteStream(__dirname + `/cache/trai.${ext}`)).on("close", callback);
			})
}