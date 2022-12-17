const Discord = require('discord.js');
const presenceCounter = require('../util/presenceCounter.js');

module.exports = {
    data: new Discord.SlashCommandBuilder()
        .setName('count')
        .setDescription('How many users in this server are invisible'),
    async execute(interaction) {
        const guild = interaction.guild;
        await interaction.deferReply();
        const members = await guild.members.fetch();
        let onlineMembers = members.filter(member => member.presence);
        let totalConnected = await presenceCounter(guild.id);
        let invisibleCount = totalConnected - onlineMembers.size;
        if(invisibleCount === 0) return await interaction.editReply("No One is Invisible Here");
        let quantity = invisibleCount=1 ? `${invisibleCount} member is` : `${invisibleCount} members are`
        await interaction.editReply(`${quantity} Invisible`);
    },
};