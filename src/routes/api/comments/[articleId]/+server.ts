import {
  MONGODB_ATLAS_ARTICLE_COLLECTION_NAME,
  MONGODB_ATLAS_DB_NAME,
  MONGODB_ATLAS_URI
} from '$env/static/private';
import type { RequestHandler } from '@sveltejs/kit';
import { MongoClient } from 'mongodb';

/**
 * GET /api/comments/[articleId]
 * Retrieves all comments for the specified article.
 */
export const GET: RequestHandler = async ({ params }) => {
  const { articleId } = params;
  const client = new MongoClient(MONGODB_ATLAS_URI || '');

  try {
    await client.connect();
    const db = client.db(MONGODB_ATLAS_DB_NAME);
    // Here, we're using the provided collection name.
    // If you have a dedicated collection for comments, update this accordingly.
    const commentsCollection = db.collection(MONGODB_ATLAS_ARTICLE_COLLECTION_NAME);

    // Fetch comments matching the given articleId.
    const comments = await commentsCollection.find({ articleId }).toArray();

    return new Response(JSON.stringify(comments), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error fetching comments:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  } finally {
    await client.close();
  }
};

/**
 * POST /api/comments/[articleId]
 * Creates a new comment for the specified article.
 * Expects a JSON body with at least a "text" field.
 */
export const POST: RequestHandler = async ({ params, request }) => {
  const { articleId } = params;

  try {
    const client = new MongoClient(MONGODB_ATLAS_URI || '');
    await client.connect();
    const db = client.db(MONGODB_ATLAS_DB_NAME);
    const commentsCollection = db.collection(MONGODB_ATLAS_ARTICLE_COLLECTION_NAME);

    // Parse the incoming JSON body.
    const { username, text } = await request.json();

    // Validate the request body.
    if (!text) {
      return new Response(JSON.stringify({ error: 'Comment text is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Create the comment object.
    const comment = {
      articleId,
      username: username || 'Anonymous',
      text,
      createdAt: new Date()
    };

    // Insert the comment into MongoDB.
    const result = await commentsCollection.insertOne(comment);

    return new Response(JSON.stringify({ message: 'Comment created', id: result.insertedId }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error creating comment:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
