const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');


router.route('/testimonials').get((req, res) => {
  res.json(db.testimionals);
});

router.route('/testimonials/:id').get((req, res) => {
  if (req.params.id !== 'random') {
    let id = req.params.id;
    id = parseInt(id);
    res.json(db.testimionals.find(person => person.id === id));    
  } else if (req.params.id === 'random') {
    res.json(db.testimionals[Math.floor(Math.random() * (db.testimionals.length))]);
  }
});

router.route('/testimonials').post((req, res) => {
  const { author, text } = req.body;
  const id = uuidv4();
  db.testimionals.push({ id: id, author: author, text: text });
  res.send({ message: 'Ok!' });
})

router.route('/testimonials/:id').put((req, res) => {
  const { author, text } = req.body;
  let id = req.params.id;
  id = parseInt(id);
  db.testimionals.forEach((element, index) => {
    if (db.testimionals[index].id === id) {
      db.testimionals[index] = { id: id, author: author, text: text };
    }
  })
  res.send({ message: 'Ok!' });
})

router.route('/testimonials/:id').delete((req, res) => {
  let id = req.params.id;
  id = parseInt(id);
  for (const person of db.testimionals) {
    const indexOf = db.testimionals.indexOf(person);

    if (person.id === id) {
      db.testimionals.splice(indexOf, 1);
    }
  }
  res.send({ message: 'Ok!' });
})

module.exports = router;