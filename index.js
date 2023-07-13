const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const adminRoutes = require('./src/routes/adminRoutes');
const userRoutes = require('./src/routes/userRoutes');
const connectDB = require('./src/config/database');

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json())

app.use('/admin', adminRoutes);
app.use('/users', userRoutes);

// for all other routes, return 404
app.use((req, res, next) => {
	res.status(404).send();
});

//Connect to mongodb atlas
connectDB();
mongoose.connection.on('error', (error) => {
	console.log(error);
});

app.listen(3000, () => {
	console.log('Server is listening on port 3000');
});
