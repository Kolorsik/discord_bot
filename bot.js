const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const fs = require('fs');
let config = require('./botconfig.json');
let token = config.token;
let prefix = config.prefix;
let profile = require('./profile.json');

fs.readdir('./cmds/', (err, files) => {
  if (err) console.log(err);
  let jsfiles = files.filter(f => f.split(".").pop() === "js");
  if (jsfiles.length <= 0) console.log("Нет комманд для загрузки");
  console.log(`Загружено ${jsfiles.length} комманд`);
  jsfiles.forEach((f, i) => {
    let props = require(`./cmds/${f}`);
    console.log(`${i+1}.${f} Загружен!`);
    bot.commands.set(props.help.name, props);
  })

});

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
  console.log(`Бот запустился! ${bot.user.username}`);
  bot.generateInvite(['ADMINISTRATOR']).then(link => {
    console.log(link);
  })
});

bot.on('guildMemberAdd', (member) => {
  let role = member.guild.roles.find(r => r.name === "Незнакомец");
  member.addRole(role);
});

bot.on('message', async message => {
  if (message.author.bot) return;
  if (message.channel.type == "dm") return;
  let uid = message.author.id;
  if (!profile[uid]) {
    profile[uid] = {
      coins: 10,
      warns: 0,
      xp: 0,
      lvl: 0
    };
  };
  let u = profile[uid];
  u.coins++;
  u.xp++;
  if (u.xp >= (u.lvl * 5)) {
    u.xp = 0;
    u.lvl++;
  }
  fs.writeFile('./profile.json', JSON.stringify(profile), (err) => {
    if (err) console.log(err);
  });
  let user = message.author.username;
  let userid = message.author.id;
  bot.send = function (msg) {
    message.channel.send(msg);
  }
  let messageArray = message.content.split(" ");
  let command = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);
  if (!message.content.startsWith(prefix)) return;
  let cmd = bot.commands.get(command.slice(prefix.length));
  if (cmd) cmd.run(bot, message, args);
});

bot.login(token);