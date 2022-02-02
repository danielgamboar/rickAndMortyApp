const express = require('express');
const logger = require('morgan');

const PORT = 4001;

const app = express();

let routes = require('./routes/index');

app.use(logger('dev'));
app.use(express.json({ limit: '30mb', extended: true }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use('/api', routes);

app.listen(PORT, function () {
  console.log(`Server is running on: ${PORT}`);
});
