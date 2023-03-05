const { ApplicationCommandType, EmbedBuilder, ButtonBuilder, ActionRowBuilder,SelectMenuBuilder } = require('discord.js');

module.exports = {
    name: "openticket",
    usage: '/openticket <votre message>',
	description: "Ouvrir un ticket.",
	type: ApplicationCommandType.ChatInput,
    category: "info",
    options: [
        {
            name: 'message',
            description: 'Message',
            type: 3,
            channelTypes: ["GUILD_TEXT"],
            required: true
        }
    ],
	run: async (client, interaction) => {
        const message = interaction.options.getString("message");
        // GO
        
        let ticketName = `ticket-${interaction.member.user.username}`.toLowerCase();
        let supportRoles = await global.ticketsSupportRoles.map((x) => {
          return {
            id: x,
            allow: [
              PermissionFlagsBits.SendMessages,
              PermissionFlagsBits.AttachFiles,
              PermissionFlagsBits.ManageMessages,
            ],
          };
        });
  
        const createdChannel = await interaction.guild.channels.create({
          name: ticketName,
          type: ChannelType.GuildText,
          topic: `${interaction.user.id}`,
          parent: global.categoryID,
          permissionOverwrites: [
            {
              allow: [
                PermissionFlagsBits.SendMessages,
                PermissionFlagsBits.AttachFiles,
                PermissionFlagsBits.ViewChannel,
              ],
              id: interaction.user.id,
            },
            {
              deny: PermissionFlagsBits.ViewChannel,
              id: interaction.guild.id,
            },
            ...supportRoles,
          ],
        });
  
        await interaction.reply({
          content: `Ticket crée avec success dans ${createdChannel}!`,
          ephemeral: true,
        });
  
        const selectRadioRow = new ActionRowBuilder().addComponents(
          new SelectMenuBuilder()
            .setCustomId("select")
            .setPlaceholder(`Select payment method`)
            .addOptions([
              {
                label: "Cash in person",
                description: `Buy by cash`,
                value: "buy-cash-busd",
                emoji: '🤝',
              },
              {
                label: "Western-Union",
                description: `Buy by wester union`,
                value: "buy-western-busd",
                emoji: '🪙'
              },
            ])
        );
        const embed = new EmbedBuilder()
          .setTitle("__BUY BUSD, Please select your payment method__")
          .setDescription(
            `Please wait, our professional team will be with you shortly ! \n*To close this ticket react with *🔒`
          )
          .setThumbnail(
            "https://i.pinimg.com/originals/0e/17/8a/0e178afcffbb3ddd459c01466238b17d.png"
          )
          .setColor(0xffff08)
          .setFooter({
            text: "Cibertex",
            iconURL: client.user.displayAvatarURL(),
          })
          .setTimestamp();
  
        const buttonClose = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId("close-ticket")
            .setLabel("🔒")
            .setStyle(ButtonStyle.Secondary)
        );
  
        await createdChannel.send({
          content: `${global.ticketsSupportRoles
            .map((m) => `<@&${m}>`)
            .join(", ")}. New Ticket!`,
          embeds: [embed],
          components: [selectRadioRow, buttonClose],
        });
  
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
                    },
                    {
                        label: 'USDT',
                        description: `Buy USDT`,
                        value: 'create-ticket-usdt',
                    },
    
                ]),
        );
        interaction.reply({ content: `Le pannel de ticket a été envoyé dans le channel > ${channel}!`, ephemeral: true });
        return channel.send({ embeds: [embed], components: [selectCyrptoRow] });
	}
};