<script>
  export let photos;
</script>

<h1>Photos</h1>

<form method= "post" enctype ="multipart/form-data">





</form>



















<div class="grid">
  {#each photos as photo}
    <a sveltekit:prefetch href="/photos/{photo.id}">
      <img src={photo.thumbnailUrl} alt="{photo.title} thumbnail" />
    </a>
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 0.5em;
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
