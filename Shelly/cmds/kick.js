module.exports.config = {
  name: "طرد",
  Auth: 1,
  Owner: "Mirai Team",
  Info: "قم بإزالة الشخص الذي تريد إزالته من المجموعة عن طريق وضع علامة عليه أو الرد على رسالته",
  Class: "ادمنية الكروبات", 
  How: "[tag]", 
  Time: 0,
};

module.exports.hello = {
  "en": {
    "error": "خطأ! حدث خطأ. الرجاء معاودة المحاولة في وقت لاحق!",
    "needPermssion": "شدا سوي دصعدني ادمن اول !",
    "missingTag": "سوي تاك لواحد او رد عليه"
  }
};

module.exports.onType = async function({ api, event, threadsData }) {
function getText(hi) {
  const mwa = global.shelly.cmds.get("طرد");
  return mwa.hello.en[hi];
};
  var mention;
  if (event.type === 'message_reply') {
    mention = [event.messageReply.senderID];
  } else {
    mention = Object.keys(event.mentions);
  }
  try {
    const threadData = await threadsData.get(event.threadID);
    if (!threadData.adminIDs.includes(api.getCurrentUserID())) return api.sendMessage(getText("needPermssion"), event.threadID, event.messageID);
    if(!mention[0] && !event.messageReply) return api.sendMessage(getText("missingTag"), event.threadID, event.messageID);
    if (event.messageReply) {
      return api.removeUserFromGroup(event.messageReply.senderID ,event.threadID)
    }
    if (!threadData.adminIDs.includes(api.getCurrentUserID())) {
      for (const o in mention) {
        setTimeout(() => {
          api.removeUserFromGroup(mention[o],event.threadID) 
        },3000)
      }
    }
  } catch { return api.sendMessage(getText("error"),event.threadID) }
}