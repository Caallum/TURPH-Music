const { MessageEmbed } = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'remove',
  dj: true,
  description: 'Removes a song from the song queue',
  category: 'music',
  usage: 'remove <song number>',
  async run(message, args, embed, client) {
    let queue = client.distube.getQueue(message);
    if(!queue) return embed(`${config.emojis.error} Music Error`, 'There is currently nothing playing!');
    
    let number = args[0];
    if(!number) return embed(`${config.emojis.error} Command Error`, 'Please specify a song number you wish to remove from the queue!\n\nTip: Do `!queue` to see the queue and the number of each song!');
    if(isNaN(number)) return embed(`${config.emojis.error} Commmand Error`, 'Please specify a number!\n\nTip: Do `!queue` to see the queue and the number of each song!');
    if(number > queue.songs.length && number <= 0) return embed(`${config.emojis.error} Command Error`, 'Please specify a number that is inside the queue list!\n\nTip: Do `!queue` to see the queue and the number of each song!');
    
    let song = queue.songs[number];
    
    let info = new MessageEmbed()
      .setTitle(`${config.emojis.correct} Removed Song`)
      .addField('Song Title:', song.title, true)
      .addField('Requested by:', song.user.username, true)
      .setAuthor(message.author.tag, message.author.displayAvatarURL({ dymanic: true, format: 'png' }))
      .setColor(client.col)
      .setThumbnail(client.thumbnail ? client.thumbnail : song.thumbnail)
      .setFooter(client.ftext, client.ficon);
    
    await message.channel.send(info);
    
    queue.songs.splice(number, 1);
    
  }
}
