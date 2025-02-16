import {
  MONGODB_ATLAS_COLLECTION_NAME,
  MONGODB_ATLAS_DB_NAME,
  MONGODB_ATLAS_URI
} from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';
import { MongoClient } from 'mongodb';

export const GET: RequestHandler = async () => {
  try {
    const client = new MongoClient(MONGODB_ATLAS_URI || '');
    await client.connect();
    const db = client.db(MONGODB_ATLAS_DB_NAME);
    const collection = db.collection(MONGODB_ATLAS_COLLECTION_NAME);

    // Query for the document with the latest issue date
    const latestDoc = await collection.find({}).sort({ issueDate: -1 }).limit(1).next();

    await client.close();

    if (latestDoc && latestDoc.issueDate) {
      return new Response(
        JSON.stringify({ latestIssueDate: latestDoc.issueDate, url: latestDoc.issueLink }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    } else {
      return new Response(JSON.stringify({ message: 'No articles found.' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching latest issue date:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
