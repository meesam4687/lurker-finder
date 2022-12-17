module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        client.user.setPresence({ activities: [{ name: 'Finding Lurkers' }], status: 'online' }),
        console.log(`Running as ${client.user.username}`);
    },
};