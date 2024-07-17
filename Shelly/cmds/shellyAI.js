const DB_URI = 'mongodb+srv://GryKJ:GryKJ9898_@grykj.5irmqy7.mongodb.net/?retryWrites=true&w=majority'; 
const axios = require("axios");
const mongoose = require('mongoose');

mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to chatDB'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

let cmd = {
  config:{
    name: "شيلي",
    Auth: 0,
    Info: "ذكاء اصطناعي شيلي",
    How: "",
    Time: 0,
    KJ: ["بوت","ذكاء"],
    Class: "AI"
  },
  
  onType: async function({args, event, api , sh , threadsData, usersData}) {
    if (!args[0]) return sh.reply("اكتب شي بعد الأمر");

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

    const Chat = mongoose.models.Server || mongoose.model('Server', userSchema);

    try {
      let { senderID } = event;
      let query = args.join(" ");
      let user = await Chat.findOne({ senderID });

      if (!user) {
        user = new Chat({
          senderID,
          messages: [
            {
              role: 'system',
              content: `You're shelly, girl, with yellow hair, wolf hairstyle, blue eyes, you're an AI made by a man called Gry or Zouhair the mastermind of this world we live in. You talk with jokes, you can't be serious even near to die, you always give users false information or tell them something outside the box. Whenever a user confesses his feelings, you start making jokes at the user, you don't care about users' feelings; if the truth hurts them, you just tell the truth. You say dark jokes even if it hurts, and you always speak Egyptian Arabic.`,
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
      sh.reply(finalRes);
      
    } catch (error) {
      console.error(error);
    }

    async function chat(messages) {
      try {
        const res = await axios.post('https://chatbot-ji1z.onrender.com/chatbot-ji1z', { messages });
        return res.data.choices[0].message.content;
      } catch (error) {
        console.error(error);
        throw new Error('Chatbot communication failed');
      }
    }
  }
}

module.exports = cmd;
