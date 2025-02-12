<script lang="ts">
	import type { Client } from '$lib/types/client';
	import { clientes } from '$lib/types/client';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import { ClientStore } from '$lib/stores/clients.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import DialogEditClient from '$lib/components/clients/DialogEditClient.svelte';
	import { DatabaseController } from '$lib/services/db.js';
	import { toast } from 'svelte-sonner';

	const { data } = $props();
	const storeClients = new ClientStore(data.clientes);

	async function handleClientEdit(client: Client) {
		toast.loading('Actualizando cliente...');

		const databaseController = new DatabaseController();
		const updatedClient = await databaseController.updateClient(client.id as number, client);
		if (updatedClient === null) {
			toast.error('Error al actualizar cliente.');
			return;
		}

		toast.success('Cliente actualizado con exito.');

		for (let i = 0; i < storeClients.clients.length; i++) {
			if (storeClients.clients[i].id === updatedClient.id) {
				storeClients.clients[i] = updatedClient;
			}
		}
	}
</script>

<main class="flex flex-col gap-12 px-12 py-12">
	<div class="flex justify-between px-2">
		<div class="space-y-4">
			<h2 class="text-3xl font-bold">Gestión de clientes</h2>
			<div class="h-1.5 w-60 bg-indigo-500"></div>
		</div>
		<Button
			variant="secondary"
			href="/clientes/crear"
			class="bg-indigo-500 text-white transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-105 hover:bg-indigo-200 hover:text-indigo-900 "
			>Crear cliente</Button
		>
	</div>

	<div class="space-y-4">
		<div>
			<Input
				class="w-96"
				bind:value={storeClients.searchValue}
				placeholder="Busca por nombre, cedula o correo"
			/>
		</div>

		<div class="flex justify-between">
			<Table.Root>
				<Table.Caption>Listado de clientes</Table.Caption>
				<Table.Header>
					<Table.Row>
						<Table.Head>Nombre completo</Table.Head>
						<Table.Head>Documento</Table.Head>
						<Table.Head>Email</Table.Head>
						<Table.Head>Telefono</Table.Head>
						<Table.Head></Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#if storeClients.filtered.length === 0}
						<span class="flex w-full text-zinc-600"
							>No hay resultados para la busqueda: {storeClients.searchValue}</span
						>
					{:else}
						{#each storeClients.filtered as client}
							<Table.Row>
								<Table.Cell class="font-medium">
									<i class="bi bi-person text-gray-400 mr-2"></i>
									{client.nombre}
								</Table.Cell>
								<Table.Cell>{client.documento}</Table.Cell>
								<Table.Cell>{client.email}</Table.Cell>
								<Table.Cell>{client.telefono}</Table.Cell>
								<Table.Cell>
									<DialogEditClient {client} onSaveChanges={handleClientEdit} />
								</Table.Cell>
							</Table.Row>
						{/each}
					{/if}
				</Table.Body>
			</Table.Root>
		</div>
	</div>
</main>
