<script lang="ts">
	import type { PageData } from './$types';
	import type { Client } from '$lib/types/client';
	import { clientes } from '$lib/types/client';
	import { Input } from '$lib/components/ui/input/index.js';
	import { ClientStore } from '$lib/stores/clients.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import { toast } from "svelte-sonner";
	import { DatabaseController } from '$lib/services/db';
	import { goto } from '$app/navigation';

	let { data }: { data: PageData } = $props();
	const storeClients = new ClientStore(clientes); // Estado global de clientes

	// Estado local del nuevo cliente
	let newClient: Client = $state({
		nombre: '',
		documento: '',
		telefono: '',
		email: ''
	});

	// Función para agregar el nuevo cliente
	async function handleRegister() {
		// Validar que los campos no estén vacíos
		if (!newClient.nombre || !newClient.documento || !newClient.email || !newClient.telefono) {
			toast.error("Todos los campos son obligatorios")
			return;
		}

		const databaseController = new DatabaseController();
		const result = await databaseController.createClient(newClient);
		
		if (result === null) {
			toast.error("Error al crear cliente")
		}

		toast.success(`Cliente creado con exito: ${result?.nombre as string}`)

		// Limpiar el formulario
		newClient = {
			nombre: '',
			documento: '',
			email: '',
			telefono: ''
		};

		await goto("/clientes")
	}
</script>

<class class="mx-auto flex max-w-4xl flex-col gap-12 px-12 py-12">
	<div class="px-2">
		<div class="space-y-4">
			<h2 class="text-3xl font-bold">Registrar cliente</h2>
			<div class="h-1.5 w-60 bg-indigo-500"></div>
		</div>
	</div>
	<div class="flex flex-col space-y-6 rounded-md border-2 px-4 py-6">
		<div>
			<h1 class="px-2 text-base font-bold">Datos cliente</h1>
			{JSON.stringify(newClient)}
		</div>

		<!-- Inputs vinculados al estado local -->
		<div class="space-y-4 px-2">
			<div class="space-y-2">
				<h1>Nombre</h1>
				<Input class="w-full" placeholder="Nombre completo" bind:value={newClient.nombre} />
			</div>
			<div class="space-y-2">
				<h1>Documento</h1>
				<Input class="w-full" placeholder="Número de documento" bind:value={newClient.documento} />
			</div>
			<div class="space-y-2">
				<h1>Correo</h1>
				<Input class="w-full" placeholder="Correo electrónico" bind:value={newClient.email} />
			</div>
			<div class="space-y-2">
				<h1>Teléfono</h1>
				<Input class="w-full" placeholder="Número de teléfono" bind:value={newClient.telefono} />
			</div>
		</div>
		<div>
			<Button class="w-full bg-indigo-500 text-white" onclick={handleRegister}>Registrar</Button>
		</div>
	</div>
</class>
