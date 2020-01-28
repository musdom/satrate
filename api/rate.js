const axios = require('axios');

module.exports = async (req, res) => {
  try {
    const response = await axios.get('https://api.mybitx.com/api/1/ticker?pair=XBTMYR');
    console.log(response.data);
    return res.status(200).send(response.data);
  } catch (error) {
    console.error(error);
  }
};