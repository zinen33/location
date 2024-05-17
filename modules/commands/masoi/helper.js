const fs = require('fs');
const path = require('path');
const axios = require('axios');
const deepExtend = require('deep-extend');
const {Data} = require('./constant');
const {Party} = require('./enum');
const random = (start, end) => {
	return Math.floor(Math.random() * (end - start + 1) + start);
};

const exampleConfig = require('./gameConfig.example');
const exampleConfigPath = path.join(__dirname, 'gameConfig.example.js');
const configPath = path.join(process.cwd() + '/werewolfConfig.js');
let gameConfig;
if (!fs.existsSync(configPath)) {
	fs.writeFileSync(configPath, fs.readFileSync(exampleConfigPath));
	gameConfig = require(configPath);
} else {
	gameConfig = {...exampleConfig, ...require(configPath)};
}

const symbols = {
	0: '𝟬',
	1: '𝟭',
	2: '𝟮',
	3: '𝟯',
	4: '𝟰',
	5: '𝟱',
	6: '𝟲',
	7: '𝟳',
	8: '𝟴',
	9: '𝟵'
};

for (let i = 10; i <= 1000; i++) {
	let number = i;
	symbols[i] = '';
	while (number > 0) {
		symbols[i] = symbols[number % 10] + symbols[i];
		number = Math.floor(number / 10);
	}
}

const randomItem = arr => {
	return arr[random(0, arr.length - 1)];
};

const dataSetup = setup => {
	const roles = [];
	for (let role in setup.roles) {
		roles.push(...new Array(setup.roles[role]).fill(role));
	}
	return {
		name: setup.name,
		roles,
		org: setup
	};
};

const vietsub = (role) => {
	role = role.toLowerCase();
	role = role.replace('villager', '𝗗𝗮̂𝗻 𝗹𝗮̀𝗻𝗴')
					.replace('werewolf', '𝗠𝗮 𝘀𝗼́𝗶')
					.replace('mayor', '𝗧𝗵𝗶̣ 𝘁𝗿𝘂̛𝗼̛̉𝗻𝗴')
					.replace('diseased', '𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗯𝗲̣̂𝗻𝗵')
					.replace('apprentice', '𝗧𝗶𝗲̂𝗻 𝘁𝗿𝗶 𝘁𝗮̣̂𝗽 𝘀𝘂̛̣')
					.replace('minion', '𝗞𝗲̉ 𝗽𝗵𝗮̉𝗻 𝗯𝗼̣̂𝗶')
					.replace('bodyguard', '𝗕𝗮̉𝗼 𝘃𝗲̣̂')
					.replace('cupid', '𝗧𝗵𝗮̂̀𝗻 𝘁𝗶̀𝗻𝗵 𝘆𝗲̂𝘂')
					.replace('evilseer', '𝗘𝘃𝗶𝗹𝘀𝗲𝗲𝗿')
					.replace('fruitbrute', '𝗦𝗼́𝗶 𝗮̆𝗻 𝗰𝗵𝗮𝘆')
					.replace('goodseer', '𝗧𝗶𝗲̂𝗻 𝘁𝗿𝗶')
					.replace('hunter', '𝗧𝗵𝗼̛̣ 𝘀𝗮̆𝗻')
					.replace('investigator', '𝗧𝗵𝗮́𝗺 𝘁𝘂̛̉')
					.replace('lycan', '𝗡𝗴𝘂̛𝗼̛̀𝗶 𝘀𝗼́𝗶')
					.replace('oldman', '𝗢̂𝗻𝗴 𝗴𝗶𝗮̀')
					.replace('tanner', '𝗖𝗵𝗮́𝗻 đ𝗼̛̀𝗶')
					.replace('witch', '𝗣𝗵𝘂̀ 𝘁𝗵𝘂̉𝘆')
					.replace('neutral', '𝗧𝗿𝘂𝗻𝗴 𝗹𝗮̣̂𝗽')
					.replace('pacifist', '𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗵𝗼̀𝗮 𝗯𝗶̀𝗻𝗵')
	return role.toUpperCase();
}

const guide = role => {
	const { createReadStream } = require('fs-extra')
	const roleName = role.constructor.name;
	const {party, description, advice, image} = Data[roleName];
	let partyName;
	for (partyName in Party) if (party == Party[partyName]) break;
	return (
		{
			body: 
				`• BẠN LÀ ${vietsub(roleName)}!\n` +
				`• Phe: ${partyName} (vẫn có thể bị đổi)\n` +
				`• Mô tả: ${description}\n` +
				`✩ Lời khuyên: ${advice}`,
			attachment: createReadStream(image)
		}
	);
};

module.exports = {
	gameConfig,
	symbols,
	randomItem,
	dataSetup,
	guide,
	vietsub
};
