const Posts = require('../models/Posts');

class authController {
  async getPosts(req, res) {
    try {
      res.json(await Posts.findById(req.params.id));
    } catch(error) {
      res.status(400).json({ error: 'Ошибка получения поста по ID', message: error.message });
    }
  };

  async addPost(req, res) {
    try {
      const posts = await Posts.findById(req.params.id);

      if (posts) {
        res.json(await Posts.updateMany({ id: req.params.id }, { $push: { posts: req.body}}));
      } else {
        const firstPost = new Posts({ _id: req.params.id, posts: [req.body] });
        firstPost.save();
        res.json(firstPost);
      }
    } catch(error) {
      res.status(400).json({ error: 'Ошибка добавления поста по ID', message: error.message });
    }
  }

  async deletePost(req, res) {
    try {
      const id = req.params.id;
      res.json(await Posts.updateMany({ id }, { $pull: { posts: { _id : id } } }));
    } catch(error) {
      res.status(400).json({ error: 'Ошибка получения всех постов', message: error.message })
    }
  };
};

module.exports = new authController();