
//Package Imports
const Discord = require('discord.js');
const ytdl = require("ytdl-core");
const chalk = require('chalk');
const { joinVoiceChannel, createAudioPlayer, createAudioResource } = require("@discordjs/voice");
const config = require('./config.json')
const colors = require('colors')
const client = new Discord.Client({
    disableEveryone: true,
    presence: {
        status: 'dnd',
        afk: true,
        activities: [{
            name: config.status,
            type: config.statusttype,
        }],
    },
    intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_MESSAGES', 'GUILD_VOICE_STATES']
});
require(`./clientVars`)(client);
client.on("ready", async () => {
    try {
        const stringlength = 69;
        console.log("\n")
        console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
        console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
        console.log(`     ┃ `.bold.brightGreen + `Discord Bot is online!`.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - `Discord Bot is online!`.length) + "┃".bold.brightGreen)
        console.log(`     ┃ `.bold.brightGreen + ` /--/ ${client.user.tag} /--/ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - ` /--/ ${client.user.tag} /--/ `.length) + "┃".bold.brightGreen)
        console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
        console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)
    } catch { /* */ }

    for (const channelId of client.voices) {
        joinChannel(channelId);
        //wait         
        await new Promise(res => setTimeout(() => res(2), 2000))
    }

    function joinChannel(channelId) {
        client.channels.fetch(channelId).then(channel => {
            //JOIN THE VC AND PLAY AUDIO
            const VoiceConnection = joinVoiceChannel({
                channelId: channel.id,
                guildId: channel.guild.id,
                adapterCreator: channel.guild.voiceAdapterCreator
            });
            //-------------------------------------\\
            const resource = createAudioResource(ytdl(config.stream), {
                inlineVolume: true
            });
            resource.volume.setVolume(0.2);
            const player = createAudioPlayer()

            const stringlength = 69;
            console.log("\n")
            console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
            console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
            console.log(`     ┃ `.bold.brightGreen + `Player is now playing.`.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - `Player is now playing.`.length) + "┃".bold.brightGreen)
            console.log(`     ┃ `.bold.brightGreen + ` /--/ Coders Hangout /--/ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - ` /--/ Coders Hangout /--/ `.length) + "┃".bold.brightGreen)
            console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
            console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)
            console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
            console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
            console.log(`     ┃ `.bold.brightGreen + `Event has been sent!`.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - `Event has been sent!`.length) + "┃".bold.brightGreen)
            console.log(`     ┃ `.bold.brightGreen + ` /--/ Coders Hangout /--/ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - ` /--/ Coders Hangout /--/ `.length) + "┃".bold.brightGreen)
            console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
            console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)

            VoiceConnection.subscribe(player);
            player.play(resource);
            player.on("idle", () => {
                try {
                    console.log(chalk.green(`\n[PLAYER] ${chalk.red(`Player has been stopped.`)}`))
                    player.stop()
                } catch (e) { }
                try {
                    VoiceConnection.destroy()
                } catch (e) { }
                console.log(chalk.green(`\n[PLAYER] ${chalk.red(`Reconnecting...`)}`))
                joinChannel(channel.id)
                console.log(chalk.green(`\n[PLAYER] ${chalk.red(`Reconnected.`)}`))
            })
        }).catch(console.error)
    }
})

client.on("voiceStateUpdate", async (oldState, newState) => {
    if (newState.channelId && newState.channel.type === "GUILD_STAGE_VOICE" && newState.guild.me.voice.suppress) {
        try {
            await newState.guild.me.voice.setSuppressed(false)
        } catch (e) {

        }
    }
})

// ———————————————[Error Handling]———————————————

process.on('unhandledRejection', error => {
    console.error(chalk.red.bold('Unhandled Promise Rejection =>', error));
});

process.on("uncaughtException",error => {
    console.error(chalk.red.bold('Uncaught Exception =>', error));
});

process.on('exit',error => {
    console.error(chalk.red.bold('Exit Code =>', error));
});

process.on('multipleResolves',error => {
    console.error(chalk.red.bold('Multiple Resolves =>', error));
});

if(client.up === true){
    require("./keepalive")(client); 
}

//Log into the client
client.login(config.bot);

