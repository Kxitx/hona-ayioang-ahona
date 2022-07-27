const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('question')
		.setDescription('Ask Tsrezì, get a totally usefull and of course correct answer!')
		.addStringOption(option =>
            option.setName('question')
                .setDescription("What do you want to know? Ask a yes/no question!")
                .setRequired(true)),
	async execute(interaction) {

		answers= [
			"Srane",
			"Kehe",
			"Srankehe",
			"Ke omum",
			"Oeru ke'u",
			"Ftang pivawm sìpawmit a ke tsranten ulte tìng oeru **pizza**ti!!!!",
			"Kxawm",
			"Ke new 'iveyng oe",
			"Mrrvomun",
			"Ke tsranten",
			"Kezemplltxe",
			"Krro krro",
			"Teylupil",
			"Pela'ang?",
			"Pelun nga new ivomum?",
			"Sran sran ma eyktan!",
			"Spantsìpap Skuwerpäntsì!",
			"Nga ke new ivomum tì'eyngit.",
			"Sranänge",
			"Sraneie",
			"🎵 Oel new tsat tsaaaaaafyaaaa 🎵"
		],
		question = interaction.options.getString('question');
		answer = answers[Math.floor(Math.random() * answers.length)];
        await interaction.reply(question + "\n**" + answer + "**");

	},
};