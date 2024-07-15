module.exports.config = {
  name: "كنية",
  Auth: 0,
  KJ: "setName",
  Owner: "Gry KJ",
  Info: "تغيير الكنية لك او لتنمشنه",
  Class: "Group",
  How: "[name]",
};

module.exports.onType = async function({ api, event, args }) {
  const name = args.join(" ");
  if (event.messageReply) {
    const uid = event.messageReply.senderID;
    return api.changeNickname(name, event.threadID, uid);
  };
  const mention = Object.keys(event.mentions)[0];
  if (!mention) return api.changeNickname(`${name}`, event.threadID, event.senderID);
  if (mention[0]) return api.changeNickname(`${name.replace(event.mentions[mention], "")}`, event.threadID, mention);
}