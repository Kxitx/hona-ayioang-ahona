const https = require('https');
const fs = require('fs');
const { ContextMenuCommandBuilder } = require('@discordjs/builders');

var words = "";

module.exports = {
    data: new ContextMenuCommandBuilder()
        .setName('Add Sentence')
        .setType(3),
    async execute(interaction) {
        const message = await interaction.channel.messages.fetch(interaction.targetId);
        var content = message.content;
        var all = content.split('?').join('§').split('!').join('§').split('.').join("§").split("§");

        const user = interaction.user;

        for (let i = 0; i < all.length; i++) {
            all[i] = all[i].trim();
            if (all[i] === "") {
                all.splice(i, 1);
            }

        }
        console.log(all);

        for (let k = 0; k < all.length; k++) {
            var lìukìng = all[k];

            original = lìukìng;
            lìukìng = lìukìng.replace("?", "");
            lìukìng = lìukìng.replace(",", "");
            let array = lìukìng.toLowerCase().split(" ");
            let translations = [];
            words = "Detected words:\n\n";
            let wordArray = [];

            for (let i = 0; i < array.length; i++) {
                translations[i] = await apicall(array[i]);
                wordArray[i] = await getRoot(translations, user, array, wordArray, i);
            }


            words = words + "\n Please write down the translation:"

            const filter = m => m.author.id === user.id;

            user.send(words).then((message) => {
                message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
                    .then(collected => {
                        user.send("**Na'vi sentence:** " + original + "\n**translation:** " + `${collected.first().content}`);

                        var sentence = [
                            {
                                "Na'vi": original,
                                "English": collected.first().content,
                                "words": wordArray
                            }
                        ];

                        let jsonfile = fs.readFileSync("./sentences.json", "utf-8");
                        let data = JSON.parse(jsonfile);
                        data.sentences.push(sentence[0]);
                        jsonfile = JSON.stringify(data);
                        fs.writeFileSync("./sentences.json", jsonfile, "utf-8");
                    })
                    .catch(e => {
                        console.log(e);
                    });
            });
        }

    }
};

async function apicall(liu) {
    call = "https://reykunyu.wimiso.nl/api/fwew?t%C3%ACpawm=" + liu;

    let promise = new Promise((resolve, reject) => {
        https.get(call, (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk;
            });

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                resolve(JSON.parse(data));
            });
        });
    });

    let elements = await promise;
    return elements;

}

async function getRoot(translations, user, array, wordArray, i) {
    if (translations[i][0]["sì'eyng"][0]) {
        words = words + "**" + translations[i][0]["sì'eyng"][0]["na'vi"] + "** - " + translations[i][0]["sì'eyng"][0]["translations"][0]["en"] + "\n";
        wordArray[i] = {
            "word": translations[i][0]["sì'eyng"][0]["na'vi"],
            "translation": translations[i][0]["sì'eyng"][0]["translations"][0]["en"]
        };
    } else {
        const filter = m => m.author.id === user.id;
        await user.send("Reykunyu could not find a root for **" + array[i] + "**. Pleaser enter `root,translation`. For example: `tìkenong,example`.").then((message) => {
            message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
                .then(collected => {
                    words = words + "**" + collected.first().content.split(",")[0] + "** - " + collected.first().content.split(",")[0] + "\n";
                    wordArray[i] = {
                        "word": collected.first().content.split(",")[0],
                        "translation": collected.first().content.split(",")[0]
                    };
                })
                .catch(e => {
                    console.log(e);
                });
        });
    }
    console.log(wordArray[i]);

    resolve(wordArray[i]);
}