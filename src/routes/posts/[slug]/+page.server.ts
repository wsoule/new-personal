export const prerender = false;

import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { MongoClient } from 'mongodb';
import {
  MONGODB_ATLAS_ARTICLE_COLLECTION_NAME,
  MONGODB_ATLAS_DB_NAME,
  MONGODB_ATLAS_URI
} from '$env/static/private';

export const actions: Actions = {
  default: async ({ request, params }) => {
    const formData = await request.formData();
    const username = formData.get('username')?.toString().trim() || 'Anonymous';
    const text = formData.get('text')?.toString().trim();

    const serializeComment = (comment: any) => ({
      ...comment,
      _id: comment._id.toString(),
      createdAt: comment.createdAt ? new Date(comment.createdAt).toISOString() : null
    });
    if (!text) {
      return { error: 'Comment text is required' };
    }

    const articleId = params.slug;
    const client = new MongoClient(MONGODB_ATLAS_URI || '');
    await client.connect();
    const db = client.db(MONGODB_ATLAS_DB_NAME);
    const collection = db.collection(MONGODB_ATLAS_ARTICLE_COLLECTION_NAME);

    // Insert the new comment into MongoDB
    await collection.insertOne({
      articleId,
      username,
      text,
      createdAt: new Date()
    });

    // Fetch the updated list of comments
    const commentsRaw = await collection.find({ articleId }).toArray();
    const comments = commentsRaw.map(serializeComment);

    await client.close();
    console.log('comments', comments);

    return { comments };
  }
};
