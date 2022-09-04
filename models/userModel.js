const {db} = require('../handlers/index');
const chalk = require('chalk');
const {EmbedBuilder} = require('discord.js')

const setIdUser = async(memberId, id, interaction) => {
  try {
    var sql = `INSERT INTO member (memberId, id) VALUES ('${memberId}', '${id}')`;
       db.query(sql, function (err, result) {
        if (err || result.length < 1) return interaction.channel.send({content: `❌ | Tu as déjà une id enregistré ! **/removeid** pour la supprimer !`, ephemeral: true});
           const embedSuccess = new EmbedBuilder()
           .setDescription(`<@${interaction.member.user.id}>, Ton id **${id}** a été enregistré ! ✅`)
           .setColor(0x0099FF)
           .setTimestamp();

          return interaction.channel.send({ embeds: [embedSuccess] });
         });
        }
    catch(err){
      console.log(err)
    }
}


const getIdUser = async(memberId, interaction, user) => {
  try {
    var sql = `SELECT id FROM member WHERE memberId = '${memberId}'`;
       db.query(sql, function (err, result) {
           if (err || result.length < 1) return interaction.reply({content: `❌ | Pas d'id enregistrer pour <@${memberId}> **/registerid** pour en enregistrer une !`, ephemeral: true});
           const embedSuccess = new EmbedBuilder()
           .setTitle(`Voir les ids`)
           .setDescription(`<@${memberId}>, ID: **${result[0].id}**`)
           .setThumbnail(user.displayAvatarURL())
           .setTimestamp();
           
           return interaction.reply({embeds: [embedSuccess]});                      
         });
        }
    catch(err){
      console.log(err)
    }
}

const deleteIdUser = async(memberId, interaction) => {
  try {
      var sql = `DELETE FROM member WHERE memberId = '${memberId}'`;
      db.query(sql, function (err, result) {
          if (err) console.log(err);
          if(result.affectedRows > 0) return interaction.reply({content: `✅ | Ton ID a été supprimé !`, ephemeral: true})  
          return interaction.reply({content: `Tu n'as pas d'id à supprimer`, ephemeral: true})  
        }); 
        }
    catch(err){
      console.log(err);
    }
}

module.exports = {setIdUser,deleteIdUser, getIdUser};