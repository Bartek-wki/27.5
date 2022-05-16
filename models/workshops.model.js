const mongoose = require('mongoose');

const workshopsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  concertId: { type: String, required: true}
});

module.exports = mongoose.model('Workshop', workshopsSchema);