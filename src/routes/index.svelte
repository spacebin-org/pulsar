<script lang="ts">
  import { goto, stores } from '@sapper/app';
  import { onMount } from 'svelte';

  const { session } = stores();
  const { apiInstance } = $session;

  onMount(() => {
    // Fix tab key in textarea
    document.querySelector('textarea').addEventListener('keydown', function (e) {
      if (e.key.toLowerCase() === 'tab') {
        e.preventDefault();

        const start = this.selectionStart;
        const end = this.selectionEnd;

        // Set textarea value to: text before caret + tab + text after caret
        this.value = this.value.substring(0, start) +
          "\t" + this.value.substring(end);

        // Move caret to right position
        this.selectionStart = this.selectionEnd = start + 1;
      }
    });

    const saveButton = document.querySelector('button#save');

    saveButton.addEventListener('click', async function() {
      const textarea = document.querySelector('textarea');

      if (textarea.value !== "") {
        const resp: Response = await window.fetch(`${apiInstance}/v1/documents/`, {
          method: 'POST',
          body: JSON.stringify({
            content: textarea.value,
            extension: 'none'
          }),
          headers: {
            'Content-Type': 'application/json'
          },
        });

        const body = await resp.json();

        if (resp.status === 201 && body.payload.id) {
          await goto(`/${body.payload.id}`);
        }
      }
    });
  });
</script>

<header>
  <img src="/logo.svg" alt="Spacebin Logo">
  <button id="save" aria-label="Save Document">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
      <polyline points="17 21 17 13 7 13 7 21"/>
      <polyline points="7 3 7 8 15 8"/>
    </svg>
  </button>
  <a id="github" href="https://github.com/spacebin-org" aria-label="Spacebin Github">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
    </svg>
  </a>
  <a id="wiki" href="https://docs.spaceb.in" aria-label="Spacebin Documentation">
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  </a>
</header>

<main>
  <div id="line-numbers">
    <div>&gt;</div>
  </div>

  <textarea id="textarea" spellcheck={false}></textarea>
</main>
