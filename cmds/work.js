const Discord = module.require("discord.js");
const fs = require("fs");
let profile = require('../profile.json');

module.exports.run = async (bot, message, args) =>{
    message.channel.send('pong!');
    var interval = setInterval (function () {
        message.channel.send("123")
        .catch(console.error);
    }, 1 * 1000); 
};

module.exports.help = {
    name: "work"
}