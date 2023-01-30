const client = require("..");
const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  ChannelType,
  PermissionFlagsBits,
  StringSelectMenuBuilder,
} = require("discord.js");
const global = require("../config.json");

client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isButton()) return;
    if(interaction.customId === 'close-ticket') {
        await interaction.channel.send('Ticket will be deleted in 4s');
        setTimeout(()=> interaction.channel.delete(), 4000);
    }
    
  } catch (err) {
    return interaction.channel.send(`Une erreur a eu lieu:\n${err}`);
  }
});
