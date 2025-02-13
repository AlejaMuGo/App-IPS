<script lang="ts">
    import { Button } from '$lib/components/ui/button/index.js';
    import VistaSemanal from '$lib/components/layout/Calendario/VistaSemanal.svelte';
	import * as Select from '$lib/components/ui/select/index.js';
    import type { PageData } from './$types';
	import { getLocalTimeZone, today } from '@internationalized/date';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import { Rol, type Profesional } from '$lib/types/profesional';
	import { RolToDisplay } from '$lib/types/profesional';

	let { data }: { data: PageData } = $props();
    const clientes = $state(data.clientes);
	const profesionales = $state(data.profesionales);
	const servicios = $state(data.servicios);

	type OpcionSelect = {
		value: string;
		label: string;
	};

	const opcionesProfesionales: OpcionSelect[] = [];
	for (const profesional of profesionales) {
		const opcion = {
			value: profesional.documento,
			label: profesional.nombre
		};
		opcionesProfesionales.push(opcion);
	}
	let valueProfesional = $state('');

	const triggerContentProfesional = $derived(
		opcionesProfesionales.find((f) => f.value === valueProfesional)?.label ?? 'Selecciona un profesional'
	);

	const opcionesServicios: OpcionSelect[] = [];
	for (const servicio of servicios) {
		const opcion = {
			value: servicio.value,
			label: servicio.nombre
		};
		opcionesServicios.push(opcion);
	}

	let valueServicio = $state('');

	const triggerContentServicio = $derived(
		opcionesServicios.find((serviceOption) => serviceOption.value === valueServicio)?.label ??
			'Selecciona un servicio'
	);

	let valueTime = $state(today(getLocalTimeZone()));

	let profesionalSeleccionado = $state('');
	function seleccionarProfesional(documento: string) {
		profesionalSeleccionado = documento;
	}
</script>

<main class="flex flex-col gap-12 px-12 py-12">

    <div class="flex justify-between px-2">
        <div class="space-y-4">
            <h2 class="text-3xl font-bold">Calendario de mis citas</h2>
            <div class="h-1.5 w-60 bg-indigo-500"></div>
        </div>
    </div>

    <div class="grid gap-y-4">

        <div class="flex justify-between">
            
            <div>
                <Select.Root type="single" name="seleccionarProfesional" bind:value={valueProfesional}>
                    <Select.Trigger class="w-full">
                        {triggerContentProfesional}
                    </Select.Trigger>
                    <Select.Content>
                        <Select.Group>
                            <Select.GroupHeading>Profesionales</Select.GroupHeading>
                            {#each opcionesProfesionales as profesional}
                                <Select.Item value={profesional.value} label={profesional.label}>{profesional.label}</Select.Item>
                            {/each}
                        </Select.Group>
                    </Select.Content>
                </Select.Root>
            </div>

            <div class="justify-right">
                <Button class="text-black border border-gray-300 bg-white hover:bg-indigo-500 hover:border-indigo-500 hover:text-white">Semanal</Button>
                <Button class="text-black border border-gray-300 bg-white hover:bg-indigo-500 hover:border-indigo-500 hover:text-white">Mensual</Button>
            </div>

        </div>

        <div><VistaSemanal></VistaSemanal></div>
   </div>
     
</main>
