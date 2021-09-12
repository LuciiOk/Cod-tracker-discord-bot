const duracion = require('./date');
const Discord = require('discord.js')

module.exports = (data, name, msg) => {
    let Embed = new Discord.MessageEmbed()
        .setAuthor(msg.member.displayName, msg.author.avatarURL())
        .setTitle(`Estadisticas de  **${name}**`)
        .setDescription('Warzone stats')
        .setColor(0xff0000)
        .setThumbnail('https://assets-global.website-files.com/5ef615e9762a35568441456c/604ea4f30c8132cbce422178_Warzone%20guild%20logo.png')
        .addFields(
            { name: 'KDR', value: data.kdRatio.toFixed(2), inline: true},
            { name: 'Bajas', value: JSON.stringify(data.kills), inline: true},
            { name: 'Muertes', value: JSON.stringify(data.deaths), inline:true},
            { name: 'Tiempo Jugado', value: duracion(JSON.stringify(data.timePlayed))},
            { name: 'Victorias', value: JSON.stringify(data.wins), inline: true},
            { name: 'Top 5', value: JSON.stringify(data.topFive), inline: true},
            { name: 'Top 10', value: JSON.stringify(data.topTen), inline: true},
        )
        .setTimestamp()
        .setFooter('Creado por Lucio');    
    return Embed;
}