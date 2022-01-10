const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const passportMiddleware = require('./middleware/passport');
const keys = require('./config/keys');
const cors = require('cors');

async function start () {
  try {
    await mongoose.connect(keys.mongoURL, { useNewUrlParser: true });
    app.listen(keys.PORT, () => console.log(`Server has been started on ${keys.PORT} port`));

  } catch(error) {
    console.log(error.message);
  }
}

const app = express();
app.use(passport.initialize());
passportMiddleware(passport);
app.use(express.json());
app.use(cors());

app.use('/auth', authRouter);
app.use('/users', usersRouter);

start();