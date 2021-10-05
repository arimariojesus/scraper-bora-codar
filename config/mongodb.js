const { MongoClient } = require('mongodb');

let uri = process.env.MONGODB_URI;
let dbName = process.env.MONGODB_DB;

let cachedClient;
let cachedDb;

if (!uri) {
  throw new Error('please define the MONGODB_URI environment variable inside .env');
}

if (!dbName) {
  throw new Error('please define the MONGODB_DB environment variable inside .env');
}

const connectToDatabase = async () => {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = await client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

module.exports = connectToDatabase;
