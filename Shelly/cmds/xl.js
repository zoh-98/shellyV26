const axios = require('axios');

const moment = require("moment-timezone");

module.exports = {
  config: {
    name: "اكسل",
    KJ: ["xl"], 
    Owner: "Gry KJ",
    Auth: 0,
    Hide: false,
    Time: 0,
    Info: "رسم  الصور",
    Class: "ثريدز",
  },

  onType: async function ({ event, api, args, sh, usersData, threadsData, text }) {
const black = sh;
          const tat = await usersData.get(event.senderID);
          if (!tat.name || !tat.gender) { await usersData.create(event.senderID) }



          try {
       let prompt = "";
       let aspectRatio = "1";
            let niji = {
              X: 0,
              Y: 0
               };

            const aspectIndex = args.indexOf("--ar");
            if (aspectIndex !== -1 && args.length > aspectIndex + 1) {
                aspectRatio = args[aspectIndex + 1];
                args.splice(aspectIndex, 2); 
            }
            const lower = "low quality, bad quality";
switch(aspectRatio.toString()) {
  case "1":
    niji.X = 1024;
    niji.Y = 1024;
    break;
  case "2":
    niji.X = 1024;
    niji.Y = 720;
    break;
  case "3":
    niji.X = 720;
    niji.Y = 1024;
    break;
  case "4": 
    niji.X = 1024;
    niji.Y = 512;
    break;
  case "5":
    niji.X = 512;
    niji.Y = 1024;
    break;
}

            if (text) {
                prompt = args.join(" ");
            } else {
                black.reply("⚠️ | اكتب شيئا.");
                return;
            }
  const startTime = new Date();         
const pompt = await global.funcs.trgm(prompt, "en");


const options = {
  method: 'POST',
  url: 'https://api.prodia.com/v1/sdxl/generate',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    'X-Prodia-Key': 'd01a7eb8-9f10-4abe-b142-fd5248fb7e88'
  },
  data: {
width: niji.X,
height: niji.Y,
    model: 'animagineXLV3_v30.safetensors [75f2f05b]',
    prompt: pompt,
    negative_prompt: lower,
    steps: 20,
    cfg_scale: 7,
    seed: -1
  }
};
black.react("⚙️");
const nijix = await axios
  .request(options);

async function si(bro) {
    let jobStatus = '';
    while (jobStatus !== 'succeeded') {
        try {
            const yo = await axios.get(`https://api.prodia.com/job/${bro}`);

            jobStatus = yo.data.status;
            if (jobStatus != 'succeeded') {
                await new Promise(resolve => setTimeout(resolve, 3000));
            }
        } catch (error) {
            console.error(error);
        }
    }
 return jobStatus;
}

await si(nijix.data.job);


const genimg = `https://images.prodia.xyz/${nijix.data.job}.png`;

  const endTime = new Date();
         const senderID = event.senderID;
                const userNamefromData = await usersData.getName(senderID);
                const drawingTime = (endTime - startTime) / 1000;

                const currentDate = moment.tz("Africa/Casablanca").format("YYYY-MM-DD");
                const currentTime = moment.tz("Africa/Casablanca").format("h:mm:ss A");

            black.reply({   body: `
❨ تم تنفيذ طلبك بنجاح ⚝ ❩

⚝︙بواسطة -› ${userNamefromData}♣️
⚝︙استغرق -› ${drawingTime} 🖤
⚝︙الوقت -› ${currentTime} 🎩
⚝︙التاريخ -› ${currentDate} 🌚
              `,
                attachment: await global.funcs.str(genimg)
            });  
            await black.react("✔️");
        } catch (error) {
          black.react("❌")
        }
    }
            }