const axios = require('axios');

module.exports = async (req, res) => {
  try {
    // const response = await axios.get('https://api.mybitx.com/api/1/ticker?pair=XBTMYR');
    const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=myr&include_last_updated_at=true');
    // const response = {
    //   data: { pair: "XBTMYR", timestamp: 1580236616259, bid: "36182.00", ask: "36379.00", last_trade: "36181.00", rolling_24_hour_volume: "22.129826", status: "ACTIVE" }
    // }
    // const response = {
    //   data: {"bitcoin":{"myr":37912,"last_updated_at":1580483998}}
    // }
    console.log(response.data);
    const coingeckoResObj = {
      myr_price: response.data.bitcoin.myr,
      timestamp: response.data.bitcoin.last_updated_at*1000
    }
    return res.status(200).send(coingeckoResObj);
  } catch (error) {
    console.error(error);
  }
};