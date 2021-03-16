const { MessageEmbed } = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'queue',
  aliases: ['q'],
  category: 'music',
  description: 'Shows the music queue',
  usage: 'queue',
  async run(message, args, embed, client) {
    let queue = client.distube.getQueue(message);
    if(!queue) return embed(`${config.emojis.error} Music Error`, 'There is currently nothing playing!');
    
    const q = queue.songs.map((song, i) => `${i === 0 ? "Playing:" : `__${i}:__`} ${song.name}`).join("\n")
    console.log(queue);
    let serverQueue = new MessageEmbed()
      .setTitle(config.emojis.info + ' Server Queue')
      .setFooter(client.ftext, client.ficon)
      .setColor(client.col)
      .setDescription(q.substring(0, 2048))
    message.channel.send(serverQueue);
  }
};