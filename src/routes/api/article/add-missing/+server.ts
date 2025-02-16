import { json, type RequestHandler } from '@sveltejs/kit';
import axios from 'axios';
import { load } from 'cheerio';
import { MongoClient } from 'mongodb';
import { parseIssue } from '$lib/scrape';
import {
  MONGODB_ATLAS_URI,
  MONGODB_ATLAS_DB_NAME,
  MONGODB_ATLAS_COLLECTION_NAME
} from '$env/static/private';
import { addDocuments } from '$lib/vector-store';

export const GET: RequestHandler = async ({ url }) => {
  try {
    // Limit the number of recent issues to check (default: 5)
    const limit = parseInt(url.searchParams.get('limit') || '5');
    const archiveUrl = 'https://javascriptweekly.com/issues';
    const archiveResponse = await axios.get(archiveUrl);
    const $ = load(archiveResponse.data);

    // Extract recent issue links
    const issueLinks = $('div.issue a')
      .map((_, el) => {
        const href = $(el).attr('href');
        return href ? `https://javascriptweekly.com/${href}` : null;
      })
      .get()
      .filter((link) => link != null)
      .slice(0, limit);

    // Connect directly to the MongoDB collection
    const client = new MongoClient(MONGODB_ATLAS_URI || '');
    await client.connect();
    const db = client.db(MONGODB_ATLAS_DB_NAME);
    const collection = db.collection(MONGODB_ATLAS_COLLECTION_NAME);

    let totalAdded = 0;
    let issuesProcessed = 0;

    // Process each recent issue
    for (const issueLink of issueLinks) {
      // Check if any document from this issue exists (by matching metadata.issueLink)
      const existing = await collection.findOne({ issueLink: issueLink });
      if (!existing) {
        const issueResponse = await axios.get(issueLink);
        // Parse the issue page to get an array of article documents
        const docs = parseIssue(issueResponse.data, issueLink);
        // Generate unique IDs for each document (using issueNumber if available)
        const ids = docs.map((doc, i) => {
          const issueNumber = doc.metadata.issueNumber || 'unknown';
          return `${issueNumber}-${i}`;
        });
        if (docs.length > 0) {
          await addDocuments(docs, ids);
          totalAdded += docs.length;
        }
        issuesProcessed++;
      }
    }
    await client.close();

    return json({
      message: `Added ${totalAdded} missing articles from ${issuesProcessed} issues.`
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Error adding missing articles:', error);
    return json({ error: error.message }, { status: 500 });
  }
};
