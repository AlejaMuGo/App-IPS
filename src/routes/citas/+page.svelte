<script lang="ts">
	import type { PageData } from './$types';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { citaStore } from '$lib/stores/citas.svelte';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import { RolToDisplay } from '$lib/types/profesional';
	import { DatabaseController } from '$lib/services/db';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import type { Cita } from '$lib/types/cita';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	
	let { data }: { data: PageData } = $props();
	const storeCitas = new citaStore(data.citas);
	const db = new DatabaseController();
	async function confirmarCita(id: number, confirmed: boolean) {
		toast.loading('Actualizando cita...');
		await db.updateCita(id, {
			confirmed: confirmed
		});
		
		if (confirmed === true) {
			toast.success('Cita confirmada');
		} else {
			toast.success('Cita desconfirmada');
		}
		
	} 

	let open = $state(false);
	async function handleCitaDeletion(cita: Cita) {
		toast.loading('Eliminando cita...');

		const db = new DatabaseController();
		const result = await db.deleteCita(
			cita.id as number,
		);

		if (!result) {
			toast.error('Error al eliminar cita.');
			return;
		}

		toast.success('Cita eliminada con exito.');

		storeCitas.citas = storeCitas.citas.filter((c) => c.id != cita.id)

		open = false
		await goto('/citas');
		
	}
</script>

<main class="flex flex-col gap-12 px-12 py-12">
	<div class="flex justify-between px-2">
		<div class="space-y-4">
			<h2 class="text-3xl font-bold">Gestión de citas</h2>
			<div class="h-1.5 w-60 bg-indigo-500"></div>
		</div>
		<Button
			variant="secondary"
			href="/citas/crear"
			class="bg-indigo-500 text-white transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-indigo-200 hover:text-indigo-900 "
			>Agendar cita</Button
		>
	</div>

	<div class="rounded-md border">
		<Table.Root class="w-full">
			<Table.Header>
				<Table.Row>
					<Table.Head>Cliente</Table.Head>
					<Table.Head>Profesional</Table.Head>
					<Table.Head>Fecha y Hora</Table.Head>
					<Table.Head>Confirmado</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#if storeCitas.filtered.length === 0}
					<span class="flex w-full text-zinc-600"
						>No hay resultados para la busqueda: {storeCitas.searchValue}</span
					>
				{:else}
					{#each storeCitas.filtered as cita}
						<Table.Row>
							<Table.Cell class="font-medium">
								<div class="flex items-center">
									<i class="bi bi-person text-gray-400 mr-2"></i>
									<div>
										<div class="font-medium">{cita.client.nombre}</div>
									</div>
								</div>
							</Table.Cell>
							<Table.Cell>
								<div class="flex items-center">
									<i class="bi bi-people text-gray-400 mr-2"></i>
									<div>
										<div class="font-medium">{cita.profesional.nombre}</div>
										<div class="text-sm text-muted-foreground">
											{RolToDisplay(cita.profesional.rol)}
										</div>
									</div>
								</div>
							</Table.Cell>
							<Table.Cell>
								<div class="flex flex-col">
									<div class="flex items-center">
										<i class="bi bi-calendar4-event text-gray-400 mr-2"></i>{cita.date}
									</div>
									<div class="flex items-center text-muted-foreground">
										<i class="bi bi-clock text-gray-400 mr-2"></i>{cita.start_time}
									</div>
								</div>
							</Table.Cell>
							<Table.Cell>
								<div class="flex items-center">
									<Switch 
										bind:checked={cita.confirmed}
										onCheckedChange={(checked) => confirmarCita(cita.id as number, checked)}
										class="data-[state=checked]:bg-indigo-500 data-[state=unchecked]:border-gray-400"
									/>
								</div>
							</Table.Cell>
							<Table.Cell>
								<div class="flex space-x-2">
									<div>
										<AlertDialog.Root bind:open>
											<AlertDialog.Trigger
												><Button
													class="bg- h-7 border-2 border-red-500 bg-red-100 text-red-500 hover:scale-105 hover:border-red-500 hover:bg-red-500 hover:text-white "
												>
													<i class="bi bi-trash3"></i></Button
												></AlertDialog.Trigger
											>
											<AlertDialog.Content>
												<AlertDialog.Header>
													<AlertDialog.Title>Eliminar cita: {cita.client.nombre} {cita.date}</AlertDialog.Title>
													<AlertDialog.Description>
														Esta acción no se puede deshacer. Esto eliminará permanentemente la cita de la base de datos.
													</AlertDialog.Description>
												</AlertDialog.Header>
												<AlertDialog.Footer>
													<AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
													<Button class= "bg-red-500 text-white hover:bg-red-800" onclick={()=>handleCitaDeletion(cita)}> Eliminar</Button>
												</AlertDialog.Footer>
											</AlertDialog.Content>
										</AlertDialog.Root>
									</div>
								</div>
							</Table.Cell>
						</Table.Row>
					{/each}
				{/if}
			</Table.Body>
		</Table.Root>
	</div>
	
	<h5 class="text-center text-sm text-muted-foreground">Listado de citas</h5>
</main>
