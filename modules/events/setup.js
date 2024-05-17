module.exports.config = {
    name: "setup",
    eventType: [""],
    version: "1.0.0",
    credits: "Mirai Team",
    description: "setup auto random join/leave",
    dependencies: {
        "fs-extra": "",
        "path": ""
    }
};

module.exports.onLoad = async function() {
    const { resolve } = global.nodemodule["path"];
    const { existsSync, mkdirSync } = global.nodemodule["fs-extra"];
    const { downloadFile } = global.utils;
    ///////////////join Noti start
  /*
    const pathJoin = resolve(__dirname, "cache/joinMP4/random");
    if (!existsSync(pathJoin)) mkdirSync(pathJoin, { recursive: true });
    if (!existsSync(resolve(__dirname, 'cache/joinMP4/random', 'join.mp4'))) await downloadFile("https://github.com/RqzaX040/KhoMusic/raw/main/join.mp4", resolve(__dirname, 'cache/joinMP4/random', 'join.mp4'));
    if (!existsSync(resolve(__dirname, 'cache/joinMP4/random', 'join1.mp4'))) await downloadFile("https://github.com/RqzaX040/KhoMusic/raw/main/join1.mp4", resolve(__dirname, 'cache/joinMP4/random', 'join1.mp4'));
    if (!existsSync(resolve(__dirname, 'cache/joinMP4/random', 'join11.mp4'))) await downloadFile("https://github.com/RqzaX040/KhoMusic/raw/main/join11.mp4", resolve(__dirname, 'cache/joinMP4/random', 'join11.mp4'));
    if (!existsSync(resolve(__dirname, 'cache/joinMP4/random', 'join6.mp4'))) await downloadFile("https://github.com/RqzaX040/KhoMusic/raw/main/join6.mp4", resolve(__dirname, 'cache/joinMP4/random', 'join6.mp4'));
    if (!existsSync(resolve(__dirname, 'cache/joinMP4/random', 'join2.mp4'))) await downloadFile("https://github.com/RqzaX040/KhoMusic/raw/main/join2.mp4", resolve(__dirname, 'cache/joinMP4/random', 'join2.mp4'));
    if (!existsSync(resolve(__dirname, 'cache/joinMP4/random', 'join7.mp4'))) await downloadFile("https://github.com/RqzaX040/KhoMusic/raw/main/join7.mp4", resolve(__dirname, 'cache/joinMP4/random', 'join7.mp4'));
   if (!existsSync(resolve(__dirname, 'cache/joinMP4/random', 'join4.mp4'))) await downloadFile("https://github.com/RqzaX040/KhoMusic/raw/main/join4.mp4", resolve(__dirname, 'cache/joinMP4/random', 'join4.mp4'));
   if (!existsSync(resolve(__dirname, 'cache/joinMP4/random', 'join5.mp4'))) await downloadFile("https://github.com/RqzaX040/KhoMusic/raw/main/join5.mp4", resolve(__dirname, 'cache/joinMP4/random', 'join5.mp4'));
   if (!existsSync(resolve(__dirname, 'cache/joinMP4/random', 'join12.mp4'))) await downloadFile("https://github.com/RqzaX040/KhoMusic/raw/main/join12.mp4", resolve(__dirname, 'cache/joinMP4/random', 'join12.mp4'));
   if (!existsSync(resolve(__dirname, 'cache/joinMP4/random', 'join13.mp4'))) await downloadFile("https://github.com/RqzaX040/KhoMusic/raw/main/join13.mp4", resolve(__dirname, 'cache/joinMP4/random', 'join13.mp4'));
   if (!existsSync(resolve(__dirname, 'cache/joinMP4/random', 'join14.mp4'))) await downloadFile("https://github.com/RqzaX040/KhoMusic/raw/main/join14.mp4", resolve(__dirname, 'cache/joinMP4/random', 'join14.mp4'));
   if (!existsSync(resolve(__dirname, 'cache/joinMP4/random', 'join17-Hutao.mp4'))) await downloadFile("https://github.com/RqzaX040/KhoMusic/raw/main/join17-Hutao.mp4", resolve(__dirname, 'cache/joinMP4/random', 'join17-Hutao.mp4')); */
    ///////////////join Noti end

    ///////////////leave Noti start
    // const pathLeave = resolve(__dirname, "cache/leaveMP4/random");
    // if (!existsSync(pathLeave)) mkdirSync(pathLeave, { recursive: true });
    // if (!existsSync(resolve(__dirname, 'cache/leaveMP4/random', 'out.mp4'))) await downloadFile("https://github.com/RqzaX040/KhoMusic/raw/main/out.mp4", resolve(__dirname, 'cache/leaveMP4/random', 'out.mp4'));
    // if (!existsSync(resolve(__dirname, 'cache/leaveMP4/random', 'out2.mp4'))) await downloadFile("https://github.com/RqzaX040/KhoMusic/raw/main/out2.mp4", resolve(__dirname, 'cache/leaveMP4/random', 'out2.mp4'));
    // if (!existsSync(resolve(__dirname, 'cache/leaveMP4/random', 'out1.mp4'))) await downloadFile("https://github.com/RqzaX040/KhoMusic/raw/main/out1.mp4", resolve(__dirname, 'cache/leaveMP4/random', 'out1.mp4'));
    // if (!existsSync(resolve(__dirname, 'cache/leaveMP4/random', 'out5.mp4'))) await downloadFile("https://github.com/RqzaX040/KhoMusic/raw/main/out5.mp4", resolve(__dirname, 'cache/leaveMP4/random', 'out5.mp4'));
    // if (!existsSync(resolve(__dirname, 'cache/leaveMP4/random', 'out6.mp4'))) await downloadFile("https://github.com/RqzaX040/KhoMusic/raw/main/out6.mp4", resolve(__dirname, 'cache/leaveMP4/random', 'out6.mp4'));
    //  if (!existsSync(resolve(__dirname, 'cache/leaveMP4/random', 'out7.mp4'))) await downloadFile("https://github.com/RqzaX040/KhoMusic/raw/main/out7.mp4", resolve(__dirname, 'cache/leaveMP4/random', 'out7.mp4'));
    //  if (!existsSync(resolve(__dirname, 'cache/leaveMP4/random', 'out8.mp4'))) await downloadFile("https://github.com/RqzaX040/KhoMusic/raw/main/out8.mp4", resolve(__dirname, 'cache/leaveMP4/random', 'out8.mp4'));
    // if (!existsSync(resolve(__dirname, 'cache/leaveMP4/random', 'out9.mp4'))) await downloadFile("https://github.com/RqzaX040/KhoMusic/raw/main/out9.mp4", resolve(__dirname, 'cache/leaveMP4/random', 'out9.mp4'));
    // if (!existsSync(resolve(__dirname, 'cache/leaveMP4/random', 'out10.mp4'))) await downloadFile("https://github.com/RqzaX040/KhoMusic/raw/main/out10.mp4", resolve(__dirname, 'cache/leaveMP4/random', 'out10.mp4'));
    // if (!existsSync(resolve(__dirname, 'cache/leaveMP4/random', 'out11.mp4'))) await downloadFile("https://github.com/RqzaX040/KhoMusic/raw/main/out11.mp4", resolve(__dirname, 'cache/leaveMP4/random', 'out11.mp4'));
    // if (!existsSync(resolve(__dirname, 'cache/leaveMP4/random', 'out14.mp4'))) await downloadFile("https://github.com/RqzaX040/KhoMusic/raw/main/out14.mp4", resolve(__dirname, 'cache/leaveMP4/random', 'out14.mp4'));
    ///////////////leave Noti end

    return;
}

module.exports.run = async function({}) {}