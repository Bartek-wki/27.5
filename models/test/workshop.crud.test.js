const Workshop = require('../workshops.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Workshop', () => {

  before(async () => {
    try {
      await mongoose.connect('mongodb://localhost:27017/NewWaveDBtest', { useNewUrlParser: true, useUnifiedTopology: true });
    } catch (err) {
      console.log(err);
    }
  })



  describe('Reading data', () => {

    before(async () => {
      const testWorkshopOne = new Workshop({ name: 'workshop #1', concertId: 'concertId #1' });
      testWorkshopOne.save();

      const testWorkshopTwo = new Workshop({ name: 'workshop #2', concertId: 'concertId #2' });
      testWorkshopTwo.save();
    })

    after(async () => {
      await Workshop.deleteMany();
    })

    it('should return all the data with find method', async () => {
      const workshops = await Workshop.find();
      expect(workshops.length).to.be.equal(2);
    });

    it('should return proper document by various params with findOne method', async () => {
      const workshop = await Workshop.findOne({ name: 'workshop #1', concertId: 'concertId #1' });
      expect(workshop).to.not.be.null
    });

  });

  describe('Creating data', () => {

    it('should insert new document with "insertOne" method', async () => {
      const workshop = new Workshop({ name: 'workshop #1', concertId: 'concertId #1' });
      await workshop.save();
      const newWorkshop = await Workshop.findOne({ name: 'workshop #1', concertId: 'concertId #1' });
      expect(newWorkshop).to.not.be.null;
    });

    after(async () => {
      await Workshop.deleteMany();
    });
    
  });

  describe('Updating data', () => {

    beforeEach(async () => {
      const testWorkshopOne = new Workshop({ name: 'workshop #1', concertId: 'concertId #1' });
      testWorkshopOne.save();

      const testWorkshopTwo = new Workshop({ name: 'workshop #2', concertId: 'concertId #2' });
      testWorkshopTwo.save();
    });

    afterEach(async () => {
      await Workshop.deleteMany();
    });    

    it('should properly update one document with updateOne method', async () => {
      await Workshop.updateOne({ name: 'workshop #2', concertId: 'concertId #2' }, { name: 'workshop updated', concertId: 'concertId updated' })
      const updatedWorkshop = await Workshop.findOne({ name: 'workshop updated', concertId: 'concertId updated' });
      expect(updatedWorkshop).to.not.be.null;
    })

    it('should properly update one document with save method', async () => {
      const workshop = await Workshop.findOne({ name: 'workshop #1', concertId: 'concertId #1' });
      workshop.name = 'workshop updated';
      workshop.concertId = 'concertId updated';
      await workshop.save();

      const updatedWorkshop = await Workshop.findOne({ name: 'workshop updated', concertId: 'concertId updated' });
      expect(updatedWorkshop).to.not.be.null;
    })

    it('should properly update multiple documents with updateMany method', async () => {
      await Workshop.updateMany({}, { name: 'workshop updated', concertId: 'concertId updated' });
      const updateWorkshops = await Workshop.find({ name: 'workshop updated', concertId: 'concertId updated' });
      expect(updateWorkshops.length).to.be.equal(2);
    })
  })


  describe('Removing data', () => {

    beforeEach(async () => {
      const testWorkshopOne = new Workshop({ name: 'workshop #1', concertId: 'concertId #1' });
      testWorkshopOne.save();

      const testWorkshopTwo = new Workshop({ name: 'workshop #2', concertId: 'concertId #2' });
      testWorkshopTwo.save();
    });

    afterEach(async () => {
      await Workshop.deleteMany();
    }); 

    it('should properly remove one document with deleteOne method', async () => {
      await Workshop.deleteOne({ name: 'workshop #1', concertId: 'concertId #1' });
      const deletedWorkshop = await Workshop.findOne({ name: 'workshop #1', concertId: 'concertId #1' });
      expect(deletedWorkshop).to.be.null;
    })

    it('should properly remove one document with remove method', async () => {
      const workshop = await Workshop.findOne({ name: 'workshop #1', concertId: 'concertId #1' });
      workshop.remove();
      const removedWorkshop = await Workshop.findOne({ name: 'workshop #1', concertId: 'concertId #1' })
      expect(removedWorkshop).to.be.null;
    })

    it('should properly remove multiple documents with deleteMany method', async () => {
      await Workshop.deleteMany();
      const workshops = await Workshop.find();
      expect(workshops.length).to.be.equal(0);
    })
  })

})