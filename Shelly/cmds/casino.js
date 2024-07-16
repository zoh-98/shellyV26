let msg = `استعمال خاطئ
حط رقم بعد الامر لبدك تراهن بيه 

مثلا:

.كازينو 100
`



module.exports.config = {
	name: "كازينو",
	Auth: 0,
	KJ: ["قمر", "رهان"],
	Owner: "GryKJ",
	Info: "كازينو",
	Class: "game-sp",
	usages: ``,
	Time: 5,
};

module.exports.onType = async function({ api, event, args, usersData }) {
            let { threadID, messageID, senderID } = event;
            const slotItems = ["🐙","🦀","🐠"];
			let money = (await usersData.get(event.senderID)).money;
			var coin = args.join(" ");
			if (!coin) return api.sendMessage(msg, threadID, messageID);
			let win = false;
			if (isNaN(coin)|| coin.indexOf("-") !== -1) return api.sendMessage(`ادخال خاطئ\n\nكيف تستعمله \n${global.config.PREFIX}رهان <مبلغ من المال>\n\nمثال:\n${global.config.PREFIX}رهان 50\n\nصنع بواسطة: Gry 凧`, threadID, messageID);
			if (!coin) return api.sendMessage(msg, threadID, messageID);
			if (coin > money) return api.sendMessage(`لا تملك مالا كافيا من فضلك استخدم ${global.config.PREFIX}منجم`, threadID, messageID);
			if (coin < 50) return api.sendMessage(`مبلغ رهانك صغير,  اقل مبلغ هو 50$\n`, threadID, messageID);
			let number = [];
			for (i = 0; i < 3; i++) number[i] = Math.floor(Math.random() * slotItems.length);
			if (number[0] == number[1] && number[1] == number[2]) {
				coin *= 9;
				win = true;
			}
				else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) {
					coin *= 2;
					win = true;
				}
				(win) ? api.sendMessage(`🎰${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}🎰\nلقد ربحت ${coin} دولار.`, threadID, () => usersData.set(senderID, money + coin, "money"), messageID) : api.sendMessage(`🎰${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]}🎰\nلقد خسرت نقودك\n`, threadID, () => usersData.set(senderID, money - coin, "money"), messageID);
}
