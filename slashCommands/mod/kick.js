const { EmbedBuilder, ApplicationCommandOptionType,ApplicationCommandType , PermissionsBitField } = require("discord.js");

module.exports = {
    name: "kick",
    usage: '/kick <command>',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'user',
            description: 'Le membre que tu souhaites kick',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
          name: 'reason',
          description: 'Le raison du kick',
          type: ApplicationCommandOptionType.String,
          required: false
      }
    ],
    category: "Bot",
    description: "🦶🏽 Kick un membre du serveur !",
    ownerOnly: false,
    run: async (client, interaction) => {
      try {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
          return interaction.reply(`❌ | Tu n'as pas la permission de kick un membre !`)
        }

        const user = interaction.options.getUser('user');
        let member = interaction.guild.members.cache.get(user.id);
        const reason = interaction.options.getString('reason');

        await member.kick()
        .then(()=> {
          const embedBan = new EmbedBuilder()
          .setTitle('Un membre a été kick !')
          .setDescription(`${member.user.username} a été kick du serveur par <@${interaction.member.user.id}> !\nRaison:${!reason? 'Pas de raison spécifié' : reason}`)
          .setColor('RED');

          return interaction.reply({embeds: [embedBan]}); 
        })      
      }
      catch(err) {
          return interaction.channel.send(`❌ | A error occured **kick.js**: ${err}`);
      }
    },
};