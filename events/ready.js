module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        console.log(`Running as ${client.user.username}`);
    },
};