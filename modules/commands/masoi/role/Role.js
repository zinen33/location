const {Data} = require('../constant');
const {DeathType} = require('../enum');
const Gang = require('../gang');
const {Movement} = require('../type');
const {gameConfig} = require('../helper');

module.exports = class Role {
	constructor({
		index,
		world,
		name,
		threadID,
		gang = Gang.Isolate,
		role = this.constructor,
		party = Data[this.constructor.name].party
	} = {}) {
		this.index = index; // Không dùng id để phân biệt, dùng index vì thao tác array nhanh hơn
		this.world = world;
		this.name = name;
		this.threadID = threadID;
		this.died = false;
		this.gang = gang;
		this.resolve = () => {};
		this.role = role;
		this.party = party;
	}

	async onMessage(message, reply) {
		if (!this.resolve.ability) return;
		switch (message.body.toLowerCase()) {
		case 'pass':
			reply('Bạn đã bỏ lượt!');
			this.resolve([null, null]);
			break;
		default:
			try {
				const checkerResult = this.resolve.ability.check(this, message.body);
				this.resolve([message.body, checkerResult]);
			} catch (e) {
				await reply(e.message);
			}
			break;
		}
	}

	request(ability, time = gameConfig.timeout[ability.name] || 30000) {
		return new Promise(resolve => {
			const timeoutID = setTimeout(() => {
				this.sendMessage('Đã hết thời gian!');
				this.resolve([null, null]);
			}, time);

			this.resolve = result => {
				this.resolve = () => {};
				if (result == null) {
					return resolve(new Movement(ability, null, this.index, null, 'real'));
				}
				const [value, checkerResult] = result;
				clearTimeout(timeoutID);
				resolve(
					new Movement(ability, value, this.index, checkerResult, 'real')
				);
			};

			this.resolve.ability = ability;
			this.sendMessage(
				this.world.game.timing({message: ability.question(this), time})
			);
		});
	}

	async sendMessage(message, threadID = this.threadID) {
		await this.world.game.sendMessage(message, threadID);
	}

	format(value, ...formats) {
		for (let index = 0; index < formats.length; index++) {
			if(formats[index] == undefined) continue;
			if (Array.isArray(formats[index])) {
				if (!formats[index].includes(value))
					throw new Error(
						`Vui lòng nhập 1 trong các giá trị sau: ${formats[index].join(
							', '
						)}!`
					);
			} else {
				value = formats[index](this, value);
			}
		}
		return value;
	}

	async nightend(movements, listDeaths) {}

	async onNight() {
		return [];
	}

	async die(death) {
		this.died = true;
		let rep =
			`🙇 Chúng tôi vô cùng thương tiếc báo tin: ${this.name} (𝗯𝗮̣𝗻) ` +
			`đã 𝗵𝗶 𝘀𝗶𝗻𝗵 💀 vào đêm thứ ${
				this.world.history.items.filter(item => item.event == 'night').length
			}!\n`;
		switch (death.type) {
		case DeathType.P2P:
			if (death.killer != death.victim)
				rep += `🌎 𝗡𝗴𝘂𝘆𝗲̂𝗻 𝗻𝗵𝗮̂𝗻 𝗰𝗵𝗲̂́𝘁: Bị ${death.killer.name} (${death.killer.constructor.name}) giết\n`;
			else rep += '🌎 𝗡𝗴𝘂𝘆𝗲̂𝗻 𝗻𝗵𝗮̂𝗻 𝗰𝗵𝗲̂́𝘁: Tự tử';
			break;
		case DeathType.GANG:
			rep += `🌎 𝗡𝗴𝘂𝘆𝗲̂𝗻 𝗻𝗵𝗮̂𝗻 𝗰𝗵𝗲̂́𝘁: Băng đảng ${death.killer.constructor.name} hội đồng oánh chết\n`;
			break;
		case DeathType.LYNCH:
			rep += '🌎 𝗡𝗴𝘂𝘆𝗲̂𝗻 𝗻𝗵𝗮̂𝗻 𝗰𝗵𝗲̂́𝘁: Dân làng treo cổ\n';
			break;
		case DeathType.SIMP:
			rep += `🌎 𝗡𝗴𝘂𝘆𝗲̂𝗻 𝗻𝗵𝗮̂𝗻 𝗰𝗵𝗲̂́𝘁: Yêu đơn phương ${this.waifu.name}\n`;
			break;
		default:
			rep += '🌎 𝗡𝗴𝘂𝘆𝗲̂𝗻 𝗻𝗵𝗮̂𝗻 𝗰𝗵𝗲̂́𝘁: Chưa rõ\n';
		}
		rep += '\n⛔ 𝗟𝗨̛𝗨 𝗬́: KHÔNG ĐƯỢC CHAT KHI BẠN ĐÃ CHẾT (Hãy Ý Thức Để Trò Chơi Diễn Ra Cân Bằng)!\n';
		await this.sendMessage(rep);
	}

	isWin() {
		return false;
	}
};
