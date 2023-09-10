const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const shellRoutes = require('./routes/shellCommand');
const shellSFTPoRoutes = require('./routes/shellFtp');
const port = require('./config/enviroment');

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use('/', shellRoutes);
app.use('/', shellSFTPoRoutes);


console.log('port', port);
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});