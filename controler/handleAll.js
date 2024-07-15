const strg = require('string-similarity');

const { config } = global;

  module.exports = async ({api, event , sh , threadsData, usersData, globalData}) => {
    try {

      if (!event.body) return;

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
        return sh.react('⚠️');
      }
    }

    if (!config.AD.includes(senderID) && !config.MAD.includes(senderID)) {
      if (config.onlyme) {
        return;
      }
    }



    const body = event.body;



if (!config.AD.includes(senderID) && !config.MAD.includes(senderID) && (userData.banned.status || threadData.banned.status)) {
      return;
    }





           const params = {

             threadsData, 


             usersData,


             globalData,



           api,

           args: body.split(""),

           text: body,

           event,

           sh
};

        for (let event of global.shelly.events) {

          const cmd = global.shelly.cmds.get(event);

          if (cmd) cmd.All(params);
          
        }


    } catch(e) {

    console.error("handleAll", e)
  }


};