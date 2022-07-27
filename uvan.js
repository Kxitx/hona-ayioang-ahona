const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("uvan")
		.setDescription('Get random letters, create a word, win!')
        .addIntegerOption(option =>
            option.setName('number')
                .setDescription("How many letters do you want to have?")
                .setRequired(false)),
	async execute(interaction) {

		letters= [
			"a",
			"ay",
			"i",
			"ì",
			"o",
			"u",
			"e",
			"ew",
			"ey",
			"f",
			"h",
			"y",
			"k",
			"l",
			"ll",
			"m",
			"n",
			"p",
			"px",
			"r",
			"rr",
            "s",
            "t",
            "ts",
            "tx",
            "v",
            "w",
            "z",
            "'",
            "ä",
            "ng"
		];
        console.log(interaction);

        let number = 10;
        if(interaction.options.getInteger("number")) {
            number = interaction.options.getInteger('number');
        }

        let array = [];
		for (let i = 0; i < number; i++) {
            array[i] = letters[Math.floor(Math.random() * letters.length)];
        }
		
        var answer = "**Create a word with the following letters:** ";

        for (let i = 0; i < number; i++) {
            answer = answer + array[i] + ", ";
        }
        answer = answer.slice(0, -2);

        const filter = m => {
            if (m.content === "test") {
                return true;
            } else {
                return false;
            }
        }
        await interaction.reply(answer).then((message) => {
            message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
            .then(collected => {
                word = collected.first().content;
                message.channel.replay(word);
            })
            .catch(e => {
                console.log(e);
            });
        })

	},
};