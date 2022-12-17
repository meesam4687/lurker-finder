const Discord = require('discord.js');
const presenceCounter = require('../util/presenceCounter.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('people')
        .setDescription('Find the possible invisible users'),
    async execute(interaction) {
        await interaction.deferReply();
        const curGuild = interaction.guild;
        const members = await curGuild.members.fetch();
        let onlineMembers = members.filter(member => member.presence);
        let totalConnected = await presenceCounter(curGuild.id);
        let invisibleCount = totalConnected - onlineMembers.size;
        if (invisibleCount === 0) return await interaction.editReply("No One is Invisible Here");
        let offlineMembers = members.filter(member => !member.presence);
        let offlineMemberArray = []
        const mutualServers = [];
        offlineMembers.forEach(member => {
            offlineMemberArray.push(member)
        })
        let totalGuilds = await interaction.client.guilds.cache
        let totalGuildsArray = []
        totalGuilds.each(guild => {
            totalGuildsArray.push(guild.id)
        })
        for (const member of offlineMemberArray) {
            for (const server of totalGuildsArray) {
                let guildTotalMembers = await interaction.client.guilds.cache.get(server).members.fetch()
                if(!guildTotalMembers.has(member.id)) {
                    console.log(`${member} is not in ${server}`)
                    continue;
                }
                let guildTotalConnected = await presenceCounter(server)
                let guildOnlineMembers = guildTotalMembers.filter(member => member.presence)
                let guildInvisibleCount = guildTotalConnected - guildOnlineMembers.size;
                console.log("Reached The Point oF Checking")
                if (guildInvisibleCount === 0) {
                    console.log("Reached The Point oF Removing")
                    const index = offlineMemberArray.indexOf(member);
                    offlineMemberArray.splice(index, 1)
                }
            }
        }
        let quantity = invisibleCount = 1 ? `${invisibleCount} member is` : `${invisibleCount} members are`
        const invisibleEmbed = new Discord.EmbedBuilder()
            .setTitle("Invisible Users")
            .setDescription(`${quantity} Invisible here`)
            .addFields({ name: "Possible Invisible Users", value: offlineMemberArray.join("\n") })
        interaction.editReply({ embeds: [invisibleEmbed] });
    },
};


/*
interaction.client.guilds.cache.forEach(async (guild) => {
    if (guild.members.cache.has(member)) {
        let guildtotalConnected = await presenceCounter(guild.id);
        let guildtotalMembers = await guild.members.fetch()
        let guildonlineMembers = guildtotalMembers.filter(member => member.presence)
        let guildinvisibleCount = guildtotalConnected - guildonlineMembers.size;
        if (guildinvisibleCount === 0) {
            console.log("I reached this point")
            const index = offlineMemberArray.indexOf(member);
            offlineMemberArray.splice(index, 1)
        }
    }
})
*/