const Discord = require("discord.js");
const config = require("./config.json");

/**
 * @param {Discord.Client} client 
 */

module.exports = async (client) => {
    client.voices = config.voices;
    client.up = config.keepalive

    console.log(`ClientVars has been loaded`.brightGreen);
}
