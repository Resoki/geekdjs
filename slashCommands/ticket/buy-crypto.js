const {  EmbedBuilder, ActionRowBuilder,SelectMenuBuilder , ApplicationCommandType } = require('discord.js');
const global = require('../../config.json');
module.exports = {
    name: "buy-panel",
    usage: '/buy-panel <channel>',
	description: "Vérifiez le ping du bot.",
	type: ApplicationCommandType.ChatInput,
    category: "info",
    options: [
        {
            name: 'channel',
            description: 'Channel où envoyer le panel de ticket',
            type: 7,
            usage: '**/buy-panel**',
            channelTypes: ["GUILD_TEXT"],
            required: true
        }
    ],
	run: async (client, interaction) => {
        const channel = interaction.options.getChannel("channel");

        const embed = new EmbedBuilder()
        .setTitle("__BUY CRYPTO__")
        .setColor(0xFF0)
        .setThumbnail('https://incrypted.com/wp-content/uploads/2022/11/BUSD-vs-USDT-1-scaled.jpg')
        .setImage('https://media.discordapp.net/attachments/1066754552130445344/1073919091804475443/Bannieres-Cibertex-509x51px-Buy-Crypto.png')
        .setFooter({ text: 'Cibertex', iconURL: client.user.displayAvatarURL()})
        .setDescription("Interested in purchasing Crypto ?\n\nFill out the form and a staff member will get back to you as soon as possible\n Click the corresponding reaction to open a ticket!")
        const guild = client.guilds.cache.get(global.guildID); // Remplacez "guild_id_here" par l'ID de votre serveur
        const busd = guild.emojis.cache.find(emoji => emoji.name === 'busd');
        const usdt = guild.emojis.cache.find(emoji => emoji.name === 'usdt');
        console.log('buysd', busd)
        const selectCyrptoRow = new ActionRowBuilder()
        .addComponents(
            new SelectMenuBuilder()
                .setCustomId('select')
                .setPlaceholder(`Select your crypto to buy`)
                .addOptions([
                    {
                        label: 'BUSD',
                        description: `Buy BUSD`,
                        value: 'create-ticket-busd',
                        emoji: busd
                    },
                    {
                        label: 'USDT',
                        description: `Buy USDT`,
                        value: 'create-ticket-usdt',
                        emoji: usdt
                    },
    
                ]),
        );
        interaction.reply({ content: `Le pannel de ticket a été envoyé dans le channel > ${channel}!`, ephemeral: true });
        return channel.send({ embeds: [embed], components: [selectCyrptoRow] });
	}
};