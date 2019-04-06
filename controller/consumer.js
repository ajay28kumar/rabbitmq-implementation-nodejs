const { createConnection, createChannel, assertExchange, assertQueue, bindQueue } = require('./common.js')
const config = process.env;

async function registerConsumer() {
  try {
    const conn = await createConnection(config.baseUrl);
    const channel = await createChannel(conn);
    await assertExchange(channel, config.exchangeName, config.exchangeType, config.isDurable);
    await assertQueue(channel, config.queueName);
    await bindQueue(channel, config.exchangeName, config.routingKey, config.queueName);
    consumeMessage(channel, config.queueName);
  } catch (err) {
    throw err;
  }
}

function consumeMessage(channel, queue) {
  try {
    channel.consume(queue, function (msg) {
      console.log(JSON.parse(msg.content.toString()));
      channel.ack(msg);
    }, {noAck: false });
  } catch (err) {
    channel.nack(msg, false, false);
    throw err;
  }
}

module.exports = {
  registerConsumer,
}