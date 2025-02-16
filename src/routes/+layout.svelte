<script lang="ts">
  import 'open-props/style';
  import 'open-props/normalize';
  import 'open-props/buttons';
  import '../app.css';
  import Header from '$lib/components/header.svelte';
  import Footer from '$lib/components/footer.svelte';
  import PageTransition from '$lib/components/transition.svelte';

  let { children, data } = $props();
</script>

<div class="layout">
  <Header />

  <main>
    <PageTransition url={data.url}>
      {@render children?.()}
    </PageTransition>
  </main>

  <Footer />
</div>

<style>
  .layout {
    height: 100%;
    max-inline-size: 1440px;
    display: grid;
    grid-template-rows: auto 1fr auto;
    margin-inline: auto;
    padding-inline: var(--size-7);

    @media (min-width: 1440px) {
      padding-inline: 0;
    }

    main {
      padding-block: var(--size-9);
    }
  }
</style>
