<script context="module" lang="ts">
  export async function preload(page, session) {
    const { apiInstance } = session;
    const { document: slug } = page.params;

    if (slug.length !== 8) {
      throw new Error(
        `Document ID is not long enough; is ${slug.length}, must be 8`,
      );
    }

    const resp: Response = await this.fetch(`${apiInstance}/v1/documents/${slug}`);
    const code = await resp.json();

    if (resp.status === 500 || 404 && code.error === 'record not found') {
      throw new Error(`Could not find document '${slug}'.`);
    }

    const lines = code.payload.content.split('\n');

    return {
      code: code.payload.content,
      extension: code.payload.extension,
      lines,
    }
  }
</script>

<script lang="ts">
  import Prism from 'prismjs';

  export let code: string;
  export let lines: string[];
  export let extension: string;
</script>

<header>
  <img src="/logo.svg" alt="Spacebin Logo">
  <a id="home" href="/" aria-label="Home">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  </a>
  <a id="github" href="https://github.com/spacebin-org" aria-label="Spacebin Github">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  </a>
  <a id="wiki" href="https://docs.spaceb.in" aria-label="Spacebin Documentation">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  </a>
</header>

<main>
  <div id="line-numbers">
    {#each lines as _, i}
      <div>{i + 1}</div>
    {/each}
  </div>

  <pre><code>
    {#if extension in Prism.languages}
      {@html Prism.highlight(code, Prism.languages[extension], extension)}
    {:else}
      {code}
    {/if}
  </code></pre>
</main>
