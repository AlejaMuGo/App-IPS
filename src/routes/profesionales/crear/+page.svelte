<script lang="ts">
	import type { PageData } from './$types';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { toast } from 'svelte-sonner';
	import { DatabaseController } from '$lib/services/db';
	import { goto } from '$app/navigation';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Rol, type Profesional } from '$lib/types/profesional';

	let { data }: { data: PageData } = $props();

	const roles = [
		{ value: Rol.MEDICA_ESTETICA, label: 'Médica estética' },
		{ value: Rol.COSMETOLOGA, label: 'Cosmetóloga' }
	];
	let value = $state('');

	const triggerContent = $derived(
		roles.find((f) => f.value === value)?.label ?? 'Seleccione el rol'
	);
	let newProfesional: Profesional = $state({
		nombre: '',
		documento: '',
		telefono: '',
		email: '',
		rol: Rol.NINGUNO
	});

	// Función para agregar el nuevo cliente
	async function handleRegister() {
		// Validar que los campos no estén vacíos
		if (
			!newProfesional.nombre ||
			!newProfesional.documento ||
			!newProfesional.email ||
			!newProfesional.telefono ||
			newProfesional.rol == Rol.NINGUNO
		) {
			toast.error('Todos los campos son obligatorios');
			return;
		}

		const databaseController = new DatabaseController();
		const result = await databaseController.createProfesional(newProfesional);

		if (result === null) {
			toast.error('Error al crear cliente');
		}

		toast.success(`Profesional creado con exito: ${result?.nombre as string}`);

		// Limpiar el formulario
		newProfesional = {
			nombre: '',
			documento: '',
			email: '',
			telefono: '',
			rol: Rol.NINGUNO
		};

		await goto('/profesionales');
	}
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
				<h1>Nombre completo</h1>
				<Input class="w-full" placeholder="Nombre completo" bind:value={newProfesional.nombre} />
			</div>
			<div class="space-y-2">
				<h1>Documento</h1>
				<Input
					class="w-full"
					placeholder="Número de documento"
					bind:value={newProfesional.documento}
				/>
			</div>
			<div class="space-y-2">
				<h1>Correo</h1>
				<Input class="w-full" placeholder="Correo electrónico" bind:value={newProfesional.email} />
			</div>
			<div class="space-y-2">
				<h1>Teléfono</h1>
				<Input
					class="w-full"
					placeholder="Número de teléfono"
					bind:value={newProfesional.telefono}
				/>
			</div>
			<div class="space-y-2">
				<h1>Rol</h1>
				<Select.Root
					type="single"
					name="rol"
					bind:value
					onValueChange={(value) => {
						newProfesional.rol = value as Rol;
						// additional logic here.
					}}
				>
					<Select.Trigger class="w-full">
						{triggerContent}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							{#each roles as rol}
								<Select.Item value={rol.value} label={rol.label}>{rol.label}</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
		</div>
		<div>
			<Button class="w-full bg-indigo-500 text-white hover:bg-indigo-900" onclick={handleRegister}
				>Registrar</Button
			>
		</div>
	</div>
</class>
