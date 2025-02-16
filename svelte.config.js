import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';
import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://svelte.dev/docs/kit/integrations
  // for more information about preprocessors
  preprocess: [
    vitePreprocess(),
    mdsvex({
      extensions: ['.svx', '.md'],
      layout: {
        _: './src/mdsvex.svelte'
      },
      remarkPlugins: [[remarkToc, { tight: true }]],
      rehypePlugins: [rehypeSlug]
    })
  ],

  kit: {
    adapter: adapter(),
    alias: {
      '@/*': './src/lib/*'
    }
  },

  extensions: ['.svelte', '.svx', '.md'],
  highlight: {
    highlighter: async (code, lang = 'text') => {
      const highlighter = await createHighlighter({
        themes: ['poimandres'],
        langs: ['javascript', 'typescript']
      });
      await highlighter.loadLanguage('javascript', 'typescript');
      const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'poimandres' }));
      return `{@html \`${html}\` }`;
    }
  }
};

export default config;
