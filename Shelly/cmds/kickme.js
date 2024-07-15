module.exports.config = {
name: "اطردني",
Auth: 0,
Owner: "D-Jukie",
Info: "يطردك من المجموعة",
Class: "اشياء",
How: "  اذا انت ادمن ومتريد الامر يشتغل ببساطه نزل البوت من الادمن",
Time: 3
}; 

module.exports.onType = async function({ api, event, args }) {
var info = await api.getThreadInfo(event.threadID);
if (!info.adminIDs.some(item => item.id == api.getCurrentUserID())) return api.sendMessage('يحتاج البوت إلى أن يكون مسؤول في المجموعة (•﹏•) ', event.threadID, event.messageID);
{

api.removeUserFromGroup(event.senderID, event.threadID)
}
api.sendMessage(`تم حياتي يلا ادعبل`, event.threadID);
}