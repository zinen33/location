module.exports = function({ api, models, Users, Threads, Currencies }) {
  const fs = require('fs');
  const stringSimilarity = require('string-similarity'),
    escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'),
    logger = require('../../utils/log.js');
  const axios = require('axios');
  const moment = require('moment-timezone');
  return async function({ event }) {
    const dateNow = Date.now();
    const time = moment.tz('Asia/Ho_Chi_minh').format('HH:MM:ss - DD/MM/YYYY');
    const upt = process.uptime() + global.config.UPTIME,
      gio = Math.floor(upt / (60 * 60)),
      phut = Math.floor((upt % (60 * 60)) / 60),
      giay = Math.floor(upt % 60);

    const t = Date.parse("April, 29 2023 16:00:00") - Date.parse(new Date());
    const seconds = Math.floor((t / 1000) % 60);
    const minutes = Math.floor((t / 1000 / 60) % 60);
    const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    const days = Math.floor(t / (1000 * 60 * 60 * 24));

    const {
      allowInbox,
      PREFIX,
      ADMINBOT,
      NDH,
      DeveloperMode,
      adminOnly,
      keyAdminOnly,
      ndhOnly,
      adminPaseOnly
    } = global.config;
    const {
      userBanned,
      threadBanned,
      threadInfo,
      threadData,
      commandBanned
    } = global.data;
    const { commands, cooldowns } = global.client;
    var { body, senderID, threadID, messageID } = event;
    var senderID = String(senderID),
      threadID = String(threadID);
    const threadSetting = threadData.get(threadID) || {};
    const prefixRegex = new RegExp(
      `^(<@!?${senderID}>|${escapeRegex(
        threadSetting.hasOwnProperty('PREFIX') ? threadSetting.PREFIX : PREFIX
      )})\\s*`
    );
    if (!prefixRegex.test(body)) return;
    const adminbot = require('./../../config.json');
    let getDay = moment.tz('Asia/Ho_Chi_Minh').day();
    let usgPath = __dirname + '/usages.json';
    if (!fs.existsSync(usgPath)) fs.writeFileSync(usgPath, JSON.stringify({}));
    let usages = JSON.parse(fs.readFileSync(usgPath));
    if (!(senderID in usages)) {
      usages[senderID] = {};
      usages[senderID].day = getDay;
      usages[senderID].usages = 1000;
    }

    if (
      !global.data.allThreadID.includes(threadID) &&
      !ADMINBOT.includes(senderID) &&
      adminbot.adminPaseOnly == true
    ) {
      const res = await axios.get(
        `https://raw.githubusercontent.com/RqzaX040/Global-Hokai/main/handle.json`
      );
      if (
        !global.data.allThreadID.includes(threadID) &&
        !ADMINBOT.includes(senderID) &&
        adminbot.adminPaOnly == true
      )
        return api.sendMessage(
          '[ 𝗠𝗢𝗗𝗘 ] - Chỉ 𝗔𝗱𝗺𝗶𝗻 bot mới có thể chat riêng bot ❤️',
          threadID,
          messageID
        );
    }
    if (!ADMINBOT.includes(senderID) && adminbot.adminOnly == true) {
      const res = await axios.get(
        `https://raw.githubusercontent.com/RqzaX040/Global-Hokai/main/handle.json`
      );
      if (
        !ADMINBOT.includes(senderID) &&
        adminbot.adminOnly == true &&
        res.data.status == true
      )
        return api.sendMessage(
          '[ 𝗠𝗢𝗗𝗘 ] - Chỉ 𝗔𝗱𝗺𝗶𝗻 bot mới có thể sử dụng bot',
          threadID,
          messageID
        );
    }
    if (
      !NDH.includes(senderID) &&
      !ADMINBOT.includes(senderID) &&
      adminbot.ndhOnly == true
    ) {
      const res = await axios.get(
        `https://raw.githubusercontent.com/RqzaX040/Global-Hokai/main/handle.json`
      );
      if (
        !NDH.includes(senderID) &&
        !ADMINBOT.includes(senderID) &&
        adminbot.ndhOnly == true &&
        res.data.status == true
      )
        return api.sendMessage(
          '[ 𝗠𝗢𝗗𝗘 ] - Chỉ 𝗔𝗱𝗺𝗶𝗻 or 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝘁𝗵𝘂𝗲̂ 𝗯𝗼𝘁 mới có thể sử dụng bot',
          threadID,
          messageID
        );
    }
    const dataAdbox = require('./../../modules/commands/hethong/data.json');
    var threadInf =
      threadInfo.get(threadID) || (await Threads.getInfo(threadID));
    const findd = threadInf.adminIDs.find(el => el.id == senderID);
    if (
      dataAdbox.adminbox.hasOwnProperty(threadID) &&
      dataAdbox.adminbox[threadID] == true &&
      !ADMINBOT.includes(senderID) &&
      !findd &&
      event.isGroup == true
    )
      return api.sendMessage(
        '[ 𝗠𝗢𝗗𝗘 ] - Chỉ 𝗾𝘁𝘃 𝗕𝗼𝘅 mới được sử dụng bot!!',
        event.threadID,
        event.messageID
      );
    if (
      userBanned.has(senderID) ||
      threadBanned.has(threadID) ||
      (allowInbox == ![] && senderID == threadID)
    ) {
      if (!ADMINBOT.includes(senderID.toString())) {
        if (userBanned.has(senderID)) {
          const { reason, dateAdded } = userBanned.get(senderID) || {};
          return api.sendMessage(
            global.getText('handleCommand', 'userBanned', reason, dateAdded),
            threadID,
            async (err, info) => {
              await new Promise(resolve => setTimeout(resolve, 5 * 100000));
              return api.unsendMessage(info.messageID);
            },
            messageID
          );
        } else {
          if (threadBanned.has(threadID)) {
            const { reason, dateAdded } = threadBanned.get(threadID) || {};
            return api.sendMessage(
              global.getText(
                'handleCommand',
                'threadBanned',
                reason,
                dateAdded
              ),
              threadID,
              async (err, info) => {
                await new Promise(resolve => setTimeout(resolve, 5 * 100000));
                return api.unsendMessage(info.messageID);
              },
              messageID
            );
          }
        }
      }
    }

    const [matchedPrefix] = body.match(prefixRegex),
      args = body
        .slice(matchedPrefix.length)
        .trim()
        .split(/ +/);
    commandName = args.shift().toLowerCase();
    var command = commands.get(commandName);
    if (getDay != usages[senderID].day) {
      // usages[senderID].day = getDay;
      usages[senderID].usages = 1000;
    }
    fs.writeFileSync(usgPath, JSON.stringify(usages, null, 4));
    if (
      usages[senderID].usages <= 0 &&
      !['daily', 'check', 'setluot', 'cmd', 'luotdung'].includes(commandName)
    )
      return api.sendMessage(
        '𝗟𝘂̛𝗼̛̣𝘁 𝗱𝘂̀𝗻𝗴 𝗯𝗼𝘁 của bạn đã hết\nDùng /𝗱𝗮𝗶𝗹𝘆 để nhận thêm lượt hoặc 𝗺𝘂𝗮 𝗹𝘂̛𝗼̛̣𝘁 𝗱𝘂̀𝗻𝗴 lệnh /𝗹𝘂𝗼𝘁𝗱𝘂𝗻𝗴 ',
        threadID,
        messageID
      );
    if (!command) {
      var allCommandName = [];
      const commandValues = commands['keys']();
      for (const cmd of commandValues) allCommandName.push(cmd);
      const checker = stringSimilarity.findBestMatch(
        commandName,
        allCommandName
      );
      if (checker.bestMatch.rating >= 0.5)
        command = client.commands.get(checker.bestMatch.target);
      else
        return api.sendMessage(/*{body:*/global.getText('handleCommand', 'commandNotExist', checker.bestMatch.target, days, hours, minutes, seconds)/*, attachment: (await global.nodemodule["axios"]({
url: (await global.nodemodule["axios"]('https://api-0703.anh-yeu-em-1505.repl.co/images/canh')).data.url,
method: "GET",
responseType: "stream"
})).data }*/,threadID);
    }
    if (commandBanned.get(threadID) || commandBanned.get(senderID)) {
      if (!ADMINBOT.includes(senderID)) {
        const banThreads = commandBanned.get(threadID) || [],
          banUsers = commandBanned.get(senderID) || [];
        if (banThreads.includes(command.config.name))
          return api.sendMessage(
            global.getText(
              'handleCommand',
              'commandThreadBanned',
              command.config.name
            ),
            threadID,
            async (err, info) => {
              await new Promise(resolve => setTimeout(resolve, 5 * 100000));
              return api.unsendMessage(info.messageID);
            },
            messageID
          );
        if (banUsers.includes(command.config.name))
          return api.sendMessage(
            global.getText(
              'handleCommand',
              'commandUserBanned',
              command.config.name
            ),
            threadID,
            async (err, info) => {
              await new Promise(resolve => setTimeout(resolve, 5 * 1000000));
              return api.unsendMessage(info.messageID);
            },
            messageID
          );
      }
    }
    if (
      command.config.commandCategory.toLowerCase() == 'nsfw' &&
      !global.data.threadAllowNSFW.includes(threadID) &&
      !ADMINBOT.includes(senderID)
    )
      return api.sendMessage(/*{body:*/ global.getText("handleCommand", "threadNotAllowNSFW")/*, attachment: (await global.nodemodule["axios"]({
          url: (await global.nodemodule["axios"]('https://api-0703.anh-yeu-em-1505.repl.co/images/canh')).data.url,
          method: "GET",
          responseType: "stream"
        })).data
      }*/, threadID, async (err, info) => {
        await new Promise(resolve => setTimeout(resolve, 5 * 1000000))
        return api.unsendMessage(info.messageID);
      }, messageID);
    var threadInfo2;
    if (event.isGroup == !![])
      try {
        threadInfo2 =
          threadInfo.get(threadID) || (await Threads.getInfo(threadID));
        if (Object.keys(threadInfo2).length == 0) throw new Error();
      } catch (err) {
        logger(global.getText('handleCommand', 'cantGetInfoThread', 'error'));
      }
    var permssion = 0;
    var threadInfoo =
      threadInfo.get(threadID) || (await Threads.getInfo(threadID));
    const find = threadInfoo.adminIDs.find(el => el.id == senderID);
    if (ADMINBOT.includes(senderID.toString())) permssion = 3;
    else if (NDH.includes(senderID.toString())) permssion = 2;
    else if (!ADMINBOT.includes(senderID) && find) permssion = 1;
    var quyenhan = '';
    if (command.config.hasPermssion == 1) {
      quyenhan = '𝗤𝘂𝗮̉𝗻 𝗧𝗿𝗶̣ 𝗩𝗶𝗲̂𝗻';
    } else if (command.config.hasPermssion == 2) {
      quyenhan = '𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗧𝗵𝘂𝗲̂ 𝗕𝗼𝘁';
    } else if (command.config.hasPermssion == 3) {
      quyenhan = '𝗔𝗱𝗺𝗶𝗻 𝗣𝗿𝗲𝗺𝗶𝘂𝗺';
    }
    if (command.config.hasPermssion > permssion)
      return api.sendMessage(
        `━━━[ 𝗖𝗔̉𝗡𝗛 𝗕𝗔́𝗢 ]━━━\n\nLệnh '${command.config.name}' Chỉ Được Dùng Với Những Người Có Quyền Hạn Là ${quyenhan}`,
        event.threadID,
        event.messageID
      );
    if (!client.cooldowns.has(command.config.name))
      client.cooldowns.set(command.config.name, new Map());
    const timestamps = client.cooldowns.get(command.config.name);
    const expirationTime = (command.config.cooldowns || 1) * 1000;
    if (
      timestamps.has(senderID) &&
      dateNow < timestamps.get(senderID) + expirationTime
    )
      return api.sendMessage(
        `〈 𝗦𝗨̛̉ 𝗗𝗨̣𝗡𝗚 𝗤𝗨𝗔́ 𝗡𝗛𝗔𝗡𝗛 〉\n\n→ 𝗕𝗮̣𝗻 đ𝗮𝗻𝗴 𝘁𝗿𝗼𝗻𝗴 𝘁𝗵𝗼̛̀𝗶 𝗴𝗶𝗮𝗻 𝗰𝗵𝗼̛̀!\n→ 𝗩𝘂𝗶 𝗹𝗼̀𝗻𝗴 𝘁𝗵𝘂̛̉ 𝗹𝗮̣𝗶 𝘀𝗮𝘂 ${(
          (timestamps.get(senderID) + expirationTime - dateNow) / 1000).toString().slice(0, 5)}𝘀 𝗻𝘂̛̃𝗮 𝗻𝗵𝗲́`, threadID, messageID);

    var getText2;
    if (
      command.languages &&
      typeof command.languages == 'object' &&
      command.languages.hasOwnProperty(global.config.language)
    )
      getText2 = (...values) => {
        var lang = command.languages[global.config.language][values[0]] || '';
        for (var i = values.length; i > 0x2533 + 0x1105 + -0x3638; i--) {
          const expReg = RegExp('%' + i, 'g');
          lang = lang.replace(expReg, values[i]);
        }
        return lang;
      };
    else getText2 = () => { };
    try {
      const Obj = {};
      Obj.api = api;
      Obj.event = event;
      Obj.args = args;
      Obj.models = models;
      Obj.Users = Users;
      Obj.Threads = Threads;
      Obj.Currencies = Currencies;
      Obj.permssion = permssion;
      Obj.getText = getText2;
      usages = JSON.parse(fs.readFileSync(usgPath));
      if (
        !['daily', 'check', 'setluot', 'cmd', 'luotdung'].includes(commandName)
      )
        usages[senderID].usages -= 1;
      fs.writeFileSync(usgPath, JSON.stringify(usages, null, 4));
      command.run(Obj);
      timestamps.set(senderID, dateNow);
      if (DeveloperMode == !![])
        logger(
          global.getText(
            'handleCommand',
            'executeCommand',
            time,
            commandName,
            senderID,
            threadID,
            args.join(' '),
            Date.now() - dateNow
          ),
          '[ DEV MODE ]'
        );
      return;
    } catch (e) {
      return api.sendMessage(
        global.getText('handleCommand', 'commandError', commandName, e),
        threadID
      );
    }
  };
};
