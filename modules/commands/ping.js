module.exports.config = {
	name: "ping",
	version: "0.0.3",
	hasPermssion: 1,
	credits: "Mirai Team",
	description: "tag toàn bộ thành viên",
	commandCategory: "Nhóm",
	usages: "[Text]",
	cooldowns: 10
};

module.exports.run = async function({ api, event, args, Threads }) { 
	try {
		var all = (await Threads.getInfo(event.threadID)).participantIDs;
    all.splice(all.indexOf(api.getCurrentUserID()), 1);
	  all.splice(all.indexOf(event.senderID), 1);
    var hqm = [ 'Bot ngu đã đá đít bạn ra khỏi nhóm', 'Tương tác đi các vợ yêu', 'ò ó o ò o', 'lên tt đi các bé yêu', 'cháy nhà rồi!', 'Tìm ny vuto ditbu'];
		var body = (args.length != 0) ? args.join(" ") : `${hqm[Math.floor(Math.random() * hqm.length)]}`, mentions = [], index = 0;
		
    for (let i = 0; i < all.length; i++) {
		    if (i == body.length) body += body.charAt(body.length - 1);
		    mentions.push({
		  	  tag: body[i],
		  	  id: all[i],
		  	  fromIndex: i - 1
		    });
	    }

		return api.sendMessage({ body: `${body}`, mentions }, event.threadID, event.messageID);

	}
	catch (e) { return console.log(e); }
}