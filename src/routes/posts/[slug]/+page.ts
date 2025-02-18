import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const serializeComment = (comment: any) => ({
  ...comment,
  _id: comment._id.toString(),
  createdAt: comment.createdAt ? new Date(comment.createdAt).toISOString() : null
});

export const load: PageLoad = async ({ params, fetch }) => {
  try {
    // Create a mapping for all markdown posts in the posts directory.
    const posts = import.meta.glob('../../../posts/*.md');
    // Build the relative path key for the requested slug.
    const postPath = `../../../posts/${params.slug}.md`;
    const postImporter = posts[postPath];

    if (!postImporter) {
      throw error(404, `Could not find ${params.slug}`);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const post: any = await postImporter();

    // Fetch comments from our GET endpoint.
    const commentsRes = await fetch(`/api/comments/${params.slug}`);
    let comments = [];
    if (commentsRes.ok) {
      comments = await commentsRes.json();
      comments = comments.map(serializeComment);
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
