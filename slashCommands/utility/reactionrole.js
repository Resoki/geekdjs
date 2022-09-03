const { ApplicationCommandType,  
    ApplicationCommandOptionType, 
    EmbedBuilder, 
    PermissionsBitField, 
    ActionRowBuilder, 
    SelectMenuBuilder }  
= require('discord.js');
    
module.exports = {
    name: 'menud',
    description: "Envoyer le pannel de reaction role !",
    type: ApplicationCommandType.ChatInput,
    category: "utility",
    cooldown: 3000,
    options: [{
        
        name: 'titre',
        description: 'Le titre du pannel.',
        type: ApplicationCommandOptionType.String,
        required: true
    },
    {
        
        name: 'description',
        description: 'La description du pannel',
        type: ApplicationCommandOptionType.String,
        required: true
    },
    {
        
        name: 'role',
        description: 'La description du pannel',
        type: ApplicationCommandOptionType.Role,
        required: true
    },
    {
        
        name: 'channel',
        description: 'Le channel où envoyer le pannel.',
        type: ApplicationCommandOptionType.Channel,
        required: false
    }],
    run: async (client, interaction) => {
        try {
            if(!interaction.isCommand()) return;
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
                return interaction.reply(`Tu n'as pas la permission d'envoyer le pannel de reaction role !'`);
            }

            const channel = interaction.options.getChannel('channel');
            const title = interaction.options.getString('titre');
            const description = interaction.options.getString('description');
            const roles = interaction.options.getRole('role');

            const row = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId('select')
                    .setPlaceholder('Nothing selected')
                    .addOptions(
                        {
                            label: '⚔️ Role1',
                            description: 'This is a description',
                            value: 'first_role',
                        },
                        {
                            label: '🧻 Role2',
                            description: 'This is also a description',
                            value: 'second_role',
                        },
                        {
                            label: '📝 Role3',
                            description: 'This is also a description',
                            value: 'third_role',
                        },
                        {
                            label: '💘 Role4',
                            description: 'This is also a description',
                            value: 'four_role',
                        },
                    ),
            );

            const embedSuccess = new EmbedBuilder()
            .setTitle(`${title}`)
            .setDescription(`${description}`)
            .setThumbnail('https://actualnewsmagazine.com/wp-content/uploads/2022/06/1655809998_Comment-redemarrer-Discord-980x400.jpg')
            .setColor(0x0099FF);

            if(!channel) return interaction.reply({embeds: [embedSuccess], components: [row]});
            
            const msg = await interaction.channel.send(`Le pannel a été envoyé dans: <#${channel.id}>`);
            setTimeout(async()=> await msg.delete(), 3000);

        return channel.send({ embeds: [embedSuccess], components: [row] });
        }
        catch(err) {
            return interaction.reply(`Une erreur a eu lieu:\n${err}`);
        }
    }
};