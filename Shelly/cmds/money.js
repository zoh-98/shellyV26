const Black = {
    name: "رصيدي",
    Auth: 0,
    Owner: "عبدالرحمن",
    Info: "شوف كم فلوس عندك",
    Class: "ثريدز",
  
  };
  
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
module.exports = {
  config: Black,
  onType: async function({ api, event, args, sh: black, usersData }) {
    const Mods = funcs;
  const tat = await usersData.get(event.senderID);
          if (!tat.name || !tat.gender) { await usersData.create(event.senderID) }

const name = await usersData.getName(event.senderID);
const data = await usersData.get(event.senderID)
const gender = {
1: "انثى",
2 : "ذكر",
3:"🤡🏳️‍🌈",
4:"🤡🏳️‍🌈" ,
5:"🤡 🏳️‍🌈" ,
6: "🤡🏳️‍🌈",
}
 black.reply(`⋆˚ مرحبا 𓆩⚝𓆪 ${name} 𓆩⚝𓆪`, async (err, hi) => { const { messageID} = hi;
await delay(1500);
api.editMessage(`⋆˚ مرحبا 𓆩⚝𓆪 ${name} 𓆩⚝𓆪


⋆˚ ┊ ┊ ايدي تبعك┊ ┊ ⋆˚ ⁭ :
      
          ${event.senderID}`, messageID)
await delay(1500)
api.editMessage(`⋆˚ مرحبا 𓆩⚝𓆪 ${name} 𓆩⚝𓆪


⋆˚ ┊ ┊ ايدي تبعك┊ ┊ ⋆˚ :
     
          ${event.senderID}


⋆˚ ┊ ┊ فلوسك┊ ┊ ⋆˚ : انتظر... 


⋆˚ ┊ ┊ جنسك┊ ┊ ⋆˚ : انتظر... 
`, messageID)
await delay(1500)
api.editMessage(`⋆˚ مرحبا 𓆩⚝𓆪 ${name} 𓆩⚝𓆪


⋆˚ ┊ ┊ ايدي تبعك┊ ┊ ⋆˚  :  
     
          ${event.senderID}


⋆˚ ┊ ┊ فلوسك┊ ┊ ⋆˚ : ${data.money}


⋆˚ ┊ ┊ جنسك ┊ ┊ ⋆˚ : ${gender[data.gender]}`, messageID)
})
}
   };
