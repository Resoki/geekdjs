const {
  EmbedBuilder,
  ActionRowBuilder,
  SelectMenuBuilder,
  ApplicationCommandType,
} = require("discord.js");

module.exports = {
  name: "open-ticket",
  usage: "/open-ticket <channel>",
  description: "Ouvrir un ticket",
  type: ApplicationCommandType.ChatInput,
  category: "info",
  options: [
    {
      name: "channel",
      description: "Channel où envoyer le panel de ticket",
      type: 7,
      usage: "**/buy-panel**",
      channelTypes: ["GUILD_TEXT"],
      required: true,
    },
  ],
  run: async (client, interaction) => {
    if (!interaction.isCommand()) return;
    const channel = interaction.options.getChannel("channel");
    const embed = new EmbedBuilder()
      .setThumbnail(
        "https://png.pngtree.com/png-vector/20221121/ourmid/pngtree-need-help-with-question-mark-speech-bubble-template-vector-design-png-image_6472531.png"
      )
      .setTitle("__Besoin d'aide ?__")
      .setColor(0xff0)
      .setFooter({ text: "Cibertex", iconURL: client.user.displayAvatarURL() })
      .setDescription(
        "Tu as besoin d'aide ?\n\nClique ici pour ouvrir un ticket !\n"
      );

    const selectCyrptoRow = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("select")
        .setPlaceholder(`Selectionne ta catégorie`)
        .addOptions([
          {
            label: "Besoin d' ℹ️",
            description: `Besoin d'aide`,
            value: "create-ticket-one",
          },
          {
            label: "Plainte 📜",
            description: `Plainte`,
            value: "create-ticket-two",
          },
        ])
    );
    interaction.reply({
      content: `Le pannel de ticket a été envoyé dans le channel > ${channel}!`,
      ephemeral: true,
    });
    return channel.send({ embeds: [embed], components: [selectCyrptoRow] });
  },
};
