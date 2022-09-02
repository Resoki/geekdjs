const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder, InteractionType }= require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

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

            const sendEmbed = async(user) => {
                const idMemberDatabase = await db.get(`${interaction.member.user.id}_idGame`);
                if(!idMemberDatabase ||idMemberDatabase === null) {
                    return interaction.reply({content: `❌ | Pas d'id enregistré pour <@${user.id}> ! **/registerid** pour en enregistrer une !`, ephemeral: true});
                }
                let idUser = !await db.get(`${user.id}_idGame`) ? 'Pas de points' : await db.get(`${user.id}_idGame`)
                const embedSuccess = new EmbedBuilder()
                .setTitle(`Voir les ids`)
                .setDescription(`<@${user.id}>, ID: **${idUser}**`)
                .setThumbnail(user.displayAvatarURL())
                .setTimestamp();
                
                return interaction.reply({embeds: [embedSuccess]});  
            }
       
            if(!interaction.type === InteractionType.ApplicationCommand) return;
            const user = interaction.options.getUser('user');

          
            if(!user) await sendEmbed(interaction.member);     
            await sendEmbed(user);
        }
        catch(err) {
            console.log(err);
            return interaction.reply(`Une erreur a eu lieu:\n${err}`);
        }
    }
};