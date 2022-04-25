const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');


router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/random').get((req, res) => {
  res.json(db.concerts[Math.floor(Math.random() * (db.concerts.length))]);
});

router.route('/concerts/:id').get((req, res) => {
    let id = req.params.id;
    id = parseInt(id);
    res.json(db.concerts.find(person => person.id === id));    
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const id = uuidv4();
  db.concerts.push({ id: id, performer: performer, genre: genre, price: price, day: day, image: image });
  res.send({ message: 'Ok!' });
})

router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  let id = req.params.id;
  id = parseInt(id);
  db.concerts.forEach((element, index) => {
    if (db.concerts[index].id === id) {
      db.concerts[index] = { id: id, performer: performer, genre: genre, price: price, day: day, image: image };
    }
  })
  res.send({ message: 'Ok!' });
})

router.route('/concerts/:id').delete((req, res) => {
  let id = req.params.id;
  id = parseInt(id);
  for (const person of db.concerts) {
    const indexOf = db.concerts.indexOf(person);

    if (person.id === id) {
      db.concerts.splice(indexOf, 1);
    }
  }
  res.send({ message: 'Ok!' });
})

module.exports = router;