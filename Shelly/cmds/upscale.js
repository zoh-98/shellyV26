const axios = require("axios")
const fs = require('fs');
const sizeOf = require('image-size');
const FormData = require('form-data');
const path = require('path');


module.exports = {
  config: {
  name: "جوده",
  KJ: ["جودة", "توضيح"],
  Auth: 0,
  Owner: "عبدالرحمن",
  Info: "توضيح صورك",
  },
  onType: async ({ sh: Message, event, api, args }) => {
    
      
 if (event.type !== "message_reply" || !["photo", "sticker"].includes(event.messageReply.attachments[0].type)) {
        return Message.reply("رد عا صوره 🙂🚮");
      }
   let arg = args[0];
   if(!arg) {
    arg = 4
   }
   if(isNaN(arg)) return Message.reply("رقم بعد كلمه توضيح من 4 ل 8");
 if(event.senderID != global.config.AD[0]) {
   if(arg > 8 ) return Message.reply("مفيش اكبر من 8 يااا بشر ");
   if(arg < 4 ) return Message.reply("ليه اصغر من 4");
 }
  Message.reply("انتظر شوي 🫧")
try {
function grn(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
 let none = "None";
 let ani = "False";
 if( event.senderID == global.config.AD[0] && args[1] == "hg") {
  none = "High";
 }
 if( event.senderID == global.config.AD[0] && args[1] == "an") {
  ani = "True";
 }
const ggr = grn(1000000, 999292220822);
const apiUrl = 'https://api.upscalepics.com/upscale-to-size';
const imageUrl = event.messageReply.attachments[0].url

let ress = await axios.get(imageUrl, { responseType: 'arraybuffer' })
  
    const buffer = Buffer.from(ress.data);

    const dimensions = sizeOf(buffer);
let xton = parseInt(arg);
    const formData = new FormData();
    formData.append('image_file', buffer, {
      filename: 'image.jpg',
      contentType: 'image/jpg',
    });
    formData.append('name', ggr);
    formData.append('desiredHeight', dimensions.height * xton);
    formData.append('desiredWidth', dimensions.width * xton);
    formData.append('outputFormat', 'png');
    formData.append('compressionLevel', none);
    formData.append('anime', ani);

   const res = await axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': `multipart/form-data`,
        'Accept': 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'Accept-Language': 'en-US,en;q=0.9',
        'Origin': 'https://upscalepics.com',
        'Referer': 'https://upscalepics.com/',
        'Sec-Ch-Ua': '"Chromium";v="122", "Not(A:Brand";v="24", "Google Chrome";v="122"',
        'Sec-Ch-Ua-Mobile': '?0',
        'Sec-Ch-Ua-Platform': '"Windows"',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-site',
        'Timezone': 'Africa/Cairo',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      },
    })
      
        


const resss = await axios.get(res.data.bgRemoved, {responseType:"stream"});

const impath =__dirname + "/cache/ccuy.png";
const writer = fs.createWriteStream(impath);
resss.data.pipe(writer);
writer.on("finish", () => {
api.sendMessage({
 body: "♡◄∘ تفضل عزيزي ∘►♡",
 attachment : fs.createReadStream(impath)
              }, event.threadID, event.messageID )})
  
  
  
} catch(error) {
  Message.send("❌ | حدث خطأ")
  console.log(error)
  
}
  
  },
};
