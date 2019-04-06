const { createConnection, createChannel, assertExchange, assertQueue, bindQueue } = require('./common.js')
const config = process.env;

let channel;

async function registerPublisher() {
  try {
    const conn = await createConnection(config.baseUrl);
    channel = await createChannel(conn);
    await assertExchange(channel, config.exchangeName, config.exchangeType, config.isDurable);
    await assertQueue(channel, config.queueName);
    await bindQueue(channel, config.exchangeName, config.routingKey, config.queueName);
  } catch (err) {
    throw err;
  }
}

function publishMessage(req, res) {
  try {
    const { body } = req;
    const bufferedMessage = Buffer.from(JSON.stringify(body));
    channel.publish(config.exchangeName, config.routingKey, bufferedMessage);
    res.send({ succes: true, message: 'message published' })
  } catch(err) {
    console.log('Error in publishing the message');
  }
}

module.exports = {
  registerPublisher,
  publishMessage,
}