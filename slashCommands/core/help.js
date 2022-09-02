const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle } = require('discord.js');

module.exports = {
	name: 'help',
	description: "Affiche la liste des commandes disponible",
	cooldown: 3000,
	type: ApplicationCommandType.ChatInput,
    category: "core",
	run: async (client, interaction) => {
        if(!interaction.isCommand()) return;
        const embed = new EmbedBuilder()
            .setColor("#03fcdb")
            .setTitle(`${client.guild}`)
            .setThumbnail("https://i.imgur.com/PGSEC0S.png")
            .setDescription(' Voici la liste complète des commandes disponible ').addFields([
                { name: '<:info:998897408475926558>・Informations', value: '`/help` ➜ Affiche la liste des commandes\n`/ping` ➜ Répond pong' }
            ])
        
        const helpButtons = new ActionRowBuilder()
        .addComponents([
            new ButtonBuilder()
                .setLabel('Site Web')
                .setURL("https://fly-bot.space/")
                .setStyle(ButtonStyle.Link)
                .setEmoji("🌐")
            ]);

        return interaction.reply({ embeds: [embed], components: [helpButtons] });
    }
};
