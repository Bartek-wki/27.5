const Concert = require('../models/concerts.model');
const Seat = require('../models/seats.models');
const Workshop = require('../models/workshops.model');

exports.getAll = async (req, res) => {
  try {
    const concerts = await Concert.find().lean();

    for (let concert of concerts) {
      const workshops = await Workshop.find({ concertId: concert._id });
      const seats = await Seat.find({ day: concert.day });

      concert.ticketsLeft = 50 - seats.length

      concert.workshops = [];

      for (let workshop of workshops) {
        concert.workshops.push(workshop.name)
      }
    }
    await res.json(concerts);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Concert.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const concert = await Concert.findOne().skip(rand);
    if (!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) res.status(404).json({ message: 'Not found' });
    else res.json(concert);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByPerformer = async (req, res) => {
  try {
    const concerts = await Concert.find({ performer: req.params.performer });
    if (concerts.length === 0) res.status(404).json({ message: 'Not found' });
    else res.json(concerts);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByGenre = async (req, res) => {
  try {
    const concerts = await Concert.find({ genre: req.params.genre });
    if (concerts.length === 0) res.status(404).json({ message: 'Not found' });
    else res.json(concerts);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByPrice = async (req, res) => {
  try {
    const maxPrice = parseInt(req.params.price_max);
    const minPrice = parseInt(req.params.price_min);
    if (isNaN(maxPrice) || isNaN(minPrice)) {
      res.status(404).json({ message: 'Not found' });
    } else {
      const concerts = await Concert.find({ $and: [{ price: { $gte: minPrice } }, { price: { $lte: maxPrice } }] });
      if (concerts.length === 0) res.status(404).json({ message: 'Not found' });
      else res.json(concerts);
    }
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByDay = async (req, res) => {
  try {
    const day = parseInt(req.params.day);
    const concerts = await Concert.find({ day: day });
    if (concerts.length === 0) res.status(404).json({ message: 'Not found' });
    else res.json(concerts);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
}

exports.post = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({ performer: performer, genre: genre, price: price, day: day, image: image });
    await newConcert.save();
    res.json({ message: 'OK' });

  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const concert = await Concert.findById(req.params.id);
    if (concert) {
      await Concert.updateOne({ _id: req.params.id }, { $set: { performer: performer, genre: genre, price: price, day: day, image: image } });
      res.json({message: 'OK'})
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (concert) {
      await Concert.deleteOne({ _id: req.params.id })
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};