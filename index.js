const embed1 = require('./lib/embed.js');
const query = require('./lib/query.js')
const express = require('express');
const axios = require('axios');
require('dotenv').config();
const Discord = require('discord.js');

const app = express();

const client = new Discord.Client({
    intents: ["GUILD_MESSAGES", "GUILDS", "GUILD_PRESENCES"]
});

client.on("message", msg => {
    let commandBody = msg.content;

    if (commandBody.charAt(0) === '_') {
        let args = commandBody.split(' ');
        let command = args.shift().toLowerCase();

        if (command === "_stats") {
            axios.request(query).then(function (response) {
                let newEmbed = embed1(response.data.br, args, msg);
                msg.reply({ embeds: [newEmbed] });
            }).catch(function (error) {
                msg.reply('Usuario no encontrado o su perfil es privado.')
            });
        }
    }
})

client.login(process.env.DISCORD_TOKEN)

app.listen(process.env.port || 5079, () => {
    console.log('funcionando..')
})