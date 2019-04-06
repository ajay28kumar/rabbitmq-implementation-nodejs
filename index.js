const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
const { registerQueue } = require('./controller');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('dotenv').config();
const port = process.env.PORT; 

// mount router on app
app.use('/', router);

registerQueue().then(function(){
  // routes are registred after the queue is initialized
  require('./routes/router')(router);
}).catch(function(err) {
  console.log(`Error in setting initializing app, ${err}`);
  process.exit(1);
});

app.listen(port, function() {
  console.log(`Server is running in port ${port}`);
})


process.on('uncaughtException', function(err) {
  console.log(`uncaught exception ${err}`);
  process.exit(1);
})