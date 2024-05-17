const configCommand = {
	name: 'autodown4',
	version: '1.1.1',
	hasPermssion: 2,
	credits: 'DC-Nam',
	description: 'Tự động tải xuống khi phát hiện liên kết',
	commandCategory: 'Hệ thống support-bot',
	usages: '[]',
	cooldowns: 3
},
	axios = require('axios'),
	downloader = require('image-downloader'),
	fse = require('fs-extra'),
	toolsFb = {
		getVideoUrl: async (url) => {
			const res = await axios.get('https://apipremium-thanhali.thanhali.repl.co/fbdownload?apikey=ThanhAliVip_1234567890&url=' + encodeURIComponent(url));
			return res.data.data.medias[res.data.data.medias.length - 1].url;
		}
	},
	path = __dirname + '/cache/statusAuto.json';

const https = require("https");
const agent = new https.Agent({
	rejectUnauthorized: false
});

async function streamURL(url, mime) {
	// const dest = `${__dirname}/cache/${Date.now()}.${mime}`;
	const name = global.utils.randomString(5) + '.' + mime;
	// await downloader.image({
	//     url, dest
	// });
	// setTimeout(j => fse.unlinkSync(j), 60 * 1000, dest);
	// return fse.createReadStream(dest);
	const res = await axios({
		url,
		method: 'GET',
		responseType: 'stream'
	});
	res.data.path = name;
	return res.data;
}

function onLoad() {
	if (!fse.existsSync(path)) fse.writeFileSync(path, '{}');
}

async function noprefix(arg) {
	const s = JSON.parse(fse.readFileSync(path));
	if (arg.event.senderID == (global.botID || arg.api.getCurrentUserID())) return;
	if ((typeof s[arg.event.threadID] == 'boolean' && !s[arg.event.threadID])) return;

	const out = (a, b, c, d) => arg.api.sendMessage(a, b ? b : arg.event.threadID, c ? c : null, d ? d : arg.event.messageID),
		arr = arg.event.args || [],
		regEx_tiktok = /(^https:\/\/)((vm|vt|www|v)\.)?(tiktok|douyin)\.com\//,
		regEx_youtube = /(^https:\/\/)((www)\.)?(youtube|youtu)(PP)*\.(com|be)\//,
		regEx_facebook = /(^https:\/\/)(\w+\.)?(facebook|fb)\.(com|watch|reel)\/\w+\/\w?(\/)?/,
		regEx_instagram = /http(s|):\/\/(www\.)?instagram\.com\/(reel|p)\/\w+/,
		regEx_SC = /^(https?:\/\/)?(www.)?(m\.)?soundcloud\.com\/[\w\-\.]+(\/)+[\w\-\.]+/,
		regEx_ZingMp3 = /^(https?:\/\/)?(www.)?(m\.)?(mp3|zing)mp3\.vn\/bai-hat\/[\w\-\.]+\/\w+/;

	for (const el of arr) {
	

		// Auto SoundCloud
		if (regEx_SC.test(el)) {
			const audioStream = await axios.get(`https://apipremium-thanhali.thanhali.repl.co/soundcloud/download?apikey=ThanhAliVip_1234567890&link=${encodeURIComponent(el)}`, {
				responseType: 'stream'
			});
			audioStream.data.path = 'sing.mp3';
			return out({
				attachment: audioStream.data
			});
		}

		// Zingmp3
		if (regEx_ZingMp3.test(el)) {
			const audioStream = await axios.get(`https://apipremium-thanhali.thanhali.repl.co/zingmp3/download?apikey=ThanhAliVip_1234567890&link=${encodeURIComponent(el)}`, {
				responseType: 'stream'
			});
			audioStream.data.path = 'sing.mp3';
			return out({
				attachment: audioStream.data
			});
		}
	}
}


async function reactionMsg(arg) {
	if (arg.event.reaction == '❤') // code
	{
		const out = (a, b, c, d) => arg.api.sendMessage(a, b ? b : arg.event.threadID, c ? c : null, d),
			_ = arg.handleReaction;
		if ('url_audio' in _) {
			let streamFile;
			if (_.agent) {
				const res = await axios({
					url: _.url_audio,
					method: 'GET',
					responseType: 'stream',
					httpsAgent: _.agent
				});
				res.data.path = 'audio.mp3';
				streamFile = res.data;
			}
			else
				streamFile = await streamURL(_.url_audio, 'mp3');
			out({
				body: `➜ Âm thanh từ video`, attachment: streamFile
			}, '', '', _.messageID);
		}
	}
}
function runCommand(arg) {
	const out = (a, b, c, d) => arg.api.sendMessage(a, b ? b : arg.event.threadID, c ? c : null, d ? d : arg.event.messageID);
	const data = JSON.parse(fse.readFileSync(path));
	const s = data[arg.event.threadID] = typeof data[arg.event.threadID] != 'boolean' || !!data[arg.event.threadID] ? false : true;
	fse.writeFileSync(path, JSON.stringify(data, 0, 4));
	out((s ? '➜ Kích hoạt thành công chế độ ' : '➜ Tắt thành công chế độ') + ' ' + configCommand.name);
}

module.exports = {
	config: configCommand,
	onLoad,
	run: runCommand,
	handleEvent: noprefix,
	handleReaction: reactionMsg
};
