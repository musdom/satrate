const axios = require('axios');

module.exports = async (req, res) => {
  try {
    // const response = await axios.get('https://api.mybitx.com/api/1/ticker?pair=XBTMYR');
    const response = {
      data: { pair: "XBTMYR", timestamp: 1580236616259, bid: "36182.00", ask: "36379.00", last_trade: "36181.00", rolling_24_hour_volume: "22.129826", status: "ACTIVE" }
    }
    console.log(response.data);
    return res.status(200).send(response.data);
  } catch (error) {
    console.error(error);
  }
};