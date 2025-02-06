<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Rol, type Profesional } from '$lib/types/profesional';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { toast } from 'svelte-sonner';
	import { DatabaseController } from '$lib/services/db';
	import * as Select from '$lib/components/ui/select/index.js';

	let myOpen = $state(false);

	type Props = {
		profesional: Profesional;
		onSaveChanges: (profesional: Profesional) => Promise<boolean>;
	};

	const { profesional, onSaveChanges }: Props = $props();
	const profesionalState: Profesional = $state({ ...profesional });

	type ValidationFields = {
		[K in keyof Profesional]: boolean;
	}

	const validationFields = $state<ValidationFields>(Object.fromEntries(Object.keys(profesional).map((k: keyof Profesional) => [k, true])) as ValidationFields)

	async function handleClickSave() {
		
		let hasEmpty = false;
		for (const entry of Object.entries(profesionalState)) {
			const [key, value] = entry;
			if (value === "") {
				hasEmpty = true;
				validationFields[key as keyof Profesional] = false;
			} else {
				validationFields[key as keyof Profesional] = true;
			}
		}

		if (hasEmpty) {
			toast.error('Todos los campos son obligatorios');
			return;			
		}

		const result = await onSaveChanges(profesionalState);
		if (result) {
			myOpen = false;
		}
	}

	const roles = [
		{ value: Rol.MEDICA_ESTETICA, label: 'Médica estética' },
		{ value: Rol.COSMETOLOGA, label: 'Cosmetóloga' }
	];
	let value = $state('');

	const triggerContent = $derived(
		roles.find((f) => f.value === value)?.label ?? 'Seleccione el rol'
	);
</script>

<Dialog.Root bind:open={() => myOpen, (newOpen) => (myOpen = newOpen)}>
	<Dialog.Trigger>
		<Button
			class="h-7 border-2 border-indigo-500 bg-indigo-50 text-indigo-500  hover:scale-105 hover:border-indigo-500 hover:bg-indigo-500 hover:text-white "
		>
			<i class="bi bi-pencil-square"> </i>
		</Button>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title class="text-xl">Editar información profesional</Dialog.Title>
			<Dialog.Description>
				Modifica los datos del profesional. Click en guardar cambios cuando termines.
			</Dialog.Description>
		</Dialog.Header>
		<div class="flex-items-center flex flex-col space-y-6">
			<div class="space-y-2">
				<h1>Nombre completo</h1>
				<Input class="w-full {!validationFields.nombre && "border-red-500"}" placeholder="Nombre completo"
				bind:value={profesionalState.nombre}
				/>
			</div>
			<div class="space-y-2">
				<h1>Documento</h1>
				<Input
					class="w-full {!validationFields.documento && "border-red-500"}"
					placeholder="Número de documento"
					bind:value={profesionalState.documento}
				/>
			</div>
			<div class="space-y-2">
				<h1>Correo</h1>
				<Input
					type="email"
					class="w-full {!validationFields.email && "border-red-500"}"
					placeholder="Correo electrónico"
					bind:value={profesionalState.email}
				/>
			</div>
			<div class="space-y-2">
				<h1>Telefono</h1>
				<Input
					class="w-full {!validationFields.telefono && "border-red-500"}"
					placeholder="Número de telefono"
					bind:value={profesionalState.telefono}
				/>
			</div>

			<div class="space-y-2">
				<h1>Rol</h1>
				<Select.Root
					type="single"
					name="rol"
					bind:value
					onValueChange={(value) => {
						profesionalState.rol = value as Rol;
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
