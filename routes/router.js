const { publishMessage } = require('../controller')

module.exports = (router) => {
  router.get('/health', function (req, res) {
    res.send({success: true, message: 'Server is up and running'});
  })

  router.post('/publishMessage', function (req, res) {
    try {
      publishMessage(req, res);
    } catch (err) {
      console.log('ahschghgvd');
      throw err;
    }
  })
}