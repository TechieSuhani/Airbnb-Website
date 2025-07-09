const mongoose = require("mongoose");
const initData = require("./data.js");


// const Listing = require("../models/listing.js");

// yaha se leke line 19 tk code copilot se likhe hai,
// because code in course is not working....
const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: {
    filename: String,
    url: String
  },
  price: Number,
  location: String,
  country: String
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;


const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("connected to DB");
    await initDB();
  } catch (err) {
    console.error("DB connection error:", err);
  }
}

// const initDB = async () => {
//     await Listing.deleteMany({});
//     initData.data= initData.data.map((obj) => ({...obj, owner:"68635c92fae0f006452c8f06"}));
//     await Listing.insertMany(initData.data);
//     console.log("data was initialized");
// };



const initDB = async () => {
  await Listing.deleteMany({});
  const enrichedData = initData.map((obj) => ({
    ...obj,
    owner: "68635c92fae0f006452c8f06"
  }));
  await Listing.insertMany(enrichedData);
  console.log("✅ Data was initialized with owner field!");
};




// const initDB = async () => {
//   try {
//     const count = await Listing.countDocuments();
//     if (count === 0) {
//       await Listing.insertMany(initData);
//       console.log(" Seed data inserted!");
//     } else {
//       console.log(" Listings already exist — no seeding needed.");
//     }
//   } catch (err) {
//     console.error("Data initialization error:", err);
//   }
// };


main();
