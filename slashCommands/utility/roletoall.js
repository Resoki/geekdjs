const { EmbedBuilder, ApplicationCommandOptionType , ApplicationCommandType} = require("discord.js");
const { convertMsToMinutesSeconds } = require("../../handlers/msToMinutes");

module.exports = {
    name: "removeroleall",
    usage: '/removeroleall <role>',
    type: ApplicationCommandType.ChatInput,
    cooldown: 3000,
    category: 'utility',
    options: [
        {
          name: 'rolemember',
          description: 'Le rôle à qui enlever.',
          type: ApplicationCommandOptionType.Role,
          required: false
      },
      {
        name: 'roletoremove',
        description: 'Le rôle a enlever',
        type: ApplicationCommandOptionType.Role,
        required: false
    }
    ],
    category: "Bot",
    
    description: "Give role to all",
    ownerOnly: false,
    run: async (client, interaction) => {
      try {
        if (!interaction.isCommand()) return;
        const roleMember = interaction.options.getRole('rolemember');
        const roleToRemove = interaction.options.getRole('roletoremove');

        const members = await interaction.guild.roles.cache.get(roleMember.id).members.map(m=>m.user.id);
        if(members.length === 0) return interaction.reply(`❌ | No member found with the role <@&${roleMember.id}>`);
        let counterSuccess = 0;
        let counterError = 0;

        const start = Date.now();

        for(let i = 0; i < members.length; i++){
            const member = await interaction.guild.members.cache.get(members[i]);
            if(!member.roles.cache.has(roleToRemove.id)) return;
            await member.roles.remove(roleToRemove.id)
            
            const succesRole = new EmbedBuilder()
            .setDescription(`<@${member.user.id}> has lost role <@&${roleToRemove.id}> !  ✅`)
            .setColor(0x0099FF)
            .setTimestamp()

              counterSuccess++;
            await interaction.channel.send({embeds: [succesRole]});
            

            if(i == members.length-1) {
                const duration = Date.now() - start;
                const finishEmbed = new EmbedBuilder().setDescription(`Role added successfully to member: **${counterSuccess}**\nRole not added: **${counterError}**`)
                .setColor(0x0099FF)
                .setTimestamp()
                .addFields({name:"Time total", value: `${convertMsToMinutesSeconds(duration)}` })

                return interaction.channel.send({embeds: [finishEmbed]});
            }
        }
      }
      catch(err) {
        console.log(err)
          return interaction.channel.send(`❌ | A error occured **giveroleall.js**: ${err}`);
      }
    },
};