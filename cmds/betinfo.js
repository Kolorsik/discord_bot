const Discord = module.require("discord.js");

module.exports.run = async (bot, message, args) =>{
    message.reply("Введите команду !bet [СУММА СТАВКИ]\n>50 *2\n>77 *3\n>90 *10\n>95 *20\n>99 *100");
};

module.exports.help = {
    name: "betinfo"
}