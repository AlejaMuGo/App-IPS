<script lang="ts">
	import '$styles/app.scss';
	import Nav from '$lib/components/layout/Nav.svelte';
	import { Toaster } from '$lib/components/ui/sonner/index.js';
	let { children } = $props();
</script>

<Nav />

{@render children()}

<Toaster />
