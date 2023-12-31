const express = require('express');

const adminController = require('../controller/adminController');
const { auth } = require('../middleware/middleware');

const router = express.Router();

router.get('/test', adminController.test);
router.post('/signup', adminController.signup);
router.post('/login', adminController.login);
router.get('/me', auth, adminController.getUserDetails);
router.get('/course/:courseId', auth, adminController.getCourseById);
router.post('/courses', auth, adminController.addCourse);
router.put('/courses/:courseId', auth, adminController.updateCourse);
router.get('/courses', auth, adminController.getAllCourses);

module.exports = router;