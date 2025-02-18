import { error } from '@sveltejs/kit';
import type { PageLoad } from '../../[slug]/$types';

export const load: PageLoad = async ({ params }) => {
  try {
    // Import the markdown post by slug.
    const post = await import(`../../../posts/${params.slug}.md`);
    // Fetch comments from our GET endpoint.
    const commentsRes = await fetch(`/api/comments/${params.slug}`);
    let comments = [];
    if (commentsRes.ok) {
      comments = await commentsRes.json();
    }
    return {
      content: post.default,
      meta: post.metadata,
      comments
    };
  } catch (e) {
    throw error(404, `Could not find ${params.slug}`);
  }
};
