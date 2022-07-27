const fs = require('fs');
const { Client, Collection, Intents, MessageReaction } = require('discord.js');
const { token } = require('./config.json');
const { MessageEmbed } = require('discord.js');

const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_MESSAGE_REACTIONS"], partials: ["CHANNEL", "REACTION", "MESSAGE"] });

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand() && !interaction.isApplicationCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});


client.on('messageCreate', async msg => {
	msg.content = msg.content.toLowerCase();

    if (msg.content.includes("tsrezì")) {
        msg.react("841785864136556597");
    }

	else if (msg.content.includes("futa") || msg.content.includes("fura") || msg.content.includes("fula") || msg.content.includes("fwa") || msg.content.includes("furia") || msg.content.includes("tsawa") || msg.content.includes("tsata") || msg.content.includes("tsaria") || msg.content.includes("tsala") || msg.content.includes("tsara") || msg.content.includes("teynga") || msg.content.includes("tengria") || msg.content.includes("teyngta") || msg.content.includes("teyngla") || msg.content.includes("taluna")) {
        array = ["futa", "fula", "furia", "fura", "fwa", "tsawa", "tsara", "tsala", "tsata", "tsaria", "teyngta", "teyngla", "teynga", "tengria", "taluna", "kuma"];
        testarray = ["", "", ""];
        x = false;
        for(i=0; i<array.length;i++) {
            testarray[0] = array[i];
            for (j = 0; j < array.length; j++) {
                testarray[1] = array[j]
                for (k=0; k < array.length; k++) {
                    testarray[2] = array[k]
                    string = testarray[0] + " " + testarray[1] + " " + testarray[2];
                    if(msg.content.includes(string)) {
                        msg.react("715763189865906206");
                        x = true;
                    }
                }                     
            }
        }
    }
});

client.login(token);


