const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
const dbName = 'MyDB';

let client;

async function connectToDatabase() {
  if (client) {
    return client.db(dbName);
  }

  try {
    client = new MongoClient(uri);  // Remove the options here

    await client.connect();
    console.log('Connected to MongoDB');
    return client.db(dbName);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

function getDb() {
  if (!client) {
    throw new Error('Database not initialized. Call connectToDatabase first.');
  }
  return client.db(dbName);
}

module.exports = { connectToDatabase, getDb };