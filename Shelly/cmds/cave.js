module.exports.config = {
  name: "منجم",
  Auth: 0,
  Owner: "𝐊𝐈𝐓𝐄 凧",
  Info: "حصل شوية مال",
  Class: "Make money",
  hello: {
    cooldownTime: 1000000
  }
};

module.exports.lang = {
  "en": {
    "cooldown": "لقد قمت بعملك في",
    "rewarded": "لقد حصلت على: %2$",
    "job1": "منجم",
  }
}

module.exports.onType = async ({ event, api, usersData  }) => {
  const { threadID, messageID, senderID } = event;

  const cooldown = this.config.hello.cooldownTime;
  let data = (await usersData.get(senderID)).data || {};
  if (typeof data !== "undefined" && cooldown - (Date.now() - data.workTime) > 0) {
    var time = cooldown - (Date.now() - data.workTime),
      minutes = Math.floor(time / 20000),
      seconds = ((time % 20000) / 500).toFixed(0);

    return api.sendMessage(`لقد قمت بعملك في المنجم لتجنب الحظر عد بعد : ${minutes} دقيقة و ${seconds} ثانية.`, event.threadID, event.messageID);
  }
  else {
    
    const amount = Math.floor(Math.random() * 10000);
    return api.sendMessage(`لقد حصلت على: ${amount} `, threadID, async () => {
      const money = (await usersData.get(event.senderID)).money;
      await usersData.set(senderID, money + amount, "money");
      data.workTime = Date.now();
      await usersData.set(event.senderID, data, "data");
      return;
    }, messageID);
  }
}