const express = require('express');
const axios = require('axios');
require('dotenv').config();
const Discord = require('discord.js');

const app = express();

const duracion = (mss) => {
    let day = 86400;
    let hour = 3600;
    let minute = 60;

    let daysout = Math.floor(mss / day);
    let hoursout = Math.floor((mss - daysout * day)/hour);
    let minutesout = Math.floor((mss - daysout * day - hoursout * hour)/minute);
    return daysout + " días " + hoursout + " horas " + minutesout + " minutos ";
}

const client = new Discord.Client({
    intents: ["GUILD_MESSAGES", "GUILDS", "GUILD_PRESENCES"]
});

client.on("message", msg => {
    let commandBody = msg.content;

    if (commandBody.charAt(0) === '_') {
        let args = commandBody.split(' ');
        let command = args.shift().toLowerCase();
        let query = {
            method: 'GET',
            url: `https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/${args[0].replace('#', '%23')}/battle`,
            headers: {
            'x-rapidapi-host': process.env.HOST,
            'x-rapidapi-key': process.env.KEY
            }
        };

        if (command === "_stats") {
            axios.request(query).then(function (response) {
                let newEmbed = new Discord.MessageEmbed()
                    .setAuthor(msg.member.displayName, msg.author.avatarURL())
                    .setTitle(`Estadisticas de  **${args}**`)
                    .setDescription('Warzone stats')
                    .setColor(0xff0000)
                    .setThumbnail('https://assets-global.website-files.com/5ef615e9762a35568441456c/604ea4f30c8132cbce422178_Warzone%20guild%20logo.png')
                    .addFields(
                        { name: 'KDR', value: response.data.br.kdRatio.toFixed(2), inline: true},
                        { name: 'Bajas', value: JSON.stringify(response.data.br.kills), inline: true},
                        { name: 'Muertes', value: JSON.stringify(response.data.br.deaths), inline:true},
                        { name: 'Tiempo Jugado', value: duracion(JSON.stringify(response.data.br.timePlayed))},
                        { name: 'Victorias', value: JSON.stringify(response.data.br.wins), inline: true},
                        { name: 'Top 5', value: JSON.stringify(response.data.br.topFive), inline: true},
                        { name: 'Top 10', value: JSON.stringify(response.data.br.topTen), inline: true},
                    )
                    .setTimestamp()
                    .setFooter('Creado por Lucio');
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