const Utils = require('../utils/utils');

const User = require('../models/user');
const Course = require('../models/course');

const userController = {
    signup: async (req, res) => {
        const { name, username, password } = req.body;
        try {
            const userExists = await User.findOne({ username });
            if (userExists) {
                return res.status(400).json({ message: 'User already exists' });
            }
            const newUser = new User({ name, username, password });
            await newUser.save();
            const token = Utils.getLoginToken(username);
            res.status(201).json({ message: 'User created successfully', token })
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    login: async (req, res) => {
        const { username, password } = req.body;
        try {
            const userExists = await User.findOne({ username, password });
            if (userExists) {
                const token = Utils.getLoginToken(username);
                return res.status(200).json({ message: 'Logged in successfully', token });
            } else {
                res.status(400).json({ message: 'User doesn\'t exist' });
            }
        } catch (err) {
            console.log(err)
            res.status(400).json(err);
        }
    },

    getUserDetails: async (req, res) => {
        const username = req.username;
        try {
            const userDetails = await User.findOne({ username }, { password: 0 });
            return res.status(200).json({ userDetails });
        } catch (err) {
            console.log(err)
            res.status(400).json(err);
        }
    },

    listAllCourses: async (req, res) => {
        try {
            const Courses = await Course.find();
            return res.status(201).json(Courses);
        } catch (err) {
            console.log(err)
            res.status(400).json(err);
        }
    },

    purchaseCourse: async (req, res) => {
        try {
            const course = await Course.findById(req.params.courseId);
            if (course) {
                const user = await User.findOne({ username: req.username });
                if (user) {
                    user.purchasedCourses.push(course);
                    await user.save();
                    res.json({ message: 'Course purchased successfully' });
                } else {
                    res.status(403).json({ message: 'User not found' });
                }
            } else {
                res.status(404).json({ message: 'Course not found' });
            }

        } catch (err) {
            console.log(err)
            res.status(400).json(err);
        }
    },

    getAllPurchasedCourses: async (req, res) => {
        try {
            const user = await User.findOne({ username: req.username }).populate('purchasedCourses');
            if (user) {
                res.json({ purchasedCourses: user.purchasedCourses || [] });
            } else {
                res.status(403).json({ message: 'User not found' });
            }
        } catch (err) {
            console.log(err)
            res.status(400).json(err);
        }
    },
};

module.exports = userController;