// Import the dependencies for testing
const request = require('supertest');
const app = require('../app');
const chai = require('chai');
const chaiHttp = require('chai-http');

// Configure chai
chai.use(chaiHttp);
chai.should();

//Testing all gets for all pages
describe("Page", () => {
    describe("GET /", () => {
        it("should get index page", (done) => {
             chai.request(app)
                 .get('/')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
    });
});

describe("Page", () => {
    describe("GET /login", () => {
        it("should get login page", (done) => {
             chai.request(app)
                 .get('/login')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
    });
});

describe("Page", () => {
    describe("GET /register", () => {
        it("should get register page", (done) => {
             chai.request(app)
                 .get('/register')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
    });
});

describe("Page", () => {
    describe("GET /movieslist", () => {
        it("should get movies page", (done) => {
             chai.request(app)
                 .get('/movieslist')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
    });
});

describe("Page", () => {
    describe("GET /search", () => {
        it("should get search page", (done) => {
             chai.request(app)
                 .get('/search')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
    });
});

describe("Page", () => {
    describe("GET /upload", () => {
        it("should get upload page", (done) => {
             chai.request(app)
                 .get('/upload')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     done();
                  });
         });
    });
});

