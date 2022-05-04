const express = require('express');
const router = express.Router();
const TestiomialController = require('../controllers/testimonials.controller')

router.route('/testimonials').get(TestiomialController.getAll);

router.route('/testimonials/random').get(TestiomialController.getRandom);

router.route('/testimonials/:id').get(TestiomialController.getById);

router.route('/testimonials').post(TestiomialController.post);

router.route('/testimonials/:id').put(TestiomialController.put);

router.route('/testimonials/:id').delete(TestiomialController.delete);


module.exports = router;