/* eslint-disable @typescript-eslint/no-explicit-any */
import { MongoClient } from 'mongodb';
import { MongoDBAtlasVectorSearch } from '@langchain/mongodb';
import { OpenAIEmbeddings } from '@langchain/openai';
import type { Document } from '@langchain/core/documents';
import {
  MONGODB_ATLAS_COLLECTION_NAME,
  MONGODB_ATLAS_DB_NAME,
  MONGODB_ATLAS_URI,
  OPENAI_API_KEY
} from '$env/static/private';

let vectorStore: MongoDBAtlasVectorSearch;

/**
 * Sanitize strings by removing null bytes.
 */
function sanitize(text: string): string {
  return text.replace(/\0/g, '');
}

async function getVectorStore(): Promise<MongoDBAtlasVectorSearch> {
  if (!vectorStore) {
    // Connect to MongoDB Atlas
    const client = new MongoClient(MONGODB_ATLAS_URI || '');
    await client.connect();
    const db = client.db(MONGODB_ATLAS_DB_NAME);
    const collection = db.collection(MONGODB_ATLAS_COLLECTION_NAME, {
      enableUtf8Validation: false
    });

    // Initialize OpenAI embeddings
    const embeddings = new OpenAIEmbeddings({
      model: 'text-embedding-3-small',
      apiKey: OPENAI_API_KEY
    });

    // Instantiate the MongoDB Atlas vector store
    vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
      collection: collection,
      indexName: 'vector_index', // Ensure this matches your Atlas index name
      textKey: 'text', // Field name for raw text (adjust if needed)
      embeddingKey: 'embedding' // Field name for embeddings
    });
  }
  return vectorStore;
}

// export async function clearStore() {
//   const store = await getVectorStore();
//   // await store.delete({ deleteAll: true });
//   console.log('Vector store cleared.');
// }

export async function addDocuments(documents: Document[], ids: string[]) {
  const store = await getVectorStore();
  return await store.addDocuments(documents, { ids });
}

export async function similaritySearch(query: string, k = 2, filter = null) {
  const store = await getVectorStore();
  if (filter) {
    return await store.similaritySearch(query, k, filter);
  }
  const result = await store.similaritySearch(query, k);
  return result;
}
