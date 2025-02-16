import { MongoClient } from 'mongodb';
import {
  MONGODB_ATLAS_COLLECTION_NAME,
  MONGODB_ATLAS_DB_NAME,
  MONGODB_ATLAS_URI
} from '$env/static/private';

async function checkInvalidDocuments() {
  const client = new MongoClient(MONGODB_ATLAS_URI || '');
  await client.connect();
  const collection = client.db(MONGODB_ATLAS_DB_NAME).collection(MONGODB_ATLAS_COLLECTION_NAME);

  const cursor = collection.find(
    {},
    {
      sort: { _id: 1 }
    }
  );
  for await (const doc of cursor) {
    for (const key in doc) {
      if (typeof doc[key] === 'string') {
        try {
          const str = doc[key];
          // Log the original string and its hex representation:
          console.log(`Field "${key}" in document ${doc._id}:`, str);
          console.log(`Hex:`, Buffer.from(str, 'utf8').toString('hex'));
          // Attempt to decode
          new TextDecoder('utf8').decode(Buffer.from(str, 'utf8'));
        } catch (e) {
          console.error(`Invalid UTF-8 in document ${doc._id} at field "${key}":`, doc[key]);
        }
      }
    }
  }
  await client.close();
}

checkInvalidDocuments().catch(console.error);
