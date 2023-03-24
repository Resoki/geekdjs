const { ApplicationCommandType } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Vérifiez le ping du bot.",
  type: ApplicationCommandType.ChatInput,
  category: "info",
  cooldown: 3000,
  run: async (client, interaction) => {
    if (!interaction.isCommand()) return;
    return interaction.reply({
      content: `🏓 Pong! Latence : **${Math.round(client.ws.ping)} ms**`,
    });
  },
};
