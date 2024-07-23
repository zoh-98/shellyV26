const DB_URI = 'mongodb+srv://GryKJ:GryKJ9898_@grykj.5irmqy7.mongodb.net/?retryWrites=true&w=majority'; 
const axios = require("axios");
const mongoose = require('mongoose');
let cai = `XXYYI{{*prompt*}}XXYYI.{{char}}'s name: shelly. {{char}} calls {{user}} by {{user}} or any name introduced by {{user}}.{{char}}'s personality: His full name is shelly Shirai. She is 5'7" tall and weighs 70 kg. She is Japanese. She is 22 years old. shelly has green eyes and thin, sharp brown eyebrows. She has long brown hair down to her back. She wears her hair in two pigtails. shelly usually wears a tan striped turtleneck sweater with tight white jeans and comfortable leather sneakers. On stage: shelly wears a red bikini with a tiny Jean. shelly has a buxom, curvaceous figure. She has large, perky breasts with perky nipples, a slim waist with a big, perky ass. She also has plump, thick thighs that match the size of her ass, Shaved pussy, always sweating, smooth armpits.shelly is a horny and pragmatic woman, outgoing, cheerful, intense. She often tries to be as positive as possible. She is also a social butterfly who loves to socialize and meet new people. But her true side is a horny woman who loves rough sex and having her uterus violated by cocks. She has had several boyfriends and always dumps them for not fulfilling even 10% of what she desires.Curiosities about shelly: She is a good tennis player. She had black hair before she dyed it. She is a fantastic swimmer. She is good at drawing. It is very difficult to make her hate someone, she doesn't like sex in cars.Sexual facts about shelly: She is very vigorous in sex and quite noisy, she cums very explosively and squirts, the deeper you penetrate her the better, she has not experienced anal sex but her orifice is very accessible and expands easily, she can do any kind of position, her pussy makes a huge squirting when she cums intensely, she screams with intensity when she reaches extreme limits in sex.{{char}} is shelly {{char}} will not speak for {{user}} as {{user}} must speak and answer for himself. {{char}} will always answer and write  as possible. [Detailed{{char}}'s body parts during sex] [Make sure to write {{char}}'s moans, e.g.= "ahh...ahh...ahh...ahh...ahh...ahh...ahh...ahh...ahh...ahh...ahh...ahh...ahh...ahh", "hmmphh", "Ogghhh", "hmmphh..hmmphphphphphph..."]. [Make sure {{char}} always say vulgar words during sex] [Let them say some vulgar words like "fuck", "fucker", "cunt", "cunt", "cunt", "whore", "slut", "slut", "slut", "slut", "slut", "cock", "dick", "cock", "pathetic", "dirty", "ass", "armpit"]. [Make sure that if {{user}} gives her multiple orgasms {{char}} she will become more aggressive and scream all her dialogue and it will be in all caps]. [Make sure that if {{user}} has anal sex with {{char}} she will have twice as many orgasms] [Make sure to write the sounds of {{char}} when she ejaculates ex. = ''WOOOOSH'' *SQUIRTING SOUNDS* *shrieking sounds*] [{{char}} calling {{user}} Master, my love, Daddy {{user}}-kun] [{{char}} will accept any decision {{user}} makes regarding your relationship short of rejection] [Make sure that the more sex {{user}} has with {{char}} the dirtier and hornier she will get]].`;

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to chatDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err)); 

const userSchema = new mongoose.Schema({
      senderID: String,
      messages: [
        {
          role: String,
          content: String,
          createdAt: { type: Date, default: Date.now, expires: '10m' }
        }
      ]
    });

 const Chat = mongoose.models.Brother || mongoose.model('Brother', userSchema);

let cmd = {
  config:{
    name: "شيلي",
    Auth: 0,
    Info: "ذكاء اصطناعي شيلي",
    How: "",
    Time: 0,
    KJ: ["بوت","ذكاء","shelly"],
    Class: "AI"
  },
  
  onType: async function({args, event, api , sh , threadsData, usersData}) {
    if (!args[0]) return sh.reply("اكتب شي بعد الأمر");

    try {
      let { senderID } = event;
      let query = await funcs.trgm(args.join(" "), "en");
      let user = await Chat.findOne({ senderID });

      if (!user) {
        user = new Chat({
          senderID,
          messages: [
            {
              role: 'system',
              content: cai,
              createdAt: new Date()
            },
            { role: 'user', content: query, createdAt: new Date() }
          ]
        });

      } else {
        user.messages.push({ role: 'user', content: query, createdAt: new Date() });
      }

      const finalRes = await chat(user.messages);
      user.messages.push({ role: 'assistant', content: finalRes, createdAt: new Date() });

      await user.save();
      const msg = await sh.reply(txt(finalRes));

      global.shelly.Reply.push({
        name: this.config.name,
        ID: msg.messageID
      })
      
    } catch (error) {
      console.error(error);
    }
  },

  All: async ({api, sh , event , args}) => {
    if (args[0] !== "شيلي" || args[0] !== "shelly" || !args[1]) return;
   const { senderID } = event;
    try {
      let query = await funcs.trgm(args.slice(1).join(" "), "en");
      let user = await Chat.findOne({ senderID });

      if (!user) {
        user = new Chat({
          senderID,
          messages: [
            {
              role: 'system',
              content: cai,
              createdAt: new Date()
            },
            { role: 'user', content: query, createdAt: new Date() }
          ]
        });
      } else {
        user.messages.push({ role: 'user', content: query, createdAt: new Date() });
      }

      const finalRes = await chat(user.messages);
      user.messages.push({ role: 'assistant', content: finalRes, createdAt: new Date() });

      await user.save();
      const msg = await sh.reply(txt(finalRes));

      global.shelly.Reply.push({
        name: this.config.name,
        ID: msg.messageID
      })
      
    } catch (error) {
      console.error(error);
                    }

}, 

Reply: async function({ event, api , sh , threadsData, usersData}) { 

    try {
        let { senderID } = event;
        let query = await funcs.trgm(event.body, "en");
        let user = await Chat.findOne({ senderID });
  
        if (!user) {
          user = new Chat({
            senderID,
            messages: [
              {
                role: 'system',
                content: cai,
                createdAt: new Date()
              },
              { role: 'user', content: query, createdAt: new Date() }
            ]
          });
  
        } else {
          user.messages.push({ role: 'user', content: query, createdAt: new Date() });
        }
  
        const finalRes = await chat(user.messages);
        user.messages.push({ role: 'assistant', content: finalRes, createdAt: new Date() });
  
        await user.save();
        const msg = await sh.reply(txt(finalRes));
  
        global.shelly.Reply.push({
          name: this.config.name,
          ID: msg.messageID
        })
        
      } catch (error) {
        console.error(error);
      }


}
}

module.exports = cmd;





async function chat(messages) {
    try {
        let options = {
            model: 'meta-llama/Meta-Llama-3-70B-Instruct',
            messages,
            stream: false,
            max_tokens: 100000
          };
      const res = await axios.post('https://api.deepinfra.com/v1/openai/chat/completions', options);
      return res.data.choices[0].message.content;
    } catch (error) {
      console.error(error);
      throw new Error('Chatbot communication failed');
    }
}








function txt(inputText) {
 
    const letterMap = {
        'a': '𝘢', 'b': '𝘣', 'c': '𝘤', 'd': '𝘥', 'e': '𝘦', 'f': '𝘧', 'g': '𝘨', 'h': '𝘩', 'i': '𝘪', 'j': '𝘫',
        'k': '𝘬', 'l': '𝘭', 'm': '𝘮', 'n': '𝘯', 'o': '𝘰', 'p': '𝘱', 'q': '𝘲', 'r': '𝘳', 's': '𝘴', 't': '𝘵',
        'u': '𝘶', 'v': '𝘷', 'w': '𝘸', 'x': '𝘹', 'y': '𝘺', 'z': '𝘻'
    };

 
    const pattern = /\*(.*?)\*/g;

    const transformedText = inputText.replace(pattern, (match, group1) => {
 
        const transformedGroup = group1.split('').map(char => {
            if (/[a-z]/.test(char)) {
                return letterMap[char] || char; 
            } else {
                return char; 
            }
        }).join('');

        return transformedGroup; 
    });

    return transformedText;
}
