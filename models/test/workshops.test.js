const Workshop = require('../workshops.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Work', () => {
  
  it('should throw an error if every argument is missing', () => {
    const workshop = new Workshop({});

    workshop.validate(err => {
      expect(err.errors.name && err.errors.concertId).to.exist;
    });
  });

  it('should throw an error if "name" argument is missing and "concertId" arg is correct', () => {
    const workshop = new Workshop({concertId: '1'});

    workshop.validate(err => {
      expect(err.errors.name).to.exist;
    });
  });

  it('should throw an error if "concertId" argument is missing and "name" arg is correct', () => {
    const workshop = new Workshop({name: 'concertTest'});

    workshop.validate(err => {
      expect(err.errors.concertId).to.exist;
    });
  });

  it('should throw an error if "name" argument is not a string and "concertId" arg is correct', () => {
    const cases = [{}, []];

    for (let name of cases) {
      const workshop = new Workshop({ name: name, concertId: '1'});

      workshop.validate(err => {
        expect(err.errors.name).to.exist;
      });      
    }
  });

  it('should throw an error if "concertId" argument is not a string and "name" arg is correct', () => {
    const cases = [{}, []];

    for (let concertId of cases) {
      const workshop = new Workshop({ name: 'concertTest', concertId: concertId});

      workshop.validate(err => {
        expect(err.errors.concertId).to.exist;
      });      
    }
  });

  it('should not throw an error if all arg are correct', () => {
    const workshop = new Workshop({ name: 'concertTest', concertId: '1' });

    workshop.validate(err => {
      expect(err).to.not.exist;
    });
  });

})