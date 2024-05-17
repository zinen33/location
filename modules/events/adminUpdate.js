module.exports.config = {
	name: "adminUpdate",
	eventType: ["log:thread-admins","log:thread-name", "log:user-nickname","log:thread-icon","log:thread-color","log:link-status","log:magic-words","log:thread-approval-mode", "log:thread-poll", "log:thread-call"],
	version: "1.0.1",
	credits: "Mirai Team", // mod by R1zaX
	description: "Cập nhật thông tin nhóm một cách nhanh chóng",
    envConfig: {
        autoUnsend: false,
        sendNoti: true,
        timeToUnsend: 20
    }
};

module.exports.run = async function ({ event, api, Threads,Users }) {
	const fs = require("fs");
	var iconPath = __dirname + "/emoji.json";
if (!fs.existsSync(iconPath)) fs.writeFileSync(iconPath, JSON.stringify({}));
  var namePath = __dirname + "/namebox.json";
if (!fs.existsSync(namePath)) fs.writeFileSync(namePath, JSON.stringify({}));
  
    const { threadID, logMessageType, logMessageData } = event;
    const { setData, getData } = Threads;
    const nameUser = global.data.userName.get(event.author) || await Users.getNameUser(event.author);
    //const name = await Users.getNameUser(id) || "Người dùng Facebook";
    const oldName = (await Threads.getData(event.threadID)).name || "ERROR";
    const thread = global.data.threadData.get(threadID) || {};
    var tg = require("moment-timezone").tz("Asia/Ho_Chi_Minh").format("HH:mm-D/MM");
    if (typeof thread["adminUpdate"] != "undefined" && thread["adminUpdate"] == false) return;
    try {
        let dataThread = (await getData(threadID)).threadInfo;
        switch (logMessageType) {
             case "log:magic-words":
            {
                return api.sendMessage(`𝗧𝗵𝗲𝗺𝗲 ${event.logMessageData.magic_word} đ𝗮̃ 𝘁𝗵𝗲̂𝗺 𝗵𝗶𝗲̣̂𝘂 𝘂̛́𝗻𝗴: ${event.logMessageData.theme_name}\n𝗘𝗺𝗼𝗷𝗶: ${event.logMessageData.emoji_effect || "𝗞𝗵𝗼̂𝗻𝗴 𝗰𝗼́ 𝗲𝗺𝗼𝗷𝗶"}\n𝗧𝗼̂̉𝗻𝗴 ${event.logMessageData.new_magic_word_count} 𝗛𝗶𝗲̣̂𝘂 𝘂̛́𝗻𝗴 𝘁𝘂̛̀ 𝗻𝗴𝘂̛̃ 𝗱𝘂̛𝗼̛̣𝗰 𝘁𝗵𝗲̂𝗺 𝘃𝗮̀𝗼`, threadID)
            }
        case "log:thread-poll":
            {
                var str = event.logMessageData.question_json
                var obj = JSON.parse(str);
                if (event.logMessageData.event_type == "question_creation") {
                    return api.sendMessage(`${event.logMessageBody}`, threadID)
                }
                if (event.logMessageData.event_type == "update_vote") {
                    return api.sendMessage(`${event.logMessageBody}`, threadID)
                }
            }
        case "log:thread-approval-mode":
            {
                return api.sendMessage(event.logMessageBody, threadID)
            }
            case "log:thread-admins": {
                if (logMessageData.ADMIN_EVENT == "add_admin") {
                    dataThread.adminIDs.push({ id: logMessageData.TARGET_ID })
                  var name1 = (await Users.getData(logMessageData.TARGET_ID)).name
                    if (global.configModule[this.config.name].sendNoti) api.sendMessage(/*{body:*/`━━━━━〈 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 〉━━━━━\n\n↣ Đã cập nhật người dùng có tên: ${name1}\n↣ Trở thành 👑 𝗤𝘂𝗮̉𝗻 𝗧𝗿𝗶̣ 𝗩𝗶𝗲̂𝗻 nhóm thành công\n\n𝗡𝗴𝘂̛𝗼̛̀𝗶 𝘁𝗵𝗲̂𝗺 𝗾𝘂𝘆𝗲̂̀𝗻: ` + nameUser,/* attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://caochungdat.me/docs/images/anh4k')).data.url,
method: "GET",
responseType: "stream"
})).data},*/ threadID, async (error, info) => {
                        if (global.configModule[this.config.name].autoUnsend) {
                            await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 100000));
                            return api.unsendMessage(info.messageID);
                        } else return;
                    });
                }
                else if (logMessageData.ADMIN_EVENT == "remove_admin") {
                    dataThread.adminIDs = dataThread.adminIDs.filter(item => item.id != logMessageData.TARGET_ID);
                  var name2 = (await Users.getData(logMessageData.TARGET_ID)).name
                    if (global.configModule[this.config.name].sendNoti) api.sendMessage(/*{body:*/`━━━━━〈 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 〉━━━━━\n\n↣ Đã cập nhật người dùng có tên: ${name2}\n↣ Xuống thành 👤 𝘁𝗵𝗮̀𝗻𝗵𝗵 𝘃𝗶𝗲̂𝗻 thành công\n\n𝗡𝗴𝘂̛𝗼̛̀𝗶 𝘁𝘂̛𝗼̛́𝗰 𝗾𝘂𝘆𝗲̂̀𝗻: ` + nameUser,/* attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://caochungdat.me/docs/images/anh4k')).data.url,
method: "GET",
responseType: "stream"
})).data},*/ threadID, async (error, info) => {
                        if (global.configModule[this.config.name].autoUnsend) {
                            await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 100000));
                            return api.unsendMessage(info.messageID);
                        } else return;
                    });
                }
                break;
            }

            case "log:thread-icon": {
            	let preIcon = JSON.parse(fs.readFileSync(iconPath));
            	dataThread.threadIcon = event.logMessageData.thread_icon || "👍";
                if (global.configModule[this.config.name].sendNoti) api.sendMessage(`━━━━━〈 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 〉━━━━━\n»  ${event.logMessageBody.replace("𝗯𝗶𝗲̂̉𝘂 𝘁𝘂̛𝗼̛̣𝗻𝗴 𝗰𝗮̉𝗺 𝘅𝘂́𝗰", "𝗶𝗰𝗼𝗻")}\n» 𝗜𝗰𝗼𝗻 𝗴𝗼̂́𝗰: ${preIcon[threadID] || "𝗸𝗵𝗼̂𝗻𝗴 𝗿𝗼̃"}`, threadID, async (error, info) => {
                	preIcon[threadID] = dataThread.threadIcon;
                	fs.writeFileSync(iconPath, JSON.stringify(preIcon));
                    if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 100000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
            }
            case "log:thread-color": {
            	dataThread.threadColor = event.logMessageData.thread_color || "🌤";
                if (global.configModule[this.config.name].sendNoti) api.sendMessage(/*{body:*/`━━━━━〈 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 〉━━━━━\n»  ${event.logMessageBody.replace("𝗖𝗵𝘂̉ 𝗱𝗲̂̀", "𝗖𝗼𝗹𝗼𝗿")}` ,/*attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://caochungdat.me/docs/images/anh4k')).data.url,
method: "GET",
responseType: "stream"
})).data},*/ threadID, async (error, info) => {
                    if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 100000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
            }
          
            case "log:user-nickname": {
                dataThread.nicknames[logMessageData.participant_id] = logMessageData.nickname;
                if (typeof global.configModule["nickname"] != "undefined" && !global.configModule["nickname"].allowChange.includes(threadID) && !dataThread.adminIDs.some(item => item.id == event.author) || event.author == api.getCurrentUserID()) return;
              var name3 = (await Users.getData(logMessageData.participant_id)).name
                if (global.configModule[this.config.name].sendNoti) api.sendMessage(/*{body:*/`━━━━━〈 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 〉━━━━━\n\n↣ Đã cập nhật 𝘁𝗲̂𝗻 𝗻𝗴𝘂̛𝗼̛̀𝗶 𝗱𝘂̀𝗻𝗴 ${name3}\n↣ 𝗧𝗵𝗮̀𝗻𝗵: ${(logMessageData.nickname.length == 0) ? "tên gốc": logMessageData.nickname}`/*, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://caochungdat.me/docs/images/anh4k')).data.url,
method: "GET",
responseType: "stream"
})).data}*/, threadID, async (error, info) => {
                    if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 100000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
            }

            case "log:thread-call": {
                if (logMessageData.event == "group_call_started") {
                    const name = await Users.getNameUser(logMessageData.caller_id);
                    api.sendMessage(`━━━━━〈 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 〉━━━━━\n» ${name} đã bắt đầu ${(logMessageData.video) ? '𝗩𝗜𝗗𝗘𝗢 ' : ''}𝗖𝗔𝗟𝗟.`, threadID);
                }
                else if (logMessageData.event == "group_call_ended") {
                    const callDuration = logMessageData.call_duration;

                    //Transform seconds to hours, minutes and seconds
                    let hours = Math.floor(callDuration / 3600);
                    let minutes = Math.floor((callDuration - (hours * 3600)) / 60);
                    let seconds = callDuration - (hours * 3600) - (minutes * 60);

                    //Add 0 if less than 10
                    if (hours < 10) hours = "0" + hours;
                    if (minutes < 10) minutes = "0" + minutes;
                    if (seconds < 10) seconds = "0" + seconds;

                    const timeFormat = `${hours}:${minutes}:${seconds}`;

                    api.sendMessage(`━━━━━〈 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 〉━━━━━\n» ${(logMessageData.video) ? '𝗩𝗜𝗗𝗘𝗢 ' : ''}𝗖𝘂𝗼̣̂𝗰 𝗴𝗼̣𝗶 𝗱𝗮̃ 𝗸𝗲̂́𝘁 𝘁𝗵𝘂́𝗰\n» 𝗧𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻 𝗴𝗼̣𝗶: ${timeFormat}`, threadID);
                }
                else if (logMessageData.joining_user) {
                    const name = await Users.getNameUser(logMessageData.joining_user);
                    api.sendMessage(`━━━━━〈 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 〉━━━━━\n» ${name} đã tham gia ${(logMessageData.group_call_type == '1') ? '𝗩𝗜𝗗𝗘𝗢 ' : ''}𝗖𝗔𝗟𝗟.`, threadID);
                }
                break;
            }
            
        case "log:thread-name": {
          let preName = JSON.parse(fs.readFileSync(namePath));
                dataThread.threadName = event.logMessageData.name || "Không tên";
                if (global.configModule[this.config.name].sendNoti) api.sendMessage(`━━━━━〈 𝗖𝗔̣̂𝗣 𝗡𝗛𝗔̣̂𝗧 𝗡𝗛𝗢́𝗠 〉━━━━━\n\nĐã cập nhật 𝘁𝗲̂𝗻 𝗻𝗵𝗼́𝗺\n ↣ Tên cũ: ${preName[threadID] || "không rõ" || event.logMessageData.name || "Không tên"} \n ↣ Tên mới: ${dataThread.threadName}\n\nNgười đổi: ` + nameUser, threadID, async (error, info) => {
                  preName[threadID] = dataThread.threadName;
                    fs.writeFileSync(namePath, JSON.stringify(preName));
                    if (global.configModule[this.config.name].autoUnsend) {
                        await new Promise(resolve => setTimeout(resolve, global.configModule[this.config.name].timeToUnsend * 100000));
                        return api.unsendMessage(info.messageID);
                    } else return;
                });
                break;
            }
        }
        await setData(threadID, { threadInfo: dataThread });
    } catch (e) { console.log(e) };
																								 }
