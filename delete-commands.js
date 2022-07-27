require('dotenv').config();

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId_test, token } = require('./config.json');
    
const rest = new REST({ version: '9' }).setToken(token);
rest.get(Routes.applicationGuildCommands(clientId, guildId_test))
    .then(data => {
        const promises = [];
        for (const command of data) {
            const deleteUrl = `${Routes.applicationGuildCommands(clientId, guildId_test)}/${command.id}`;
            promises.push(rest.delete(deleteUrl));
        }
        return Promise.all(promises);
    });
