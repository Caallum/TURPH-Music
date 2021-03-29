const { MessageEmbed } = require('discord.js');
const config = require('../config.json');

module.exports = {
  name: 'loop',
  description: 'Either loops the queue or the song',
  category: 'music',
  dj: true,
  usage: 'loop <song/queue/disable>',
  async run(message, args, embed, client) {
    let mode = args[0];
    let modeNumber;
    
    if(!mode) return embed(`${config.emojis.error} Command Error`, 'Please specify either `song`, `queue` or `disable`');
    if(!mode.toLowerCase().includes('song') && !mode.toLowerCase().includes('queue') && !mode.toLowerCase().includes('disable')) return embed(`${config.emojis.error} Command Error`, 'Please specify either `song`, `queue` or `disable`');
    
    if(mode.toLowerCase() === 'song') {
      modeNumber = 1;
    } else if(mode.toLowerCase() === 'queue') {
      modeNumber = 2;
    } else {
      modeNumber = 0;
    };
    
    try {
      client.distube.setRepeatMode(message, modeNumber);
      return embed(`${config.emojis.correct} Loop Enabled`, `Set loop mode to \`${mode.toLowerCase()}\``);
    } catch (e) {
      console.log(e);
      return embed(`${config.emojis.error} Error`, e);
    }
  }
};
