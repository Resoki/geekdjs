const client = require("..");
const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ChannelType,
  PermissionFlagsBits,
} = require("discord.js");
const global = require("../config.json");

client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isSelectMenu()) return;

    if (interaction.values[0] === "create-ticket-one") {
      let ticketName = `ticket-${interaction.user.username}`.toLowerCase();
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
        parent: "822896392157921330",
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

      const embed = new EmbedBuilder()
        .setTitle("__Besoin d'aide__")
        .setDescription(
          `Bonjour <@${interaction.member.user.id}>, votre ticket a été ouvert.\nLe ticket est uniquement visible par le staff ! \n*Pour fermer le ticket réagis avec *🔒`
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
        components: [buttonClose],
      });
    }

    if (interaction.values[0] === "create-ticket-two") {
      let ticketName = `ticket-${interaction.user.username}`.toLowerCase();
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
        parent: "822896392157921330",
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

      const embed = new EmbedBuilder()
        .setTitle("__Plainte__")
        .setDescription(
          `<@${interaction.member.user.id}> Merci d'attendre, un staff vous assistera bientôt ! \n*Pour fermer le ticket réagis avec *🔒`
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
        components: [buttonClose],
      });
    }
  } catch (err) {
    return interaction.channel.send(`Une erreur a eu lieu:\n${err}`);
  }
});
