module.exports.config = {
  name: "goiadmin",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Mirai Team",
  description: "Tag admin",
  commandCategory: "Hệ thống admin",
  usages: "",
  cooldowns: 1
};
module.exports.handleEvent = async function ( { api, event } ) {
    var idad = ["100013942628281"];
    // var idad = global.config.ADMINBOT;
    for (const id of idad) {
    if (!id) return
    if (!idad) return
    if(!event.body) return
    if (Object.keys(event.mentions) == id) {
      var msg = ["Tag admin tao nữa ăn đấm","Sao? Tag nó có việc gì?","Tag gì lắm vậy? Bộ ko cho chủ tao xin phút gây bình yên à?","Tag admin tao lần nữa là bố đấm lòi mõm đấy con chó :)","Sao, yêu cậu chủ tao không mà tag?","Bớt tag admin tao lại nhá con lợn :)","Mày ko để cho chủ tao nghỉ ngơi à con lợn?", "Tag con cún","tag nó làm kặc gì","chủ tao đang làm làm trai bao gọi cc","nó đang xem sẽ tag cc","nó đang thudam gọi có việc j"];
      return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
    }
    else return
    }
}
module.exports.run = async function ( { api, event } ) {
api.sendMessage(`Tự động chửi thằng chó tag admin bot`,event.threadID,event.messageID)
}