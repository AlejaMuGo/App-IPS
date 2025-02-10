<script lang="ts">
	import type { PageData } from './$types';
	import * as Select from '$lib/components/ui/select/index.js';
	import { getLocalTimeZone, today } from '@internationalized/date';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import { Rol, type Profesional } from '$lib/types/profesional';
	import { RolToDisplay } from '$lib/types/profesional';
	import { Button } from '$lib/components/ui/button/index.js';

	let { data }: { data: PageData } = $props();
	const clientes = $state(data.clientes);
	const profesionales = $state(data.profesionales);

	type OpcionSelect = {
		value: string;
		label: string;
	};

	const opcionesClientes: OpcionSelect[] = [];
	for (const cliente of clientes) {
		const opcion = {
			value: cliente.documento,
			label: cliente.nombre
		};
		opcionesClientes.push(opcion);
	}
	let value = $state('');

	const triggerContent = $derived(
		opcionesClientes.find((f) => f.value === value)?.label ?? 'Selecciona un cliente'
	);

	let valueTime = $state(today(getLocalTimeZone()));

	let profesionalSeleccionado = $state('');
	function seleccionarProfesional(documento: string) {
		profesionalSeleccionado = documento;
	}
</script>

<div class="mx-auto flex max-w-4xl flex-col gap-12 px-0 py-2">
	<a href="/citas" class="justify-left flex gap-2 px-12 py-5 hover:text-indigo-600">
		<i class="bi bi-arrow-left"></i>Volver</a
	>
</div>

<div class="mx-auto flex max-w-4xl flex-col gap-12 px-12 py-2">
	<div class="px-2">
		<div class="space-y-4">
			<h2 class="text-3xl font-bold">Agendar cita</h2>
			<div class="h-1.5 w-60 bg-indigo-500"></div>
		</div>
	</div>

	<div class="space-y-4">

		<div class="rounded-md border border-2 p-6 space-y-3">
			<h5 class="font-semibold">Seleccionar cliente</h5>
			<Select.Root type="single" name="seleccionarCliente" bind:value>
				<Select.Trigger class="w-full">
					{triggerContent}
				</Select.Trigger>
				<Select.Content>
					<Select.Group>
						<Select.GroupHeading>Clientes</Select.GroupHeading>
						{#each opcionesClientes as cliente}
							<Select.Item value={cliente.value} label={cliente.label}>{cliente.label}</Select.Item>
						{/each}
					</Select.Group>
				</Select.Content>
			</Select.Root>
		</div>
		
		<div class="rounded-md border border-2 p-6 space-y-3">
			<h5 class="font-semibold">Seleccionar fecha</h5>
			<div class="flex justify-center">
				<Calendar type="single" bind:value={valueTime} class="max-w-max rounded-md border" />
			</div>
		</div>

		<div class="rounded-md border border-2 p-6 space-y-4">
			<h5 class="font-semibold">Seleccionar profesional y horario</h5>
			<div class="grid grid-cols-2 gap-x-12">
				<div class="space-y-3">
		
					<p>Profesionales disponibles</p>

					<div class="space-y-2">
						{#each profesionales as profesional}
							<!-- svelte-ignore a11y_no_static_element_interactions -->
							<!-- svelte-ignore a11y_click_events_have_key_events -->
							<div
								onclick={() => seleccionarProfesional(profesional.documento)}
								class="rounded-md border px-4 py-3"
								class:border-indigo-500={profesionalSeleccionado === profesional.documento}
								class:bg-indigo-50={profesionalSeleccionado === profesional.documento}
							>
								<p class="font-semibold">{profesional.nombre}</p>
								<p class="text-gray-600">
									<i class="bi bi-person"></i>
									<span>
										{RolToDisplay(profesional.rol)}
									</span>
								</p>
							</div>
						{/each}
					</div>
				</div>
				<div>
					<p>Horarios disponibles</p>
					<p>{profesionalSeleccionado}</p>
				</div>
			</div>
		</div>
		<div>
			<Button class="w-full bg-indigo-500 text-white hover:bg-indigo-900"
				>Agendar</Button
			>
		</div>
	</div>
</div>
