const axios = require('axios');
require("dotenv").config();
async function getCount(guildID) {
  let presenceCount;
  const options = {
    method: 'GET',
    url: 'https://discord.com/api/guilds/' + guildID + 'widget.json',
    headers: {
      'Authorization': 'Bot ' + process.env.TOKEN
    }
  };
  await axios.request(options).then(function (res) {
    if(!res.data.presence_count){
      throw new Error('Server Widget not Enabled!');
    }
    presenceCount = res.data.presence_count
  }).catch(function (error) {
    console.error(error)
  });
  return presenceCount
}
module.exports = getCount;
