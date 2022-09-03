const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ApplicationCommandType, ButtonStyle } = require('discord.js');
const { readdirSync } = require("fs");

module.exports = {
	name: 'help',
	description: "Affiche la liste des commandes disponible",
	cooldown: 3000,
	type: ApplicationCommandType.ChatInput,
    category: "core",
	run: async (client, interaction) => {
                // Get the slash commands of a Tickets category
                const coreCommandsList = [];
                readdirSync(`./slashCommands/core`).forEach((file) => {
                    const filen = require(`../../slashCommands/core/${file}`);
                    const name = `\`${filen.name}\``
                    coreCommandsList.push(name);
                });

                  // Get the slash commands of a Tickets category
                  const utilityCommandsList = [];
                  readdirSync(`./slashCommands/utility`).forEach((file) => {
                      const filen = require(`../../slashCommands/utility/${file}`);
                      const name = `\`${filen.name}\``
                      utilityCommandsList.push(name);
                  });

                            // Get the slash commands of a Tickets category
                  const infoCommandsList = [];
                  readdirSync(`./slashCommands/info`).forEach((file) => {
                      const filen = require(`../../slashCommands/info/${file}`);
                      const name = `\`${filen.name}\``
                      infoCommandsList.push(name);
                  });
                // This is what it commands when using the command without arguments
                const helpEmbed = new EmbedBuilder()
                .setTitle(`${client.user.username} 2022`)
                .setDescription(` Hello **<@${interaction.member.id}>**, Je suis le bot d'assistance <@${client.user.id}>.  \nTu peux utiliser \`/help <slash_command>\` pour voir plus d'info des SlashCommands!`)
                .addFields("🤖 - Utility SlashCommands", utilityCommandsList.map((data) => `${data}`).join(", "))
                .addFields("🛠 - Info SlashCommands", infoCommandsList.map((data) => `${data}`).join(", "))
                .addFields("📩 - Core SlashCommands", coreCommandsList.map((data) => `${data}`).join(", "))             
                .setColor(client.config.embedColor)
                .setFooter({ text: `${client.config.embedfooterText}`, iconURL: `${client.user.displayAvatarURL()}` });

        
        const helpButtons = new ActionRowBuilder()
        .addComponents([
            new ButtonBuilder()
                .setLabel('Site Web')
                .setURL("https://fly-bot.space/")
                .setStyle(ButtonStyle.Link)
                .setEmoji("🌐")
            ]);

        return interaction.reply({ embeds: [embed], components: [helpButtons] });
    }
};
