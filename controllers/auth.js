const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

class authController {
  async registration(req, res) {
    try {
      const { email, username, password, age  } = req.body;
      const userMatch = await User.findOne({ email, username });

      if (userMatch) {
        return res.status(400).json({ message: 'Пользователь с таким именем пользователя уже существует'});
      }
      const hashedPassword = bcrypt.hashSync(password, 5);
      const user = new User({ email, age, username, password: hashedPassword});
      await user.save();

      return res.json({ message: 'Регистрация прошла успешно' });

    } catch(error) {
      res.status(400).json({ error: 'Ошибка регистрации', message: error.message });
    }
  };

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'Пользователь с таким email не найден'});
      }

      const isValidPassword = bcrypt.compareSync(password, user.password);

      if (!isValidPassword) {
        return res.status(400).json({ message: 'Введен неверный пароль', result: false });
      }

      const token = jwt.sign({ id: user._id, email: user.email, username: user.username }, keys.secretKey, { expiresIn: '24h' });

      return res.json({ token: `Bearer ${token}`, result: true });
    } catch(error) {
      res.status(400).json({ error: 'Ошибка входа', message: error.message })
    }
  };
};

module.exports = new authController();