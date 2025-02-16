<script lang="ts">
  import { enhance } from '$app/forms';
  // Track the loading state for the search
  let searching = false;

  // The "data" prop holds the action return values: search results or a message
  export let data: {
    results?: {
      pageContent: string;
      // metadata now includes title, link, and issueDate
      metadata: Record<string, any> & { title: string; link: string; issueDate: string };
    }[];
    message?: string;
  };
</script>

<div class="container">
  <header>
    <h1 class="title">Javascript Weekly Search</h1>
  </header>
  (note, i am doing something wrong with my searialization, so change the limit to lower if you're not
  getting results)
  <div class="search-card surface-2">
    <!-- Form displayed as a grid -->
    <form
      method="POST"
      aria-busy={searching}
      use:enhance={() => {
        searching = true;
        return async ({ result }) => {
          data = (result as any).data;
          searching = false;
        };
      }}
      class="form-grid"
    >
      <label>
        <span>What would you like to look up? </span>
        <input class="input" name="query" required placeholder="Enter search query..." />
      </label>
      <label>
        <span>Result number</span>
        <input type="number" class="input" defaultValue="5" name="limit" min="1" placeholder="5" />
      </label>
      <button type="submit" class="btn">Search</button>
    </form>
    {#if searching}
      <p class="loading">Searching...</p>
    {/if}
    {#if data.message}
      <p class="error">{data.message}</p>
    {/if}
  </div>

  {#if data.results}
    <section class="results">
      <h2>Search Results</h2>
      <ul class="results-grid">
        {#each data.results as result}
          <li class="result-card surface-3">
            <h3>{result.metadata.title}</h3>
            <p>{result.metadata.description}</p>
            <p class="meta"><small>Issue Date: {result.metadata.issueDate}</small></p>
            <p class="meta">
              <small
                >Issue: <a href={result.metadata.issueLink}>{result.metadata.issueNumber}</a></small
              >
            </p>
            <a href={result.metadata.link} target="_blank" rel="noopener" class="link">Read More</a>
          </li>
        {/each}
      </ul>
    </section>
  {/if}
</div>

<style>
  /* Form grid layout */
  .form-grid {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1rem;
    align-items: end;
  }

  /* Input and button styling (if needed, you can add more styling here) */
  .input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border);
    border-radius: 4px;
    background-color: var(--surface-1);
    color: var(--text-1);
    font-size: 1rem;
  }

  .btn {
    padding: 0.75rem 1.5rem;
    background-color: var(--brand);
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s ease;
  }
  .btn:hover {
    background-color: var(--brand-light);
  }

  /* Results grid layout */
  .results-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    list-style: none;
    padding: 0;
  }

  /* Result card styling */
  .result-card {
    padding: 1rem;
    border-radius: 6px;
    background-color: var(--surface-2);
  }
  .result-card h3 {
    margin: 0 0 0.5rem;
    font-size: 1.5rem;
  }
  .result-card p {
    margin: 0.5rem 0;
  }
  .meta {
    font-size: 0.875rem;
    color: var(--text-2);
  }

  .link {
    color: var(--brand);
    text-decoration: none;
    font-weight: bold;
  }
  .link:hover {
    text-decoration: underline;
  }
</style>
