const request = require("request");

module.exports.config = {
  name: "برواولاد",
  Auth: 0,
  Owner: "𝐊𝐈𝐓𝐄 凧",
  Info: "بروفايل انمي اولاد",
  Class: "random-img",
  How: "send message",
  Time: 5,
};

module.exports.onType = async({ api, event }) => {
  
  var link = [
"https://i.imgur.com/x6Cc9n6.jpg",
"https://i.imgur.com/Jmb7V7h.jpg",
"https://i.imgur.com/5trZsRg.jpg",
"https://i.imgur.com/IzwQVwj.jpg",
"https://i.imgur.com/8AOyfUj.jpg",
"https://i.imgur.com/hJGZwyj.jpg",
"https://i.imgur.com/QU1MKQd.jpg",
"https://i.imgur.com/0frgNtL.jpg",
"https://i.imgur.com/6v29Hz8.jpg",
"https://i.imgur.com/RFwkQMI.jpg",
"https://i.imgur.com/5QnAGFH.jpg",
"https://i.imgur.com/G7SGPWI.jpg",
"https://i.imgur.com/NuEQzfl.jpg",
"https://i.imgur.com/zw53mfy.jpg",
"https://i.imgur.com/GjG1tBz.jpg",
"https://i.imgur.com/Mu8Y0vR.jpg",
"https://i.imgur.com/VxEFxz6.jpg",
"https://i.imgur.com/s8lysbe.jpg",
"https://i.imgur.com/UqDJlIu.png",
"https://i.imgur.com/PxiKaff.jpg",
"https://i.imgur.com/SpW8Eq0.jpg",
"https://i.imgur.com/vQ104Wa.jpg",
"https://i.imgur.com/S1vyler.jpg",
"https://i.imgur.com/UvHNwPB.jpg",
"https://i.imgur.com/DKUxCGa.jpg",
  ];
  var callback = () => api.sendMessage({ body: ` بروفيلات انمي من اجلك\nTag: Anime Blur`, attachment: fs.createReadStream(__dirname + "/cache/5.jpg")}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/5.jpg"), event.messageID);
  return request(encodeURI(link[Math.floor(Math.random() * link.length)])).pipe(fs.createWriteStream(__dirname + "/cache/5.jpg")).on("close", () => callback());
};