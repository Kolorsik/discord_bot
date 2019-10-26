const Discord = module.require("discord.js");
const fs = require("fs");
let profile = require('../profile.json');

module.exports.run = async (bot, message, args) =>{
    let uid = message.author.id;
    let u = profile[uid];
    message.reply(`Ваш баланс: ${u.coins}`);
};

module.exports.help = {
    name: "balance"
}