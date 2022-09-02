const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder} = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB(); // using default driver

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

            const idMemberDatabase = await db.get(`${interaction.member.user.id}_idGame`);
            if(idMemberDatabase) return interaction.reply({content: `❌ | Tu as déjà enregistré un nombre ! **/removeid** pour le supprimer !`});
            if(!idMemberDatabase || idMemberDatabase === null) {  
                const id = interaction.options.getString('id');
                if(!parseInt(id)) return interaction.reply(`❌ | L'id doit être un nombre`);

                await db.add(`${interaction.member.user.id}_idGame`, id)
                .then(async()=> {
                    const embedSuccess = new EmbedBuilder()
                    .setDescription(`<@${interaction.member.user.id}>, Ton id **${id}** a été enregistré ! ✅`)
                    .setColor(0x0099FF)
                    .setTimestamp();
        
                return interaction.channel.send({ embeds: [embedSuccess] });
            })
            }
           
        }
        catch(err) {
            console.log(err)
            return interaction.reply(`Une erreur a eu lieu:\n${err}`);
        }
    }
};