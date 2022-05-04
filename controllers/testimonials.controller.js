const Tesimonial = require('../models/testimonials.model')

exports.getAll = async (req, res) => {
  try {
    res.json(await Tesimonial.find());
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Tesimonial.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const testimonial = await Tesimonial.findOne().skip(rand);
    if (!testimonial) res.status(404).json({ message: 'Not found' });
    else res.json(testimonial);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const testimonial = await Tesimonial.findById(req.params.id);
    if (!testimonial) res.status(404).json({ message: 'Not found' });
    else res.json(testimonial);
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { author, text } = req.body;
    const newTestimonial = new Tesimonial({ author: author, text: text });
    await newTestimonial.save();
    res.json({ message: 'OK' });

  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.put = async (req, res) => {
  const { author, text } = req.body;
  try {
    const testimonial = await Tesimonial.findById(req.params.id);
    if (testimonial) {
      await Tesimonial.updateOne({ _id: req.params.id }, { $set: { author: author, text: text } });
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
    const testimonial = await Tesimonial.findById(req.params.id);
    if (testimonial) {
      await Tesimonial.deleteOne({ _id: req.params.id })
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch (err) {
    res.status(500).json({ message: err });
  }
};