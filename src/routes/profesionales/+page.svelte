<script lang="ts">
	import TableCell from '$lib/components/ui/table/table-cell.svelte';
	import * as AlertDialog from '$lib/components/ui/alert-dialog/index.js';
	import { Rol, type Profesional } from '$lib/types/profesional';
	import { ProfesionalStore } from '$lib/stores/profesionales.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { ClientStore } from '$lib/stores/clients.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import DialogEditClient from '$lib/components/clients/DialogEditClient.svelte';
	import { DatabaseController } from '$lib/services/db.js';
	import DialogEditProfesional from '$lib/components/profesionales/DialogEditProfesional.svelte';
	import { goto } from '$app/navigation';
	import { toast } from 'svelte-sonner';

	const { data } = $props();
	const storeProfesional = new ProfesionalStore(data.profesionales);
	

	async function handleProfesionalDeletion(profesional: Profesional) {
		toast.loading('Eliminando profesional...');

		const databaseController = new DatabaseController();
		const result = await databaseController.deleteProfesional(
			profesional.id as number,
		);

		if (!result) {
			toast.error('Error al actualizar profesional.');
			return;
		}

		toast.success('Profesional eliminado con exito.');

		storeProfesional.profesionales = storeProfesional.profesionales.filter((p) => p.id != profesional.id)

		await goto('/profesionales');
		
	}
	

	async function handleProfesionalEdit(profesional: Profesional) {

		toast.loading('Actualizando profesional...');

		const databaseController = new DatabaseController();
		const updatedProfesional = await databaseController.updateProfesional(
			profesional.id as number,
			profesional
		);

		if (updatedProfesional === null) {
			toast.error('Error al actualizar profesional.');
			return true;
		}

		toast.success('Profesional actualizado con exito.');

		for (let i = 0; i < storeProfesional.profesionales.length; i++) {
			if (storeProfesional.profesionales[i].id === updatedProfesional.id) {
				storeProfesional.profesionales[i] = updatedProfesional;
			}
		}

		return true
	}
</script>

<main class="flex flex-col gap-12 px-12 py-12">
	<div class="flex justify-between px-2">
		<div class="space-y-4">
			<h2 class="text-3xl font-bold">Gestión de profesionales</h2>
			<div class="h-1.5 w-60 bg-indigo-500"></div>
		</div>
		<Button
			variant="secondary"
			href="/profesionales/crear"
			class="bg-indigo-500 text-white transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-indigo-200 hover:text-indigo-900 "
			>Añadir profesional</Button
		>
	</div>
	<div class="space-y-4">
		<div>
			<Input
				class="w-96"
				placeholder="Busca por nombre, cedula o correo"
				bind:value={storeProfesional.searchValue}
			/>
		</div>

		<div class="flex">
			<Table.Root>
				<Table.Caption>Listado de profesionales</Table.Caption>
				<Table.Header>
					<Table.Row>
						<Table.Head>Nombre completo</Table.Head>
						<Table.Head>Documento</Table.Head>
						<Table.Head>Email</Table.Head>
						<Table.Head>Telefono</Table.Head>
						<Table.Head>Rol</Table.Head>
						<Table.Head></Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#if storeProfesional.filtered.length === 0}
						<span class="flex w-full text-zinc-600"
							>No hay resultados para la busqueda: {storeProfesional.searchValue}</span
						>
					{:else}
						{#each storeProfesional.filtered as profesional}
							<Table.Row>
								<Table.Cell class="font-medium">{profesional.nombre}</Table.Cell>
								<Table.Cell>{profesional.documento}</Table.Cell>
								<Table.Cell>{profesional.email}</Table.Cell>
								<Table.Cell>{profesional.telefono}</Table.Cell>
								<Table.Cell
									>{profesional.rol === Rol.MEDICA_ESTETICA
										? 'Medica estetica'
										: 'Cosmetologa'}</Table.Cell
								>
								<TableCell>
									<div class="flex space-x-2">
										<DialogEditProfesional {profesional} onSaveChanges={handleProfesionalEdit} />
										<div>
											<AlertDialog.Root>
												<AlertDialog.Trigger
													><Button
														class="bg- h-7 border-2 border-red-500 bg-red-100 text-red-500 hover:scale-105 hover:border-red-500 hover:bg-red-500 hover:text-white "
													>
														<i class="bi bi-trash3"></i></Button
													></AlertDialog.Trigger
												>
												<AlertDialog.Content>
													<AlertDialog.Header>
														<AlertDialog.Title>Eliminar profesional: {profesional.nombre}</AlertDialog.Title>
														<AlertDialog.Description>
															Esta acción no se puede deshacer. Esto eliminará permanentemente el
															profesional de la base de datos.
														</AlertDialog.Description>
													</AlertDialog.Header>
													<AlertDialog.Footer>
														<AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
														<Button class= "bg-red-500 text-white hover:bg-red-800" onclick={()=>handleProfesionalDeletion(profesional)}> Eliminar</Button>
													</AlertDialog.Footer>
												</AlertDialog.Content>
											</AlertDialog.Root>
										</div>
									</div>
								</TableCell>
							</Table.Row>
						{/each}
					{/if}
				</Table.Body>
			</Table.Root>
		</div>
	</div>
</main>
