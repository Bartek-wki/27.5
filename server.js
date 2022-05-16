const express = require('express');
const cors = require('cors')
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');

const app = express();

app.use(express.static(path.join(__dirname, '/client/build')));
app.use(express.static(path.join(__dirname, '..', 'public')));


// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes')

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

app.use((req, res) => {
  res.status(404).send({message: '404 not found...'});
})

// connects our backend code with the database
const NODE_ENV = process.env.NODE_ENV;
let dbUri = '';
const password = process.env.password;

if(NODE_ENV === 'production') dbUri = 'mongodb+srv://Bartek-wki:' + password + '@cluster0.qoovd.mongodb.net/NewWaveDB?retryWrites=true&w=majority';
else if(NODE_ENV === 'test') dbUri = 'mongodb://localhost:27017/NewWaveDBtest';
else dbUri = 'mongodb://localhost:27017/NewWaveDB';

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;


db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

module.exports = server

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New client! Its id – ' + socket.id);
})