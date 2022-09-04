const { ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');

module.exports = {
	name: 'profil',
	description: "Afficher son profil",
	type: ApplicationCommandType.ChatInput,
  category: "utility",
	cooldown: 3000,
  options: [
    {
      name: 'user',
      description:`L'user`,
      type: ApplicationCommandOptionType.User,
      required: false
    }
  ],
	run: async (client, interaction) => {
		const user = interaction.options.getUser('user');

    const embedGenerator = async(user) => {
   
      const member = interaction.guild.members.cache.get(user.id);
      console.log(member);

      const isBot = member.user.bot ? '🤖 Bot: OUI ✅' : '🤖 Bot: NON ❌';
      const joinOn = member.joinedTimestamp;
      const joinGuildOn = member.guild.joinedTimestamp;
      const roles = member._roles
      let tabRole = [];

      const milliseconds = 1575909015 * 1000 // 1575909015000

      const dateObject = new Date(milliseconds)

      const humanDateFormat = dateObject.toLocaleString() //2019-12-9 10:30:15

      await roles.forEach(async(element) => {
        tabRole.push(`<@&${element}>`)
      }) 

      const embedProfil = new  EmbedBuilder()
      .setTitle(`${member.user.username}#${member.user.discriminator}`)
      .addFields({name: `Infos =>`, value: `📅 Compte crée le: ${joinOn}\nRejoin le serveur le: ${joinGuildOn}\n${isBot}`})
      .addFields({name: `Rôle (${tabRole.length === 0 ?  '0' : tabRole.length}) =>`, value: `📛 ${tabRole}`, inline: true})
      .setColor(0x0099FF)
      .setThumbnail(user.displayAvatarURL())
      .setTimestamp();

      return interaction.reply({embeds: [embedProfil]});
    }

    if(!user) return embedGenerator(interaction.member.user);
    return embedGenerator(user);
	}
};