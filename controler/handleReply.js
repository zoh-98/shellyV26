module.exports = async ({api, event , sh , threadsData, usersData, globalData }) => {

  try {

        if (!event.messageReply) return;
        const Reply = global.shelly.Reply;
        const indexOfHandle = Reply.findIndex(e => e.ID == event.messageReply.messageID);

        if (indexOfHandle < 0) return;

        const indexOfMessage = Reply[indexOfHandle];

        const ROM = global.shelly.cmds.get(indexOfMessage.name);

        if (!ROM) return sh.reply("missing Reply function aw9");
         const params = {

         api,
         sh,
         text: event.body, 
         args: event.body.split(" ") ,
         Reply: indexOfMessage,
         event ,
         threadsData,
           
         usersData, 
        
         globalData 

         };

        ROM.Reply(params);

  } catch(e) {

    console.error("handleReply", e)
  }

};