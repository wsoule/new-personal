export const prerender = false;

import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
  comment: async ({ request, params, fetch }) => {
    // Get data from the submitted form.
    const data = await request.formData();
    const username = data.get('username') as string;
    const text = data.get('text') as string;

    // Validate that a comment text has been provided.
    if (!text) {
      return fail(400, { error: 'Comment text is required' });
    }

    // Call the POST endpoint to create a new comment.
    const res = await fetch(`/api/comments/${params.slug}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, text })
    });

    if (!res.ok) {
      const apiError = await res.json();
      return fail(res.status, { error: apiError.error });
    }

    // Redirect to the same page to reload the content and comments.
    throw redirect(303, `/${params.slug}`);
  }
};
