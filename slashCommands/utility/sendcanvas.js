const { ApplicationCommandType, GatewayIntentBits, AttachmentBuilder, EmbedBuilder }= require('discord.js');
const { QuickDB } = require('quick.db');

const Canvas = require('@napi-rs/canvas');
const { request } = require('undici');
const { readFile } = require('fs/promises');
module.exports = {
    name: 'sendcanvas',
    description: "Envoyer un canvas",
    type: ApplicationCommandType.ChatInput,
    category: "utility",
    cooldown: 3000,
    run: async (client, interaction) => {
        try {
            if(!interaction.isCommand()) return;

            const applyText = (canvas, text) => {
                const context = canvas.getContext('2d');
                let fontSize = 70;
                do {
                    context.font = `${fontSize -= 10}px sans-serif`;
                } while (context.measureText(text).width > canvas.width - 300);
            
                return context.font;
            };
 
            let member = interaction.member
            const generateCanvas = async(member) => {
                const canvas = Canvas.createCanvas(720, 250);
                const context = canvas.getContext('2d');
        
                const backgroundFile = await readFile('./images/wallpaper.jpg');
                const background = new Canvas.Image();
                background.src = backgroundFile;

                context.drawImage(background, 0, 0, 720, 250);
                context.font = applyText(canvas, `${member.displayName}`)
                context.fillStyle = '#ffffff';
                context.fillText(`${member.displayName}`, 720 / 2.5, 250 / 1.8);

                context.font = applyText(canvas, `vient de rejoindre le serveur !`)
                context.fillText(`vient de rejoindre le serveur !`, 720 / 2.5, 320 / 1.8);

                const { body } = await request(interaction.user.displayAvatarURL({ extension: 'png' }));
	            const avatar = await Canvas.loadImage(await body.arrayBuffer());
                context.beginPath();
                context.arc(125, 125, 100, 0, Math.PI * 2, true);
                context.closePath();
                context.clip();
	            context.drawImage(avatar, 25, 0, 200, canvas.height);

                const attachment = new AttachmentBuilder(await canvas.encode('png', 'txt'), { name: 'profile-image.png' });
                return interaction.reply({ files: [attachment] });
            }      
            await generateCanvas(member);
        }
        catch(err) {
            return interaction.reply(`Une erreur a eu lieu:\n${err}`);
        }
    }
};