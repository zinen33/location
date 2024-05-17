module.exports.config = {
    name: "antiout",
    eventType: ["log:unsubscribe"],
    version: "1.0.7",
    credits: "ProCoderMew",
    description: "Listen events",
    dependencies: {
        "path": ""
    }
};

module.exports.run = async function ({ api, event, Users }) {
    const { resolve } = global.nodemodule["path"];
    const path = resolve(__dirname, '../commands', 'hethong', 'antiout.json');
    const { antiout } = require(path);
    const { logMessageData, author, threadID } = event;
    const id = logMessageData.leftParticipantFbId;
    if (author == id && id != api.getCurrentUserID()) {
        const name = await Users.getNameUser(id) || "Người dùng Facebook";
        if (antiout.hasOwnProperty(threadID) && antiout[threadID] == true) {
            try {
                await api.addUserToGroup(id, threadID);
                return api.sendMessage(`[ 𝗔𝗡𝗧𝗜𝗢𝗨𝗧 ] 𝗞𝗶́𝗰𝗵 𝗛𝗼𝗮̣𝘁 𝗔𝗻𝘁𝗶𝗼𝘂𝘁 𝗧𝗵𝗮̀𝗻𝗵 𝗖𝗼̂𝗻𝗴 𝗕𝗼𝘁 Đ𝗮̃ 𝗧𝗵𝗲̂𝗺 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗗𝘂̀𝗻𝗴 => ${name}`, threadID);
            }
            catch (e) {
                return api.sendMessage(`[ 𝗔𝗡𝗧𝗜𝗢𝗨𝗧 ] 𝗞𝗵𝗼̂𝗻𝗴 𝘁𝗵𝗲̂̉ 𝘁𝗵𝗲̂𝗺 ${name} 𝘃𝘂̛̀𝗮 𝗼𝘂𝘁 𝘃𝗮̀𝗼 𝗹𝗮̣𝗶 𝗻𝗵𝗼́𝗺.`, threadID);
            }
        }
    }
    return;
      }
