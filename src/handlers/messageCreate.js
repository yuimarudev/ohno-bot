const { Util } = require("discord.js");

module.exports = async (message) => {
  if (message.author.bot || !message.content || !message.guild) return;
  if (message.content.startsWith(process.env.prefix)) {
    const [command, ...args] = message.content
      .slice(process.env.prefix.length)
      .split(" ");
    if (command in commands) commands[command](message, args);
  } else if (queues.get(message.channel.id)) {
    const serverQueue = queues.get(message.channel.id);
    let text =
      (message.member.displayName || message.author.username) +
      "。" +
      Util.cleanContent(
        message.content.replace(/```.*```/gs, ""),
        message.channel
      );
    if (serverQueue.isPlaying) {
      serverQueue.texts.push(text);
    } else {
      serverQueue.play(text);
    }
  }
};
