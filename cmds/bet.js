const Discord = module.require("discord.js");
const fs = require("fs");
let profile = require('../profile.json');
const isNumber = require('is-number');

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports.run = async (bot, message, args) => {
    let uid = message.author.id;
    let u = profile[uid];
    let bet = args[0];
    if (isNumber(bet)) {
        if (u.coins < bet) {
            message.reply("На балансе не хватает денег!");
        } else {
            let rand = getRandomIntInclusive(0, 100);
            if (rand > 99) {
                u.coins += bet * 100;
                message.reply(`Вам выпало число ${rand}. ДЖЕКПОТ! Вы выйграли ${bet * 100} монет`);
            } else if (rand > 95) {
                u.coins += bet * 20;
                message.reply(`Вам выпало число ${rand}. Вы выйграли ${bet * 20} монет`);
            } else if (rand > 90) {
                u.coins += bet * 10;
                message.reply(`Вам выпало число ${rand}. Вы выйграли ${bet * 10} монет`);
            } else if (rand > 77) {
                u.coins += bet * 3;
                message.reply(`Вам выпало число ${rand}. Вы выйграли ${bet * 3} монет`);
            } else if (rand > 50) {
                u.coins += bet * 2;
                message.reply(`Вам выпало число ${rand}. Вы выйграли ${bet * 2} монет`);
            } else {
                message.reply(`Вам выпало число ${rand}. Вы проиграли ${bet} монет`);
            }
            u.coins -= bet;
        }
    } else {
        message.reply("Введите корректное значение!");
    }
};

module.exports.help = {
    name: "bet"
}