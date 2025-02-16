import { OpenAIEmbeddings } from '@langchain/openai';
import { MongoDBAtlasVectorSearch } from '@langchain/mongodb';
import { OPENAI_API_KEY } from '$env/static/private';
import type { Document, DocumentInterface } from '@langchain/core/documents';

export class ArticleService {
  vectorStore;
  constructor() {
    const openaiApiKey = OPENAI_API_KEY;
    const embeddings = new OpenAIEmbeddings({
      model: 'text-embedding-3-small',
      apiKey: openaiApiKey
    });
    // Initialize the MongoDB vector store (ensure your MongoDB instance has Atlas Vector Search enabled)
    this.vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
      : 'hello',
      database: 'myDatabase', // replace with your database name
      collectionName: 'articles',
      indexName: 'langchainjs-testing' // your index name
    });
  }

  // async clearStore() {
  //   // Clears the entire index in the MongoDB vector store.
  //   await this.vectorStore.delete();
  //   console.log('Vector store cleared.');
  // }

  /**
   * Adds an array of documents to the MongoDB vector store.
   * Each document should have a `pageContent` and `metadata`.
   */
  async addDocuments(documents: Document[]) {
    await this.vectorStore.addDocuments(documents);
  }

  /**
   * Performs a similarity search on stored documents using the provided query.
   * @param {string} query - The text query to search against.
   * @param {number} k - Number of similar documents to retrieve.
   * @returns {Promise<Array>} Array of matching documents.
   */
  async similaritySearch(query: string, k: number = 2): Promise<DocumentInterface[]> {
    return await this.vectorStore.similaritySearch(query, k);
  }
}
