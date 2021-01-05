const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const url = 'mongodb+srv://ravi_db:ravi_password@cluster0.rwrcd.mongodb.net/usersdata?retryWrites=true&w=majority'

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');
const usersdataRouter = require('./routes/userdata');


app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);
app.use('/usersdata', usersdataRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
