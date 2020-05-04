const Discord=require("discord.js");
const bot=new Discord.Client();
 
const token="Njg5NDk0ODAyNTMzOTc0MTUz.XpVKtQ.tyS-l74eIedygDk0sBcH1oVONdk";
 
const PREFIX="!";
var leavemessage="true";
var deletemessage="true";
var editmessage="true";

bot.on("ready", ()=>{
    console.log("Bot on!");
    bot.user.setActivity("!setup");
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
        if(!loggingChannel||editmessage==false)
         return;
 
        loggingChannel.send(logEmbed);
})
 
 
//message delete log
bot.on("messageDelete", async message =>{
    let loggingEmbed=new Discord.MessageEmbed()
    .setTitle("Message Deleted!")
    .setColor("RANDOM")
    .setThumbnail(message.avatarURL)
    .addField("Message:", message)
    .addField("Sent By:", message.author.tag)
    .addField("Deleted In:", message.channel)
    .addField("Deleted At:", message.createdAt);
 
    let logChannel=message.guild.channels.cache.find(channel=>channel.name==="text-logs")
    if(!logChannel||deletemessage==false){
        return;
    }
 
    logChannel.send(loggingEmbed);
 
})
 
bot.on("message", message=>{

    if(!message.content.startsWith(PREFIX)) return;

    let args=message.content.substring(PREFIX.length).split(" ");
 
    switch(args[0]){
        //ping message
        case "ping":
            message.channel.send("pong")
        break;
 
        //setup message
        case "setup":
            message.channel.send("Create a channel named: text-logs. This is where message updates will be sent to. Use !commands for a list of helpful commands.")
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
            message.channel.send("List of commands: !setup, !ping, !developer, !help, !disableleavemessage, !disabledeletedmessage, !disableeditedmessage, !enableleavemessage, !enabledeletemessage, !enableeditedmessage")
        break;

        //help message
        case "help":
            message.channel.send("Type !commands for a list of commands. If you are still having trouble, join the support discord.")
        break;
        
        //disable member leave message
        case "disableleavemessage":
        if(!message.member.hasPermission("ADMINISTRATOR"))
            message.channel.send("You do not have permission to do this!")
        else{
            leavemessage=false;
            message.channel.send("Leave message disabled")
        }
        break;
        

        //disable deleted message
        case "disabledeletedmessage":
        if(!message.member.hasPermission("ADMINISTRATOR"))
            message.channel.send("You do not have permission to do this!")
        else{
            deletemessage=false;
            message.channel.send("Deleted message logs disabled")
        }
        break;

        //disable edited message
        case "disableeditedmessage":
        if(!message.member.hasPermission("ADMINISTRATOR"))
            message.channel.send("You do not have permission to do this!")
        else{
            editmessage=false;
            message.channel.send("Edited message logs disabled")
        }
        break;

        //enable member leave message
        case "enableleavemessage":
        if(!message.member.hasPermission("ADMINISTRATOR"))
            message.channel.send("You do not have permission to do this!")
        else{
            leavemessage=true;
            message.channel.send("Leave message enabled")
        }
        break;

        //enable deleted message
        case "enabledeletedmessage":
        if(!message.member.hasPermission("ADMINISTRATOR"))
            message.channel.send("You do not have permission to do this!")
        else{
            deletemessage=true;
            message.channel.send("Deleted message logs enabled")
        }
        break;

        //enable edited message
        case "enableeditedmessage":
        if(!message.member.hasPermission("ADMINISTRATOR"))
            message.channel.send("You do not have permission to do this!")
        else{
            editmessage=true;
            message.channel.send("Edited message logs enabled")
        }
        break;

        //enable message
        case "enable":
        if(!message.member.hasPermission("ADMINISTRATOR"))
            message.channel.send("You do not have permission to do this!")
        else
            message.channel.send("enable(setting)")
        break;
        
        //disable message
        case "disable":
        if(!message.member.hasPermission("ADMINISTRATOR"))
            message.channel.send("You do not have permission to do this!")
        else
            message.channel.send("disable(setting)")
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