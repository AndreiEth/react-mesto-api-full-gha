const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const router = require('./routes/router');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const PORT = process.env.PORT || 5050;
const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(helmet());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());

// app.use((error, req, res, next) => {
//   const { status = 500, message } = error;
//   res.status(status).send({
//     message: status === 500 ?? `На сервере произошла ошибка${message}`,
//   });
//   next();
// });

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
