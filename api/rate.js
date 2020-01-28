const fs = require('fs').promises;
const axios = require('axios');

module.exports = async (req, res) => {
  const exists = await fs.readdir('./api');
  console.log(exists);
  for (let i = 0; i < exists.length; i += 1) {
    if (exists[i] == '_rate-cache.json') {
      let file = await fs.readFile('api/_rate-cache.json');
      file = JSON.parse(file.toString());
      console.log('from file', file);
      let d = new Date(file.timestamp);
      console.log(d.toLocaleString());
      const cacheAge = Date.now() - file.timestamp;
      if (cacheAge < 60000) {
        return res.status(200).send(file);
      } else {
        console.log('rate expired', cacheAge/1000);
      }
    }
  }
  try {
    const response = await axios.get('https://api.mybitx.com/api/1/ticker?pair=XBTMYR');
    console.log(response.data);
    // let response = {
    //   data: {
    //     pair: 'XBTMYR',
    //     timestamp: 1580224149350,
    //     bid: '36513.00',
    //     ask: '36514.00',
    //     last_trade: '36514.00',
    //     rolling_24_hour_volume: '21.878937',
    //     status: 'ACTIVE'
    //   }
    // }
    const rateStr = JSON.stringify(response.data);
    await fs.writeFile('api/_rate-cache.json', rateStr);
    console.log('cached');
    return res.status(200).send(response.data);
  } catch (error) {
    console.error(error);
  }
};