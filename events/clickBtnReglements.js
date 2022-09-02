const client = require('..')
const { EmbedBuilder}  = require('discord.js');
const config = require('../config.json');

client.on('interactionCreate', async interaction => {
    try {
        if (!interaction.isButton()) return;

        if(interaction.customId === 'see-address') {
            return interaction.reply({content: `L'address: **0x4135fd5e1cb2d32727c92498446a5170f7d19393**`, ephemeral: true})
        }
        if(interaction.customId === 'btn-accept') {
            let role = interaction.guild.roles.cache.find(r => r.id === config.roleReglement);

            if(interaction.member.roles.cache.has(config.roleReglement)) {
                return interaction.reply({content: `Tu as déjà le rôle <@&${role.id}> !`, ephemeral: true});
            }
           
            const embedSuccess = new EmbedBuilder()
            .setTitle('Le Règlement')
            .setDescription(`<@${interaction.member.user.id}>, tu viens d'accepter le règlement, tu obtiens le rôle <@&${role.id}> !`)
            .setThumbnail(interaction.member.displayAvatarURL())
            .setTimestamp()
            .setColor(0x0099FF);
    
            await interaction.member.roles.add(role.id)
            .then(async()=> {
                await interaction.channel.send({embeds: [embedSuccess], ephemeral: true});
            })
        }
    }
    catch(err){
        return interaction.reply(`Une erreur a eu lieu:\n${err}`);
    }
});