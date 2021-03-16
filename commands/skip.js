const { MessageEmbed } = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'skip',
  aliases: ['s'],
  description: 'Skips the song currently playing',
  usage: 'skip',
  dj: true,
  category: 'music',
  async run(message, args, embed, client) {
    let voiceChannel = message.member.voice.channel;
    if(!voiceChannel) return embed(`${config.emojis.error} Music Error`, 'Please join a voice channel to use this command!');
    if(message.guild.me.voice.channel && message.guild.me.voice.channel.id !== voiceChannel.id) return embed(`${config.emojis.error} Music Error`, 'I am already playing music in another channel!');
    
    let guild = client.distube.getQueue(message);
    if(!guild) return embed(`${config.emojis.error} Music Error`, 'There is currently nothing playing');
    
    let song = guild.songs[0];
    
    try {
      
      const skipped = new MessageEmbed()
        .setTitle(config.emojis.correct + ' Skipped ' + song.name)
        .setThumbnail(song.thumbnail)
        .setFooter(client.ftext, client.ficon)
        .addField('Requested By:', song.user, true)
        .setColor(client.col)
      message.channel.send(skipped).then((msg) => {
        client.distube.skip(message);
      });
    } catch(err) {
      return embed('Error Encountered', '```' + err + '```');
    }
  }
}