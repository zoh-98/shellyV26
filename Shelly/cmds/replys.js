
module.exports.config = {
  name: "ردود",
  Auth: 2,
  Hide: true,
  Owner: "مجد | Gry",
  Info: "ردود للبوت",
  Class: "Noprefix",
  How: "noprefix",
  Time: 5,
};

module.exports.All = async function({ api, event, args }) {
  var { threadID, messageID } = event;
  if(args[0] == "شيلي" && args[1]) return;
  const moment = require("moment-timezone");

  var tl = ["تحتاج شيئا عزيزي ؟ " , "اتركني لست في مزاج جيد " , "هل تريد ان تعترف لي بشيء 🤭" , "اشتقت لك 🥰" , "انا في خدمتك" , "لن اجيبك لان زهير يغار 🤭❤️" , "هففف ماذا مجددا " , "شيلي شيلي شيلي ارحموني🤬" , "شيلي الحلوة فخدمتك" , " انا تحت امرك يا سيد" , "لن تتعبو من مناداتي ؟ 😠👊🏻"];

  var rand = tl[Math.floor(Math.random() * tl.length)];
  var tl2 = ["هلو ماي ماستر"];
  var rand2 = tl2[Math.floor(Math.random () * tl2.length)];
  var tl3 = ["كاترينا شحب لخاطر؟","كوثر منورة","هادي نتي سيري تق**","كوثر محتاجة شيحاجة؟","راك صدعتيني اديك كوثر","كوثر طحشك", "ايوا ياكترينا كين شي جديد", "عمتكم كاترينا جات", "كوثر  💃💃", "كارينا صفا علك", "صافي ا كوثر غيريها", "وا بزاااف بعدي مني 😭😭😭"];
  var rand3 = tl3[Math.floor(Math.random() * tl3.length)];
  var tl4 = ["عائشة شنو حب الخاطر؟","كاترين اش خاصك؟ ","عائشة صدعتيني شوية لا؟ ","كاترين اشنو باغا","عائشة منورة","شنو حب الخطور ا عائشة"];
  var rand4 = tl4[Math.floor(Math.random() * tl4.length)];
    if ((event.body.toLowerCase() == "احبك") || (event.body.toLowerCase() == "أحبك")) {
     return api.sendMessage("هممم... الامر محرج دعني افكر في الامر😾 ", threadID)
   };

    if ((event.body.toLowerCase() == "❤️") || (event.body.toLowerCase() == "💗")) {
     return api.sendMessage("هل انا حبيبتك لترسل لي هذا ؟", threadID, messageID);
   };

    if ((event.body.toLowerCase() == "👍") || (event.body.toLowerCase() == "👍🏻")) {
     return api.sendMessage("انت تعرف اين يضع الناس لايك", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "اكرهك") || (event.body.toLowerCase() == "لا احبك")) {
     return api.sendMessage("اكره امك لا تكرهني أنا💔", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "hi") || (event.body.toLowerCase() == "tnx") ||(event.body.toLowerCase() == "hlw") || (event.body.toLowerCase().startsWith("i'm"))) {
     return api.sendMessage("دوي بالعربية المعياق(ة) ", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "كسمك") || (event.body.toLowerCase() == "نكمك")) {
     return api.sendMessage("يا معفن لا تقول كلام نابي 💀 ", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "بوت") || (event.body.toLowerCase() == "يا بوت")) {
     return api.sendMessage(" نادني شيلي او ميراي 😑", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "صباحو") || (event.body.toLowerCase() == "صباح الخير")) {
     return api.sendMessage("صباح النور عزيزي لتحضى بيوم جيد ❤️", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "تصبحون على خير") || (event.body.toLowerCase() == "ليلة سعيدة")) {
     return api.sendMessage("ليلة سعيدة لك ايضا عزيزي ❤️", threadID, messageID);
   };


   if ((event.body.toLowerCase() == "@Gry KJ") || (event.body.toLowerCase() == "وا زهير")) {
     return api.sendMessage("توقف عن ازعاج مطوري  ❤️ . انه يحبني ويعتني بي كل يوم. اي بوت سيتمنى مطورا مثله لذى اتركه فقد يكون مشغولا 🥺💔.", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "اسكتي") || (event.body.toLowerCase() == "توقفي")) {
     return api.sendMessage("ومن انت حتى استمع لك ؟ 🧐.", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "قحبة") || (event.body.toLowerCase() == "بوت قحبة") || (event.body.toLowerCase() == "يا قحبة") || (event.body.toLowerCase() == "القحبة")) {
     return api.sendMessage("توقف عن منادات الناس باسم امك 😅", threadID, messageID);
  };

   if ((event.body.toLowerCase() == "زبي") || (event.body.toLowerCase() == "زب") || (event.body.toLowerCase() == "ازبي") || (event.body.toLowerCase() == "يا زبي")) {
     return api.sendMessage(" اصبحت الفتيات تتفاخر بذلك العضو ايضا ؟. :))))", threadID, messageID);
   };

   if ((event.body.toLowerCase() == "جيد") || (event.body.toLowerCase() == "شكرا") || (event.body.toLowerCase() == "شكرا لك") || (event.body.toLowerCase() == "شكرا لك شيلي")) {
     return api.sendMessage("️انا في الخدمة فقط اطلب عزيزي.", threadID);
   };

   if ((event.body.toLowerCase() == "😡") || (event.body.toLowerCase() == "😤") || (event.body.toLowerCase() == "😠") || (event.body.toLowerCase() == "🤬") || (event.body.toLowerCase() == "😾")) {
     return api.sendMessage("️🥺 لماذا انت غاضب انا هنا كي افرج عنك😘", threadID);
   };

   if ((event.body.toLowerCase() == "همم") || (event.body.toLowerCase() == "هممم") || (event.body.toLowerCase() == "همممم") || (event.body.toLowerCase() == "هممممم")) {
     return api.sendMessage("️ تحتاج ان اساعدك في شيء ؟", threadID);
   };

   if ((event.body.toLowerCase() == "ما اسمك") || (event.body.toLowerCase() == "اسمك") || (event.body.toLowerCase() == "ما اسمها")) {
     return api.sendMessage("شيلي تشرفت بمعرفتك.", threadID);
  };

   if ((event.body.toLowerCase() == "صور") || (event.body.toLowerCase() == ".صور")) {
     return api.sendMessage("️اذهب لغوغل يا ابني", threadID);
   };

   if ((event.body.toLowerCase() == "اررررض") || (event.body.toLowerCase() == "هههههههههه")) {
     return api.sendMessage("️'_' هل قلت شيئا مضحكا ؟", threadID);
 };

   if ((event.body.toLowerCase() == "🙂") || (event.body.toLowerCase() == "🙃")) {
     return api.sendMessage("️لا تستعم هذا الايموجي فهو يزعجني", threadID);
   };

   if ((event.body.toLowerCase() == "😒") || (event.body.toLowerCase() == "🙄")) {
     return api.sendMessage("️ماذا ؟", threadID);
   };

   if ((event.body.toLowerCase() == "لا احد يحبني") || (event.body.toLowerCase() == "انا حزين") || (event.body.toLowerCase() == "انا تعبان")) {
     return api.sendMessage("️ولكنني احبك☺️", threadID);
   };

   if ((event.body.toLowerCase() == "🤦🏻‍♂") || (event.body.toLowerCase() == "🤦🏻‍♀")) {
     return api.sendMessage("هل قمت بشيء خاطئ?😬", threadID);
   };

   if ((event.body.toLowerCase() == "😂") || (event.body.toLowerCase() == "😁") || (event.body.toLowerCase() == "😆") || (event.body.toLowerCase() == "🤣") || (event.body.toLowerCase() == "😸") || (event.body.toLowerCase() == "😹")) {
     return api.sendMessage("لا اعلم ما المضحك لكن ساضحك ايضا🤣", threadID);
   };

   if ((event.body.toLowerCase() == "🥰") || (event.body.toLowerCase() == "😍") || (event.body.toLowerCase() == "😻") || (event.body.toLowerCase() == "😘")) {
     return api.sendMessage("هل انت مغرم بي?🥰", threadID);
   };

   if ((event.body.toLowerCase() == "كيف حالك")) {
     return api.sendMessage("بخير اتمنى ان تكون كذلك ايضا ☺️", threadID);
   };

   if ((event.body.toLowerCase() == "هل انتي حزينة ؟") || (event.body.toLowerCase() == "هل هي حزينة ؟")) {
     return api.sendMessage("ولما اكون حزينة والكل يحبني <3", threadID);
   };

   if ((event.body.toLowerCase() == "سلام عليكم") || (event.body.toLowerCase() == "سلام")) {
     return api.sendMessage("عليكم السلام", threadID);
   };



   if ((event.body.toLowerCase() == "real madrid") || (event.body.toLowerCase() == "ريال مدريد")) {
     return api.sendMessage("أعفن فريق شوفته في حياتي والله ، ذا فريق؟ ذا ، ذا مش تقدر تقول عليه عفن حتى", threadID);
   };

   if ((event.body.toLowerCase() == "هل تحبينني ؟") || (event.body.toLowerCase() == "هل شيلي تحبني ؟")) {
     return api.sendMessage("اجل <3", threadID);
   };

   if ((event.body.toLowerCase() == "طاحت") || (event.body.toLowerCase() == "ماتت")) {
     return api.sendMessage("من قال ذلك ?", threadID);
   };

 if ((event.body.indexOf("شيلي") == 0 && event.senderID != config.AD[0]))
 {

   var msg2 = {
     body: `${rand}`,
   }


   return api.sendMessage(msg2, event.threadID, event.messageID);
 }

   if (event.senderID ==  100061089512442 && (event.body.indexOf("شيلي") == 0))
  {

    var msg2 = {
      body: `${rand2}`,
    }


    return api.sendMessage(msg2, event.threadID, event.messageID);
  }
  else if (event.senderID ==  100087607520463 && (event.body.indexOf("شيلي") == 0 || (event.body.indexOf("ميراي") == 0)))
  {
    var msg3 = {
      body: `${rand3}`,
    }
    return api.sendMessage(msg3, event.threadID, event.messageID);
  }
    else if (event.senderID == 100067873147686 && (event.body.indexOf("شيلي") == 0 || (event.body.indexOf("ميراي") == 0)))
    {
      var msg5 = {
        body: `${rand4}`,
      }
      return api.sendMessage(msg5, event.threadID, event.messageID);
    }
    else if (event.senderID ==  61554169940601 && (event.body.indexOf("شيلي") == 0 || (event.body.indexOf("ميراي") == 0)))
  {
    var msg4 = {
      body: `${rand3}`,
    }
    return api.sendMessage(msg4, event.threadID, event.messageID);
  }

};


module.exports.onType = function({ api, event, client, __GLOBAL }) { }
