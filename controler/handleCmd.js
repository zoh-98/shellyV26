const strg = require('string-similarity');

const { config } = global;

  module.exports = async ({api, event , sh , threadsData, usersData, globalData }) => {
    try {

      const body = event.body;
      
      if (!body) return;

      var {senderID, threadID} = event;

    const threadData = await threadsData.get(event.threadID);

    const userData = await usersData.get(senderID);

    let adbox = await threadsData.get(threadID, "settings.adbox");


    if (!adbox) {
      await threadsData.set(event.threadID, false, "settings.adbox");
      adbox = await threadsData.get(threadID, "settings.adbox");

    }


    if (!config.AD.includes(senderID) && !config.MAD.includes(senderID) && event.isGroup && !threadData.adminIDs.includes(senderID)) {
      if (adbox === true) {
        return;
      }
    }

    if (!config.AD.includes(senderID) && !config.MAD.includes(senderID)) {
      if (config.onlyme) {
        return;
      }
    }

    const prefix = global.funcs.getPrefix(event.threadID) || config.PREFIX;


    const prefixRegex = new RegExp(`^\\${prefix}\\s*(.*)`);
      
const si = event.body.replace(/ +/g, " ").toLowerCase().split(" ");

      let Cbody = si[0];
      
      

    if (!prefixRegex.test(Cbody)) return;

const command = Cbody.match(prefixRegex)[1].trim().toLowerCase();
      
if (!config.AD.includes(senderID) && !config.MAD.includes(senderID) && userData.banned.status) {
      return sh.reply(`انت محظور من استعمال البوت :
      [${senderID} | ${userData.name}]
      » السبب: ${userData.banned.reason}
» التاريخ: ${userData.banned.date}`);
    }

      if (!config.AD.includes(senderID) && !config.MAD.includes(senderID) && threadData.banned.status) {
      return sh.reply(`الغروب محظور من استعمال البوت :
        [${senderID} | ${threadData.threadName}]
        » السبب: ${threadData.banned.reason}
  » التاريخ: ${threadData.banned.date}`);;
      }
      var permssion = 0;


      if (config.MAD.includes(senderID.toString())) {
        permssion = 2;
      } else if (config.AD.includes(senderID.toString())) {
        permssion = 3;
      } else if (threadData.adminIDs.includes(senderID.toString())) {
        permssion = 1;
      } 
      
      if (global.shelly.cmds.has(command) || global.shelly.KJ.has(command)) {
        
        const DOM = global.shelly.cmds.get(command) || global.shelly.KJ.get(command);




        



        let obj = threadData.data.Cban;
        if (obj && permssion < 1) {
          if (obj.includes(command)) {
            return;
          }
              }

if (DOM.config.Auth > permssion) {
  return sh.reply(`ليس لديك الصلاحية لاستخدام هذا الأمر "${DOM.config.name}" `);
}


const args = body.slice(Cbody.length).trim().split(/ +/);

           const params = {

             threadsData, 


             usersData,


             globalData,

             Auth: permssion,

           api,

           args,

           text: args.join(" "),

           event,

           sh,

           command
        };
        return DOM.onType(params);
      } else {
        const keys = [...global.shelly.cmds.keys()];
        let arr = [];
        let i = 0;
        for (let key of keys)
        {
          i++
          let c = global.shelly.cmds.get(key);

          if (c.config?.Hide == true || c.config.Auth > permssion)

          {
            i = i - 1
          } else {
            let name = c.config.name;
            arr.push(name);
          }
        }
        const bestMatch = strg.findBestMatch(body, arr)
        let word = bestMatch.bestMatch.target;
        return sh.reply(`هذا الامر غير موجود هل تقصد "${word}" او ماذا ؟ 🤓🩷`);

      };

    } catch(e) {

    console.error("handleCmd", e)
  }

  };
