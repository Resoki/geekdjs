const {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  EmbedBuilder,
} = require("discord.js");
const global = require("../../config.json");
const { QuickDB } = require("quick.db");
const { MongoDriver } = require("quickmongo");
const driver = new MongoDriver(global.mongoUrl);

module.exports = {
  name: "level",
  description: "Afficher son Level",
  type: ApplicationCommandType.ChatInput,
  category: "utility",
  cooldown: 3000,
  options: [
    {
      name: "user",
      description: `L'user`,
      type: ApplicationCommandOptionType.User,
      required: false,
    },
  ],
  run: async (client, interaction) => {
    try {
      const seeLevel = async (userId) => {
        return driver.connect().then(async () => {
          const db = new QuickDB({ driver });
          const userLevelInfos = await db.get(`level_${userId}`);
          return userLevelInfos;
        });
      };
      const userDb = await seeLevel(interaction.member.user.id);
      const embedProfil = new EmbedBuilder()
        .setColor("Random")
        .setTitle(`${interaction.member.user.username}`)
        .setDescription(
          `Level Actuel: **${
            userDb.currentLevel
          }** \n**${userDb.currentLevelXp.toFixed(
            2
          )}/${userDb.nextLevelXpNeeded.toFixed(
            2
          )}** Xps pour atteindre le level ${userDb.currentLevel + 1}`
        )
        .setThumbnail(interaction.member.user.displayAvatarURL())
        .setTimestamp();

      return interaction.reply({ embeds: [embedProfil] });
    } catch (err) {
      return console.log(err);
    }
  },
};
