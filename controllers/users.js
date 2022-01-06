const User = require('../User');
/* const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys'); */

class usersController {
  async getAll(req, res) {
    try {
      res.json(await User.find());
    } catch(error) {
      console.log(error.message);
      res.status(400).json({ error: 'Ошибка получения пользователей', message: error.message });
    }
  };

  async getUserById(req, res) {
    try {
      res.json(await User.findById(req.params.id));
    } catch(error) {
      console.log(error.message);
      res.status(400).json({ error: 'Ошибка получения пользователя по id', message: error.message });
    }
  };

  async getUserByEmail(req, res) {
    try {
      res.json(await User.findOne({ email: req.params.email }));
    } catch(error) {
      console.log(error.message);
      res.status(400).json({ error: 'Ошибка получения пользователя по username', message: error.message });
    }
  };

  async getUserByUsername(req, res) {
    try {
      res.json(await User.findOne({ username: req.params.username }));
    } catch(error) {
      console.log(error.message);
      res.status(400).json({ error: 'Ошибка получения пользователя по email', message: error.message });
    }
  };

  async editUser(req, res) {
    
  };

  async deleteUserByUserId(req, res) {
    try {
      res.json(await User.findByIdAndDelete(req.params.id));
    } catch(error) {
      console.log(error.message);
      res.status(400).json({ error: 'Ошибка удаления пользователя', message: error.message });
    }
  };
};

module.exports = new usersController();