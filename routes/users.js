const Router = require('express');
const controller = require('../controllers/users');
const passport = require('passport');

const router = new Router();

router.get('/', controller.getAll);
router.get('/id=:id', controller.getUserById);
router.get('/email=:email', controller.getUserByEmail);
router.get('/username=:username', controller.getUserByUsername);
router.put('/:id', passport.authenticate('jwt', { session: false }), controller.editUser);
router.delete('/:id', passport.authenticate('jwt', { session: false }), controller.deleteUserByUserId);



module.exports = router;