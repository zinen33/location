const Ability = require('../ability');
const {DeathType} = require('../enum');
const Format = require('../format');
const {Death} = require('../type');
const Villager = require('./Villager');

module.exports = class Hunter extends Villager {
	constructor(options) {
		super({
			...options,
			...{}
		});
	}

	async die(death) {
		await super.die(death);
		if (death.type == DeathType.LYNCH)
			await this.sendMessage('Bạn đang bị cả làng treo cổ!');
		else await this.sendMessage('Bạn đã bị giết!');

		const {checkerResult} = await this.request(Ability.Kill);
		if (checkerResult != null) {
			const victim = this.world.items[checkerResult];
			await victim.sendMessage('Bạn đã bị [𝗛𝘂𝗻𝘁𝗲𝗿] bắn chết!');
			await this.world.game.sendMessage(
				'🔫 Có một tiếng súng 𝘃𝗮𝗻𝗴 𝗹𝗲̂𝗻 𝗸𝗵𝗮̆́𝗽 𝗰𝗮̉ 𝗹𝗮̀𝗻𝗴!'
			);
			await victim.die(new Death(this, victim, DeathType.P2P));
		}
	}
};
