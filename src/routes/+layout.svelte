<script lang="ts">
	import '$styles/app.scss';
	import Nav from '$lib/components/layout/Nav.svelte';
	let { children } = $props();
</script>

<Nav />

{@render children()}
