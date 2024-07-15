const request = require('request');
const fs = require('fs');

module.exports.config = {
  name: "ايات",
  Auth: 0,
  Owner: "Gry KJ",
  Info: "ايات قرءانية",
  Class: "islam",
  How: "",
  Time: 0,
};

module.exports.onType = async function({ api, event, args }) {

var s1 = args[0];
var s2 = args[1];
if (!s1 || !s2 || isNaN(s1) || isNaN(s2))
{
  return api.sendMessage("تأكد انك حاط الامر على ذا الشكل \n\n ايات رقم السورة مسافة ثم رقم الآية \n مثال : \n ايات 1 2", event.threadID, event.messageID);

}
var url = `https://api.quran.gading.dev/surah/${s1}/${s2}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    var audioLink = data.data.audio.secondary[0];


request({ url: audioLink, encoding: null }, function (error, response, body) {
          if (error) throw error;
          fs.writeFileSync(__dirname + '/cache/quran_aud.mp3', body);
        api.sendMessage({body: `${data.data.text.arab}`, attachment: fs.createReadStream(__dirname + `/cache/quran_aud.mp3`)}, event.threadID, () => fs.unlinkSync(__dirname + `/cache/quran_aud.mp3`), event.messageID);
      });
  } catch (error) {
    console.error('Error:', error);
  }

};