const axios = require("axios");
const FormData = require("form-data");

module.exports = {
  config: {
    name: "ارت",
    KJ: ["تحويل", "art"],
    Auth: 0,
    Owner: "عبدالرحمن",
    Info: "تحويل الصور لانمي",
    Class: "",
  },
  onType: async ({ sh: Message, event, api }) => {
    const Mods = funcs;
    if (event.type !== "message_reply" || !["photo", "sticker"].includes(event.messageReply.attachments[0].type)) {
      return Message.reply("رد عا صوره 🙂🚮");
    }

let imageUr = event.messageReply.attachments[0].url;
                  let imageUrl = await Mods.imgbb(imageUr);
  let wid = event.messageReply.attachments[0].width;
let hid = event.messageReply.attachments[0].height;

const mx = 1024;
    const mn = 512;
if (wid > mx || hid > mx) {
  if (wid > hid) {
    hid = Math.round(hid * (mx / wid));
    wid = mx;
  } else {
    wid = Math.round(wid * (mx / hid));
    hid = mx;
  }
}
    if( mn > hid ) {
hid = 512
}
if ( mn > wid ) {
wid = 512
}

    Message.react("🫧");

    try {
    const options = {
      method: 'POST',
      url: 'https://api.prodia.com/v1/sdxl/transform',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        'X-Prodia-Key': 'd01a7eb8-9f10-4abe-b142-fd5248fb7e88'
      },
      data: {
        height: parseInt(hid),
        width: parseInt(wid),
        sampler: 'DPM++ 2M Karras',
        upscale: true,
        seed: -1,
        cfg_scale: 7,
        steps: 30,
        negative_prompt:  "ugly face ,low quality, closed eye",
        denoising_strength: 0.7,
        prompt: `4k`,
        imageUrl: imageUrl,
        model: 'animagineXLV3_v30.safetensors [75f2f05b]',
        style_preset: 'anime'

      }
    };

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

let ims = await Mods.imgd(genimg);


      Message.reply({
        body: "🩷🤓 تفضل حب 🤓🩷",
        attachment: ims
      });

      Message.react("✅");

    } catch(error) {
      Message.send("❌ | حدث خطأ");
      Message.react("😔");
    }
  }
};
