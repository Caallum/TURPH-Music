const config = require('../config.json');

module.exports = {
  name: 'stop',
  aliases: ['disconnect', 'disc'],
  dj: true,
  async run(message, args, embed, client) {
    let voiceChannel = message.member.voice.channel;
    if(!voiceChannel) return embed(`${config.emojis.error} Music Error`, 'Please join a voice channel to use this command!');
    if(message.guild.me.voice.channel && message.guild.me.voice.channel.id !== voiceChannel.id) return embed(`${config.emojis.error} Music Error`, 'I am already playing music in another channel!');
    
    let queue = client.distube.getQueue(message);
    if(!queue) return embed(`${config.emojis.error} Music Error`, 'There is currently nothing playing!');
    client.distube.stop(message);
    return embed(config.emojis.correct + ' Music Stopped', 'Successfully stopped the music!');
  }
}