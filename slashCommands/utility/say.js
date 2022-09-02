const { ApplicationCommandType,  
        ApplicationCommandOptionType, 
        EmbedBuilder, 
        InteractionType,
        PermissionsBitField }  = require('discord.js');

module.exports = {
	name: 'say',
	description: "Faire parler le bot",
	type: ApplicationCommandType.ChatInput,
    category: "utility",
	cooldown: 3000,
    options: [{
        name: 'phrase',
        description: 'Le mot/phrase que le bot dira',
        type: ApplicationCommandOptionType.String,
      }],
	run: async (client, interaction) => {
        try {
            if(!interaction.isCommand()) return;
            if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
                return interaction.reply(`Tu n'as pas la permission de faire parler le bot !`)
            }

            const phrase = interaction.options.getString('phrase');

            const embedSuccess = new EmbedBuilder()
            .setDescription(`**${phrase}** `)
            .setColor(0x0099FF)
            .setFooter({ text: `By ${interaction.member.user.username}`, iconURL: `${client.user.displayAvatarURL()}` });

		return interaction.reply({ embeds: [embedSuccess] });
        }
        catch(err) {
            return interaction.reply(`Une erreur a eu lieu:\n${err}`);
        }
	}
};