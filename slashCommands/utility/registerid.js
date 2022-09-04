const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder} = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB(); // using default driver
const {setIdUser} = require('../../models/userModel')

module.exports = {
    name: 'registerid',
    description: "Enregistre ton ID",
    type: ApplicationCommandType.ChatInput,
    category: "utility",
    cooldown: 3000,
    options: [{
        name: 'id',
        description: `L'id à enregistrer`,
        type: ApplicationCommandOptionType.String,
        required: true
    }],
    run: async (client, interaction) => {
        try {
            if(!interaction.isCommand()) return;

                const id = interaction.options.getString('id');
                if(!parseInt(id)) return interaction.reply(`❌ | L'id doit être un nombre`);

                await setIdUser(interaction.member.user.id, id, interaction)
            
    
           
        }
        catch(err) {
            console.log(err)
            return interaction.reply(`Une erreur a eu lieu:\n${err}`);
        }
    }
};