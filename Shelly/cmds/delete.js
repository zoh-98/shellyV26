module.exports.config = {
  name: "احذف",
  Auth: 0,
  KJ: ["حذف", "مسح"],
  Owner: "𝙈𝙧𝙏𝙤𝙢𝙓𝙭𝙓",
  Info: "حذف رسالة البوت",
  Class: "system",
  How: "رد ع رسالة",
  Time: 0
};



module.exports.onType = function({ api, event }) {
  if (event && event.messageReply && event.messageReply?.senderID != api.getCurrentUserID()) return api.sendMessage("كيف يعني بدك اهكر حسابو عشان احذف الرسالة ؟🤨", event.threadID, event.messageID);
  if (!event.messageReply) return api.sendMessage("رد ع وسالة لبدك تحذف", event.threadID, event.messageID);
  return api.unsendMessage(event.messageReply.messageID);
  }