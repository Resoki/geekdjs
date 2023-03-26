const { EmbedBuilder, ApplicationCommandOptionType,ApplicationCommandType , PermissionsBitField } = require("discord.js");

module.exports = {
    name: "ban",
    usage: '/ban <command>',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'user',
            description: 'Le membre que tu souhaites bannir',
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
          name: 'reason',
          description: 'Le raison du ban',
          type: ApplicationCommandOptionType.String,
          required: false
      }
    ],
    category: "Bot",
    description: "🚫 Bannir un membre du serveur !",
    ownerOnly: false,
    run: async (client, interaction) => {
      try {
        if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
          return interaction.reply(`❌ | Tu n'as pas la permission de ban un membre !`)
        }
  
        const user = interaction.options.getUser('user');
        let member = interaction.guild.members.cache.get(user.id);
        const reason = interaction.options.getString('reason');

        await member.ban()
        .then(()=> {
          const embedBan = new EmbedBuilder()
          .setTitle('Un membre a été banni !')
          .setDescription(`${member.user.username} a été banni du serveur par <@${interaction.member.user.id}> !\nRaison:${!reason? 'Pas de raison spécifié' : reason}`)
          .setColor('RED');

          return interaction.reply({embeds: [embedBan]}); 
        })      
      }
      catch(err) {
          return interaction.channel.send(`❌ | A error occured **ban.js**: ${err}`);
      }
    },
};