const { ApplicationCommandType,  
    ApplicationCommandOptionType, 
    EmbedBuilder, 
    InteractionType,
    }  
= require('discord.js');

const { QuickDB } = require('quick.db');
const db = new QuickDB(); // using default driver
const {deleteIdUser, getIdUser} = require('../../models/userModel')

module.exports = {
    name: 'removeid',
    description: "Supprimer ton ID",
    type: ApplicationCommandType.ChatInput,
    category: "utility",
    cooldown: 3000,
    run: async (client, interaction) => {
        try {
            if(!interaction.isCommand()) return;
            
            await deleteIdUser(interaction.member.user.id, interaction)
        
        }
        catch(err) {
            console.log(err)
            return interaction.reply(`Une erreur a eu lieu:\n${err}`);
        }
    }
};