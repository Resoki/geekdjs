const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, InteractionType }= require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();
const {getIdUser} = require('../../models/userModel')


module.exports = {
    name: 'seeid',
    description: "Voir son ID",
    type: ApplicationCommandType.ChatInput,
    category: "utility",
    cooldown: 3000,
    options: [{
        name: 'user',
        description: `L'user pou voir son id`,
        type: ApplicationCommandOptionType.User,
        required: false
      }],
    run: async (client, interaction) => {
        try {
            if(!interaction.isCommand()) return;
       
            if(!interaction.type === InteractionType.ApplicationCommand) return;
            const user = interaction.options.getUser('user');

          
            if(!user) return getIdUser(interaction.member.user.id, interaction, interaction.member);     
            return getIdUser(user.id, interaction,user)
        }
        catch(err) {
            console.log(err);
            return interaction.reply(`Une erreur a eu lieu:\n${err}`);
        }
    }
};