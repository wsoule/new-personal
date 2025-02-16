import { json, type RequestHandler } from '@sveltejs/kit';
import { similaritySearch } from '$lib/vector-store';

export const GET: RequestHandler = async ({ url }) => {
  const query = url.searchParams.get('query');
  const limit = parseInt(url.searchParams.get('limit') || '2');
  if (!query) {
    return json({ error: 'Missing query parameter' }, { status: 400 });
  }
  try {
    const results = await similaritySearch(query, limit);
    return json({ results });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return json({ error: error.message }, { status: 500 });
  }
};
