const logger = require("./controler/logger/log");
const chalk = require("chalk");
const cv = chalk.bold.hex("#FF5733");
const gradient = require("gradient-string");
const logo = `

╭━━━┳╮╱╱╱╱╭╮╭╮
┃╭━╮┃┃╱╱╱╱┃┃┃┃
┃╰━━┫╰━┳━━┫┃┃┃╭╮╱╭╮     this bot
╰━━╮┃╭╮┃┃━┫┃┃┃┃┃╱┃┃ Created By GryKJ
┃╰━╯┃┃┃┃┃━┫╰┫╰┫╰━╯┃     present
╰━━━┻╯╰┻━━┻━┻━┻━╮╭╯
╱╱╱╱╱╱╱╱╱╱╱╱╱╱╭━╯┃
╱╱╱╱╱╱╱╱╱╱╱╱╱╱╰━━╯

`;

const c = ["red", "cyan"];
const redToGreen = gradient("red", "cyan");
console.log(redToGreen("━".repeat(50), { interpolation: "hsv" }));
const text = gradient(c).multiline(logo);
console.log(text);
console.log(redToGreen("━".repeat(50), { interpolation: "hsv" }));

console.log(cv(`\n` + `──LOADING STARTER─●`));


logger.log([
  {
  message: "[ STARTER ]: ",
   color: ["red", "cyan"],
  },
  {
  message: `Getting Started`,
  color: "cyan",
  },
]);

const { spawn } = require('child_process');
const Fastify = require('fastify');
const fastifyStatic = require('@fastify/static'); 
class Shellyy {
  constructor() {
    this.app = Fastify();
    this.PORT = process.env.PORT || 3000;
    this.countRestart = 0;
    this.child = null;
    this.init();
  }

  init() {
    this.startApp();
    this.startBot();
  }

  startApp() {
    this.app.get("/", (req, reply) => {
      reply.send("Shelly BOT is running")
    });

    const listenOptions = {
      port: this.PORT,
      host: '0.0.0.0',
    };

    this.app.listen(listenOptions, (err, address) => {
      if (err) {
        logger.log([
          {
          message: "[ SERVER ]: ",
           color: ["red", "Green"],
          },
          {
          message: `Error starting server: ${err}`,
          color: "white",
          },
        ]);
        process.exit(1);
      }
      logger.log([
        {
        message: "[ SERVER ]: ",
         color: ["red", "cyan"],
        },
        {
        message: `App deployed on port ${this.PORT}`,
        color: "white",
        },
      ]);
    });
  }
  startBot() {
    const options = {
      cwd: __dirname,
      stdio: "inherit",
      shell: true,
    };
    this.child = spawn(
      "node",
      [ "--trace-deprecation", "--trace-warnings", "--async-stack-traces", "main.js" ],
      options
    );
    this.child.on("close", (codeExit) => {
      if (codeExit !== 0 && this.countRestart < 5) {
        this.countRestart += 1;
        this.startBot();
      }
    });
    this.child.on("error", (error) => {
      console.error("An error occurred: " + JSON.stringify(error), "error");
    });
  }
}

const Shelly = new Shellyy(); 
