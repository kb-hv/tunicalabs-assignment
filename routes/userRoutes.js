const { Router } = require('express')
const { verifyUser } = require('../middleware/authori')
const userController = require('../controllers/userController')

const router = Router();

router.get('/', verifyUser, userController.home_get)

router.post('/addStudent', verifyUser, userController.add_student_post)
router.post('/editStudent', verifyUser, userController.edit_student_post)
router.get('/deleteStudent/:id', verifyUser, userController.delete_student_get)

module.exports = router