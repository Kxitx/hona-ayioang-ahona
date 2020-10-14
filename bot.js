const Discord = require('discord.js');
const client = new Discord.Client();
var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
    clientId: '25318fa494ae47b49a1a3a2eeb73dbea',
    clientSecret: '19ab97432fe34ddb971165585bcafbea',
    redirectUri: 'https://discord.com/api/oauth2/authorize?client_id=723257649055006740&scope=bot&permissions=37026304'
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.content.startsWith("&")) {
        var command = msg.content.split(" ");

        if (command[1] === "play") {
            play(msg);
        }

    }
});

function play(msg) {
    const voiceChannel = msg.member.voice.channel;
    if (!voiceChannel)
        return msg.channel.send(
            "You need to be in a voice channel to play music!"
        );
    const permissions = voiceChannel.permissionsFor(msg.client.user);
    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return msg.channel.send(
            "I need the permissions to join and speak in your voice channel!"
        );
    }

    var info = msg.content.split(" ")[2];


}

client.login('NzIzMjU3NjQ5MDU1MDA2NzQw.XuvANA.CP2Yjx5biHSe24yi02OdBDhQpcQ');