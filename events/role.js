const client = require('..');
const { EmbedBuilder}  = require('discord.js');
const {first_role, second_role, third_role, four_role} = require('../config.json');

client.on('interactionCreate', async interaction => {
    try {
        if (!interaction.isSelectMenu()) return;

        const roleEmbed = (role) => {
            const embedSuccess = new EmbedBuilder()
            .setTitle('Role ajouté !')
            .setDescription(`<@${interaction.member.user.id}>, tu obtiens le rôle <@&${role.id}>!`)
            .setThumbnail(interaction.member.displayAvatarURL())
            .setTimestamp()
            .setColor(0x0099FF);
            return interaction.channel.send({embeds: [embedSuccess], ephemeral: true});
        }
        //Create object for iterate on each customId on our SelectMenu.
        var items = [
            {id: 1, name: "first_role", idRole: first_role},
            {id: 2, name: "second_role", idRole: second_role},
            {id: 3, name: "third_role", idRole: third_role},
            {id: 4, name: "four_role", idRole: four_role}
        ];
        //Add our objects into Array.
        let customIdArray = [items[0], items[1], items[2], items[3]];

        //Instead of duplicate *interaction.values[0]===''...*, we iterate.
        customIdArray.forEach(async(element)=> {
            if(interaction.values[0] === element.name) {
                let role = interaction.guild.roles.cache.find(r => r.id === element.idRole);
                if(interaction.member.roles.cache.has(role.id)) {
                    return interaction.reply({content: `Tu as déjà le rôle <@&${role.id}>  !`, ephemeral: true});
                }
                await interaction.member.roles.add(role).then(async()=> await roleEmbed(role));
            }
        });
    }
    catch(err) {
        console.log(err);
        return interaction.reply(`Une erreur a eu lieu:\n${err}`);
    }
});