export const prerender = false;
import type { Actions, PageServerLoad } from './$types';
import { similaritySearch } from '$lib/vector-store';

export const actions: Actions = {
  default: async ({ request }) => {
    const formData = await request.formData();
    const query = formData.get('query')?.toString().trim();
    const limit = formData.get('limit')?.toString().trim();

    if (!query) {
      return { message: 'Please provide a search query.' };
    }

    const results = await similaritySearch(query, parseInt(limit ?? '5'));
    // Convert any non-plain objects into plain objects for serialization
    const serializableResults = results.map((doc) => ({
      pageContent: doc.pageContent,
      metadata: doc.metadata
    }));

    return { results: serializableResults };
  }
};

export const load: PageServerLoad = async ({ fetch }) => {
  const latestIssue = await fetch('/api/article/latest-issue-date').then((res) => res.json());
  // Initially, no search has been performed.
  console.log('latest issue', latestIssue);
  return {
    latestIssueDate: latestIssue.latestIssueDate,
    latestIssueUrl: latestIssue.url
  };
};
