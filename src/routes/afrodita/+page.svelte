<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button/index.js';

	let { data }: { data: PageData } = $props();
</script>

<main class="flex flex-col gap-12 px-12 py-12">
	<div class="flex justify-between px-2">
		<div class="space-y-4">
			<h2 class="text-3xl font-bold">Sobre Afrodita</h2>
			<div class="h-1.5 w-60 bg-indigo-500"></div>
		</div>
		<Button
			variant="secondary"
			href="/profesionales/crear"
			class="bg-indigo-500 text-white transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-indigo-200 hover:text-indigo-900 "
			>ingreso</Button
		>
	</div>
</main>
