module.exports.config = {
  name: "prefix",	
  version: "2.0.0", 
  hasPermssion: 1,
  credits: "Nam",
  description: "sos", 
  commandCategory: "Không cần dấu lệnh",
  usages: "¹",
  cooldowns: 0
};
module.exports.languages = {
  "vi": {},
  "en": {}
};

function random(arr) {
var rd = arr[Math.floor(Math.random() * arr.length)];
    return rd;
        };
module.exports.handleEvent = async function ({ api, event, Threads }) {
  var { threadID, messageID, body } = event,{ PREFIX } = global.config;
  let threadSetting = global.data.threadData.get(threadID) || {};
  let prefix = threadSetting.PREFIX || PREFIX;
  const icon = ["🎃", "🦅", "🐔", "🍉", "🍇", "🦄", "🐸", "🐉", "🐒", "🍊", "🍓"];
  if (body.toLowerCase() == "prefix") {
       return api.sendMessage(`${random(icon)} 𝗗𝗮̂́𝘂 𝗹𝗲̣̂𝗻𝗵 𝗯𝗼𝘁 𝗻𝗲̀: ${prefix}`, threadID, messageID)
  }
 }
module.exports.handleReaction = async function({ api, event, Threads, handleReaction, getText }) {
	try {
		if (event.userID != handleReaction.author) return;
		const { threadID, messageID } = event;
		var data = (await Threads.getData(String(threadID))).data || {};
		data["PREFIX"] = handleReaction.PREFIX;
		await Threads.setData(threadID, { data });
		await global.data.threadData.set(String(threadID), data);
		api.unsendMessage(handleReaction.messageID);
		return api.sendMessage(`đã đổi prefix của nhóm thành: ${handleReaction.PREFIX}`, threadID, messageID);
	} catch (e) { return console.log(e) }
}

module.exports.run = async ({ api, event, args, Threads }) => {
	if (typeof args[0] == "undefined") return api.sendMessage("bạn phải nhập prefix cần thay đổi", event.threadID, event.messageID);
	let prefix = args[0].trim();
	if (!prefix) return api.sendMessage("bạn phải nhập prefix cần thay đổi", event.threadID, event.messageID);
	if (prefix == "reset") {
		var data = (await Threads.getData(event.threadID)).data || {};
		data["PREFIX"] = global.config.PREFIX;
		await Threads.setData(event.threadID, { data });
		await global.data.threadData.set(String(event.threadID), data);
		return api.sendMessage(`đã reset prefix thành: ${global.config.PREFIX}`, event.threadID, event.messageID);
	} else return api.sendMessage(`bạn có chắc muốn đổi prefix của nhóm thành: ${prefix}\n👉 thả cảm xúc vào tin nhắn này để xác nhận`, event.threadID, (error, info) => {
		global.client.handleReaction.push({
			name: this.config.name,
			messageID: info.messageID,
			author: event.senderID,
			PREFIX: prefix
		})
	})
}