    var request = require("request");const { readdirSync, readFileSync, writeFileSync, existsSync, copySync, createWriteStream, createReadStream } = require("fs-extra");
    module.exports.config = {
        name: "baucua",
        version: "1.0.0",
        hasPermssion: 0,
        credits: "Horizon Lucius Synthesis I", // Mod By Q.Huy
        description: "Game bầu cua!",
        commandCategory: "Game",
        usages: "baucua + tên + tiền",
        cooldowns: 5
    };

    module.exports.onLoad = async function () {
        if (!existsSync(__dirname + '/cache/baucua/ga.jpg')) {
            request('https://i.imgur.com/0gKAr0C.jpg').pipe(createWriteStream(__dirname + '/cache/baucua/ga.jpg'));
        }
        if (!existsSync(__dirname + '/cache/baucua/tom.jpg')) {
            request('https://i.imgur.com/qvZ9cIx.jpg').pipe(createWriteStream(__dirname + '/cache/baucua/tom.jpg'));
        }
        if (!existsSync(__dirname + '/cache/baucua/bau.jpg')) {
            request('https://i.imgur.com/ZSboc0o.jpg').pipe(createWriteStream(__dirname + '/cache/baucua/bau.jpg'));
        }
        if (!existsSync(__dirname + '/cache/baucua/cua.jpg')) {
            request('https://i.imgur.com/pFwm9IX.jpg').pipe(createWriteStream(__dirname + '/cache/baucua/cua.jpg'));
        }
        if (!existsSync(__dirname + '/cache/baucua/ca.jpg')) {
            request('https://i.imgur.com/iqp3uDb.jpg').pipe(createWriteStream(__dirname + '/cache/baucua/ca.jpg'));
        }
        if (!existsSync(__dirname + '/cache/baucua/nai.jpg')) {
            request('https://i.imgur.com/z8n3yaq.jpg').pipe(createWriteStream(__dirname + '/cache/baucua/nai.jpg'));
        }
        if (!existsSync(__dirname + '/cache/baucua/baucua.gif')) {
            request('https://i.imgur.com/TdFtFCC.gif').pipe(createWriteStream(__dirname + '/cache/baucua/baucua.gif'));
        }
    };

    async function get(one,two,three) {
        var x1;
            switch (one) {
                case "ga": x1 = "🐓";
                    break;
                case "tom": x1 = '🦞';
                    break;
                case "bau": x1 = '🍐';
                    break;
                case "cua": x1 = '🦀';
                    break;
                case "ca": x1 = '🐳';
                    break;
                case "nai":x1 = '🦌';
            }
        var x2;
            switch (two) {
                case "ga": x2 = "🐓";
                    break;
                case "tom": x2 = '🦞';
                    break;
                case "bau": x2 = '🍐';
                    break;
                case "cua": x2 = '🦀';
                    break;
                case "ca": x2 = '🐳';
                    break;
                case "nai": x2 = '🦌';
            }
        var x3;
            switch (three) {
                case "ga": x3 = "🐓";
                    break;
                case "tom": x3 = '🦞';
                    break;
                case "bau": x3 = '🍐';
                    break;
                case "cua": x3 = '🦀';
                    break;
                case "ca": x3 = '🐳';
                    break;
                case "nai":x3 = '🦌';
            }
        var all = [x1, x2, x3];
    return full = all;
    }
var full = [];
    module.exports.run = async function({ api, event, args, Currencies }) { var out = (msg) => api.sendMessage(msg,event.threadID, event.messageID);
        const slotItems = ["ga", "tom", "bau", "cua", "ca", "nai"];
            const moneyUser = (await Currencies.getData(event.senderID)).money;
                var moneyBet = parseInt(args[1]);
                    if (!args[0] || !isNaN(args[0])) return api.sendMessage({
    body: `=== 『 GAME CƯỢC BẦU CUA 』 ===\n◆━━━━━━━━━━━━━━━━◆\n\n➜ Gõ lệnh: ${global.config.PREFIX}baucua [ bầu/cua/tôm/cá/nai/gà & tiền cược!\n[💵]➜ Tiền cược phải trên: 10000$`,
    attachment: (await require('axios').get(`https://i.imgur.com/YgccybN.jpeg`, {
        responseType: 'stream'
    })).data
}, event.threadID);
                    if (isNaN(moneyBet) || moneyBet <= 0) return api.sendMessage("[💵]➜ Số tiền đặt cược không được để trống hoặc là số tiền âm!", event.threadID, event.messageID);
                if (moneyBet > moneyUser) return api.sendMessage("[💵]➜ Số tiền bạn đặt lớn hơn số dư của bạn!", event.threadID, event.messageID);
            if (moneyBet < 1000) return api.sendMessage("[💵]➜ Số tiền đặt không được dưới: 1000$", event.threadID, event.messageID);
        var number = [], win = false;
    for (let i = 0; i < 3; i++) number[i] = slotItems[Math.floor(Math.random() * slotItems.length)];
        var itemm;
            var icon;
                switch (args[0]) {
                    case "bầu":
                        case "Bầu": itemm = "bau";
                                icon = '🍐';
                            break;
                    case "cua": 
                        case "Cua": itemm = "cua";
                                icon = '🦀';
                            break;
                    case "cá":
                        case "Cá": itemm = "ca";
                                icon = '🐳';
                            break;
                    case "nai":
                        case "Nai": itemm = "nai";
                                icon = '🦌';
                            break;
                    case "gà": 
                        case "Gà": itemm = "ga";
                                icon = '🐓';
                            break;
                    case "tôm":
                        case "Tôm": itemm = "tom";
                                icon = '🦞';
                            break;
                                default: return api.sendMessage({
    body: `[ GAME BẦU CUA CÁ CƯỢC ]\n──────────────────\n➜ Gõ lệnh: ${global.config.PREFIX}baucua [ bầu/cua/tôm/cá/nai/gà & tiền cược!\n[💵]➜ Tiền cược phải trên: 1000$`,
    attachment: (await require('axios').get(`https://i.imgur.com/YgccybN.jpeg`, {
        responseType: 'stream'
    })).data
}, event.threadID);
                }      
                await get(number[0],number[1],number[2]);
    var array = [number[0],number[1],number[2]];
        var listimg = [];
           for (let string of array) {
               listimg.push(createReadStream(__dirname + `/cache/baucua/${string}.jpg`));
           }
        if (array.includes(itemm)) {
            var i = 0;
                if (array[0] == itemm) i+=1;
                    if (array[1] == itemm) i+=1;
                if (array[2] == itemm) i+=1;
            if (i == 1) {
                var mon = parseInt(args[1]) * 1;  
                    await Currencies.increaseMoney(event.senderID, mon); console.log("s1")
                        return api.sendMessage({body:`➜ Kết quả: ${full.join("•")}\n➜ Có 1 ${args[0].toLocaleLowerCase()} ${icon}\n➜ Bạn chọn: ${args[0].toLocaleLowerCase()}\n➜ Bạn đã thắng: +${mon}$\n💰 Số dư hiện tại là: ${[moneyUser + mon]}$`,attachment: listimg},event.threadID, event.messageID);
            }
            else if (i == 2) {
                var mon = parseInt(args[1]) * 2; 
                    await Currencies.increaseMoney(event.senderID, mon); console.log("s2")
                        return api.sendMessage({body:`➜ Kết quả: ${full.join("•")}\n Có 2 ${args[0].toLocaleLowerCase()} ${icon}\n➜ Bạn chọn: ${args[0].toLocaleLowerCase()}\n➜ Bạn đã thắng: +${mon}$\n💰 Số dư hiện tại là: ${[moneyUser + mon]}$`,attachment: listimg},event.threadID, event.messageID);
            }
            else if (i == 3) {
                var mon = parseInt(args[1]) * 3; 
                    await Currencies.increaseMoney(event.senderID, mon); console.log('s3')
                        return api.sendMessage({body:`➜ Kết quả: ${full.join("•")}\n➜ Có 3 ${args[0].toLocaleLowerCase()} ${icon}\n➜ Bạn chọn: ${args[0].toLocaleLowerCase()}\n➜ Bạn đã thắng: +${mon}$\n💰 Số dư hiện tại là: ${[moneyUser + mon]}$`,attachment: listimg},event.threadID, event.messageID);
            }
            else return api.sendMessage("⚡ Lỗi ! Code : XX1N",event.threadID,event.messageID);
        } else  {
            await Currencies.decreaseMoney(event.senderID, parseInt(args[1])); console.log('s4')
            return api.sendMessage({body:`➜ Kết quả: ${full.join("•")}\n➜ Có 0 ${args[0].toLocaleLowerCase()} ${icon}\n➜ Bạn chọn: ${args[0].toLocaleLowerCase()}\n➜ Bạn đã thua: -${args[1]}$\n💰 Số dư hiện tại là: ${[moneyUser -args[1]]}$`,attachment: listimg},event.threadID, event.messageID);
        }
    };