<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { clientes } from '$lib/types/client';
	import { ClientStore } from '$lib/stores/clients.svelte';
	import type { Client } from '$lib/types/client';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	let myOpen = $state(false);

	type Props = {
		client: Client;
		onSaveChanges: (client: Client) => void;
	};

	const { client, onSaveChanges }: Props = $props();
	const clientState: Client = $state({ ...client });

	function handleClickSave() {
		onSaveChanges(clientState);
		myOpen = false;
	}
</script>

<Dialog.Root bind:open={() => myOpen, (newOpen) => (myOpen = newOpen)}>
	<Dialog.Trigger>
		<Button
			class="h-7 border-2 border-indigo-400 bg-white text-indigo-400  hover:scale-105 hover:border-indigo-500 hover:bg-indigo-500 hover:text-white "
		>
			<i class="bi bi-pencil-square"> </i>
			<span>Editar</span>
		</Button>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title class="text-xl">Editar información cliente</Dialog.Title>
			<Dialog.Description>
				Modifica los datos del cliente. Click en guardar cambios cuando termines.
			</Dialog.Description>
		</Dialog.Header>
		<div class="flex-items-center flex flex-col space-y-6">
			<div class="space-y-2">
				<h1>Nombre</h1>
				<Input class="w-full" placeholder="Nombre completo" bind:value={clientState.nombre} />
			</div>
			<div class="space-y-2">
				<h1>Documento</h1>
				<Input
					class="w-full"
					placeholder="Número de documento"
					bind:value={clientState.documento}
				/>
			</div>
			<div class="space-y-2">
				<h1>Correo</h1>
				<Input class="w-full" placeholder="Correo electrónico" bind:value={clientState.email} />
			</div>
			<div class="space-y-2">
				<h1>Telefono</h1>
				<Input class="w-full" placeholder="Número de telefono" bind:value={clientState.telefono} />
			</div>

			<Button
				type="submit"
				onclick={handleClickSave}
				class="bg-indigo-500 text-white hover:border-2 hover:border-indigo-500 hover:bg-indigo-50 hover:text-indigo-500"
			>
				<span>Guardar cambios</span>
			</Button>
		</div>
	</Dialog.Content>
</Dialog.Root>
