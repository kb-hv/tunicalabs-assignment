const { Router } = require('express')
const passport = require('passport');
const authController = require('../controllers/authController')
const { noAuth } = require('../middleware/authori')

const router = Router();

router.get('/', authController.home_get)

router.get('/login', noAuth, authController.login_get)
router.post('/login', passport.authenticate('local', { session: false, failureRedirect: '/loginError' }), authController.login_post)
router.get('/loginError', authController.login_error_get)

router.get('/logout', authController.logout_get)

router.post('/register', authController.register_post)

module.exports = router
