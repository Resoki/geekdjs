const { ApplicationCommandType,  
    ApplicationCommandOptionType, 
    EmbedBuilder, 
    InteractionType,
    }  
= require('discord.js');

const { QuickDB } = require('quick.db');
const db = new QuickDB(); // using default driver

module.exports = {
    name: 'removeid',
    description: "Supprimer ton ID",
    type: ApplicationCommandType.ChatInput,
    category: "utility",
    cooldown: 3000,
    run: async (client, interaction) => {
        try {
            if(!interaction.isCommand()) return;
            
            const idMemberDatabase = await db.get(`${interaction.member.user.id}_idGame`);
            if(!idMemberDatabase ||idMemberDatabase === null) {
                return interaction.reply({content: `❌ | Tu n'as pas d'id enregistré ! **/registerid** pour en enregistrer une !`, ephemeral: true});
            }
            
            await db.delete(`${interaction.member.user.id}_idGame`)
            .then(async()=> {
                return interaction.reply({content: `✅ | Ton ID a été supprimé !`, ephemeral: true})  
            })
        }
        catch(err) {
            console.log(err)
            return interaction.reply(`Une erreur a eu lieu:\n${err}`);
        }
    }
};