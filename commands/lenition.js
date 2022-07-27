const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('lenition')
		.setDescription('Shows an overview about lenition'),
	async execute(interaction) {
        await interaction.reply("**Lenition**\nFollowing letters are influenced by lenition at the beginning of a word:\n\n`px` -> `p`\n`kx` -> `k`\n`tx` -> `t`\n`p` -> `f`\n`k` -> `h`\n`t`/`ts` -> `s`\n`'` -> *disappears, if not before `ll` or `rr`*\n\nLenition is caused by the prefixes `me+`, `pxe+`, `ay+`, `pe+`, all combined forms of those with other prefixes, and the adpositions `mì`, `fpi`, `sko`, `ìlä`, `sre`, `pxisre`, `lisre`, `ro`, `nuä` and `wä`");
	},
};