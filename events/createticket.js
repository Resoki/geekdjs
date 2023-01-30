const client = require("..");
const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ChannelType,
  PermissionFlagsBits,
  SelectMenuBuilder,
} = require("discord.js");
const global = require("../config.json");

client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isSelectMenu()) return;

    if (interaction.values[0] === "create-ticket-busd") {
      let ticketName = `buy-ticket-${interaction.user.username}`.toLowerCase();
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

      await interaction.reply({
        content: `Creating ticket...`,
        ephemeral: true,
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

      await interaction.channel.send({
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
              value: "buy-cash",
              emoji: "🤝",
            },
            {
              label: "Western-Union",
              description: `Buy by wester union`,
              value: "buy-western",
            },
          ])
      );
      const embed = new EmbedBuilder()
        .setTitle("__Buy BUSD, Please select your payment method__")
        .setDescription(
          `Please wait, our professional team will be with you shortly ! \n\n*To close this ticket react with *🔒`
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
    }

    if (interaction.values[0] === "create-ticket-usdt") {
      let ticketName = `buy-ticket-${interaction.user.username}`.toLowerCase();
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

      await interaction.reply({
        content: `Creating ticket...`,
        ephemeral: true,
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

      await interaction.channel.send({
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
              value: "buy-cash",
              emoji: "🤝",
            },
            {
              label: "Western-Union",
              description: `Buy by wester union`,
              value: "buy-western",
            },
          ])
      );

      const buttonClose = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("close-ticket")
          .setLabel("🔒")
          .setStyle(ButtonStyle.Secondary)
      );

      const embed = new EmbedBuilder()
        .setTitle("__Buy USDT, Please select your payment method__")
        .setDescription(
          `Please wait, our professional team will be with you shortly ! \n\n*To close this ticket react with *🔒`
        )
        .setThumbnail(
          "https://www.coinopsy.com/media/img/quality_logo/tether-usdt.png"
        )
        .setColor(0xffff08)
        .setTimestamp()
        .setFooter({
          text: "Cibertex",
          iconURL: client.user.displayAvatarURL(),
        });

      await createdChannel.send({
        content: `${global.ticketsSupportRoles
          .map((m) => `<@&${m}>`)
          .join(", ")}. New Ticket!`,
        embeds: [embed],
        components: [selectRadioRow, buttonClose],
      });
    }

    if (interaction.values[0] === "buy-cash") {
      const embed = new EmbedBuilder()
        .setTitle("__BUY Cash in Person__")
        .setDescription(
          `1. Please enter the amount you want to buy
        Minimum: $ 500 Maximum: No limit\n• Payment available in EUROS/USD\n\n__Meeting requirements__:\n• public places, shopping center, restaurant etc.
        • Open trade - contact us for a meetup location
        • Provide your cell number – we contact you.\n
        Our professional team will be with you soon! Please let us know how we may assist you.\n
To close this ticket react with 🔒
        `
        )
        .setThumbnail(
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Square_Cash_app_logo.svg/1200px-Square_Cash_app_logo.svg.png"
        );

      return interaction.reply({ embeds: [embed] });
    }

    if (interaction.values[0] === "buy-western") {
      const embed = new EmbedBuilder()
        .setTitle("__BUY WesterUnion__")
        .setDescription(
          `1. Please enter the amount you want to buy
        Minimum: $ 500 Maximum: No limit
        • Payment available in Euros
        
        Note:
        • Western Union charges a $40 fee for transfers up to $1500. For larger quantities additional fees may apply.
        
        Please fill the required fields below:
        
        Recipient
        First Name:
        Last Name:
        Country:
        State:
        City:
        
        Our professional team will be with you soon! Please let us know how we may assist you.
        To close this ticket react with  (modifié)
        24 janvier 2023
        
        `
        )
        .setThumbnail("https://cdn-icons-png.flaticon.com/512/217/217427.png");

      return interaction.reply({ embeds: [embed] });
    }

    
    if (interaction.values[0] === "sell-cash") {
      const embed = new EmbedBuilder()
      .setTitle("__SELL Cash in Person__")
        .setDescription(
          `1. Please enter the amount you want to **sell**
        Minimum: $ 500 Maximum: No limit\n• Payment available in EUROS/USD\n\nMeeting requirements:\n• public places, shopping center, restaurant etc.
        • Open trade - contact us for a meetup location
        • Provide your cell number – we contact you.\n
        Our professional team will be with you soon! Please let us know how we may assist you.\n\n
To close this ticket react with 🔒
        `
        )
        .setThumbnail(
          "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Square_Cash_app_logo.svg/1200px-Square_Cash_app_logo.svg.png"
        );

      return interaction.reply({ embeds: [embed] });
    }

    if (interaction.values[0] === "sell-western") {
      const embed = new EmbedBuilder()
        .setTitle("__SELL WesterUnion__")
        .setDescription(
          `1. Please enter the amount you want to **sell**
        Minimum: $ 500 Maximum: No limit
        • Payment available in Euros
        
        __Note__:
        • Western Union charges a $40 fee for transfers up to $1500. For larger quantities additional fees may apply.
        
        Please fill the required fields below:
        
        Recipient
        First Name:
        Last Name:
        Country:
        State:
        City:
        
        Our professional team will be with you soon! Please let us know how we may assist you.
        To close this ticket react with 🔒
        `
        )
        .setThumbnail("https://cdn-icons-png.flaticon.com/512/217/217427.png");

      return interaction.reply({ embeds: [embed] });
    }

    if (interaction.values[0] === "create-ticket-busd-sell") {
      let ticketName = `sell-ticket-${interaction.user.username}`.toLowerCase();
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

      await interaction.reply({
        content: `Creating ticket...`,
        ephemeral: true,
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

      await interaction.channel.send({
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
              description: `Sell by cash`,
              value: "sell-cash",
              emoji: "🤝",
            },
            {
              label: "Western-Union",
              description: `Sell by wester union`,
              value: "sell-western",
            },
          ])
      );
      const embed = new EmbedBuilder()
        .setTitle("__Sell BUSD, Please select your payment method__")
        .setDescription(
          `Please wait, our professional team will be with you shortly ! \n\n*To close this ticket react with *🔒`
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
    }

    if (interaction.values[0] === "create-ticket-usdt-sell") {
      let ticketName = `sell-ticket-${interaction.user.username}`.toLowerCase();
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

      await interaction.reply({
        content: `Creating ticket...`,
        ephemeral: true,
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

      await interaction.channel.send({
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
              description: `Sell by cash`,
              value: "sell-cash",
              emoji: "🤝",
            },
            {
              label: "Western-Union",
              description: `Sell by wester union`,
              value: "sell-western",
            },
          ])
      );
      const embed = new EmbedBuilder()
        .setTitle("__SELL USDT, Please select your payment method__")
        .setDescription(
          `Please wait, our professional team will be with you shortly ! \n\n*To close this ticket react with *🔒`
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
    }

  } catch (err) {
    return interaction.channel.send(`Une erreur a eu lieu:\n${err}`);
  }
});
