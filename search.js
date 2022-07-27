const { SlashCommandBuilder } = require('@discordjs/builders');
const fs = require('fs');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('searchexamples')
		.setDescription('Give the Riti a word, and maybe they will give you back some sentences!')
        .addStringOption(option =>
            option.setName('word')
                .setDescription("Enter a Na'vi word")
                .setRequired(true)),
	async execute(interaction) {
        word = interaction.options.getString('word');
        let jsonfile = fs.readFileSync("./sentences.json","utf-8");
        let data = JSON.parse(jsonfile);
        let sentences = [];

        for (let i = 0; i < data.sentences.length; i++) {
            for (let j = 0; j < data.sentences[i]["words"].length; j++) {
                if(data.sentences[i]["words"][j]["word"] === word) {
                    sentences.push(data.sentences[i]);
                }
            } 
        }
        
        let answer = "__Following sentences were found with the word **" + word + "**:__\n\n";
        for (let i = 0; i < sentences.length; i++) {
            answer = answer + "**" + (i+1) + ") " + sentences[i]["Na'vi"] + "** - *" + sentences[i]["English"] + "*\n";
        }
        
        await interaction.reply(answer);
	},
};