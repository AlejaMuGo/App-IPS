<script lang="ts">
	import type { PageData } from './$types';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { toast } from 'svelte-sonner';
	import { DatabaseController } from '$lib/services/db';
	import { goto } from '$app/navigation';
	import * as Select from '$lib/components/ui/select/index.js';

	let { data }: { data: PageData } = $props();

	const fruits = [
		{ value: 'MEDICA_ESTETICA', label: 'Médica estética' },
		{ value: 'COSMETOLOGA', label: 'Cosmetóloga' }
	];
	let value = $state('');

	const triggerContent = $derived(
		fruits.find((f) => f.value === value)?.label ?? 'Seleccione el rol'
	);
</script>

<a href="/profesionales" class="justify-left flex gap-2 px-12 py-5 hover:text-indigo-600">
	<i class="bi bi-arrow-left"></i>Volver</a
>
<class class="mx-auto flex max-w-4xl flex-col gap-12 px-12 py-2">
	<div class="px-2">
		<div class="space-y-4">
			<h2 class="text-3xl font-bold">Registrar profesional</h2>
			<div class="h-1.5 w-60 bg-indigo-500"></div>
		</div>
	</div>
	<div class="flex flex-col space-y-6 rounded-md border-2 px-4 py-6">
		<div>
			<h1 class="px-2 text-base font-bold">Datos cliente</h1>
		</div>

		<!-- Inputs vinculados al estado local -->
		<div class="space-y-4 px-2">
			<div class="space-y-2">
				<h1>Nombre</h1>
				<Input class="w-full" placeholder="Nombre completo" />
			</div>
			<div class="space-y-2">
				<h1>Documento</h1>
				<Input class="w-full" placeholder="Número de documento" />
			</div>
			<div class="space-y-2">
				<h1>Correo</h1>
				<Input class="w-full" placeholder="Correo electrónico" />
			</div>
			<div class="space-y-2">
				<h1>Teléfono</h1>
				<Input class="w-full" placeholder="Número de teléfono" />
			</div>
			<div class="space-y-2">
				<h1>Rol</h1>
				<Select.Root type="single" name="favoriteFruit" bind:value>
					<Select.Trigger class="w-full">
						{triggerContent}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							{#each fruits as fruit}
								<Select.Item value={fruit.value} label={fruit.label}>{fruit.label}</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
		</div>
		<div>
			<Button class="w-full bg-indigo-500 text-white hover:bg-indigo-900">Registrar</Button>
		</div>
	</div>
</class>
