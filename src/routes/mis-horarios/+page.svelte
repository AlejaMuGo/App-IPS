<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();
    import Horario from '$lib/components/horarios/Horario.svelte';
</script>

<main class="flex flex-col gap-12 px-12 py-12">
	<div class="flex justify-between px-2">
		<div class="space-y-4">
			<h2 class="text-3xl font-bold">Gestionar Horarios Disponibles</h2>
			<div class="h-1.5 w-60 bg-indigo-500"></div>
		</div>
    </div>

    <div class="flex gap-12 p-3">
        <div class="border rounded-lg w-96">
            <div class="flex justify-between p-6">
                <h5 class="text-2xl font-bold">Horarios del Día</h5>
            </div>

            <div class="p-6">
            </div>
        </div>
        <div class="border rounded-lg w-96">
            <div class="flex justify-between p-6">
                <h5 class="text-2xl font-bold">Horarios Disponibles</h5>
            </div>

        </div>
    </div>
</main>