module.exports.config = {

  name: "اوامر",
  KJ: ["Menu", "help", "الاوامر"],
  Auth: 0,
  Hide: true,
  Owner: "Gry Kj",
  Info: "قائمة الاوامر",
  Class: "system",
  How: "[Tên module]",
  Time: 1,

};



module.exports.onType = async function({api , threadsData , usersData , event , sh, Auth, args }) {

  const { cmds } = global.shelly;


  const { threadID, messageID } = event;


  const command = cmds.get((args[0] || "").toLowerCase());

  const prefix = global.funcs.getPrefix(event.threadID);

  if (!command) {
    const arrayInfo = [];
    const page = parseInt(args[0]) || 1;
    const numberOfOnePage = 10;

    let i = 0;
    let msg = "";

    for (var [name, value] of(cmds)) {


      let c = shelly.cmds.get(name);
if (c.config.Hide && c.config.Hide == true || c.config.Auth > Auth) {

} else {

  let me = shelly.cmds.get(name)


  arrayInfo.push(name + ":   " + "  『  " + me.config.Info + "   』");

}
    }

    arrayInfo.sort((a, b) => a.data - b.data);

    const startSlice = numberOfOnePage * page - numberOfOnePage;
    i = startSlice;
    const returnArray = arrayInfo.slice(startSlice, startSlice + numberOfOnePage);

    for (let item of returnArray) msg += `${test(++i)}  ${prefix}${item}\n
    ------------------------------------------\n`;


    const siu = `━━━━━━━━━━━━━━━━━\nقائمة الاوامر \n━━━━━━━━━━━━━━━━━`;
    const text = `\n━━━━━━━━━━━━━━━━━\n🩷🤓رقم الصفحة🤓🩷\n━━━━━━━━━━ (${page}/${Math.ceil(arrayInfo.length/numberOfOnePage)})\nاســـتــخـــدم ${prefix}الأوامـــر مــتــبــوعــة بــرقــم الــصــفــحــة لــرؤيــة الأوامـــر الــمــتــبــقــيــة، بــنــاءً عــلــى اخــتــيــاراتــك واحتــيــاجــاتـــك.\n\nعدد الاوامر هو: ${arrayInfo.length}\nاستمتع ب ${global.config.BOTNAME}\n\n━━━━━━━━━━━━━━━━━\n\n━━━━━━━━━━━━━━━━━\n`;

    return api.sendMessage(siu + "\n\n" + msg + text, threadID, async (error, info) => {
      if (true) {
        await new Promise(resolve => setTimeout(resolve, 300 * 1000));
        return api.unsendMessage(info.messageID);
      } else return;
    }, event.messageID);
  }



      const infos = command;

      const msg = `
⚝ اسم الأمر ⚝⋆˚ ⬷  ☂︎ ${infos.config. name} ☂︎


⚝ الوصف ⚝ ⋆˚ ⬷ ☂︎ ${infos.config.Info || "مافي وصف"} ☂︎


⚝ اسماء اخرى ⚝⋆˚ ⬷  ☂︎ ${infos.config.KJ.join(", ") || "غير متوفر"} ☂︎


⚝ صانعه ⚝ ⋆˚ ⬷ ☂︎ ${infos.config.Owner || "Gry KJ"} ☂︎


⚝ تصنيفه  ⚝ ⋆˚ ⬷ ☂︎ ${infos. config.Class || "أدوات"} ☂︎


⚝ كيفية الاستعمال ⚝ ⋆˚ ⬷ ☂︎ ${infos.config.How || "غير متوفر"} ☂︎
      `
      return sh.reply({ body: msg })


    }








function test(so) {
  const Symms = {
    '1': '⓵',
    '2': '⓶',
    '3': '⓷',
    '4': '⓸',
    '5': '⓹',
    '6': '⓺',
    '7': '⓻',
    '8': '⓼',
    '9': '⓽',
    '0': '⓪' 
    };
if (so > 9)
{
const a = so.toString().split("");
  a.reverse();
let h = "";
for (let i = 0 ; i < a.length ; i++)
{
h += `${Symms[a[i]]}`
}
return h;
}
  return Symms[so];
}