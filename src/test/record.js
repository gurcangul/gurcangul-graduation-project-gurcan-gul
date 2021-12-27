process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
let server = require('../../app');
const mongoose = require('mongoose');

const recordController = require('../controllers/record');
const { expect } = require('chai');

beforeEach(async function () {
    await mongoose.connect(process.env.TEST_URI, { useNewUrlParser: true, useUnifiedTopology: true })
});

describe('Records', () => {

    describe('fetch', () => {
        it('should validate correctly with proper request', () => {
            const record = {
                "startDate": "2016-01-26",
                "endDate": "2018-02-02",
                "minCount": 2000,
                "maxCount": 2300
            };
            chai.request(server)
                .post('/records/fetch')
                .send(record)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('object');
                    expect(res.body.code).to.be.equal(0);
                    expect(res.body.msg).to.be.equal('Success');
                    expect(res.body.records).to.be.an('array');
                });
        });

        it('should reject if request body is empty', () => {
            const record = {};

            chai.request(server)
                .post('/records/fetch')
                .send(record)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body.code).to.be.equal(1);
                    expect(res.body.msg).to.be.equal('Invalid request');
                    expect(res.body.errors).to.be.an('array');
                });
        });

        it('should reject if start/end date is not in format', () => {
            const record = {
                "startDate": new Date("06-01-2026").toISOString(),
                "endDate": "2018-02-02",
                "minCount": 2000,
                "maxCount": 2300
            };

            chai.request(server)
                .post('/records/fetch')
                .send(record)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body.code).to.be.equal(1);
                    expect(res.body.msg).to.be.equal('Invalid request');
                    expect(res.body.errors).to.be.an('array');
                    expect(res.body.errors[0]).to.be.equal("Start Date Format should be 'YYYY-MM-DD'")
                });
        });

        it('should reject if min/max count is less that 0', () => {
            const record = {
                "startDate": "2016-01-26",
                "endDate": "2018-02-02",
                "minCount": -1,
                "maxCount": 2300
            };

            chai.request(server)
                .post('/records/fetch')
                .send(record)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body.code).to.be.equal(1);
                    expect(res.body.msg).to.be.equal('Invalid request');
                    expect(res.body.errors).to.be.an('array');
                    expect(res.body.errors[0]).to.be.equal('Minimum/Maximum count should be greater than 0');
                });
        });

        it('should reject if max count is less that min', () => {
            const record = {
                "startDate": "2016-01-26",
                "endDate": "2018-02-02",
                "minCount": 2000,
                "maxCount": 230
            };

            chai.request(server)
                .post('/records/fetch')
                .send(record)
                .end((err, res) => {
                    expect(res).to.have.status(400);
                    expect(res.body).to.be.an('object');
                    expect(res.body.code).to.be.equal(1);
                    expect(res.body.msg).to.be.equal('Invalid request');
                    expect(res.body.errors).to.be.an('array');
                    expect(res.body.errors[0]).to.be.equal('Maximum Count Must Be Greater Than Minmum Count');
                });
        });
    })
});
