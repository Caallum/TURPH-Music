const { MessageEmbed } = require('discord.js');
const config = require('../config.json');

module.exports = {
	name: 'eval',
	owner: true,
	async run(message, args, embed, client) {
		const clean = text => {
			if (typeof text === 'string')
				return text
					.replace(/`/g, '`' + String.fromCharCode(8203))
					.replace(/@/g, '@' + String.fromCharCode(8203));
			return text;
		};
		try {
			const code = args.slice().join(' ');
			let evaled = eval(code);

			if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
			let embed = new MessageEmbed()
				.setTitle(config.emojis.correct + 'Eval')
				.setColor(client.col)
				.setFooter(client.ftext, client.ficon)
				.addField('Input:', `\`\`\`${code}\`\`\``, true)
				.addField('Output:', `\`\`\`${clean(evaled)}\`\`\``, true);

			message.channel.send(embed);
		} catch (err) {
			const error = new MessageEmbed()
				.setTitle('Error')
				.setFooter(client.ftext, client.ficon)
				.setColor(client.col)
				.setDescription(`\`\`\`${clean(err)}\`\`\``);
			message.channel.send(error);
		}
	}
};
