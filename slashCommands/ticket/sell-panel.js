const { ApplicationCommandType, EmbedBuilder, ButtonBuilder, ActionRowBuilder,SelectMenuBuilder } = require('discord.js');

module.exports = {
    name: "sell-panel",
    usage: '/sell-pannel <channel>',
	description: "Send pannel to create sell ticket",
	type: ApplicationCommandType.ChatInput,
    category: "info",
    options: [
        {
            name: 'channel',
            description: 'Channel who send pannel',
            type: 7,
            usage: '**/sell-pannel**',
            channelTypes: ["GUILD_TEXT"],
            required: true
        }
    ],
	run: async (client, interaction) => {
        const channel = interaction.options.getChannel("channel");

        const embed = new EmbedBuilder()
        .setTitle("__SELL CRYPTO__")
        .setColor(0xFF0)
        .setFooter({ text: 'Cibertex', iconURL: client.user.displayAvatarURL()})
        .setDescription("Interested in selling Crypto ?\nFill out the form and a staff member will get back to you as soon as possible\n Click the corresponding reaction to open a ticket!")

        const selectCyrptoRow = new ActionRowBuilder()
        .addComponents(
            new SelectMenuBuilder()
                .setCustomId('select')
                .setPlaceholder(`Select your crypto to sell`)
                .addOptions([
                    {
                        label: 'BUSD',
                        description: `Sell BUSD`,
                        value: 'create-ticket-busd-sell',
                    },
                    {
                        label: 'USDT',
                        description: `Sell USDT`,
                        value: 'create-ticket-usdt-sell',
                    },
    
                ]),
        );
        interaction.reply({ content: `Le pannel de ticket a été envoyé dans le channel > ${channel}!`, ephemeral: true });
        return channel.send({ embeds: [embed], components: [selectCyrptoRow] });
	}
};