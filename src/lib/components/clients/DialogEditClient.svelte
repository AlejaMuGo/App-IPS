<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { clientes } from '$lib/types/client';
	import { ClientStore } from '$lib/stores/clients.svelte';
	import type { Client } from '$lib/types/client';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { toast } from 'svelte-sonner';
	import { DatabaseController } from '$lib/services/db';

	let myOpen = $state(false);

	type Props = {
		client: Client;
		onSaveChanges: (client: Client) => Promise<boolean>;
	};

	const { client, onSaveChanges }: Props = $props();
	const clientState: Client = $state({ ...client });
	type ValidationFields = {
		[K in keyof Client]: boolean;
	}

	const validationFields = $state<ValidationFields>(Object.fromEntries(Object.keys(client).map((k: keyof Client) => [k, true])) as ValidationFields)

	async function handleClickSave() {
		
		let hasEmpty = false;
		for (const entry of Object.entries(clientState)) {
			const [key, value] = entry;
			if (value === "") {
				hasEmpty = true;
				validationFields[key as keyof Client] = false;
			} else {
				validationFields[key as keyof Client] = true;
			}
		}

		if (hasEmpty) {
			toast.error('Todos los campos son obligatorios');
			return;			
		}

		const result = await onSaveChanges(clientState);
		if (result) {
			myOpen = false;
		}
	}

</script>

<Dialog.Root bind:open={() => myOpen, (newOpen) => (myOpen = newOpen)}>
	<Dialog.Trigger>
		<Button
			class="bg- h-7 border-2 border-indigo-400 text-indigo-400  hover:scale-105 hover:border-indigo-500 hover:bg-indigo-500 hover:text-white "
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
				<Input class="w-full {!validationFields.nombre && "border-red-500"}" placeholder="Nombre completo"
				bind:value={clientState.nombre} />
			</div>
			<div class="space-y-2">
				<h1>Documento</h1>
				<Input
					class="w-full {!validationFields.documento && "border-red-500"}"
					placeholder="Número de documento"
					bind:value={clientState.documento} 
				/>
			</div>
			<div class="space-y-2">
				<h1>Correo</h1>
				<Input
					type="email"
					class="w-full {!validationFields.email && "border-red-500"}"
					placeholder="Correo electrónico"
					bind:value={clientState.email} />
			</div>
			<div class="space-y-2">
				<h1>Telefono</h1>
				<Input
					class="w-full {!validationFields.telefono && "border-red-500"}"
					placeholder="Número de telefono"
					bind:value={clientState.telefono} />
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
