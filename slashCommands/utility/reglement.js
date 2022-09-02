const { ApplicationCommandType,  
        ApplicationCommandOptionType, 
        EmbedBuilder, 
        PermissionsBitField, 
        ActionRowBuilder, 
        ButtonBuilder, 
        ButtonStyle }  
= require('discord.js');

module.exports = {
    name: 'reglements',
    description: "Envoyer le pannel de reglement !",
    type: ApplicationCommandType.ChatInput,
    category: "utility",
    cooldown: 3000,
    options: [{
        name: 'channel',
        description: 'Le channel où envoyer le pannel.',
        type: ApplicationCommandOptionType.Channel,
        required: false
    }],
    run: async (client, interaction) => {
        try {
            if(!interaction.isCommand()) return;

            if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
                return interaction.reply(`Tu n'as pas la permission d'envoyer le pannel de règlement !'`);
            }

            const channel = interaction.options.getChannel('channel');

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('btn-accept')
                        .setLabel(`J'accepte le règlement du Discord`)
                        .setStyle(ButtonStyle.Primary)
                );

            const embedSuccess = new EmbedBuilder()
            .setTitle('Le Règlement')
            .setDescription(`Le règlement peut avoir les règles Modifier ou Ajouter selon les Abus !\n
            N'hésiter pas à consulter de Temps à autres ce salon afin de voir si de nouvelles règles sont Modifier ou ajouter afin
            d'être maintenu au courant !\n
            En vous connectant et en utilisant ce serveur, vous certifiez explicitement avoir lu et accepté le règlement via le bouton ci-dessous !`)
            .setColor(0x0099FF);

            if(!channel) return interaction.reply({ embeds: [embedSuccess], components: [row] });
        
            const msg = await interaction.channel.send(`Le pannel a été envoyé dans: <#${channel.id}>`);

            setTimeout(async()=> await msg.delete() , 3000);

        return channel.send({ embeds: [embedSuccess], components: [row] });
        }
        catch(err) {
            return interaction.reply(`Une erreur a eu lieu:\n${err}`);
        }
    }
};