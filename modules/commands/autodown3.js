let axios = require('axios');
let fs = require('fs');

let is_url = url=>/^http(s|):\/\//.test(url);
let stream_url = (url, type)=>axios.get(url, {
  responseType: 'arraybuffer'
}).then(res=> {
  let path = __dirname+'/cache/'+Date.now()+'.'+type;

  fs.writeFileSync(path, res.data);
  setTimeout(p=>fs.unlinkSync(p), 1000*60, path);

  return fs.createReadStream(path);
});

exports.config = {
  name: 'autodown3',
  version: '0.0.1',
  hasPermssion: 3,
  credits: 'DC-Nam',
  description: '.',
  commandCategory: 'Hệ thống support-bot',
  usages: 'autodown3',
  cooldowns: 3
};
exports.run = function(o) {};
exports.handleEvent = async function(o) {
  try {
    let a = o.event.args[0];
    let send = (msg, callback)=>o.api.sendMessage(msg, o.event.threadID, callback, o.event.messageID);
    let head = app=>`━━━〈 𝗔𝗨𝗧𝗢 𝗗𝗢𝗪𝗡 ${app.toUpperCase()} 〉━━━\n\n`;

    if (!is_url(a))return;
    if (/tiktok\.com/.test(a)) {
      let res = await axios.post(`https://www.tikwm.com/api/`, {
        url: a
      });
      if (res.data.code != 0)throw res;

      let tiktok = res.data.data;
      let attachment = [];

      if (typeof tiktok.images == 'object')for (let image_url of tiktok.images)attachment.push(await stream_url(image_url, 'jpg')); else attachment.push(await stream_url(tiktok.play, 'mp4'));

      send({
        body: `${head('𝗧𝗜𝗞𝗧𝗢𝗞')}➜ Tiêu Đề: ${tiktok.title}\n➜ Lượt Thích: ${tiktok.digg_count}\n➜ Thời Lượng: ${(tiktok.duration)} Giây\n➜ Tác Giả: ${tiktok.author.nickname} (${tiktok.author.unique_id})`,
        attachment,
      });
    } else

      
      if (/facebook\.com\/([a-zA-Z0-9.\/]+)/.test(a)) {
      let res = await axios.get(`https://api.blacksky04.repl.co/fbdownload?url=${a}`);
      send({
        body: `${head('𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞')}➜ Tiêu đề: ${res.data.message}\n➜ User: ${res.data.attachment[0].id}`,
        attachment: await stream_url(res.data.attachment[0].photo_image.uri, 'jpg')
      });

        
    } else
      if (/instagram\.com\/(reel|p)\/\w+/.test(a)) {
      let res = await axios.get(`https://www.nguyenmanh.name.vn/api/igDL?url=${a}&apikey=FI6bX3kC`);
      send({
        body: `${head('𝗜𝗡𝗦𝗧𝗔𝗚𝗥𝗔𝗠')}➜ Tiêu đề: ${res.data.result.title}`,
        attachment: await stream_url(res.data.result.video[0].url, 'mp4')
      });
    } else
      if (/twitter\.com/.test(a)) {
      let res = await axios.get(`https://caochungdat.me/docs/twitter/video?url=${a}`);
      send({
        body: `${head('𝗧𝗪𝗜𝗧𝗧𝗘𝗥')}➜ Tiêu đề: ${res.data.user.description}`,
        attachment: await stream_url(res.data.extended_entities.media[0].video_info.variants[0].url, 'mp4')
      });
    } else
      if (/bilibili\.tv/.test(a)) {
      let res = await axios.get(`https://www.nguyenmanh.name.vn/api/bilibili_tv?url=${a}&apikey=FI6bX3kC`);
      send({
        body: `${head('𝗕𝗜𝗟𝗜𝗕𝗜𝗟𝗜')}\n➜ Độ phân giải: ${res.data.resultplayurl.video[0]}`,
        attachment: await stream_url(res.data.result.playurl.video[0].video_resource.url, 'mp4')
      });
    };
  }catch {};
};