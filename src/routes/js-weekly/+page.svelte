<script lang="ts">
  import { enhance } from '$app/forms';
  // import type { ActionData } from './$types';
  //
  // let { form }: { form: ActionData } = $props();
</script>

<h1>Login/Register</h1>
<form method="post" action="?/login" use:enhance>
  <label>
    What would you like to look up?
    <input name="query" />
  </label>
  <button>Search</button>
</form>
<!-- <p style="color: red">{form?.message ?? ''}</p> -->
