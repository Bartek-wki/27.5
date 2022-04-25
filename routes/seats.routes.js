const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');


router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/random').get((req, res) => {
  res.json(db.seats[Math.floor(Math.random() * (db.seats.length))]);
});

router.route('/seats/:id').get((req, res) => {
  let id = req.params.id;
  id = parseInt(id);
  res.json(db.seats.find(person => person.id === id));    
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  if (db.seats.some(spot => spot.seat === seat && spot.day === day)) {
    res.status(400).send({ message: "The slot is already taken..." })
  } else {
    const id = uuidv4();
    db.seats.push({ id: id, day: day, seat: seat, client: client, email: email});
    res.send({ message: 'Ok!' });
  }
})

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  let id = req.params.id;
  id = parseInt(id);
  db.seats.forEach((element, index) => {
    if (db.seats[index].id === id) {
      db.seats[index] = { id: id, day: day, seat: seat, client: client, email: email };
    }
  })
  res.send({ message: 'Ok!' });
})

router.route('/seats/:id').delete((req, res) => {
  let id = req.params.id;
  id = parseInt(id);
  for (const person of db.seats) {
    const indexOf = db.seats.indexOf(person);

    if (person.id === id) {
      db.seats.splice(indexOf, 1);
    }
  }
  res.send({ message: 'Ok!' });
})

module.exports = router;