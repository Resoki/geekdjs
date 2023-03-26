const {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  name: "say",
  description: "Faire parler le bot",
  type: ApplicationCommandType.ChatInput,
  category: "utility",
  cooldown: 3000,
  options: [
    {
      name: "message",
      description: `Le message`,
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    if (!interaction.isCommand()) return;
    const content = interaction.options.getString("message");
    const embed = new EmbedBuilder()
      .setDescription(`${content}`)
      .setColor(0xf2ff);
    return interaction.channel.send({ embeds: [embed] });
  },
};
