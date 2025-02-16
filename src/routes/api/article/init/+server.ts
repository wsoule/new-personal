import { json, type RequestHandler } from '@sveltejs/kit';
import { loadAllArticles } from '$lib/scrape';

export const GET: RequestHandler = async () => {
  try {
    await loadAllArticles();
    return json({ message: 'Initial load complete.' });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return json({ error: error.message }, { status: 500 });
  }
};
