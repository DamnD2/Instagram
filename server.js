const express = require('express');
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

const app = express();
app.use(cors());
app.use(express.json());

app.get('/users', (req, res) => res.send(USERS));
app.get('/users/:id', (req, res) => {
  const user = USERS.find((user) => user.id === +req.params.id);
  res.send(user);
});
app.post('/users', (req, res) => {
  const user = {...req.body, id: v4()};
  USERS.push(user);
  res.send(user);
});
app.delete('/users/:id', (req, res) => {
  USERS = USERS.filter((user) => user.id !== req.params.id);
  res.send({message: 'Пользователь успешно удалён'});
});

app.listen(PORT, () => console.log('Server has been started on 8081 port'));