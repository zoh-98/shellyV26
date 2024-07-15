const axios = require("axios");
const ImgurClient = require('imgur').ImgurClient;
const { v4: uuidv4 } = require('uuid');
const fs = require("fs-extra");
const path = require("path");
const cheerio = require("cheerio");
const https = require("https");
const agent = new https.Agent({
 rejectUnauthorized: false
});
const moment = require("moment-timezone");
const mimeDB = require("mime-db");
const _ = require("lodash");
const { google } = require("googleapis");

const log = require(__dirname + "/logger/log.js");
const { isHexColor, colors } = require("./func/colors.js");
const Prism = require("./func/prism.js");
const FormData = require('form-data');



const word = [
 'A', 'Á', 'À', 'Ả', 'Ã', 'Ạ', 'a', 'á', 'à', 'ả', 'ã', 'ạ',
 'Ă', 'Ắ', 'Ằ', 'Ẳ', 'Ẵ', 'Ặ', 'ă', 'ắ', 'ằ', 'ẳ', 'ẵ', 'ặ',
 'Â', 'Ấ', 'Ầ', 'Ẩ', 'Ẫ', 'Ậ', 'â', 'ấ', 'ầ', 'ẩ', 'ẫ', 'ậ',
 'B', 'b',
 'C', 'c',
 'D', 'Đ', 'd', 'đ',
 'E', 'É', 'È', 'Ẻ', 'Ẽ', 'Ẹ', 'e', 'é', 'è', 'ẻ', 'ẽ', 'ẹ',
 'Ê', 'Ế', 'Ề', 'Ể', 'Ễ', 'Ệ', 'ê', 'ế', 'ề', 'ể', 'ễ', 'ệ',
 'F', 'f',
 'G', 'g',
 'H', 'h',
 'I', 'Í', 'Ì', 'Ỉ', 'Ĩ', 'Ị', 'i', 'í', 'ì', 'ỉ', 'ĩ', 'ị',
 'J', 'j',
 'K', 'k',
 'L', 'l',
 'M', 'm',
 'N', 'n',
 'O', 'Ó', 'Ò', 'Ỏ', 'Õ', 'Ọ', 'o', 'ó', 'ò', 'ỏ', 'õ', 'ọ',
 'Ô', 'Ố', 'Ồ', 'Ổ', 'Ỗ', 'Ộ', 'ô', 'ố', 'ồ', 'ổ', 'ỗ', 'ộ',
 'Ơ', 'Ớ', 'Ờ', 'Ở', 'Ỡ', 'Ợ', 'ơ', 'ớ', 'ờ', 'ở', 'ỡ', 'ợ',
 'P', 'p',
 'Q', 'q',
 'R', 'r',
 'S', 's',
 'T', 't',
 'U', 'Ú', 'Ù', 'Ủ', 'Ũ', 'Ụ', 'u', 'ú', 'ù', 'ủ', 'ũ', 'ụ',
 'Ư', 'Ứ', 'Ừ', 'Ử', 'Ữ', 'Ự', 'ư', 'ứ', 'ừ', 'ử', 'ữ', 'ự',
 'V', 'v',
 'W', 'w',
 'X', 'x',
 'Y', 'Ý', 'Ỳ', 'Ỷ', 'Ỹ', 'Ỵ', 'y', 'ý', 'ỳ', 'ỷ', 'ỹ', 'ỵ',
 'Z', 'z',
 ' '
];

const regCheckURL = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

class CustomError extends Error {
 constructor(obj) {
  if (typeof obj === 'string')
   obj = { message: obj };
  if (typeof obj !== 'object' || obj === null)
   throw new TypeError('Object required');
  obj.message ? super(obj.message) : super();
  Object.assign(this, obj);
 }
}

function lengthWhiteSpacesEndLine(text) {
 let length = 0;
 for (let i = text.length - 1; i >= 0; i--) {
  if (text[i] == ' ')
   length++;
  else
   break;
 }
 return length;
}

function lengthWhiteSpacesStartLine(text) {
 let length = 0;
 for (let i = 0; i < text.length; i++) {
  if (text[i] == ' ')
   length++;
  else
   break;
 }
 return length;
}

function setErrorUptime() {
 global.statusAccountBot = 'block spam';
 global.responseUptimeCurrent = global.responseUptimeError;
}
const defaultStderrClearLine = process.stderr.clearLine;


function convertTime(miliSeconds, replaceSeconds = "s", replaceMinutes = "m", replaceHours = "h", replaceDays = "d", replaceMonths = "M", replaceYears = "y", notShowZero = false) {
 if (typeof replaceSeconds == 'boolean') {
  notShowZero = replaceSeconds;
  replaceSeconds = "s";
 }
 const second = Math.floor(miliSeconds / 1000 % 60);
 const minute = Math.floor(miliSeconds / 1000 / 60 % 60);
 const hour = Math.floor(miliSeconds / 1000 / 60 / 60 % 24);
 const day = Math.floor(miliSeconds / 1000 / 60 / 60 / 24 % 30);
 const month = Math.floor(miliSeconds / 1000 / 60 / 60 / 24 / 30 % 12);
 const year = Math.floor(miliSeconds / 1000 / 60 / 60 / 24 / 30 / 12);
 let formattedDate = '';

 const dateParts = [
  { value: year, replace: replaceYears },
  { value: month, replace: replaceMonths },
  { value: day, replace: replaceDays },
  { value: hour, replace: replaceHours },
  { value: minute, replace: replaceMinutes },
  { value: second, replace: replaceSeconds }
 ];

 for (let i = 0; i < dateParts.length; i++) {
  const datePart = dateParts[i];
  if (datePart.value)
   formattedDate += datePart.value + datePart.replace;
  else if (formattedDate != '')
   formattedDate += '00' + datePart.replace;
  else if (i == dateParts.length - 1)
   formattedDate += '0' + datePart.replace;
 }

 if (formattedDate == '')
  formattedDate = '0' + replaceSeconds;

 if (notShowZero)
  formattedDate = formattedDate.replace(/00\w+/g, '');

 return formattedDate;
}

async function imgbb(file /* stream or image url */) {
  let type = "file";
  try {
    if (!file)
      throw new Error('The first argument (file) must be a stream or a image url');
    if (regCheckURL.test(file) == true)
      type = "url";
    if (
      (type != "url" && (!(typeof file._read === 'function' && typeof file._readableState === 'object')))
      || (type == "url" && !regCheckURL.test(file))
    )
      throw new Error('The first argument (file) must be a stream or an image URL');

    const res_ = await axios({
      method: 'GET',
      url: 'https://imgbb.com'
    });

    const auth_token = res_.data.match(/auth_token="([^"]+)"/)[1];
    const timestamp = Date.now();

    const res = await axios({
      method: 'POST',
      url: 'https://imgbb.com/json',
      headers: {
        "content-type": "multipart/form-data"
      },
      data: {
        source: file,
        type: type,
        action: 'upload',
        timestamp: timestamp,
        auth_token: auth_token
      }
    });

    return res.data.image.url;


  }
  catch (err) {
    throw new CustomError(err.response ? err.response.data : err);
  }
}

function createQueue(callback) {
 const queue = [];
 const queueObj = {
  push: function (task) {
   queue.push(task);
   if (queue.length == 1)
    queueObj.next();
  },
  running: null,
  length: function () {
   return queue.length;
  },
  next: function () {
   if (queue.length > 0) {
    const task = queue[0];
    queueObj.running = task;
    callback(task, async function (err, result) {
     queueObj.running = null;
     queue.shift();
     queueObj.next();
    });
   }
  }
 };
 return queueObj;
}

function enableStderrClearLine(isEnable = true) {
 process.stderr.clearLine = isEnable ? defaultStderrClearLine : () => { };
}

async function imgur(...links) {
  const upload = async (url) => {
    const client = new ImgurClient({ clientId: 'b88f92544843717' });
    const extension = url.substring(url.lastIndexOf('.') + 1);
    const dest = `${__dirname}/${uuidv4()}.${extension}`;

    try {
      const response = await axios({
        url: url,
        method: 'GET',
        responseType: 'stream'
      });

      response.data.pipe(fs.createWriteStream(dest));

      return new Promise((resolve, reject) => {
        response.data.on('end', async () => {
          const res = await client.upload({ image: fs.createReadStream(dest), type: 'stream' });
          fs.unlinkSync(dest);
          resolve(res.data.link);
        });

        response.data.on('error', (err) => {
          reject(err);
        });
      });
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const uploadImagesFromURLs = async (urls) => {
    const uploadedLinks = [];
    for (const url of urls) {
      const uploadedLink = await upload(url);
      if (uploadedLink) {
        uploadedLinks.push(uploadedLink);
      }
    }
    return uploadedLinks;
  };

  return uploadImagesFromURLs(links);
      }


function formatNumber(number) {
 const regionCode = global.config.language;
 if (isNaN(number))
  throw new Error('The first argument (number) must be a number');

 number = Number(number);
 return number.toLocaleString(regionCode || "en-US");
}

function getExtFromAttachmentType(type) {
 switch (type) {
  case "photo":
   return 'png';
  case "animated_image":
   return "gif";
  case "video":
   return "mp4";
  case "audio":
   return "mp3";
  default:
   return "txt";
 }
}

function getExtFromMimeType(mimeType = "") {
 return mimeDB[mimeType] ? (mimeDB[mimeType].extensions || [])[0] || "unknow" : "unknow";
}

function getExtFromUrl(url = "") {
 if (!url || typeof url !== "string")
  throw new Error('The first argument (url) must be a string');
 const reg = /(?<=https:\/\/cdn.fbsbx.com\/v\/.*?\/|https:\/\/video.xx.fbcdn.net\/v\/.*?\/|https:\/\/scontent.xx.fbcdn.net\/v\/.*?\/).*?(\/|\?)/g;
 const fileName = url.match(reg)[0].slice(0, -1);
 return fileName.slice(fileName.lastIndexOf(".") + 1);
}

function getPrefix(threadID) {
 if (!threadID || isNaN(threadID))
  throw new Error('The first argument (threadID) must be a number');
 threadID = String(threadID);
 let prefix = global.config.PREFIX;
 const threadData = global.db.allThreadData.find(t => t.threadID == threadID);
 if (threadData)
  prefix = threadData.data.prefix || prefix;
 return prefix;
}

function getTime(timestamps, format) {
 // check if just have timestamps -> format = timestamps
 if (!format && typeof timestamps == 'string') {
  format = timestamps;
  timestamps = undefined;
 }
 return moment(timestamps).tz("Africa/Casablanca").format(format);
}

function isNumber(value) {
 return !isNaN(parseFloat(value));
}

function jsonStringifyColor(obj, filter, indent, level) {
 // source: https://www.npmjs.com/package/node-json-color-stringify
 indent = indent || 0;
 level = level || 0;
 let output = '';

 if (typeof obj === 'string')
  output += colors.green(`"${obj}"`);
 else if (typeof obj === 'number' || typeof obj === 'boolean' || obj === null)
  output += colors.yellow(obj);
 else if (obj === undefined)
  output += colors.gray('undefined');
 else if (obj !== undefined && typeof obj !== 'function')
  if (!Array.isArray(obj)) {
   if (Object.keys(obj).length === 0)
    output += '{}';
   else {
    output += colors.gray('{\n');
    Object.keys(obj).forEach(key => {
     let value = obj[key];

     if (filter) {
      if (typeof filter === 'function')
       value = filter(key, value);
      else if (typeof filter === 'object' && filter.length !== undefined)
       if (filter.indexOf(key) < 0)
        return;
     }

     // if (value === undefined)
     // 	return;
     if (!isNaN(key[0]) || key.match(/[^a-zA-Z0-9_]/))
      key = colors.green(JSON.stringify(key));

     output += ' '.repeat(indent + level * indent) + `${key}:${indent ? ' ' : ''}`;
     output += funcs.jsonStringifyColor(value, filter, indent, level + 1) + ',\n';
    });

    output = output.replace(/,\n$/, '\n');
    output += ' '.repeat(level * indent) + colors.gray('}');
   }
  }
  else {
   if (obj.length === 0)
    output += '[]';
   else {
    output += colors.gray('[\n');
    obj.forEach(subObj => {
     output += ' '.repeat(indent + level * indent) + funcs.jsonStringifyColor(subObj, filter, indent, level + 1) + ',\n';
    });

    output = output.replace(/,\n$/, '\n');
    output += ' '.repeat(level * indent) + colors.gray(']');
   }
  }
 else if (typeof obj === 'function')
  output += colors.green(obj.toString());

 output = output.replace(/,$/gm, colors.gray(','));
 if (indent === 0)
  return output.replace(/\n/g, '');

 return output;
}


function message(api, event) {
  async function sendMessageError(err) {
    if (typeof err === "object" && !err.stack)
      err = removeHomeDir(JSON.stringify(err, null, 2));
    else
      err = removeHomeDir(`${err.name || err.error}: ${err.message}`);
    return await api.sendMessage("error: " + err, event.threadID, event.messageID);
  }
  return {
    send: async (form, callback) => {
      try {
        return await api.sendMessage(form, event.threadID, callback);
      } catch (err) {
        if (JSON.stringify(err).includes('spam')) {
          throw err;
        }
        throw err; 
      }
    },
    reply: async (form, callback) => {
      try {
        return await api.sendMessage(form, event.threadID, callback, event.messageID);
      } catch (err) {
        if (JSON.stringify(err).includes('spam')) {
          throw err;
        }
        throw err; 
      }
    },
    str: async (T, U) => {
      let F;
      if (!U) {
        F = { attachment: await funcs.str(T) };
      } else {
        F = { body: T, attachment: await funcs.str(U) };
      }
      api.sendMessage(F, event.threadID, event.messageID);
    },
    unsend: async (messageID, callback) => await api.unsendMessage(messageID, callback),
    edit: async (from, callback = event.messageReply.messageID) => await api.editMessage(from, callback),
    react: async function (emoji) {
      try {
        return await new Promise((resolve, reject) => {
          api.setMessageReaction(emoji, event.messageID, (err, data) => {
            if (err) {
              reject(err);
            } else {
              resolve(data);
            }
          }, true);
        });
      } catch (err) {
        throw err;
      }
    },
    err: async (err) => await sendMessageError(err),
    error: async (err) => await sendMessageError(err)
  };
}

function randomString(max, onlyOnce = false, possible) {
 if (!max || isNaN(max))
  max = 10;
 let text = "";
 possible = possible || "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
 for (let i = 0; i < max; i++) {
  let random = Math.floor(Math.random() * possible.length);
  if (onlyOnce) {
   while (text.includes(possible[random]))
    random = Math.floor(Math.random() * possible.length);
  }
  text += possible[random];
 }
 return text;
}

function randomNumber(min, max) {
 if (!max) {
  max = min;
  min = 0;
 }
 if (min == null || min == undefined || isNaN(min))
  throw new Error('The first argument (min) must be a number');
 if (max == null || max == undefined || isNaN(max))
  throw new Error('The second argument (max) must be a number');
 return Math.floor(Math.random() * (max - min + 1)) + min;
}

function removeHomeDir(fullPath) {
 if (!fullPath || typeof fullPath !== "string")
  throw new Error('The first argument (fullPath) must be a string');
 while (fullPath.includes(process.cwd()))
  fullPath = fullPath.replace(process.cwd(), "");
 return fullPath;
}

function splitPage(arr, limit) {
 const allPage = _.chunk(arr, limit);
 return {
  totalPage: allPage.length,
  allPage
 };
}

function translateAPI(text, lang) {
 return new Promise((resolve, reject) => {
  axios.get(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(text)}`)
   .then(res => {
    resolve(res.data[0][0][0]);
   })
   .catch(err => {
    reject(err);
   });
 });
}

async function downloadFile(url = "", path = "") {
 if (!url || typeof url !== "string")
  throw new Error(`The first argument (url) must be a string`);
 if (!path || typeof path !== "string")
  throw new Error(`The second argument (path) must be a string`);
 const getFile = await axios.get(url, {
  responseType: "arraybuffer"
 });
 fs.writeFileSync(path, Buffer.from(getFile.data));
 return path;
}

async function findUid(link) {
 try {
  const response = await axios.post(
   'https://seomagnifier.com/fbid',
   new URLSearchParams({
    'facebook': '1',
    'sitelink': link
   }),
   {
    headers: {
     'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
     'Cookie': 'PHPSESSID=0d8feddd151431cf35ccb0522b056dc6'
    }
   }
  );
  const id = response.data;
  // try another method if this one fails
  if (isNaN(id)) {
   const html = await axios.get(link);
   const $ = cheerio.load(html.data);
   const el = $('meta[property="al:android:url"]').attr('content');
   if (!el) {
    throw new Error('UID not found');
   }
   const number = el.split('/').pop();
   return number;
  }
  return id;
 } catch (error) {
  throw new Error('An unexpected error occurred. Please try again.');
 }
}

async function getStreamsFromAttachment(attachments) {
 const streams = [];
 for (const attachment of attachments) {
  const url = attachment.url;
  const ext = funcs.getExtFromUrl(url);
  const fileName = `${funcs.randomString(10)}.${ext}`;
  streams.push({
   pending: axios({
    url,
    method: "GET",
    responseType: "stream"
   }),
   fileName
  });
 }
 for (let i = 0; i < streams.length; i++) {
  const stream = await streams[i].pending;
  stream.data.path = streams[i].fileName;
  streams[i] = stream.data;
 }
 return streams;
}

async function getStreamFromURL(url = "", pathName = "", options = {}) {
 if (!options && typeof pathName === "object") {
  options = pathName;
  pathName = "";
 }
 try {
  if (!url || typeof url !== "string")
   throw new Error(`The first argument (url) must be a string`);
  const response = await axios({
   url,
   method: "GET",
   responseType: "stream",
   ...options
  });
  if (!pathName)
   pathName = funcs.randomString(10) + (response.headers["content-type"] ? '.' + funcs.getExtFromMimeType(response.headers["content-type"]) : ".noext");
  response.data.path = pathName;
  return response.data;
 }
 catch (err) {
  throw err;
 }
}

async function translate(text, lang) {
 if (typeof text !== "string")
  throw new Error(`The first argument (text) must be a string`);
 if (!lang)
  lang = 'en';
 if (typeof lang !== "string")
  throw new Error(`The second argument (lang) must be a string`);
 const wordTranslate = [''];
 const wordNoTranslate = [''];
 const wordTransAfter = [];
 let lastPosition = 'wordTranslate';

 if (word.indexOf(text.charAt(0)) == -1)
  wordTranslate.push('');
 else
  wordNoTranslate.splice(0, 1);

 for (let i = 0; i < text.length; i++) {
  const char = text[i];
  if (word.indexOf(char) !== -1) { // is word
   const lengWordNoTranslate = wordNoTranslate.length - 1;
   if (wordNoTranslate[lengWordNoTranslate] && wordNoTranslate[lengWordNoTranslate].includes('{') && !wordNoTranslate[lengWordNoTranslate].includes('}')) {
    wordNoTranslate[lengWordNoTranslate] += char;
    continue;
   }
   const lengWordTranslate = wordTranslate.length - 1;
   if (lastPosition == 'wordTranslate') {
    wordTranslate[lengWordTranslate] += char;
   }
   else {
    wordTranslate.push(char);
    lastPosition = 'wordTranslate';
   }
  }
  else { // is no word
   const lengWordNoTranslate = wordNoTranslate.length - 1;
   const twoWordLast = wordNoTranslate[lengWordNoTranslate]?.slice(-2) || '';
   if (lastPosition == 'wordNoTranslate') {
    if (twoWordLast == '}}') {
     wordTranslate.push("");
     wordNoTranslate.push(char);
    }
    else
     wordNoTranslate[lengWordNoTranslate] += char;
   }
   else {
    wordNoTranslate.push(char);
    lastPosition = 'wordNoTranslate';
   }
  }
 }

 for (let i = 0; i < wordTranslate.length; i++) {
  const text = wordTranslate[i];
  if (!text.match(/[^\s]+/))
   wordTransAfter.push(text);
  else
   wordTransAfter.push(funcs.translateAPI(text, lang));
 }

 let output = '';

 for (let i = 0; i < wordTransAfter.length; i++) {
  let wordTrans = (await wordTransAfter[i]);
  if (wordTrans.trim().length === 0) {
   output += wordTrans;
   if (wordNoTranslate[i] != undefined)
    output += wordNoTranslate[i];
   continue;
  }

  wordTrans = wordTrans.trim();
  const numberStartSpace = lengthWhiteSpacesStartLine(wordTranslate[i]);
  const numberEndSpace = lengthWhiteSpacesEndLine(wordTranslate[i]);

  wordTrans = ' '.repeat(numberStartSpace) + wordTrans.trim() + ' '.repeat(numberEndSpace);

  output += wordTrans;
  if (wordNoTranslate[i] != undefined)
   output += wordNoTranslate[i];
 }
 return output;
}

async function shortenURL(url) {
 try {
  const result = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`);
  return result.data;
 }
 catch (err) {
  let error;
  if (err.response) {
   error = new Error();
   Object.assign(error, err.response.data);
  }
  else
   error = new Error(err.message);
 }
}

async function uploadImgbb(file /* stream or image url */) {
  let type = "file";
  try {
      if (!file)
          throw new Error('The first argument (file) must be a stream or a image url');
      if (regCheckURL.test(file) == true)
          type = "url";
      if (
          (type != "url" && (!(typeof file._read === 'function' && typeof file._readableState === 'object')))
          || (type == "url" && !regCheckURL.test(file))
      )
          throw new Error('The first argument (file) must be a stream or an image URL');

      const res_ = await axios({
          method: 'GET',
          url: 'https://imgbb.com'
      });

      const auth_token = res_.data.match(/auth_token="([^"]+)"/)[1];
      const timestamp = Date.now();

      const form = new FormData();
      form.append('source', file);
      form.append('type', type);
      form.append('action', 'upload');
      form.append('timestamp', timestamp);
      form.append('auth_token', auth_token);

      const headers = {
          ...form.getHeaders(), // get form headers
      };

      const res = await axios({
          method: 'POST',
          url: 'https://imgbb.com/json',
          headers: headers,
          data: form
      });

      return res.data;

  } catch (err) {
      throw new CustomError(err.response ? err.response.data : err);
  }
}

async function uploadZippyshare(stream) {
 const res = await axios({
  method: 'POST',
  url: 'https://api.zippysha.re/upload',
  httpsAgent: agent,
  headers: {
   'Content-Type': 'multipart/form-data'
  },
  data: {
   file: stream
  }
 });

 const fullUrl = res.data.data.file.url.full;
 const res_ = await axios({
  method: 'GET',
  url: fullUrl,
  httpsAgent: agent,
  headers: {
   "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36 Edg/114.0.1823.43"
  }
 });

 const downloadUrl = res_.data.match(/id="download-url"(?:.|\n)*?href="(.+?)"/)[1];
 res.data.data.file.url.download = downloadUrl;

 return res.data;
}
const funcs = {
 CustomError,

 colors,
 convertTime,
 createQueue,
 defaultStderrClearLine,
 enableStderrClearLine,
 formatNumber,
 getExtFromAttachmentType,
 getExtFromMimeType,
 getExtFromUrl,
 getPrefix,

 getTime,
 isHexColor,
 isNumber,
 jsonStringifyColor,
 loading: require("./logger/loading.js"),
 log,
 logColor: require("./logger/logColor.js"),
 message,
 randomString,
 randomNumber,
 removeHomeDir,
 splitPage,
 translateAPI,
 trgm: translateAPI,
 // async functions
 imgur,
 downloadFile,
 findUid,
 getStreamsFromAttachment,
 getStreamFromURL,
 str: getStreamFromURL,
 imgd:getStreamFromURL,
 Prism,
 translate,
 shortenURL,
 uploadZippyshare,
 uploadImgbb,

imgbb,
 Imgbb: uploadImgbb
};

module.exports = funcs;
