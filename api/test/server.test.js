var sinon = require('sinon');
var chai = require('chai');
var chaiHttp = require("chai-http")
var expect = chai.expect;
var server = require("../server")

chai.use(chaiHttp)
describe("Routes", function() {
  after(() => {});

      var request = chai.request.agent("http://localhost:8080")

      it("register a user", function () {
        request
          .post("/api/auth/signup")
          .send({
            username: "asdf",
            password: "asdf"
        })
          .then(function (res) {
            expect.res.to.have.status(200);
          })
      }); 

      it("register a user", function () {
        request
          .post("/api/auth/signin")
          .send({
            username: "asdf",
            password: "asdf"
        })
          .then(function (res) {
            expect.res.to.have.status(200);
          })
      }); 

      it("getting fuelInfo", function () {
        request
          .post("/api/auth/fuelInfo")
          .send({
            username: "asdf",
        })
          .then(function (res) {
            expect.res.to.have.status(200);
          })
      });

      it("updating profile", function () {
        request
          .post("/api/auth/profileform")
          .send({
            Fullname: "MyName",
            AddressOne: "MyAddressOne",
            AddressTwo: "MyAddressTwo",
            City: "Houston",
            State: "TX",
            ZipCode: "77064",
            username: "asdf"
        })
          .then(function (res) {
            expect.res.to.have.status(200);
          })
      }); 
      
      it("new form", function () {
        request
          .post("/api/auth/fuelQuote")
          .send({
            gallons: 10,
            address: "MyAddress",
            date: "01-01-2021",
            suggested: 0,
            total: 0,
            username: "asdf"
        })
          .then(function (res) {
            expect.res.to.have.status(200);
          })
      }); 

      it("get history", function () {
        request
          .post("/api/auth/getHistory")
          .send({
            username: "asdf"
        })
          .then(function (res) {
            expect.res.to.have.status(200);
          })
      }); 

});