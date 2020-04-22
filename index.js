const Discord=require("discord.js");
const bot=new Discord.Client();
 
const token="Njg5NDk0ODAyNTMzOTc0MTUz.XpVKtQ.tyS-l74eIedygDk0sBcH1oVONdk";
 
const PREFIX="!";
var leavemessage="true";

bot.on("ready", ()=>{
    console.log("Bot on!");
})
 
//message edit log
bot.on("messageUpdate", async(oldMessage, newMessage) =>{
    if(oldMessage.content===newMessage.content){
        return;
    }
 
        let logEmbed = new Discord.MessageEmbed()
        .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
        .setThumbnail(oldMessage.author.avatarURL)
        .setColor("RANDOM")
        .setDescription("A message from a user was edited")
        .addField("Before", oldMessage.content, true)
        .addField("After", newMessage.content, true)
        .addField("In channel: ", oldMessage.channel)
        .setTimestamp()
        .setFooter("This is an embed for updating messages");
 
        let loggingChannel=newMessage.guild.channels.cache.find(channel=>channel.name === "text-logs")
        if(!loggingChannel) return;
 
        loggingChannel.send(logEmbed);
})
 
 
//message delete log
bot.on("messageDelete", async message =>{
    let loggingEmbed=new Discord.MessageEmbed()
    .setTitle("Message Deleted!")
    .setColor("RANDOM")
    .setThumbnail(message.avatarURL)
    .addField("Message:", message)
    .addField("Deleted By:", message.author.tag)
    .addField("Deleted In:", message.channel)
    .addField("Deleted At:", message.createdAt);
 
    let logChannel=message.guild.channels.cache.find(channel=>channel.name==="text-logs")
    if(!logChannel){
        return;
    }
 
    logChannel.send(loggingEmbed);
 
})
 
bot.on("message", message=>{
 
    let args=message.content.substring(PREFIX.length).split(" ");
 
    switch(args[0]){
        //ping message
        case "ping":
            message.channel.send("pong")
        break;
 
        //setup message
        case "setup":
            message.channel.send("Create a channel named: text-logs. This is where message updates will be sent to.")
        break;
 
        //developer message
        case "developer":
            message.channel.send("ACAT Bot was developed by ACAT Gaming's ACAT_Tomato (Jaden).")
        break;
        
        //support server message
        case "support":
            message.channel.send("If you need help with the bot, want to check its status, or have any questions, join this discord: https://discord.gg/k6fEUJJ")
        break;

        //commands list message
        case "commands":
            message.channel.send("List of commands: !setup, !ping, !developer")
        break;

        //help message
        case "help":
            message.channel.send("Type !commands for a list of commands. If you are still having trouble, join the support discord.")
        break;
        
        case "disableleavemessage":
            leavemessage=false;
            message.channel.send("Leave message disabled")
            message.channel.send(leavemessage)
        break;

    }
})

//if members leave
bot.on("guildMemberRemove",member=>{


    let loggingEmbed=new Discord.MessageEmbed()
    .setTitle("Member Left!")
    .setColor("RANDOM")
    .setThumbnail(member.avatarURL)
    .addField("Member: ",`${member} has left`);
    const leaveChannel=member.guild.channels.cache.find(ch => ch.name === 'text-logs');

    if(!leaveChannel||leavemessage==false){
        return;
    }


    leaveChannel.send(loggingEmbed);
    

})
 
bot.login(token);