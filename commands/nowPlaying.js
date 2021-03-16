const { MessageEmbed } = require('discord.js');
const createBar = require('string-progressbar');
const config = require('../config.json');

module.exports = {
  name: 'nowplaying',
  aliases: ['np'],
  description: 'Shows what song is currently playing',
  usage: 'nowplaying',
  category: 'music',
  async run(message, args, embed, client) {
    let queue = client.distube.getQueue(message);
    if(!queue) return embed(`${config.emojis.error} Music Error`, 'There is currenly nothing playing');
    let song = queue.songs[0];
    const time = song.duration * 1000;
    const currenttime = queue.currentTime
    
    const npEmbed = new MessageEmbed()
      .setTitle(config.emojis.info + ' Now Playing')
      .setColor(client.col)
      .addField('Title:', song.name, true)
      .addField('Duration:', `[${createBar(time === 0 ? currenttime : time, currenttime, 20, '=', '>')[0]}] ${queue.formattedCurrentTime}/${song.formattedDuration}`)
      .setFooter(client.ftext, client.ficon)
      .addField('Requested By:', song.user)
      .setThumbnail(song.thumbnail);
    message.channel.send(npEmbed);
  }
}