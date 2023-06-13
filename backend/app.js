const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const router = require('./routes/router');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const PORT = process.env.PORT || 3000;
const app = express();

const whitelist = [
  'https://andrei-eth.nomoredomains.rocks',
  'http://localhost:3000',
];
const corsOptions = {
  origin(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(helmet());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(requestLogger);
app.use('/', router);
app.use(errorLogger);
app.use(errors());

app.use((error, req, res, next) => {
  const { status = 500, message } = error;
  res.status(status).send({
    message: status === 500 ?? `На сервере произошла ошибка${message}`,
  });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
