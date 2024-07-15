module.exports.config = {
    name: "الطلبات",
    Owner: "Catalizc",
    Auth: 2,
    Info: "طلبات مراسلة البوت",
    Class: "المطور",
    How: "",
    Time: 5
};

module.exports.Reply = async function({ api, event, Reply }) {
    if (String(event.senderID) !== String(Reply.author)) return;
    const { body, threadID, messageID } = event;
    var count = 0;

    if (isNaN(body) && body.indexOf("c") == 0 || body.indexOf("cancel") == 0) {
        const index = (body.slice(1, body.length)).split(/\s+/);
        for (const singleIndex of index) {
            console.log(singleIndex);
            if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > Reply.pending.length) return api.sendMessage(`❯ ${singleIndex} رقم غير صالح`, threadID, messageID);
        }
        return api.sendMessage(`❯ رفض بنجاح`, threadID, messageID);
    }
    else {

        const index = body.split(/\s+/);
        const fs = require("fs");       
        for (const singleIndex of index) {
            if (isNaN(singleIndex) || singleIndex <= 0 || singleIndex > Reply.pending.length) return api.sendMessage(`❯ ${singleIndex}  رقم غير صالح`, threadID, messageID);
            api.unsendMessage(Reply.messageID);
api.changeNickname(`${(!global.config.BOTNAME) ? "Made by Sam" : global.config.BOTNAME}`, Reply.pending[singleIndex - 1].threadID, api.getCurrentUserID());
            api.sendMessage("", event.threadID, () => api.sendMessage({body:` -أنضم لقناة البوت لمزيد من المعلومات عن كيفية أستخدام البوت\n-t.me/lemon_sam  `, attachment: fs.createReadStream(__dirname + "/rankup/trolled.mp3")} ,Reply.pending[singleIndex - 1].threadID));
            count+=1;
            
        }
        return api.sendMessage(`❯ تمت الموافقة بنجاح `, threadID, messageID);
    }
}

module.exports.onType = async function({ api, event, args, permission, Reply }) {
        if (args.join() == "") {api.sendMessage("❯❯ يمكنك استخدام طلبات:\n❯ طلبات المستخدمين: قوائم انتظار المستخدم\n❯ طلبات المجموعات : قائمة انتظار المجموعة\n❯ طلبات الكل: جميع طلبات المراسلة",event.threadID, event.messageID);
    }
        const content = args.slice(1, args.length);   
     switch (args[0]) {
    case "user":
    case "u":
    case "-u":
    case "المستخدمين": {
    const permission = ["100061089512442"];
    if (!permission.includes(event.senderID)) return api.sendMessage("ماعدك صلاحية أستعمال هذا الامر :>", event.threadID, event.messageID);
    const { threadID, messageID } = event;
    const commandName = this.config.name;
    var msg = "", index = 1;
    
    try {
        var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
        var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
    } catch (e) { return api.sendMessage("❯ لا يمكن الحصول على قائمة الانتظار", threadID, messageID) }

      const list = [...spam, ...pending].filter(group => group.isGroup == false);

    for (const single of list) msg += `${index++}/ ${single.name}(${single.threadID})\n`;

    if (list.length != 0) return api.sendMessage(`❯ إجمالي عدد المستخدمين: ${list.length}  \n\n${msg}\n❯  الرد برقم للموافقة`, threadID, (error, info) => {
        global.shelly.Reply.push({
            name: commandName,
            ID: info.messageID,
            author: event.senderID,
            pending: list
        })
    }, messageID);
    else return api.sendMessage("❯ لا يوجد حاليا أي مستخدمين في قائمة الانتظار", threadID, messageID);
}
    case "thread":
    case "-t":
    case "t":
    case "المجموعات": {
   const permission = ["100061089512442"];
    if (!permission.includes(event.senderID)) return api.sendMessage("ماعدك صلاحية أستعمال هذا الامر  :>", event.threadID, event.messageID);
     const { threadID, messageID } = event;
    const commandName = this.config.name;
    var msg = "", index = 1;
    
    try {
        var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
        var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
    } catch (e) { return api.sendMessage("❯ لا يمكن الحصول على قائمة الانتظار", threadID, messageID) }

    const list = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);

    for (const single of list) msg += `${index++}/ ${single.name}(${single.threadID})\n`;

    if (list.length != 0) return api.sendMessage(`❯ العدد الإجمالي للمجموعات : ${list.length}  \n${msg}\n❯ الرد برقم للموافقة !!!`, threadID, (error, info) => {
        global.shelly.Reply.push({
            name: commandName,
            ID: info.messageID,
            author: event.senderID,
            pending: list
        })
    }, messageID);
    else return api.sendMessage("❯لا توجد مجموعات حاليا في قائمة الانتظار ", threadID, messageID);
        }
    case "all":
    case "a":
    case "-a":
    case "الكل": {
    const permission = ["100061089512442"];
    if (!permission.includes(event.senderID)) return api.sendMessage("ماعدك صلاحية أستعمال هذا الامر :>", event.threadID, event.messageID);
     const { threadID, messageID } = event;
    const commandName = this.config.name;
    var msg = "", index = 1;
    
    try {
        var spam = await api.getThreadList(100, null, ["OTHER"]) || [];
        var pending = await api.getThreadList(100, null, ["PENDING"]) || [];
    } catch (e) { return api.sendMessage("❯ لا يمكن الحصول على قائمة الانتظار", threadID, messageID) }

            const listThread = [...spam, ...pending].filter(group => group.isSubscribed && group.isGroup);
        const listUser = [...spam, ...pending].filter(group => group.isGroup == false)
    const list = [...spam, ...pending].filter(group => group.isSubscribed);

    for (const single of list) msg += `${index++}/ ${single.name}(${single.threadID})\n`;

    if (list.length != 0) return api.sendMessage(`❯ إجمالي عدد المستخدمين والمواضيع المطلوب مراجعتها: ${list.length} المستخدم والمواضيع \n${msg}\n❯ قم بالرد على رقم الطلب أدناه للمراجعة!!!`, threadID, (error, info) => {
        global.shelly.Reply.push({
            name: commandName,
            ID: info.messageID,
            author: event.senderID,
            pending: list
        })
    }, messageID);
    else return api.sendMessage("❯ لا يوجد حاليًا أي مستخدمين وسلاسل رسائل في قائمة الانتظار", threadID, messageID);
        }
    }       
}