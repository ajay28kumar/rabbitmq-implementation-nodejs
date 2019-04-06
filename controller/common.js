const amqp = require('amqplib');

async function createConnection(url) {
  try {
    const conn = await amqp.connect(url);
    return conn;
  } catch (err) {
    throw err;
  }
}

async function createChannel(conn) {
  try {
    const channel = await conn.createChannel();
    return channel;
  } catch (err) {
    throw err;
  }
}

async function assertExchange(channel, exchangeName, exchangeType, isDurable) {
  try {
    await channel.assertExchange(exchangeName, exchangeType, {durable: isDurable});
  } catch (err) {
    throw err;
  }
}

async function assertQueue(channel, queueName) {
  try {
    await channel.assertQueue(queueName)
  } catch (err) {
    throw err;
  }
}

async function bindQueue(channel, exchangeName, routingKey, queueName) {
  try {
    await channel.bindQueue(queueName, exchangeName, routingKey);
  } catch (err) {
    throw err;
  }
}


module.exports = {
  createConnection,
  createChannel,
  assertExchange,
  assertQueue,
  bindQueue,
}