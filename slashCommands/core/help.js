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

    
    const ticketCommandsList = [];
    readdirSync(`./slashCommands/ticket`).forEach((file) => {
      const filen = require(`../../slashCommands/ticket/${file}`);
      const name = `\`${filen.name}\``;
      ticketCommandsList.push(name);
    });

    const modCommandsList = [];
    readdirSync(`./slashCommands/mod`).forEach((file) => {
      const filen = require(`../../slashCommands/mod/${file}`);
      const name = `\`${filen.name}\``;
      modCommandsList.push(name);
    });


    const helpEmbed = new EmbedBuilder()
      .setTitle(`${client.user.username} 2022`)
      .setTimestamp()
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
        name: "📩 - Ticket SlashCommands",
        value: infoCommandsList.map((data) => `${data}`).join(", "),
        inline: true,
      })
      .addFields({
        name: "📩 - Mod SlashCommands",
        value: modCommandsList.map((data) => `${data}`).join(", "),
        inline: true,
      });

    return interaction.reply({
      embeds: [helpEmbed],
    });
  },
};
