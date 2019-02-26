const Discord = require('discord.js');
const client = new Discord.Client();

var prefix = "."

client.login('NTQ5Mzk0MjI3OTUyNjE1NDI1.D1TPcQ.Ex2Hy4fZW0Ao9YDVL9oScjeVaVY');

client.on("ready", () =>{
    client.user.setActivity("Ricoché sur l'eau", {type: "WATCHING"}) 
});

console.log("Connexion en cours...") 
console.log("Connexion Efféctuer !")

//Crash
client.on('message', message => {
    if(message.content === ".stop") { 
        message.delete('.stop')
        message.channel.send(":warning: __**Déconnexion en cours. . .**__ :warning:\nVeuillez faire `.confirm` pour confirmé l'arrêt !");
    }
});
client.on('message', message => {
    if(message.content === ".confirm") {
        message.delete('.confirm')
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(":no_entry: **Vous n'avez pas l'autorisation de le faire** :exclamation:")
        if (message.member.hasPermission('ADMINISTRATOR')) {
            clientInformation
        }
    }
});
//Bienvenue
client.on('guildMemberAdd', member => { 
    member.guild.channels.get('548983695458041879').send(":flag_fr: Bienvenue" + member.user + ", Amuse toi bien !"); 
});
//au revoir
client.on('guildMemberRemove', member => {
    member.guild.channels.get('548983695458041879').send(":ghost: Au revoir" + member.user.username + ", Tu va nous manquez..."); 
})

//Mute kick ban unmute clear 8ball dm embed info sondage
client.on('message', message => {
    if (!message.guild) return
    let args = message.content.trim().split(/ +/g)

    if (args[0].toLocaleLowerCase() === prefix + 'kick') {
        message.delete(".kick")
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(":no_entry: Vous n'avez pas la permmission :no_entry:")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send(":x: Veuillez mentionner un utilisateur :x:")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send(":x: Vous ne pouvez pas kick cette utilisateur !!")
        if (!member.kickable) return message.channel.send(":no_entry: Je peux pas exclure cette utilisateur :no_entry:")
        member.kick()
        message.channel.send(":warning: " + member.user.username + " **a été exclu** :warning:")
    }
    if (args[0].toLocaleLowerCase() === prefix + 'ban') {
        message.delete(".ban")
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(":no_entry: Vous n'avez pas la permmission :no_entry:")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send(":x: Veuillez mentionner un utilisateur :x:")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.owner.id) return message.channel.send(":x: Vous ne pouvez pas kick cette utilisateur !! :x:")
        if (!member.bannable) return message.channel.send(":no_entry: Je peux pas bannir cette utilisateur :no_entry:")
        message.guil.ban(member, {days: 7})
        message.channel.send(":warning: " + member.user.username + " **a été banni** :warning:")
    }
    if (args[0].toLocaleLowerCase() === prefix + "clear") {
        message.delete(".clear")
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(":no_entry: Vous n'avez pas la permmission :no_entry:")
        let count = args[1]
        if (!count) return message.channel.send(':x: Veuillez mettre un nombre de message à supprimer :x:')
        if (isNaN(count)) return message.channel.send(':x: Veuillz indiquer un nombre valide :x:')
        if (count < 1 || count > 100) return message.channel.send(':x: Veuillez indiquer un nombre entre 1 et 100 :x:')
        message.channel.bulkDelete(parseInt(count) + 1)
        message.channel.send(" :tools: Les messages on été supprimer ! :tools: ")
    }
    if (args[0].toLocaleLowerCase() === prefix + 'unmute') {
        message.delete(".unmute")
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(":no_entry: Vous n'avez pas la permission :no_entry: ")
        let member = message.mentions.members.first()
        if (!member) return message.channel.send(":x: Veuillez mentionner un utilisateur :x:")
        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send(":x: Vous ne pouvez pas unmute cette personne ! :x:")
        if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send(":x: Je ne peux pas unmute cette personne ! :x:")
            member.removeRole('Muted')
            message.channel.send(member + 'a été unmute ! :white_check_mark: ')
    }
    if (args[0].toLowerCase() === prefix + "mute") {
        message.delete(".mute")

        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(":no_entry: Vous n'avez pas la permission :no_entry: ")

        let member = message.mentions.members.first()

        if (!member) return message.channel.send(":x: Veuillez mentionner un utilisateur :x:")

        if (member.highestRole.calculatedPosition >= message.member.highestRole.calculatedPosition && message.author.id !== message.guild.ownerID) return message.channel.send(":x: Vous ne pouvez pas mute cette personne ! :x:")

        if (member.highestRole.calculatedPosition >= message.guild.me.highestRole.calculatedPosition || member.id === message.guild.ownerID) return message.channel.send(":x: Vous ne pouvez pas mute cette personne ! :x:")

        let muterole = message.guild.roles.find(role => role.name === 'Muted')

        if (muterole) {

            member.addRole(muterole)

            message.channel.send(member + ' a été mute :white_check_mark:')

        }

        else {

            message.guild.createRole({name: 'Muted', permissions: 0}).then((role) => {

                message.guild.channels.filter(channel => channel.type === 'text').forEach(channel => {

                    channel.overwritePermissions(role, {

                        SEND_MESSAGES: false

                    })

                })

                member.addRole(role)

                message.channel.send(member + ' a été mute :white_check_mark:')

            })

        }

    }
    if (args[0].toLocaleLowerCase() === prefix +'8ball'){

        if (!args[0]) return message.channel.send("Veuillez poser une question :x:")

        let rep = ["Non :x:", "J'ai envie de dormir :zzz:", "Je m'en fou !", "Peut être... :thinking:", "Absolument :interrobang:", "Oui, bien sûr :middle_finger:"];

        let reptaille = Math.floor((Math.random()* rep.length));

        let question = args.slice(0).join(" ");

 

        let embed = new Discord.RichEmbed()

            .setColor("99b0e4")

            .addField("Question:", question)

            .addField("Réponse:", rep[reptaille])

            .setTimestamp()

        message.channel.send(embed)

    }
    if (args[0].toLocaleLowerCase() === prefix + "info") {
        message.delete(".info")
        var embed = new Discord.RichEmbed()
        .setDescription("Information Du Discord")
        .addField("Nom du serveur", message.guild.name)
        .addField("Serveur crée", message.guild.createdAt)
        .addField("Date à la quels vous avez rejoint", message.member.joinedAt)
        .addField("Membre sur ce serveur", message.guild.memberCount)
        .addField("Votre Pseudo", message.member.user + '\n' + message.member.id)
        .setColor("767be0")
        .setTimestamp()
        message.channel.sendEmbed(embed)
    }
    if (args[0].toLocaleLowerCase() === prefix + "dm") {
        message.delete(".dm")
        message.author.createDM().then(channel => {
            channel.send("Bonjour, Je me présente, je suis un bot qui à été crée par " + message.guild.owner + " dans le seul but de modéré et d'amener un peu de fun sur le serveur " + message.guild.name + "! Ce serveur à été crée à la base pour être entre amis mais un jour le créateur c'est dit que t'invité des personnes n'était pas une si mauvaise idée ! Maintenant il cherche à agrandir son serveur et cherche donc des partenaire... Si toi tu as un serveur de plus de 40 personnes d'hésite pas à mp " + message.guild.owner + "il te feraune joie de te répondre ! :wink: Bref asser parlé je te laisse sur le serveur et fait pas de bétise sinon je serais obligé de sanctionnez ...")
        })
    }
    if (args[0].toLocaleLowerCase() === prefix + "embed") {
        message.delete(".embed")
        var embed = new Discord.RichEmbed()
        .setTitle("Frontière")
        .setDescription("Recopié le message suivent `!verif`")
        .setColor("767be0")
        message.channel.sendEmbed(embed)
    }
    if (args[0].toLocaleLowerCase() === prefix + "sondage") {
        message.delete(".sondage")
            let args = message.content.split(" ").slice(1);
            let thingToEcho = args.join(" ")
            var embed = new Discord.RichEmbed()
                .setDescription("Sondage")
                .addField(thingToEcho, "Répondre avec :white_check_mark: ou :x:")
                .setColor("767be0")
                .setTimestamp()
            message.channel.sendEmbed(embed)
            .then(function (message) {
                message.react("❌")
                message.react("✅")
            })
    }
    if (args[0].toLocaleLowerCase() === prefix + "captcha") {
        message.delete(".captcha")
            var embed = new Discord.RichEmbed()
                .setDescription("Captcha AntiRaid")
                .addField("Bienvenue, Pour avoir accès au serveur coché la réaction ✅", "sinon vous allez être bloqué ici !")
                .setColor("767be0")
                .setTimestamp()
            message.channel.sendEmbed(embed)
            .then(function (message) {
                message.react("✅")
            })
    }
});


//Commande Help
client.on('message', message => {
    if(message.content === prefix + 'help') {
        message.delete('.help')
        var embed = new Discord.RichEmbed()
            .setTitle("Help")
            .setDescription("Voici les commandes du bot **❗《ℂ𝕒𝕚𝕝𝕝𝕠𝕦𝕩》❗** !\nLe bot est en développement, des commandes vont être rajouter")
            .addField(":regional_indicator_h:  .help", "Le .help sert à afficher toute les commandes du serveur !")
            .addField(":regional_indicator_m: .helpmod", "Le .helpmod sert à afficher toute les commandes de modération !")
            .addField(":regional_indicator_j: .8ball", "Le .8ball sert à posé une question au bot qui lui va répondre à la question !\n.8ball [Pose la question]")
            .addField(":regional_indicator_i: .info", "Le .info sert à voir les informations sur le serveur et vous !")
            .addField(":regional_indicator_s: .sondage", "Le .sondage sert à faire un sondage !\n.sondage [Posé la question]")
            .addField(":warning: .stop :warning:", "Cette commande est réservé au administrateur !\nCette commande sert à stopper le bot !")
            .setColor("767be0")
            .setTimestamp()
        message.channel.sendEmbed(embed)
    }
    if(message.content === prefix + 'helpmod') {
        message.delete('.helpmod')
        var embed = new Discord.RichEmbed()
            .setTitle("Commande Modération")
            .setDescription("Voici toute les commandes pour la modération.", "Si une commande a un bug, contatcé le fondateur !")
            .addField(":regional_indicator_c: .clear", ".clear [Nombre de message]")
            .addField(":regional_indicator_u: .unmute", ".unmute [Pseudo du membre]")
            .addField(":regional_indicator_m: .mute", ".mute [Pseudo du membre]")
            .addField(":regional_indicator_k: .kick", ".kick [Pseudo du membre]")
            .addField(":regional_indicator_b: .ban", ".ban [Pseudo du membre]")
            .setColor("767be0")
            .setTimestamp()
        message.channel.sendEmbed(embed)
    }
});
