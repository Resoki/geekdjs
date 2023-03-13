const {
  ApplicationCommandType,
  EmbedBuilder,
  ButtonBuilder,
  ActionRowBuilder,
  SelectMenuBuilder,
} = require("discord.js");
const global = require("../../config.json");
module.exports = {
  name: "sell-panel",
  usage: "/sell-pannel <channel>",
  description: "Send pannel to create sell ticket",
  type: ApplicationCommandType.ChatInput,
  category: "info",
  options: [
    {
      name: "channel",
      description: "Channel who send pannel",
      type: 7,
      usage: "**/sell-pannel**",
      channelTypes: ["GUILD_TEXT"],
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const channel = interaction.options.getChannel("channel");

    const embedImage = new EmbedBuilder()
      .setImage(
        "https://media.discordapp.net/attachments/1066754552130445344/1073919534592962670/Bannieres-Cibertex-509x51px-Sell-Crypto_2.png"
      )

    const embed = new EmbedBuilder()
      .setTitle("__SELL CRYPTO__")
      .setColor(0xff0)
      .setThumbnail(
        "https://incrypted.com/wp-content/uploads/2022/11/BUSD-vs-USDT-1-scaled.jpg"
      )
      .setFooter({ text: "Cibertex", iconURL: client.user.displayAvatarURL() })
      .setDescription(
        "Interested in selling Crypto ?\n\nFill out the form and a staff member will get back to you as soon as possible\n Click the corresponding reaction to open a ticket!"
      );
    const guild = client.guilds.cache.get(global.guildID); // Remplacez "guild_id_here" par l'ID de votre serveur
    const busd = guild.emojis.cache.find((emoji) => emoji.name === "busd");
    const usdt = guild.emojis.cache.find((emoji) => emoji.name === "usdt");

    const selectCyrptoRow = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("select")
        .setPlaceholder(`Select your crypto to sell`)
        .addOptions([
          {
            label: "BUSD",
            description: `Sell BUSD`,
            value: "create-ticket-busd-sell",
            emoji: busd.toString(),
          },
          {
            label: "USDT",
            description: `Sell USDT`,
            value: "create-ticket-usdt-sell",
            emoji: usdt.toString(),
          },
        ])
    );
    interaction.reply({
      content: `Le pannel de ticket a été envoyé dans le channel > ${channel}!`,
      ephemeral: true,
    });
    return channel.send({
      embeds: [embedImage, embed],
      components: [selectCyrptoRow],
    });
  },
};
