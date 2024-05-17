module.exports.config = {
	name: "spam",
	version: "1.0.0",
	hasPermssion: 1,
	credits: "Vũ Minh Nghĩa",
	description: "",
	commandCategory: "Group",
	usages: "",
	cooldowns: 0
};

module.exports.run = async function ({ event, args, api, getText }) {
const delay = (delayInms) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
}
var tip = args.join(" ").split(' | '); 
if (!tip[0]) return api.sendMessage(`số điện thoại | số lần spam\nVD: /spam 0345678910 | 1`,event.threadID,event.messageID);
let solan = tip[1];
if (solan > 10 || delay == 11) return api.sendMessage("Số lần không được quá 10 lần", event.threadID)
  for (i = 0; i < solan; i++) {
	const axios = require('axios');
  //key chỉ có 150 lượt dùng. Inbox https://www.facebook.com/vuminhnghia25?mibextid=ZbWKwL để lấy key	
let delayres = await delay(20000);
    axios.get(`http://Vmnghia.codes/spam?sdt=${encodeURIComponent(tip[0])}&apikey=TNAPIFREE`).then(res => {
     let mess = res.data.MOMO;
     let moca = res.data.MOCA;
     let meta = res.data.META_VN;
     let fpt = res.data.FPTSHOP;
     let tv = res.data.TV360;
     let viettel = res.data.VIETTELL;
     let pay = res.data.VIETTELLPAY;
     let zalo = res.data.ZALOPAY;
     let tienoi = res.data.TIENOI;
     let tamo = res.data.TAMO;
     let lozi = res.data.LOZI;
     let vayno = res.data.VAYNO;
     let vieon = res.data.VIEON;
     let pops = res.data.POPS
     let dong = res.data.DONGPLUS
     return api.sendMessage(`MOMO: ${mess}\nMOCA: ${moca}\nMETA_VN: ${meta}\nFPTSHOP: ${fpt}\nTV360: ${tv}\nVIETTELL: ${viettel}\nVIETTELLPAY: ${pay}\nZALOPAY:${zalo}\nTAMO:${tamo}\nLOZI:${lozi}\nVAYNO:${vayno}\nVIEON:${vieon}\nPOPS:${pops}\nDONGPLUS:${dong}`,event.threadID,event.messageID);
    i++;
	});
}
}