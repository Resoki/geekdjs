const {
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ApplicationCommandType,
  ButtonStyle,
} = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
  name: "help",
  description: "Affiche la liste des commandes disponible",
  cooldown: 3000,
  type: ApplicationCommandType.ChatInput,
  category: "core",
  run: async (client, interaction) => {
    const coreCommandsList = [];
    readdirSync(`./slashCommands/core`).forEach((file) => {
      const filen = require(`../../slashCommands/core/${file}`);
      const name = `\`${filen.name}\``;
      coreCommandsList.push(name);
    });

    const utilityCommandsList = [];
    readdirSync(`./slashCommands/utility`).forEach((file) => {
      const filen = require(`../../slashCommands/utility/${file}`);
      const name = `\`${filen.name}\``;
      utilityCommandsList.push(name);
    });

    const infoCommandsList = [];
    readdirSync(`./slashCommands/info`).forEach((file) => {
      const filen = require(`../../slashCommands/info/${file}`);
      const name = `\`${filen.name}\``;
      infoCommandsList.push(name);
    });

    const helpEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} 2022`)
      .setDescription(
        ` Hello **<@${interaction.member.id}>**, Je suis le bot d'assistance <@${client.user.id}>.  \nTu peux utiliser \`/help <slash_command>\` pour voir plus d'info des SlashCommands!`
      )
      .addFields({
        name: "🤖 - Utility SlashCommands",
        value: utilityCommandsList.map((data) => `${data}`).join(", "),
        inline: true,
      })
      .addFields({
        name: "🛠 - Info SlashCommands",
        value: infoCommandsList.map((data) => `${data}`).join(", "),
        inline: true,
      })
      .addFields({
        name: "📩 - Core SlashCommands",
        value: coreCommandsList.map((data) => `${data}`).join(", "),
        inline: true,
      });

    const helpButtons = new ActionRowBuilder().addComponents([
      new ButtonBuilder()
        .setLabel("Site Web")
        .setURL("https://resoki-dev.tech")
        .setStyle(ButtonStyle.Link)
        .setEmoji("🌐"),
    ]);

    return interaction.reply({
      embeds: [helpEmbed],
      components: [helpButtons],
    });
  },
};
