require('dotenv').config();

const express = require('express');
const app = express();
app.listen(1234);
app.get('/*', (req, res) => {
  res.send('Music online');
})

const discord = require('discord.js');
const client = new discord.Client();
const DisTube = require('distube');
const fs = require('fs');
const config = require('./config.json');

let searchSongsOption;

if(client.distube_options.searchSongs === 'true') {
  searchSongsOption = true;
} else {
  searchSongsOption = false;
}

client.distube = new DisTube(client, { searchSongs: false, emitNewSongsOnly: true, leaveOnFinish: true, leaveOnEmpty: true, searchSongs: searchSongsOption });
client.col = config.embed_color;
client.commands = new discord.Collection();
client.ftext = config.footer_text;
client.ficon = config.footer_icon;
client.thumbnail = config.thumbnail_image;

let token = config.token;
if(!token) throw new TypeError('TOKEN is not defined, please enter a token value inside the config.json file');

client.login(token);

client.on('ready', () => {
  console.log(client.user.tag + ' is online');
  client.user.setActivity(config.statusActivity.replace('{user}', client.user.username, ), { TYPE: config.statusType });
})

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));
for(const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
};

client.on('message', async (message) => {
  if(!message.guild || message.author.bot) return;
  
  async function embed(title, description) {
    let embedMsg = new discord.MessageEmbed()
      .setTitle(title)
      .setThumbnail(client.thumbnail)
      .setColor(client.col)
      .setFooter(client.ftext, client.ficon)
      .setDescription(description);
    message.channel.send(embedMsg);
  }
  let prefix = config.prefix;
  
  if(message.content === `<@${client.user.id}`) return embed('Command Help', 'The prefix for **music** commands is:`' + prefix + '`');
  
  
  let args = message.content.slice(prefix.length).trim().split(/ +/);
  let commandName = args.shift().toLowerCase();
  let command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
  
  if(!message.content.startsWith(prefix)) return;
  message.delete();
  if(!command) return;
  
 
  if(command.dj && !message.member.roles.cache.has(config.id.djRole)) {
    return embed('Insufficient Permissions', `Missing permission:\n\n\`\`\`Member is not DJ\`\`\``);
  }
  
  if(command.owner && message.author.id !== config.id.ownerId) return;
  
  
  command.run(message, args, embed, client);
});

client.distube
    .on('playSong', async(message, queue, song) => {
    const playingEmbed = new discord.MessageEmbed()
      .setTitle(`${config.emojis.info} Now Playing ${song.name}`)
      .setThumbnail(client.thumbnail ? client.thumbnail : 'null')
      .setFooter(client.ftext, client.ficon)
      .addField('Duration:', song.formattedDuration, true)
      .addField('Requested By:', song.user, true)
      .setColor(client.col);
    message.channel.send(playingEmbed);
    client.user.setActivity(`${song.name}`, { type: 'LISTENING' });
  })
  .on('addSong', async (message, queue, song) => {
    let position = queue.songs.length;
  
    const addedSong = new discord.MessageEmbed()
      .setTitle(config.emojis.correct + ' Added to Queue')
      .setColor(client.col)
      .setFooter(client.ftext, client.ficon)
      .setThumbnail(client.thumbnail ? client.thumbnail : 'null')
      .addField('Title:', song.name, true)
      .addField('Duration:', song.formattedDuration, true)
      .addField('Queue Position:', position, true)
      .addField('Requested By:', song.user, true)
    message.channel.send(addedSong);
  })
  .on('addList', async (message, queue, playlist, song) => {
    const addlistEmbed = new discord.MessageEmbed()
      .setTitle(config.emojis.correct + ' Added to Queue')
      .setThumbnail(client.thumbnail ? client.thumbnail : 'null')
      .setColor(client.col)
      .setThumbnail(playlist.thumbnail)
      .setFooter(client.ftext, client.ficon)
      .addField('Playlist Title:', playlist.name, true)
      .addField('Playlist Songs:', playlist.total_items, true)
      .addField('Requested By:', playlist.user, true)
    message.channel.send(addlistEmbed);
  })
  .on('playList', async (message, queue, playlist, song) => {
    const playingList = new discord.MessageEmbed()
      .setTitle(`${config.emojis.info} Now Playing ${song.name}`)
      .setThumbnail(client.thumbnail ? client.thumbnail : 'null')
      .setColor(client.col)
      .setFooter(client.ftext, client.ficon)
      .addField('Duration:', song.formattedDuration, true)
      .addField('Requested By:', song.user, true)
    message.channel.send(playingList);
  })
  .on('error', async (message, err) => {
    console.log(err);
    const errorEmbed = new discord.MessageEmbed()
      .setTitle(config.emojis.error + ' Error Encountered')
      .setFooter(client.ftext, client.ficon)
      .setColor(client.col)
      .setThumbnail(client.thumbnail ? client.thumbnail : 'null')
      .setDescription(err);
    message.channel.send(errorEmbed);
  }) 
  .on('finish', async (message) => {
    const finished = new discord.MessageEmbed()
      .setTitle(config.emojis.warning + ' Finished Playing')
      .setFooter(client.ftext, client.ficon)
      .setThumbnail(client.thumbnail ? client.thumbnail : 'null')
      .setColor(client.col)
      .setDescription('The queue is empty so I left the voice channel!');
    message.channel.send(finished);
    client.user.setActivity(config.statusActivity.replace('{user}', client.user.username, ), { TYPE: config.statusType });
  }) 
  .on('searchResult', async(message, result) => {
    let i = 0;
    const embed = new discord.MessageEmbed()
      .setTitle(config.emojis.info + ' Searched Songs')
      .setColor(client.col)
      .setThumbnail(client.thumbnail ? client.thumbnail : 'null')
      .setFooter(client.ftext, client.ficon)
      .setDescription(`**Chose a song from below**\n\n${result.map(song => `__${++i}:__ ${song.name} » [URL](${song.url})`).join('\n')}\n\nEnter any number from this list or wait 60 seconds to cancel`);
    return message.channel.send(embed);
  })
  .on('searchCancel', (message) => {
    const cancelled = new discord.MessageEmbed()
      .setTitle(config.emojis.error + ' Search Cancelled')
      .setFooter(client.ftext, client.ficon)
      .setThumbnail(client.thumbnail ? client.thumbnail : 'null')
      .setColor(client.col)
      .setDescription(`I have stopped searching since the prompt was not answered in 60 seconds`);
    return message.channel.send(cancelled);
  })
  .on('empty', (message) => {
    client.user.setActivity(config.statusActivity.replace('{user}', client.user.username, ), { TYPE: config.statusType });
  })
