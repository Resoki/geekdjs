const client = require('..')
const { EmbedBuilder, Collection, PermissionsBitField, AttachmentBuilder } = require('discord.js')
const { QuickDB } = require('quick.db');
const Canvas = require('@napi-rs/canvas');
const { request } = require('undici');
const { readFile } = require('fs/promises');

client.on('guildMemberRemove', async member => {
    try {
    const applyText = (canvas, text) => {
        do {
            const context = canvas.getContext('2d');
            context.font = `36px sans-serif`;
        } while (context.measureText(text).width > canvas.width - 300);
        return context.font;
    };

    const canvas = Canvas.createCanvas(720, 250);
    const context = canvas.getContext('2d');

    const backgroundFile = await readFile('./images/wallpaper.jpg');
    const background = new Canvas.Image();
    background.src = backgroundFile

    await context.drawImage(background, 0, 0, 720, 250);
    context.font = '44px sans-serif';
    context.fillStyle = '#ffffff';
    await context.fillText(`${member.user.username}`, 670 / 2.5, 250 / 1.8);

    let text = '';
    await !member.user.bot ? text = 'vient de rejoindre le serveur !': text = `un bot vient de rejoindre le serveur !`;
    context.font = '28px sans-serif';
    
    await context.fillText(`${await text}`, 670 / 2.5, 320 / 1.8);

    // const { body } = await request(member.user.displayAvatarURL({ extension: 'png' }));
    console.log(await member.user)
    const avatar = await Canvas.loadImage(member.user.displayAvatarURL({ extension: 'jpg' }));
    console.log('add5')
    context.beginPath();
    context.arc(125, 125, 100, 0, Math.PI * 2, true);
    context.closePath();
    context.clip();
    await context.drawImage(avatar, 25, 0, 200, canvas.height);
    console.log('add6')
    const attachment = new AttachmentBuilder(await canvas.encode('png', 'txt'), { name: 'profile-image.png' });
    let channel = client.channels.cache.get('965643504380440666');
    return channel.send({ files: [attachment] });

}
catch(err){
    return console.log(`Une erreur a eu lieu:\n${err}`)
}
});
