const axios = require('axios');
require("dotenv").config();
async function getCount(guildID) {
  let presenceCount;
  const options = {
    method: 'GET',
    url: 'https://discord.com/api/v10/guilds/' + guildID + '?with_counts=true',
    headers: {
      'Authorization': 'Bot ' + process.env.TOKEN
    }
  };
  await axios.request(options).then(function (res) {
    presenceCount = res.data.approximate_presence_count
  }).catch(function (error) {
    console.error(error)
  });
  return presenceCount
}
module.exports = getCount;