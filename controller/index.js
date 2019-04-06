const { registerPublisher, publishMessage } = require('./publisher');
const { registerConsumer } = require('./consumer');

async function registerQueue() {
  try {
    await registerConsumer();
    await registerPublisher();
  } catch (err) {
    console.log('qwertyuierr')
    throw err;
  }
}

module.exports = {
  registerQueue,
  publishMessage,
}