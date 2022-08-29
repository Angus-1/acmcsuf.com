<script>
  import photos from './artwork';
</script>

<h1>Photos</h1>

<div class="grid">
  {#each photos as photo}
    <a sveltekit:prefetch href="/paths/create/{photo.id}">
      <img src={photo.src} alt="{photo.title} thumbnail" />
    </a>
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 2fr);
    grid-gap: 1em;
  }

  a,
  img {
    display: block;
    width: 100%;
  }
  form {
    display: flex;
    width: 100%;
  }
</style>
