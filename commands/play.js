let { Collection } = require('discord.js');
const config = require('../config.json');
let cooldown = new Collection();

module.exports = {
  name: 'play',
  aliases: ['p'],
  category: 'music',
  description: 'Plays music or add music to the queue',
  usage: 'play <song title>',
  async run(message, args, embed, client) {
    let voiceChannel = message.member.voice.channel;
    if(!voiceChannel) return embed('Music Error', 'Please join a voice channel to use this command!');
    if(message.guild.me.voice.channel && message.guild.me.voice.channel.id !== voiceChannel.id) return embed('Music Error', 'I am already playing music in another channel!');
    let searchString = args.join(' ');
    
    
    
    if(message.member.roles.cache.has('814508422149570571')) {
      if(!cooldown.has(message.author.id)) {
        cooldown.set('playSkip', new Collection());
      };
      
      const now = Date.now();
      const timestamps = cooldowns.get('playSkip');
      const cooldownAmount = 300 * 1000;
      
      if(timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        
        if(now < expirationTime) {
          try {
            client.distube.play(message, searchString)
          } catch (error) {
            console.warn(error);
            return embed('Error Encountered', '```' + error + '```');
          } 
        };
        
        timestamp.set(message.author.id, now);
        setTimeout(() => timestamp.delete(message.author.id), cooldownAmount);
      }
    }
    
    try {
      client.distube.play(message, searchString)
    } catch (error) {
      console.warn(error);
      return embed('Error Encountered', '```' + error + '```');
    } 
  }
}