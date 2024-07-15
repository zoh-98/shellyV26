const { graphQlQueryToJson } = require("graphql-query-to-json");
/*const ora = require("ora");*/
const logger = global.log.warn;

const databaseType = 'mongodb';

// with add null if not found data
function fakeGraphql(query, data, obj = {}) {
	if (typeof query != "string" && typeof query != "object")
		throw new Error(`The "query" argument must be of type string or object, got ${typeof query}`);
	if (query == "{}" || !data)
		return data;
	if (typeof query == "string")
		query = graphQlQueryToJson(query).query;
	const keys = query ? Object.keys(query) : [];
	for (const key of keys) {
		if (typeof query[key] === 'object') {
			if (!Array.isArray(data[key]))
				obj[key] = data.hasOwnProperty(key) ? fakeGraphql(query[key], data[key] || {}, obj[key]) : null;
			else
				obj[key] = data.hasOwnProperty(key) ? data[key].map(item => fakeGraphql(query[key], item, {})) : null;
		}
		else
			obj[key] = data.hasOwnProperty(key) ? data[key] : null;
	}
	return obj;
	// i don't know why but it's working by Copilot suggestion :)
}

module.exports = async function (api) {
	var threadModel, userModel, dashBoardModel;
	switch (databaseType) {
		case "mongodb": {
			/*const spin = ora({
				text: getText('indexController', 'connectingMongoDB'),
				spinner: {
					interval: 80,
					frames: [
						'⠋', '⠙', '⠹',
						'⠸', '⠼', '⠴',
						'⠦', '⠧', '⠇',
						'⠏'
					]
				}
			});*/
			const defaultClearLine = process.stderr.clearLine;
			process.stderr.clearLine = function () { };
			/*spin.start();*/
      logger('Try connect MONGO');
			try {
				var { threadModel, userModel, globalModel } = await require("../connectDB/connectMongoDB.js")("mongodb+srv://GryKJ:GryKJ9898_@grykj.5irmqy7.mongodb.net/?retryWrites=true&w=majority");
				/*spin.stop();*/
				process.stderr.clearLine = defaultClearLine;
				/*log.info("MONGODB", getText("indexController", "connectMongoDBSuccess"));*/
         logger('Done connected MONGO');
		
			}
			catch (err) {
				/*spin.stop();*/
				process.stderr.clearLine = defaultClearLine;
				/*log.err("MONGODB", getText("indexController", "connectMongoDBError"), err);*/
         logger(`Error when trying connect the DB:\n${err.message}`, 'DATABASE');
		
				process.exit();
			}
			break;
		}
		case "sqlite": {
			/*const spin = ora({
				text: getText('indexController', 'connectingMySQL'),
				spinner: {
					interval: 80,
					frames: [
						'⠋', '⠙', '⠹',
						'⠸', '⠼', '⠴',
						'⠦', '⠧', '⠇',
						'⠏'
					]
				}
			});*/
			const defaultClearLine = process.stderr.clearLine;
			process.stderr.clearLine = function () { };
       //global.YukiBot.bold('--green• Trying to connect --blue sqlite database');
			/*spin.start();*/
			try {
				var { threadModel, userModel, globalModel } = await require("../connectDB/connectSqlite.js")();
				process.stderr.clearLine = defaultClearLine;
				/*spin.stop();*/
				/*log.info("SQLITE", getText("indexController", "connectMySQLSuccess"));*/
         
logger.log([
  {
    message: "[ mongoDB ]: ",
    color: ["yellow", "green"],
  },
  {
    message: `DB connected ✓`,
    color: "white",
  },
]);
		
			}
			catch (err) {
				process.stderr.clearLine = defaultClearLine;
				/*spin.stop();*/
				/*log.err("SQLITE", getText("indexController", "connectMySQLError"), err);*/
         
logger.log([
  {
    message: "[ GoatDB ]: ",
    color: ["yellow", "green"],
  },
  {
    message: `cant connect db for ${err.stack}`,
    color: "white",
  },
]);
		
				process.exit();
			}
			break;
		}
		default:
			break;
	}

	const threadsData = await require("./threadsData.js")(databaseType, threadModel, api, fakeGraphql);
	const usersData = await require("./usersData.js")(databaseType, userModel, api, fakeGraphql);
  const globalData = await require("./globalData.js")(databaseType, globalModel, fakeGraphql);
	

	global.db = {
		...global.db,
		threadModel,
		userModel,
    globalModel,
		threadsData,
		usersData,
    globalData
			};

	return {
		threadModel,
		userModel,
    globalModel,
		threadsData,
		usersData,
    globalData,
		databaseType
	};
};
