require('dotenv').config()

var mongoose = require('mongoose');
var Schema = require("./schema.js");

mongoose.connect('mongodb://localhost/sample_proj_2');

const db = mongoose.connection;

// Will log an error if db can't connect to MongoDB
db.on('error', function (err) {
    console.log(err);
});

// Will log "database has been connected" if it successfully connects.
db.once('open', function () {
    console.log("database has been connected!");
});

var SnowboardModel = Schema.SnowboardModel
var CompanyModel = Schema.CompanyModel;

CompanyModel.remove({}, function (err) {
    console.log(err);
});

const burton = new CompanyModel({ name: "Burton", country: "US" })
const k_two = new CompanyModel({ name: "K2", country: "Canada"})
const dc = new CompanyModel({ name: "DC", country: "US"})

const bigSnowboard = new SnowboardModel({ name: "Big Snowboard", price: 1000})
const littleSnowboard = new SnowboardModel({ name: "Little Snowboard", price: 800})
const blueSnowboard = new SnowboardModel({name: "Blue Snowboard", price: 1200})

const companies = [burton, k_two, dc]
const snowboards = [bigSnowboard, littleSnowboard, blueSnowboard]



companies.forEach((company) => {
    company.snowboards = snowboards
    company.save()
        .then((save) => {
            console.log("saved")
        })
        .catch((error) => {
            console.log(error)
        })
})




db.close();