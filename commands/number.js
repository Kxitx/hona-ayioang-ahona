const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('number')
		.setDescription("Translates numbers from Na'vi to English and the other way around")
        .addSubcommand(subcommand =>
            subcommand
                .setName('to-english')
                .setDescription("Enter a Na'vi number word to translate it to English")
                .addStringOption(option =>
                    option.setName('number')
                        .setDescription("The Na'vi number you want to translate")
                        .setRequired(true)))
        .addSubcommand(subcommand =>
            subcommand
                .setName("to-navi")
                .setDescription("Enter an English number to translate it into a Na'vi number word")
                .addIntegerOption(option =>
                    option.setName('number')
                        .setDescription("The English number you want to translate")
                        .setRequired(true))),

	async execute(interaction) {
        if (interaction.options.getSubcommand() === 'to-english') {
            const string = interaction.options.getString('number');
            //await interaction.reply("Actually this command doesn't do anything. I'm just testing out slash commands atm.");
            
            words=[["kew","'aw", "mune", "pxey", "tsìng", "mrr", "pukap", "kinä", "vol"], ["aw", "mun", "pey", "sìng", "mrr", "fu", "hin"], ["me", "pxe", "tsì", "mrr", "pu", "ki"], ["vol", "zam", "vozam", "zazam"], ["vo", "za", "voza", "zaza"]];
            zahl = interaction.options.getString('number');
            zahl = zahl.toLowerCase();
            const number = zahl;
            erg = 0;

            //addds extra information when needed
            var tìsung = "";

            if(zahl.endsWith("a")) {
                zahl = zahl.substr(0, zahl.length-1);
                tìsung = "\n*Note: The `a` at the end of your number is not part of the number word itself but just connects it to the noun it belongs to*"
            } 
            if(zahl.startsWith("a")) {
                zahl = zahl.substr(1, (zahl.length));
                tìsung = tìsung + "\n*Note: The `a` at the beginning of your number is not part of the number word itself but just connects it to the noun it belongs to*"
            }

            var count = (number.match(/zam/g) || []).length;
            var count2 = (number.match(/zamaw/g) || []).length + (number.match(/zamun/g) || []).length + (number.match(/zame/g) || []).length + (number.match(/zamrr/g) || []).length;
            if(zahl.endsWith("zam")) {
                count2++;
            }

            var l = false;
            if(number.includes("vol")) {
                if(!number.endsWith("vol") && !number.endsWith("volaw")) {
                    l = true;
                }
            }

            //Does what it actually should do, at least sometimes
            for (var i = 0; i < words[0].length-1; i++) {
                if(zahl===words[0][i]) {
                    erg = i;
                }  
            }

            for (var i = 0; i < words[1].length; i++) {
                if(zahl.endsWith(words[1][i])) {
                    erg = i+1;
                    zahl = zahl.substr(0, zahl.length-words[1][i].length);
                }  
            }
            var b = true;
            for (var i = 0; i < 4; i++) {
                if(zahl.endsWith(words[3][i]) || zahl.endsWith(words[4][i])) {
                    if(zahl.endsWith("vozazam") || zahl.endsWith("zazazam")) {
                        zahl = zahl.substr(0, zahl.length-3);
                        erg = erg + 64;
                    } else if(zahl.endsWith("vozaza") || zahl.endsWith("zazaza")) {
                        zahl = zahl.substr(0, zahl.length-2);
                        erg = erg + 64;
                    }else if(!((i===1) && (zahl.endsWith(words[3][i+2]) || zahl.endsWith(words[4][i+2]) || zahl.endsWith(words[3][i+1]) || zahl.endsWith(words[4][i+1])))) {
                        if(zahl.endsWith(words[3][i])) {
                            zahl = zahl.substr(0, zahl.length-words[3][i].length);
                        } else {
                            zahl = zahl.substr(0, zahl.length-words[4][i].length);
                        }
                    
                        for (var j = 0; j < words[2].length; j++) {
                            if(zahl.endsWith(words[2][j])) {
                                b = false;
                                zahl = zahl.substr(0, zahl.length-words[2][j].length);
                                erg = erg + Math.pow(8, i+1)*(j+2);
                            }
                            if(j===5 && b) {
                                erg = erg + Math.pow(8, i+1);
                            }
                        }
                        b = true;
                    }  
                }
            }
            for (var i = 0; i < words[3].length; i++) {
                if(zahl.endsWith(words[3][i])) {
                    if(zahl.endsWith("vozazam") || zahl.endsWith("zazazam")) {
                        zahl = zahl.substr(0, zahl.length-3);
                        erg = erg + 64;
                    } else {
                        zahl = zahl.substr(0, zahl.length-words[3][i].length);
                        for (var j = 0; j < words[2].length; j++) {
                            if(zahl.endsWith(words[2][j])) {
                                zahl = zahl.substr(0, zahl.length-words[2][j].length);
                                erg = erg + Math.pow(8, i+1)*(j+2);
                            }
                        }
                    }
                } else if(zahl.endsWith(words[4][i])) {
                    if(zahl.endsWith("vozaza") || zahl.endsWith("zazaza")) {
                        zahl = zahl.substr(0, zahl.length-2);
                        erg = erg + 64;
                    } else {
                        zahl = zahl.substr(0, zahl.length-words[4][i].length);
                        for (var j = 0; j < words[2].length; j++) {
                            for (var j = 0; j < words[2].length; j++) {
                                if(zahl.endsWith(words[2][j])) {
                                    zahl = zahl.substr(0, zahl.length-words[2][j].length);
                                    erg = erg + Math.pow(8, i+1)*(j+2);
                                }
                            }
                        }
                    }
                }
            }

            //more additions - too many m's
            if(count > count2) {
                correct = tonavi(erg);
                tìsung = tìsung + "\n*Note: `zazam`, `vozam` and `zam` loose their -m when something else than `aw` follows. The correct word is:* **" + correct[3] + "**";
            }
            
            //and more additions - wrong "l"
            if(l) {
                correct = tonavi(erg);
                tìsung = tìsung + "\n*Note: `vol` looses the -l when something else than `aw` follows. The correct word is:* **" + correct[3] + "**";
            }

            await interaction.reply('**Your number: ' + number + '**\n' + "Result: " + erg + tìsung);
        
            /*const embed = new MessageEmbed()
                    .setTitle('Your number: ' + command[1])
                    .setColor(0x000000)
                    .setThumbnail(msg.author.avatarURL())
                // Set the main content of the embed
                .setDescription("Result: " + erg);
            msg.channel.send(embed)*/
        







            
        } else if (interaction.options.getSubcommand() === 'to-navi') {
            const number = interaction.options.getInteger('number');

            result = tonavi(number);
            if(result === "error") {
                interaction.reply('**Ngaytxoa!**\nTsrezì does not convert negative numbers. He is a Riti. He only has time for the positive things in life.');
            }else {
                interaction.reply('**Your number: ' + number + result[0] + '**\n\n' + result[1] + '\n -> **Octal number:** ' + result[2] + "\n**Na'vi word:** " + result[3]);
            }
        }
    },
};

function tonavi(number) {
    z = number
    oct = 0;
    text = "";
    i = 1;
    if(z<0) {
                /*const embed = new MessageEmbed()
                .setTitle('Ngaytxoa!')
                .setColor(0x000000)
                .setThumbnail(interaction.user.avatar)
                // Set the main content of the embed
                .setDescription("Tsrezì does not convert negative numbers. He is a Riti. He only has time for the positive things in live.");*/
        return "error";
    } else {
        while(z != 0) {
            r=z%8;
            z=Math.floor(z/8);
            oct = oct + r*i;
            i*=10;
        }
        oct2=oct;
        words=[["kew","'aw", "mune", "pxey", "tsìng", "mrr", "pukap", "kinä", "vol"], ["aw", "mun", "pey", "sìng", "mrr", "fu", "hin", "vol"], ["", "", "me", "pxe", "tsì", "mrr", "pu", "ki", "vo"], ["vol", "zam", "vozam", "zazam"], ["vo", "za", "voza", "zaza"]];

        res="";
        if(oct<=8) {
            res=words[0][oct]
            text = "(**" + oct + "**x1) = " + number;
        }else if(oct>77777) {
            res="Numbers bigger than 77777(octal)/32767(decimal) can't be translated with the currently existing Na'vi words."
        }else{
            y=0;
            x=true;
            while(oct!=0) {
                z = oct%10; //get the next digit

                //continue the explanation text
                if(y!=0) {
                    text = " + " + text;
                }
                text = "(**" + z + "**x" + Math.pow(8, y) + ")" + text;

                //deletes last digit from number so next round the next digit will be done
                oct = Math.floor(oct/10);

                //if the current digit is more than 0, a word needs to be there
                if(z>0) {
                    if(y===0) {
                        res=words[1][z-1];
                    } else {
                        if(x) { //if x is true that means that all following digits are 0 or 1, so we need to use vol/zam/zazam/vozam instead of vo/za/zaza/voza
                            res=words[2][z] + words[3][y-1] + res;
                        } else {
                            res=words[2][z] + words[4][y-1] + res;
                        }
                    }

                    if((z>1 & y===0) || z>0 & y>0) {
                        x=false;
                    };  
                }   
                y++;
            }
            text = text + " = " + number;
        } 
        text2="";
        return [text2, text, oct2, res];
        //return '**Your number: ' + number + text2 + '**\n\n' + text + '\n -> **Octal number:** ' + oct2 + "\n**Na'vi word:** " + res;
  }}