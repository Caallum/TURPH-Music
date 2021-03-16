const config = require('../config.json');

module.exports = {
  name: 'volume',
  aliases: ['vol'],
  dj: true,
  description: 'Controls the volume of the music playing',
  category: 'music',
  usage: 'volume <number (1 to 200)>',
  async run(message, args, embed, client) {
    let voiceChannel = message.member.voice.channel;
    if(!voiceChannel) return embed(config.emojis.error + ' Music Error', 'Please join a voice channel to use this command!');
    if(message.guild.me.voice.channel && message.guild.me.voice.channel.id !== voiceChannel.id) return embed(config.emojis.error + ' Music Error', 'I am already playing music in another channel!');
    
    let queue = client.distube.getQueue(message);
    if(!queue) return embed(`${config.emojis.error} Music Error`, 'There is currently nothing playing!');
    
    let volume = parseInt(args[0]);
    if(!volume) {
      return embed(config.emojis.info + ' Volume', 'The volume is currently set at ' + queue.volume + '%');
    }
    if(isNaN(volume)) return embed(`${config.emojis.error} Music Error`, 'Please enter a number between 1 and 200!');
    if(volume < 1 && volume > 200) return embed(`${config.emojis.error} Music Error`, 'Please enter a number between 1 and 200!');
    
    client.distube.setVolume(message, volume);
    embed(`${config.emojis.correct} Volume Set`, 'Successfully set the volume to: ' + volume)
  }
}