module.exports = (req, res) => {
  const dated = new Date();
  res.status(200).send(dated.toISOString());
};
