const client = require('..');
const chalk = require('chalk');
const { EmbedBuilder, Collection, PermissionsBitField, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js')
const sdk = require('api')('@opensea/v1.0#mxj1ql5k6c0il');
const axios = require('axios');
const { QuickDB } = require('quick.db');
const db = new QuickDB(); // using 

client.on("ready", async() => {
	const convertEthToEuros = (eth_price, market_cap) => {
		eth_price = eth_price * market_cap
		return displayEthPrice(eth_price);
	}

	const displayEthPrice = async(price_eth) => {
		price_eth = parseInt(price_eth)
		return Math.round(price_eth)
	}
	let total_sales =  0;
	setInterval(async() => {
		const slugName = 'alpha-crypto-kongs';
		await axios.get(`https://api.opensea.io/api/v1/collection/${slugName}`)
			.then(async res => {

				let data = {
					name: res.data.collection.primary_asset_contracts[0].name,
					address: res.data.collection.primary_asset_contracts[0].address,
					nft_version: res.data.collection.primary_asset_contracts[0].nft_version,
					image_url: res.data.collection.image_url,
					description: res.data.collection.description,
					eth_price: res.data.collection.payment_tokens[0].usd_price
				}

				let stats = {
					total_sales: res.data.collection.stats.total_sales,
					today_sales: res.data.collection.stats.total_sales,
					owners: res.data.collection.stats.num_owerns,
					average_price: res.data.collection.stats.average_price,
					supply: res.data.collection.stats.stats,
					floor_price: res.data.collection.stats.floor_price,
					market_cap: res.data.collection.stats.market_cap,
				}

				//if new article
				if(stats.total_sales == total_sales+1) {
					const channel = client.channels.cache.get('982317600514134046');
					const embed =  new EmbedBuilder()
					.setTitle(`INFO`)
					.setDescription(`**New NFT saled ! 🛒**`)
					.setThumbnail(res.data.collection.image_url)
					.setColor(0xf1f1f1)
					.setTimestamp();

					await channel.send({embeds: [embed]})
				}
				total_sales = stats.total_sales;
				
				const row = new ActionRowBuilder()
				.addComponents(
					new ButtonBuilder()
					.setLabel('Go OpenSea')
					.setURL('https://opensea.io/collection/alpha-crypto-kongs')
					.setStyle(ButtonStyle.Link)
					.setEmoji('🌐'), 

					new ButtonBuilder()
					.setCustomId('see-address')
					.setLabel('Adress')
					.setStyle(ButtonStyle.Success)
					.setEmoji('🔗')
				);

				const embed =  new EmbedBuilder()
				.setTitle(`${data.name} V${data.nft_version}`)
				.addFields(
					{ name: 'Market CAP:', value:  `${await displayEthPrice(stats.market_cap)} ETH - ${await convertEthToEuros(data.eth_price, stats.market_cap)} $`, inline: true },
					{ name: 'Floor Price:', value:  `${await stats.floor_price} ETH - ${await convertEthToEuros(data.eth_price,stats.floor_price)} $`, inline: true },
					{ name: 'Sell total:', value: `${await stats.total_sales}`},
				)
				.setDescription(`${data.description}`)
				.setThumbnail(res.data.collection.image_url)
				.setColor(0xf1f1f1)
				.setTimestamp();

			const channel = client.channels.cache.get('982317600514134046')
			await channel.send({embeds: [embed], components: [row]})
			.then(async(msg)=> setTimeout(()=> msg.delete(),22500));
		}).catch(err => console.error(err));
	}, 22500)

	const activities = [
		{ name: `Bot DJS`, type: 5 }, // LISTENING
		{ name: `Discord.js v14`, type: 5 } // COMPETING
	];
	const status = ['Playing','Playing'];
	let i = 0;
	setInterval(() => {
		if(i >= activities.length) i = 0;
		client.user.setActivity(activities[i]);
		i++;
	}, 2000);

	let s = 0;
	setInterval(() => {
		if(s >= activities.length) s = 0;
		client.user.setStatus(status[s]);
		s++;
	}, 4000);
	console.log(chalk.red(`Logged in as ${client.user.tag}!`));
});
