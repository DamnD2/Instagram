const Router = require('express');
const controller = require('../controllers/posts');
const passport = require('passport');

const router = new Router();

router.get('/:id', passport.authenticate('jwt', { session: false }), controller.getPosts);
router.post('/:id', passport.authenticate('jwt', { session: false }), controller.addPost);
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.deletePost);

module.exports = router;