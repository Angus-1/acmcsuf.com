
<script>
  export let photos;
</script>

<h1> Photos </h1>

<div class="grid">
  {#each photos as photo}
    <a sveltekit:prefetch href="/photos/{photo.id}">
      <img src={photo.thumbnailUrl} alt={photo.title}>
    </a>
    {/each}
</div>

<style>
	.gri {
		width: 100%;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-gap: 8px;
	}

	figure, img {
		width: 100%;
		margin: 0;
	}
</style>