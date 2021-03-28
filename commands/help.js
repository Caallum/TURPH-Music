const { MessageEmbed } = require('discord.js');
const config = require('../config.json');

module.exports = {
	name: 'help',
	usage: 'help (command-name)',
	category: 'information',
	description: 'Displays all commands usable by a user',
	async run(message, args, embed, client) {
		if (args[0] && client.commands.has(args[0].toLowerCase())) {
			let command = client.commands.get(args[0].toLowerCase());

			if (command.dj && message.member.roles.cache.has(config.djRole)) {
				let commandInformation = new MessageEmbed()
					.setTitle(`${command.name}'s Information`)
					.setColor(client.col)
					.setThumbnail(client.thumbnail ? client.thumbnail : '')
					.setFooter(client.ftext, client.ficon)
					.addField(
						'Description:',
						command.description
							? command.description
							: 'This command has no description defined!',
						true
					)
					.addField(
						'Aliases:',
						command.aliases
							? command.aliass.join(', ')
							: 'This command has no aliases!',
						true
					)
					.setAuthor(
						message.author.tag,
						message.author.displayAvatarURL({ dymanic: true, format: 'png' })
					)
					.addField(
						'Usage:',
						command.usage
							? command.usage
							: 'This command has no usage defined!',
						true
					)
					.addField(
						'Category:',
						command.category
							? command.category
							: 'This command has no category defined!',
						true
					)
					.addField('DJ Required:', command.dj ? 'True' : 'False', true);
				return message.channel.send(
					`<@${message.author.id}`,
					commandInformation
				);
			} else {
				return embed(
					config.emojis.error + ' Insufficient Permissions',
					`Missing permission:\n\n\`\`\`Member is not DJ\`\`\``
				);
			}

			if (!command.dj) {
				let commandInformation = new MessageEmbed()
					.setTitle(`${command.name}'s Information`)
					.setColor(client.col)
					.setThumbnail(client.thumbnail ? client.thumbnail : '')
					.setFooter(client.ftext, client.ficon)
					.addField(
						'Description:',
						command.description
							? command.description
							: 'This command has no description defined!',
						true
					)
					.addField(
						'Aliases:',
						command.aliases
							? command.aliass.join(', ')
							: 'This command has no aliases!',
						true
					)
					.addField(
						'Usage:',
						command.usage
							? command.usage
							: 'This command has no usage defined!',
						true
					)
					.addField(
						'Category:',
						command.category
							? command.category
							: 'This command has no category defined!',
						true
					)
					.setAuthor(
						message.author.tag,
						message.author.displayAvatarURL({ dymanic: true, format: 'png' })
					)
					.addField('DJ Required:', command.dj ? 'True' : 'False', true);
				return message.channel.send(
					`<@${message.author.id}`,
					commandInformation
				);
			}
		}

		let avaCommands = [];

		client.commands.forEach(command => {
			if (command.dj && message.member.roles.cache.has(config.djRole)) {
				avaCommands.push(command.name);
			} else if (command.owner && message.author.id === config.ownerId) {
				avaCommands.push(command.name);
			} else {
				avaCommands.push(command.name);
			}
		});

		let commandListEmbed = new MessageEmbed()
			.setTitle('Help Information')
			.setColor(client.col)
			.setThumbnail(client.thumbnail ? client.thumbnail : '')
			.setFooter(client.ftext, client.ficon)
			.setAuthor(
				message.author.tag,
				message.author.displayAvatarURL({ dymanic: true, format: 'png' })
			)
			.setDescription(
				`Command Prefix is: ${
					config.prefix ? config.prefix : '!'
				}\n\n__Command List__\n» ${avaCommands.join(
					',\n» '
				)}\n\nThis bot was made using TURPH Music!`
			);
		return message.channel.send(message.author.toString(), commandListEmbed);
	}
};
