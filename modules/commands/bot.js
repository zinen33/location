module.exports.config = {
  name: "bot",
  version: "1.2.0",
  hasPermssion: 0,
  credits: "Lmao tủn tủn",
  description: "nhắc bot cái ầu uồi:)))",
  commandCategory: "Bổ não",
  usages: "[trống]",
  cooldowns: 5
}

module.exports.handleEvent = async ({ api, event, Users }) => {
  const cc = [
    "kêu tui là yêu tui đó nhá <3", 
    "kêu tui chuyện gì vậy <3", 
    "có yêu admin tui hong mà kêu tui😾", 
    "donate cho admin tui có kinh phí nuôi bồ đi><", 
    "gọi nữa tui ban đó nha><"
  ];
  let name = await Users.getNameUser(event.senderID)
  if (event.body.toLowerCase() == "bot"){ 
    return api.sendMessage(
      name + ` ${cc[Math.floor(Math.random() * cc.length)]}`
      , event.threadID, event.messageID)
  }
  
}

module.exports.run = async ({ api, event, Users }) => {
  let name = await Users.getNameUser(event.senderID)
  return api.sendMessage(name + ' biết xài không hả', event.threadID, event.messageID)
}
