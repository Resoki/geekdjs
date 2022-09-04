// Systeme Perdant De creer Des Salon Vocal. Qui permette de Creer des Salons Temporaire pour les Utilisateur avec choix du Nom de Salon lors de la Config du Salon Vocal.

const { ApplicationCommandType,  
  ApplicationCommandOptionType, 
  EmbedBuilder, 
  PermissionsBitField, 
  ActionRowBuilder, 
  SelectMenuBuilder }  
= require('discord.js');
  
module.exports = {
  name: 'createvoicechannel',
  description: "Crréer un channel vocal",
  type: ApplicationCommandType.ChatInput,
  category: "utility",
  cooldown: 3000,
  options: [{
      
      name: 'nom',
      description: 'Le nom du channel vocal.',
      type: ApplicationCommandOptionType.String,
      required: true
  },
],
  run: async (client, interaction) => {
      try {
          if(!interaction.isCommand()) return;
   
      }
      catch(err) {
          return interaction.reply(`Une erreur a eu lieu:\n${err}`);
      }
  }
};