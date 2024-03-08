const mongoose = require("mongoose");
const Cities = require("../models/cities");
require("dotenv").config({ path: "../.env" });

main()
  .then(() => {
    console.log("Connection Successful with Database 📊!");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(process.env.MONGO_KEY);
}

const citiesData = [
  new Cities({
    cityName: "Amritsar",
    supportEmail: "amritsarmc@gmail.com",
  }),
  new Cities({
    cityName: "Barnala",
    supportEmail: "mcbarnala@gmail.com",
  }),
  new Cities({
    cityName: "Batala",
    supportEmail: "mcbatala@gmail.com",
  }),
  new Cities({
    cityName: "Bathinda",
    supportEmail: "mcbathinda@gmail.com",
  }),
  new Cities({
    cityName: "Ludhiana",
    supportEmail: "commissionermcl@gmail.com",
  }),
  new Cities({
    cityName: "Mohali",
    supportEmail: "mcmohali@gmail.com",
  }),
  new Cities({
    cityName: "Patiala",
    supportEmail: "mcpatiala@gmail.com",
  }),
  new Cities({
    cityName: "Pathankot",
    supportEmail: "mcpathankot@gmail.com",
  }),
  new Cities({
    cityName: "Rupnagar",
    supportEmail: "mcropar@gmail.com",
  }),
  new Cities({
    cityName: "Jalandhar",
    supportEmail: "complaints.mcj@gmail.com",
  }),
];

Cities.insertMany(citiesData)
  .then((res) => {
    console.log("Data Added");
  })
  .catch((err) => {
    console.log(err);
  });
