const axios = require("axios");

module.exports.config = {
    name: "تطقيم",
    KJ: ["تطقيمات", "تطاقيم"],
    Auth: 0,
    Owner: "عبدالرحمن",
    Info: "تطقيمات عشوائية",
    Class: "ثريدز",
    Time: 5,
};


module.exports.onType = async function ({ api, event, sh: Message, usersData }) {
const Mods = funcs;
const ty = await axios.get('https://api.erdwpe.com/api/randomgambar/couplepp')
const resb = ty.data.result
const mt = resb.male;
const fg = resb.female;
const rh = await global.Mods.imgd(mt)
const eh = await global.Mods.imgd(fg)
const kj = [rh, eh];



       await Message.send({
          body: "⇣♡◄∘ هذا هو تطقيمك ∘►♡⇡", 
          attachment: kj
        })


};
