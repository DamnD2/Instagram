const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const passportMiddleware = require('./middleware/passport');
const keys = require('./config/keys');
const {v4} = require('uuid');
const cors = require('cors');

const PORT = 1111;

let USERS = [
  {
    age: '35',
    description: '',
    email: 'test@mail.ru',
    password: 'test1TEST',
    phone: '',
    photo: 'https://media.discordapp.net/attachments/568141034345857129/635906494424023051/naaru.png?width=702&height=671',
    sex: 'Женщина',
    username: 'test',
    id: v4()
  },
  {
    age: '26',
    description: '',
    email: 'test1@mail.ru',
    password: 'test1TEST',
    phone: '+375257066965',
    photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_U4D9vI7TukMPMsH7AiBItemQXeIF_3qeHQ&usqp=CAU',
    sex: 'Мужчина',
    username: 'test1',
    id: v4()
  },
];

async function start () {
  try {
    await mongoose.connect('mongodb+srv://Admin:admin@cluster0.gdmyu.mongodb.net/users', { useNewUrlParser: true });
    app.listen(PORT, () => console.log(`Server has been started on ${PORT} port`));

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

app.get('/users', (req, res) => res.send(USERS));
app.get('/users/:id', (req, res) => {
  const user = USERS.find((user) => user.id === req.params.id);
  res.send(user);
});
app.post('/users', (req, res) => {
  const user = {...req.body, id: v4()};
  USERS.push(user);
  res.send(user);
});
app.put('/users/:id', (req, res) => {
  const index = USERS.findIndex((user) => user.id === req.params.id);
  USERS[index] = { ...USERS[index], ...req.body };
  res.send(USERS[index]);
});
app.delete('/users/:id', (req, res) => {
  USERS = USERS.filter((user) => user.id !== req.params.id);
  res.send({message: 'Пользователь успешно удалён'});
});

start();