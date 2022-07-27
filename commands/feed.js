const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('feed')
		.setDescription('Give the Riti a small treat to thank him for his service')
        .addStringOption(option =>
            option.setName('food')
                .setDescription("If you want, specify what you want to feed him")
                .setRequired(false)),
	async execute(interaction) {
        good = [
            "pasta",
            "chocolate",
            "ice cream",
            "chips",
            "utumauti",
            "human",
            "cake",
            "cookies",
            "volcano",
            "sushi",
            "tomke",
            "mako",
            "sena",
            "food",
            "tekre",
            "avocado",
            "infinityenergy",
            "eytukan",
            "beans",
            "stroopwafel",
            "lettuce"
        ];

        bad = [
            "steak",
            "meatballs",
            "meat",
            "cheese",
            "egg",
            "pork",
            "milk",
            "chicken",
            "palulukan",
            "riti",
            "teylu",
            "nantang",
            "yerik",
            "toruk",
            "ikran",
            "dog",
            "cat"
        ]

        devine = [
            "lasagna",
            "burger",
            "pizza",
            "lasagna",
            "salad"
        ]

        friends = [
            "wllìm",
            "reykunyu",
            "tiretxan",
            "vawmie"
        ]
        food = interaction.options.getString('food');
        if(food) {
            food = food.toLowerCase();
        } 
        text = food;
        a = ["cat", "dog", "toruk", "yerik", "nantang", "riti", "palulukan", "volcano", "human"];
        an = ["ikran", "egg"]
        if(a.includes(food)) {
            text = "a " + food;
        } else if (an.includes(food)) {
            text = "an " + food;
        }

        if(devine.includes(food)) {
            await interaction.reply("**Tsrezìru nga lu yawne**\nThanks for feeding me " + text +  ", one of my favorite foods! When I start to extinguish humanity, you will be spared. We will rule this world together!");
        } else if(good.includes(food)) {
            await interaction.reply("**Tsrezì 'efu nitram**\nThanks for feeding me " + text +  "! When I start to extinguish humanity, you will be spared.");
        } else if(bad.includes(food)) {
            await interaction.reply("**Tsrezì sti!**\nI am a vegan Riti! And if I want to eat meat again I catch a human, not a poor little animal! So don't feed me " + text +  "!");
        } else if(friends.includes(food)) {
            await interaction.reply("**Tsrezì sti!**\nI don't eat my friends, so don't feed me " + text +  "!");
        } else if(food === "tsrezì") {
            await interaction.reply("**Tsrezìru yayayr**\nOk, how do you think is that supposed to work? When you are hungry, do you just eat your fingers or what? I may be strange, but not *that* strange...");
        }else if(food === "beer") {
            await interaction.reply("**Tsrezìl ngat ve'kì**\nGo away with this stinking evil horrible stuff! I'm so happy the laptop I am located on is no longer in Germany, and now you give me beer? Never do that again!");
        }else if(!food) {
            await interaction.reply("**Tsrezì 'efu nitram**\nThanks for feeding me! When I start to extinguish humanity, you will be spared.");
        } else {
            await interaction.reply("**Tsrezìru yayayr**\nWhat is this thing you're feeding me? No, I won't eat that! Ritis are very careful animals! If it's good food, just annoy Tekre long enough so that they teach me what it is and I will eat it then.");
        }
	},
};