const mongoose = require('mongoose');


mongoose.set('strictQuery', false);

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const clusterDetails = process.env.MONGO_CLUSTER_DETAILS;



if (!username || !password || !clusterDetails) {
  console.error('FATAL ERROR: Missing MongoDB connection details in .env file.');
  console.error('Ensure MONGO_USERNAME, MONGO_PASSWORD, and MONGO_CLUSTER_DETAILS are set.');
  process.exit(1);
}

const mongoUrl = `mongodb+srv://${encodeURIComponent(username)}:${encodeURIComponent(password)}@${clusterDetails}`;

console.log(`Connecting to MongoDB database...`);

mongoose.connect(mongoUrl)
  .then(() => {
    console.log(`Successfully connected to MongoDB database`);
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error.message);
  });


const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model('Person', personSchema);