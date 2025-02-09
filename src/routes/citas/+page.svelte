<script lang="ts">
	import type { PageData } from './$types';
	import * as Select from '$lib/components/ui/select/index.js';
    import { getLocalTimeZone, today } from "@internationalized/date";
    import { Calendar } from "$lib/components/ui/calendar/index.js";
 
	
	let { data }: { data: PageData } = $props();
    const clientes = $state(data.clientes);

    type OpcionSelect = {
        value: string;
        label: string;
    }

    const opcionesClientes: OpcionSelect[] = [];
    for (const cliente of clientes) {
        const opcion = {
            value: cliente.documento, 
            label: cliente.nombre
        }
        opcionesClientes.push(opcion);
        
    }
    let value = $state('');

	const triggerContent = $derived(opcionesClientes.find((f) => f.value === value)?.label ?? 'Selecciona un cliente');

    let valueTime = $state(today(getLocalTimeZone()));
</script>

<div class="px-72 py-24">
	<div class="rounded-md border border-gray-500 p-6">
		<h2 class="text-lg font-semibold">Agendar cita</h2>

		<div class="mt-6">
			<h5 class="mb-3">Seleccionar cliente</h5>
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

			<div>
				<Calendar type="single" bind:valueTime class="rounded-md border" />
			</div>
		</div>
	</div>
</div>
