const { ApplicationCommandOptionType, PermissionsBitField } = require("discord.js");

module.exports = {
    name: "purge",
    usage: '/purge <command>',
    options: [
        {
            name: 'number',
            description: 'Le nombre de message à supprimer',
            type: ApplicationCommandOptionType.Number,
            required: true
        }
    ],
    category: "Bot",
    description: "🆑 Purge des messages du serveur !",
    ownerOnly: false,
    run: async (client, interaction) => {
      try {
        let amount = interaction.options.getNumber('number');
           if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
             return interaction.reply(`❌ | Tu n'as pas la permission d'effacer les messages'`, ephemeral = true)
           }
          if (!amount) return interaction.channel.send("Merci de preciser le nombre de message à supprimer !")
          if (amount > 100 || amount < 1) return interaction.channel.send("Merci de preciser un nombre compris entre 0 et 100 !")
  
          interaction.channel.bulkDelete(amount).catch(err => {
                interaction.channel.send(':x: Dû à la limitation Discord, Je ne peux pas supprimer les messages de plus de 14 jours.') })
  
           await interaction.reply(`\`${amount}\` messages supprimés !`)
 
      }
      catch(err) {
          return interaction.channel.send(`❌ | A error occured **purge.js**: ${err}`);
      }
    },
};