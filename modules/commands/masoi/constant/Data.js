const {Party} = require('../enum');
/* {
	score: ,
	party: Party.,
	description: '',
	advice: ''
} */
//new Diseased, Mayor, Minion
module.exports = {
	Apprentice: {
		score: +3,
		party: Party.VILLAGER,
		description: 'Apprentice trở thành Goodseer nếu Goodseer chết',
		advice: 'Cố gắng 𝗴𝗶𝗲̂́𝘁 hết phe Sói',
		image: __dirname + "/image/Apprentice.png"
	},
	Diseased: {
		score: +3,
		party: Party.VILLAGER,
		description: 'Nếu 𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗯𝗲̣̂𝗻𝗵 bị 𝗦𝗼́𝗶 cắn, thì 𝗦𝗼́𝗶 sẽ không thể cắn người nào vào đêm tiếp theo do bị bệnh.',
		advice: 'Hi sinh cho 𝗦𝗼́𝗶 cắn để kìm hãm sự hung bạo của lũ 𝗦𝗼́𝗶',
		image: __dirname + "/image/Diseased.png"
	},
	Pacifist: {
		score: -1,
		party: Party.VILLAGER,
		description: '𝗡𝗴𝘂̛𝗼̛̀𝗶 𝗬𝗲̂𝘂 𝗵𝗼̀𝗮 𝗯𝗶̀𝗻𝗵 luôn vote cho người chơi được sống.',
		advice: 'Hãy tin vào bản thân và vote cứu người',
		image: __dirname + "/image/Pacifist.png"
	},
	Mayor: {
		score: +2,
		party: Party.VILLAGER,
		description: 'Phiếu biểu quyết của 𝗧𝗵𝗶̣ 𝘁𝗿𝘂̛𝗼̛̀𝗻𝗴 được tính là 2 phiếu khi biểu quyết treo cổ.',
		advice: 'Suy nghĩ thật kĩ trước khi vote',
		image: __dirname + "/image/Mayor.png"
	},
	Minion: {
		score: +6,
		party: Party.WEREWOLF,
		description: '𝗣𝗵𝗮̉𝗻 𝗯𝗼̣̂𝗶 thức dậy cùng Sói và biết Sói là ai. Tham gia cùng Sói để giết Dân làng. Tuy nhiên Tiên tri khi soi vào Phản bội thì vẫn ra dân làng.',
		advice: 'Cố gắng giết hết dân làng',
		image: __dirname + "/image/Minion.png"
	},
	Bodyguard: {
		score: +3,
		party: Party.VILLAGER,
		description:
			'Mỗi đêm, 𝗕𝗮̉𝗼 𝗩𝗲̣̂ sẽ chọn một người bất kì để bảo vệ, nếu người đó bị Sói cắn, sẽ không bị chết vào sáng hôm sau',
		advice: 'Cố gắng quan sát để cứu được người bị hại',
		image: __dirname + "/image/Bodyguard.png"
	},
	Cupid: {
		score: -3,
		party: Party.VILLAGER,
		description:
			'𝗧𝗵𝗮̂̀𝗻 𝗧𝗶̀𝗻𝗵 𝗬𝗲̂𝘂 thức dậy đêm đầu và chọn 2 người trở thành cặp đôi của nhau và sẽ biết người kia chức năng là gì. Nếu 1 người chết đi, người kia sẽ chết ngay lập tức',
		advice: '(Không có)',
		image: __dirname + "/image/Cupid.png"
	},
	Evilseer: {
		score: -6,
		party: Party.WEREWOLF,
		description:
			'Mỗi đêm, 𝗔́𝗰 𝗠𝗮 sẽ chọn 1 người chơi để xem vai trò và trở thành 𝗦𝗼́𝗶 khi không còn một con sói nào',
		advice: 'Cố gắng quan sát để tìm ra những kẻ quan trọng',
		image: __dirname + "/image/Evilseer.png"
	},
	Fruitbrute: {
		score: -3,
		party: Party.WEREWOLF,
		description:
			'Hằng đêm, thức dậy cùng những con 𝗦𝗼́𝗶 khác. Nếu bạn là con 𝗦𝗼́𝗶 cuối cùng còn sống, bạn không thể chọn người chơi nào để ăn thịt',
		advice: 'Cố gắng giết hết dân làng',
		image: __dirname + "/image/Fruitbrute.png"
	},
	Goodseer: {
		score: +7,
		party: Party.VILLAGER,
		description: 'Mỗi đêm, 𝗡𝗵𝗮̀ 𝘁𝗶𝗲̂𝗻 𝘁𝗿𝗶 sẽ chọn 1 người chơi để đoán phe',
		advice:
			'Cố gắng quan sát để tìm ra sói trong đêm, ban ngày cố gắng thuyết phục mọi người',
		image: __dirname + "/image/Goodseer.png"
	},
	Hunter: {
		score: +3,
		party: Party.VILLAGER,
		description:
			'Nếu 𝗧𝗵𝗼̛̣ 𝗦𝗮̆𝗻 chết bởi bất kì lí do gì, hắn vẫn có thể bắn 1 người chơi khác',
		advice: 'Chăm chú tìm ra Sói để bắn',
		image: __dirname + "/image/Hunter.png"
	},
	Investigator: {
		score: +7,
		party: Party.VILLAGER,
		description:
			'Mỗi đêm, 𝗧𝗵𝗮́𝗺 𝗧𝘂̛̉ sẽ chọn 3 người và sẽ được cho biết rằng có ít nhất 1 sói trong 3 người đó!',
		advice: 'Đây là vai trò 𝗿𝗮̂́𝘁 𝗺𝗮̣𝗻𝗵, hãy tận dụng nó!',
		image: __dirname + "/image/Investigator.png"
	},
	Lycan: {
		score: -1,
		party: Party.VILLAGER,
		description:
			'𝗟𝘆𝗰𝗮𝗻 mang trong mình dòng máu của loài sói và được xem như là Sói nếu như bị Goodseer soi mặc dù không phải',
		advice: 'Dễ bị làng hiểu lầm, hãy giải thích họ rõ ràng',
		image: __dirname + "/image/Lycan.png"
	},
	Oldman: {
		score: 0,
		party: Party.VILLAGER,
		description:
			'𝗢𝗹𝗱𝗺𝗮𝗻 sẽ chết vào đêm X (X = số lượng sói hiện tại trong game +1)',
		advice: '(Không có)',
		image: __dirname + "/image/Oldman.png"
	},
	Tanner: {
		score: +1,
		party: Party.NEUTRAL,
		description: '𝗖𝗵𝗮́𝗻 Đ𝗼̛̀𝗶 chỉ thắng khi anh ta bị treo cổ',
		advice: 'Hãy bị treo cổ :D',
		image: __dirname + "/image/Tanner.png"
	},
	Villager: {
		score: +1,
		party: Party.VILLAGER,
		description:
			'𝗗𝗮̂𝗻 𝗹𝗮̀𝗻𝗴 cùng với những người có chức năng tìm cách lập luận và suy đoán ra đâu là Sói đang ẩn mình dưới lớp người',
		advice:
			'Đừng để vai trò dân làng của bạn trở nên vô ích, bạn có thể treo cổ Sói mà!',
		image: __dirname + "/image/Villager.png"
	},
	Werewolf: {
		score: -6,
		party: Party.WEREWOLF,
		description:
			'Sói sẽ được biết những con khác vào đêm đầu tiên. Mỗi đêm sau đêm đầu, Sói phải thống nhất 1 nạn nhân để giết',
		advice: 'Cố gắng giết hết phe Dân Làng',
		image: __dirname + "/image/Werewolf.png"
	},
	Witch: {
		score: +4,
		party: Party.VILLAGER,
		description:
			'𝗣𝗵𝘂̀ 𝗧𝗵𝘂̉𝘆 có 2 chức năng đó là chọn 1 người sắp chết để cứu sống và giết chết 1 người mà Phù Thủy muốn',
		advice: 'Có quyền năng trong tay nên cần sử dụng khôn ngoan nhất có thể',
		image: __dirname + "/image/Witch.png"
	}
};
