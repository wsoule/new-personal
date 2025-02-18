<script lang="ts">
  import { enhance } from '$app/forms';
  let { data } = $props();

  let submitting = $state(false);

  let actionData:
    | {
        comments?: {
          _id: string;
          username: string;
          text: string;
          createdAt: string;
        }[];
        error?: string;
      }
    | undefined = $state();
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
  <hgroup>
    <h1>{data.meta.title}</h1>
    <p>Published at {data.meta.date}</p>
  </hgroup>

  <div class="prose">
    <data.content />
  </div>
</article>

<section id="comments">
  <h2>Comments</h2>
  {#if actionData?.comments}
    {#each actionData.comments as comment}
      <div class="comment">
        <p>{comment.text}</p>
        <small>
          By {comment.username} at {new Date(comment.createdAt).toLocaleString()}
        </small>
      </div>
    {/each}
  {:else if data.comments && data.comments.length > 0}
    {#each data.comments as comment}
      <div class="comment">
        <p>{comment.text}</p>
        <small>
          By {comment.username} at {new Date(comment.createdAt).toLocaleString()}
        </small>
      </div>
    {/each}
  {:else}
    <p>No comments yet. Be the first to comment!</p>
  {/if}
</section>

<section id="add-comment">
  <h2>Add a Comment</h2>
  <!-- The form uses enhance so that on submission it updates the comment data and then resets the form -->
  <form
    method="post"
    use:enhance={() => {
      submitting = true;
      return async ({ update }) => {
        await update();
        submitting = false;
      };
    }}
  >
    <div>
      <label for="username">Username:</label>
      <input id="username" name="username" type="text" placeholder="Your name" />
    </div>
    <div>
      <label for="text">Comment:</label>
      <textarea id="text" name="text" placeholder="Your comment"></textarea>
    </div>
    <button type="submit" disabled={submitting}>Submit Comment</button>
  </form>
  {#if submitting}
    <p>Submitting your comment...</p>
  {/if}
  {#if actionData?.error}
    <p class="error">{actionData.error}</p>
  {/if}
</section>

<style>
  article {
    max-inline-size: var(--size-content-3);
    margin-inline: auto;
  }
  #comments,
  #add-comment {
    margin-top: 2rem;
    max-inline-size: var(--size-content-3);
    margin-inline: auto;
  }
  .comment {
    padding: 1rem;
    border: 1px solid var(--border);
    border-radius: var(--radius-1);
    margin-bottom: 1rem;
    background-color: var(--surface-2);
  }
  form > div {
    margin-bottom: 1rem;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border);
    border-radius: 4px;
    background-color: var(--surface-1);
    color: var(--text-1);
    font-size: 1rem;
  }
  button {
    padding: 0.75rem 1.5rem;
    background-color: var(--brand);
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s ease;
  }
  button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  button:hover:not(:disabled) {
    background-color: var(--brand-light);
  }
  .error {
    color: red;
    margin-top: 1rem;
  }
</style>
