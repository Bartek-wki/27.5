const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Concert = require('../../../models/concerts.model');
const Seat = require('../../../models/seats.models');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

  before(async () => {
    const testConcertOne = new Concert({performer: "John Doe", genre: "Rock", price: 25, day: 1, image: "image"});
    await testConcertOne.save();

    const testConcertTwo = new Concert({performer: "Rebekah Parker", genre: "R&B", price: 25, day: 1, image: "image"});
    await testConcertTwo.save();

    const testSeatOne = new Seat({ day: 1, seat: 1, client: "Bartek", email: "bartekwilki@gmail.com" });
    await testSeatOne.save();

    const testSeatTwo = new Seat({ day: 1, seat: 2, client: "Ola", email: "olawilki@gmail.com" });
    await testSeatTwo.save();
  });

  after(async () => {
    await Concert.deleteMany();
    await Seat.deleteMany();
  });

  it('/performer/:performer should return concerts of a chosen artist', async () => {
    const res = await request(server).get('/api/concerts/performer/John%20Doe');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  })

  it('/genre/:genre should return concerts of a chosen genre', async () => {
    const res = await request(server).get('/api/concerts/genre/R&B');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(1);
  })

  it('/price/:price_min/:price_max should return concerts with a price in the chosen range', async () => {
    const res = await request(server).get('/api/concerts/price/25/30');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  })

  it('/price/:price_min/:price_max should return error if price_min is not a number', async () => {
    const res = await request(server).get('/api/concerts/price/text/30');
    expect(res.status).to.be.equal(404);
  })

  it('/price/:price_min/:price_max should return error if price_max is not a number', async () => {
    const res = await request(server).get('/api/concerts/price/25/text');
    expect(res.status).to.be.equal(404);
  })
  
  it('/day/:day should return concerts of a chosen day', async () => {
    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  })

  it('/ should return all concerts', async () => {
    const res = await request(server).get('/api/concerts');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
    expect(res.body[0].ticketsLeft).to.not.be.undefined;
    expect(res.body[0].workshops).to.be.an('array');
  })
});