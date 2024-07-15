module.exports = function({api , sh , threadsData, usersData, globalData}) {
  
    const logger = global.loading;
    
    const bannedUsers = global.db.allUserData.filter(e => e.banned.status == true).map(e => e.userID);
    
    
     const bannedThreads = global.db.allThreadData.filter(e => e.banned.status == true).map(e => e.threadID);
  
  
    
    const moment = require("moment-timezone");
  
    return async function({ event }) {
      
      const threadData = await threadsData.get(event.threadID);

      
      if (threadData.banned.status) return;
      
    
      if (global.config.onlyme) return;
      
      
      const timeStart = Date.now();
      
      const time = moment.tz("Africa/Casablanca").format("HH:MM:ss L");
      
      
      const { eventV2 } = global.shelly;
      
      
      const { DeveloperMode } = global.config;
      
      
      var { senderID, threadID } = event;
      
      
      senderID = String(senderID);
      threadID = String(threadID);
      
      
      if (bannedUsers.includes(senderID) || bannedThreads.includes(threadID) || senderID == threadID) return;
      for (const [key, value] of eventV2.entries()) {

        if (value.config.Type.indexOf(event.logMessageType) !== -1) {


          const eventRun = eventV2.get(key);

          try {
            const Nona = {

          api,

          sh,

          event,

          usersData,

          threadsData,

          globalData,

          }

            eventRun.Event(Nona);

            if (DeveloperMode == true)
              logger(`${eventRun.config.name} , threadID: ${threadID}`, '[ Event ]');
          } catch (error) {
            logger("eventError: " + eventRun.config.name, "error");
          }
        }
      }
      return;
    };
  }