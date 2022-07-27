const { SlashCommandBuilder } = require('@discordjs/builders');
const wordlists = require('../wordlists.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('wordlist')
		.setDescription('Tsrezì shows you some usefull vocab for different topics')
        .addStringOption(option =>
            option.setName('topic')
                .setDescription("Which topic do you want a wordlist about?")
                .setRequired(true)
                .addChoice('Beginner', 'beginner')
			    .addChoice('Verbs', 'verbs')
                .addChoice('Body', 'body')
			    .addChoice('People', 'people')
                .addChoice('Family', 'family')
                .addChoice('Weather', 'weather')
                .addChoice('Food', 'food')
                .addChoice('Nature', 'nature')
			    .addChoice('Pandora', 'pandora')
                .addChoice('For InfinityEnergy', 'insults')),
	async execute(interaction) {

        topic = interaction.options.getString('topic');
        let wl;
            if (topic === "beginner") {
                wl = wordlists.beginner;
            } else if (topic === "verbs") {
                wl = wordlists.verbs;
            } else if (topic === "pandora") {
                wl = wordlists.pandora;
            } else if (topic === "body") {
                wl = wordlists.body;
            } else if (topic === "people") {
                wl = wordlists.people;
            } else if (topic === "insults") {
                wl = wordlists.insults;
            } else if (topic === "nature") {
                wl = wordlists.nature;
            } else if (topic === "food") {
                wl = wordlists.food;
            } else if (topic === "weather") {
                wl = wordlists.weather;
            } else if (topic === "family") {
                wl = wordlists.family;
            }
            let text = "";


                //show wordlist
            
                for (let i = 0; i < wl.words.length; i++) {
                    word = wl.words[i].split(";");
                    text = text + "**" + word[0] + "** - " + word[1] + "\n";
                }
                if(topic!="insults") {
                    await interaction.reply("Here are some helpfull words about your chosen topic! Note: These are not all words about this topic, Tsrezì just chose the 15 he likes the most.\n\n" + text);
                } else {
                    await interaction.reply(text);
                }
                
            
	},
};