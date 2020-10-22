//(1) lesson 1: pronounciation
//(2) lesson 2: -l/-t
//(3) help, about, lesson & word lists
//(4) implement word lists
const Discord = require('discord.js');
const { Client, MessageEmbed } = require('discord.js');
const client = new Client();
const texts = require('./texts.json');
const lessons = require('./lessons.json');
const wordlists = require('./wordlists.json');


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    msg.content = msg.content.toLowerCase();
    if (msg.content.startsWith("%")) {
        //getting command parts if there are more then one
        var command = msg.content.split(" ");

        //********************HELP CENTER**********************//
        if (command[0] === "%help" && !command[1]) {
            const embed = new MessageEmbed()
                .setTitle('help')
                .setColor(0x000000)
                .setThumbnail(msg.author.avatarURL())
                // Set the main content of the embed
                .setDescription(texts.help.general);
            msg.channel.send(embed)

            //********************LESSON LIST**********************//
        } else if ((command[0] === "%lesson" || command[0] === "%lessons") && !command[1]) {
            const embed = new MessageEmbed()
                .setTitle('Lesson List')
                .setColor(0x000000)
                .setThumbnail(msg.author.avatarURL())
                // Set the main content of the embed
                .setDescription(texts.lessonList);
            msg.channel.send(embed)
            //********************LISTS OF VOCAB LISTS**********************//
        } else if ((command[0] === "%wordlist" || command[0] === "%wordlists" || command[0] === "%words" || command[0] === "%vocab" || command[0] === "%wl") && !command[1]) {
            const embed = new MessageEmbed()
                .setTitle('Wordlists')
                .setColor(0x000000)
                .setThumbnail(msg.author.avatarURL())
                // Set the main content of the embed
                .setDescription(texts.wordlists);
            msg.channel.send(embed)








            //******************PRONUNCIATION LESSON************************/
        } else if ((command[0] === "%1" || command[0] === "%one" || command[0] === "%'aw" || command[0] === "%pronunciation") && !command[1]) {
            if (!command[1]) {
                const embed = new MessageEmbed()
                    .setTitle('Lesson #01 - Pronounciation')
                    .setColor(0x000000)
                    .setThumbnail(msg.author.avatarURL())
                    // Set the main content of the embed
                    .setDescription(lessons.pronounciation.overview + texts.lessons.startExercise + lessons.pronounciation.exercise);
                msg.channel.send(embed).then(sentMessage => {
                    sentMessage.react("✅");

                    //await reactions
                    const filter = (reaction, user) => {
                        return ['✅'].includes(reaction.emoji.name) && user.id === msg.author.id;
                    };

                    sentMessage.awaitReactions(filter, { max: 1, time: 180000, errors: ['time'] })
                        .then(collected => {
                            const embed = new MessageEmbed()
                                .setTitle('Level Selection')
                                .setColor(0x000000)
                                .setThumbnail(msg.author.avatarURL())
                                // Set the main content of the embed
                                .setDescription(lessons.pronounciation.first.intro + texts.lessons.level + lessons.pronounciation.first.lvlDescription);
                            msg.channel.send(embed).then(sentMessage => {
                                sentMessage.react("1️⃣")
                                    .then(() => sentMessage.react('2️⃣')
                                        .then(() => sentMessage.react('3️⃣')
                                            .then(() => sentMessage.react('4️⃣'))));

                                //await reactions
                                const filter = (reaction, user) => {
                                    return ['1️⃣', '2️⃣', '3️⃣', '4️⃣'].includes(reaction.emoji.name) && user.id === msg.author.id;
                                };

                                sentMessage.awaitReactions(filter, { max: 1, time: 180000, errors: ['time'] })
                                    .then(collected => {
                                        const reaction = collected.first();
                                        let lvl;

                                        if (reaction.emoji.name === '1️⃣') {
                                            lvl = 0;
                                        } else if (reaction.emoji.name === '2️⃣') {
                                            lvl = 1;
                                        } else if (reaction.emoji.name === '3️⃣') {
                                            lvl = 2;
                                        } else if (reaction.emoji.name === '4️⃣') {
                                            lvl = 3;
                                        }
                                        const elements = lessons.pronounciation.first.level[lvl];
                                        let array = ["test", "test", "test", "test", "test"]

                                        for (let i = 0; i < 5; i++) {
                                            while (array[i] === "test") {
                                                word = elements[Math.floor(Math.random() * elements.length)];
                                                if (!array.includes(word)) {
                                                    array[i] = word;
                                                }
                                            }
                                        }
                                        console.log(array);
                                        test(msg, array);
                                    });

                            });
                        });
                });
            }






            //********************L AND T LESSON LESSON**********************//
        } else if ((command[0] === "%landt" || command[0] === "%lt" || command[0] === "%mune" || command[0] === "%2" || command[0] === "%two") && !command[1]) {
            const embed = new MessageEmbed()
                .setTitle('Lesson #02 - L and T ending')
                .setColor(0x000000)
                .setThumbnail(msg.author.avatarURL())
                // Set the main content of the embed
                .setDescription(lessons.lt.overview + texts.lessons.exercises + lessons.lt.exercise);
            msg.channel.send(embed).then(sentMessage => {
                sentMessage.react("1️⃣")
                    .then(() => sentMessage.react('2️⃣')
                        .then(() => sentMessage.react('3️⃣')));

                //await reactions
                const filter = (reaction, user) => {
                    return ['1️⃣', '2️⃣', '3️⃣'].includes(reaction.emoji.name) && user.id === msg.author.id;
                };

                sentMessage.awaitReactions(filter, { max: 1, time: 180000, errors: ['time'] })
                    .then(collected => {
                        const reaction = collected.first();

                        if (reaction.emoji.name === '1️⃣') {
                            transitive(msg);
                        } else if (reaction.emoji.name === '2️⃣') {
                            tlsentences(msg);
                        } else if (reaction.emoji.name === '3️⃣') {
                            console.log("number 3");
                        }
                    });

            });















            //********************TSREZÌ LU TSTUNWIA RITI ATSTUNWI**********************//
        } else if ((command[0] === "%kaltxì" || command[0] === "%kxì" || command[0] === "%about") && !command[1]) {
            const embed = new MessageEmbed()
                .setTitle('Kaltxì!')
                .setColor(0x000000)
                .setThumbnail(msg.author.avatarURL())
                // Set the main content of the embed
                .setDescription(texts.about);
            msg.channel.send(embed)
        } else if ((command[0] === "%hivahaw" && command[1] === "nìmwey") && !command[2]) {
            if (msg.author.id === "429361033446948864") {
                const embed = new MessageEmbed()
                    .setTitle("Hayalovay!")
                    .setColor(0x000000)
                    .setThumbnail(msg.author.avatarURL())
                    // Set the main content of the embed
                    .setDescription(texts.shutdown)
                msg.channel.send(embed).then(m => {
                    client.destroy();
                });
            } else {
                const embed = new MessageEmbed()
                    .setTitle("Kehe!")
                    .setColor(0x000000)
                    .setThumbnail(msg.author.avatarURL())
                    // Set the main content of the embed
                    .setDescription(texts.shutdown1);
                msg.channel.send(embed)
            }
        } else if ((command[0] === "%starve") && !command[1]) {
            const embed = new MessageEmbed()
                .setTitle("Tsrezì sti nìtxan")
                .setColor(0x000000)
                .setThumbnail(msg.author.avatarURL())
                // Set the main content of the embed
                .setDescription(texts.starve);
            msg.channel.send(embed)
        } else if (command[0] === "%bad" && (texts.commnds.bad.includes(command[1]) || !command[1])) {
            const embed = new MessageEmbed()
                .setTitle("Tsrezì sti nìtxan")
                .setColor(0x000000)
                .setThumbnail(msg.author.avatarURL())
                // Set the main content of the embed
                .setDescription(texts.bad);
            msg.channel.send(embed)
        } else if (command[0] === "%pizza" && !command[1]) {
            const embed = new MessageEmbed()
                .setTitle("Tsrezìru nga lu yawne")
                .setColor(0x000000)
                .setThumbnail(msg.author.avatarURL())
                // Set the main content of the embed
                .setDescription(texts.pizza);
            msg.channel.send(embed)
        } else if (command[0] === "%good" && (texts.commnds.good.includes(command[1]) || !command[1])) {
            const embed = new MessageEmbed()
                .setTitle("Tsrezì 'efu nitram")
                .setColor(0x000000)
                .setThumbnail(msg.author.avatarURL())
                // Set the main content of the embed
                .setDescription(texts.good);
            msg.channel.send(embed)
        } else if (command[0] === "%feed" && (texts.commnds.feedbad.includes(command[1]))) {
            const embed = new MessageEmbed()
                .setTitle("Tsrezì sti!")
                .setColor(0x000000)
                .setThumbnail(msg.author.avatarURL())
                // Set the main content of the embed
                .setDescription(texts.feedbad);
            msg.channel.send(embed)
        } else if (command[0] === "%salad" && !command[1]) {
            msg.channel.send("🥗")
        } else if (command[0] === "%feed" && (texts.commnds.feed.includes(command[1]) || !command[1])) {
            let text = texts.feed;
            if (command[1] === "salad") {
                text += " The salad lord will be pleased too!"
            }
            const embed = new MessageEmbed()
                .setTitle("Tsrezì 'efu nitram")
                .setColor(0x000000)
                .setThumbnail(msg.author.avatarURL())
                // Set the main content of the embed
                .setDescription(text);
            msg.channel.send(embed)
            //********************LITTLE TEXT ABOUT TRANSITIVITY***********************/
        } else if ((command[0] === "%transitivity") && !command[1]) {
            const embed = new MessageEmbed()
                .setTitle('Transitivity')
                .setColor(0x000000)
                .setThumbnail(msg.author.avatarURL())
                // Set the main content of the embed
                .setDescription(texts.transitivity);
            msg.channel.send(embed)
        }
    }
});









//**FUNCTIONS AND STUFF; PLEASE DON'T READ, IT IS TOO UGLY FOR THIS WORLD - I MEAN, THE NAME OF THE TWO EXISTING FUNCTION ARE "TEST" AND "TEST2"...*/

async function test(msg, array) {
    for (let i = 0; i < array.length; i++) {
        let promise = new Promise((resolve, reject) => {
            let reaction;
            if (i < 4) {
                content = "**" + array[i] + "**" + lessons.pronounciation.first.next;
                reaction = "✅";
            } else {
                content = "**" + array[i] + "**\n\n*Congratulation! You have reached the end of the exercise!*";
                reaction = "🎉";
            }
            const embed = new MessageEmbed()
                .setTitle('Word number ' + (i + 1) + ' of 5')
                .setColor(0x000000)
                .setThumbnail(msg.author.avatarURL())
                // Set the main content of the embed
                .setDescription(content);
            msg.channel.send(embed).then(sentMessage => {
                sentMessage.react(reaction);

                //await reactions
                const filter = (reaction, user) => {
                    return ["✅"].includes(reaction.emoji.name) && user.id === msg.author.id;
                };

                sentMessage.awaitReactions(filter, { max: 1, time: 360000, errors: ['time'] })
                    .then(collected => {
                        const reaction = collected.first();
                        resolve("true");
                    })
                    .catch(collected => {
                        if (i < 4) {
                            const embed = new MessageEmbed()
                                .setTitle('Exercise ended')
                                .setColor(0x000000)
                                .setThumbnail(msg.author.avatarURL())
                                // Set the main content of the embed
                                .setDescription("<@" + msg.author.id + "> " + texts.lessons.endExercise);
                            msg.channel.send(embed)
                            resolve("false");
                        }
                    });
            });;
        });
        let result = await promise;
        if (result === "false") {
            break;
        }
    }
}

async function test2(msg, array) {
    let correctAnswers = 0;
    for (let i = 0; i < array.length; i++) {
        let promise = new Promise((resolve, reject) => {
            const embed = new MessageEmbed()
                .setTitle('Verb number ' + (i + 1) + ' of 5')
                .setColor(0x000000)
                .setThumbnail(msg.author.avatarURL())
                // Set the main content of the embed
                .setDescription("**" + array[i][0] + "**" + lessons.lt.first.text);
            msg.channel.send(embed).then(() => {
                answers = ["vtr", "vin"];
                const filter = response => {
                    return answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
                };

                msg.channel.awaitMessages(filter, { time: 180000, max: 1, errors: ['time'] })
                    .then(messages => {
                        let answer = "**" + array[i][0] + "** is **" + array[i][1] + "**";
                        if (messages.first().content === array[i][1]) {
                            correctAnswers++;
                            if (i == 4) {
                                answer += "\n\n" + texts.lessons.congrats + " You answered " + correctAnswers + " of 5 correct!"
                            }
                            const embed = new MessageEmbed()
                                .setTitle("Correct!")
                                .setColor(0x000000)
                                .setThumbnail(msg.author.avatarURL())
                                // Set the main content of the embed
                                .setDescription(answer);
                            msg.channel.send(embed)
                        } else {
                            if (array[i][0].includes(" si")) {
                                answer += "\n*Remember: All si-verbs are intransitive!*";
                            }
                            if (i == 4) {
                                answer += "\n\n" + texts.lessons.congrats + " You answered " + correctAnswers + " of 5 correct!"
                            }
                            const embed = new MessageEmbed()
                                .setTitle("Wrong answer")
                                .setColor(0x000000)
                                .setThumbnail(msg.author.avatarURL())
                                // Set the main content of the embed
                                .setDescription(answer);
                            msg.channel.send(embed)
                        }
                        resolve("true");
                    })
                    .catch(() => {
                        const embed = new MessageEmbed()
                            .setTitle('Exercise ended')
                            .setColor(0x000000)
                            .setThumbnail(msg.author.avatarURL())
                            // Set the main content of the embed
                            .setDescription("<@" + msg.author.id + "> " + texts.lessons.endExercise);
                        msg.channel.send(embed)
                        resolve("false");
                    });
            });
        });
        let result = await promise;
        if (result === "false") {
            break;
        }
    }
}


function transitive(msg) {
    const embed = new MessageEmbed()
        .setTitle('Level Selection')
        .setColor(0x000000)
        .setThumbnail(msg.author.avatarURL())
        // Set the main content of the embed
        .setDescription(lessons.lt.first.intro + texts.lessons.level + lessons.lt.first.lvlDescription);
    msg.channel.send(embed).then(sentMessage => {
        sentMessage.react("1️⃣")
            .then(() => sentMessage.react('2️⃣'));

        //await reactions
        const filter = (reaction, user) => {
            return ['1️⃣', '2️⃣'].includes(reaction.emoji.name) && user.id === msg.author.id;
        };

        sentMessage.awaitReactions(filter, { max: 1, time: 180000, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();
                let lvl;

                if (reaction.emoji.name === '1️⃣') {
                    lvl = 0;
                } else if (reaction.emoji.name === '2️⃣') {
                    lvl = 1;
                }
                const elements = lessons.lt.first.level[lvl];
                let array = ["test", "test", "test", "test", "test"]

                for (let i = 0; i < 5; i++) {
                    while (array[i] === "test") {
                        test = true;
                        word = elements[Math.floor(Math.random() * elements.length)].split(" ");
                        for (let j = 0; j < i; j++) {
                            part = array[j][0].split(" ")[0];
                            if (part === word[0]) {
                                test = false;
                            }
                        }
                        if (test) {
                            array[i] = word;
                            if (array[i][1] === "si") {
                                array[i][0] += " si";
                                array[i][1] = "vin"
                            }
                        }
                    }
                }
                console.log(array);
                test2(msg, array);
            });

    });
}
function tlsentences(msg) {
    const embed = new MessageEmbed()
        .setTitle('Level Selection')
        .setColor(0x000000)
        .setThumbnail(msg.author.avatarURL())
        // Set the main content of the embed
        .setDescription(lessons.lt.third.intro + texts.lessons.level + lessons.lt.second.lvlDescription);
    msg.channel.send(embed).then(sentMessage => {
        sentMessage.react("1️⃣")
            .then(() => sentMessage.react('2️⃣'));

        //await reactions
        const filter = (reaction, user) => {
            return ['1️⃣', '2️⃣', '3️⃣', '4️⃣'].includes(reaction.emoji.name) && user.id === msg.author.id;
        };

        sentMessage.awaitReactions(filter, { max: 1, time: 180000, errors: ['time'] })
            .then(collected => {
                const reaction = collected.first();
                let lvl;

                if (reaction.emoji.name === '1️⃣') {
                    lvl = 0;
                } else if (reaction.emoji.name === '2️⃣') {
                    lvl = 1;
                } else if (reaction.emoji.name === '3️⃣') {
                    lvl = 1;
                } else if (reaction.emoji.name === '4️⃣') {
                    lvl = 1;
                }
                const elements = lessons.lt.first.level[lvl];
                let array = ["test", "test", "test", "test", "test"]

                console.log(array);
            });

    });
}

client.login('NzIzMjU3NjQ5MDU1MDA2NzQw.XuvALQ.22ZIZKMSqm9sMaOge13KlyZOTOs');