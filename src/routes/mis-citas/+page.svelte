<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import VistaSemanal from '$lib/components/layout/Calendario/VistaSemanal.svelte';
	import VistaMensual from '$lib/components/layout/Calendario/VistaMensual.svelte';
	import VistaDiaria from '$lib/components/layout/Calendario/VistaDiaria.svelte';
	import type { PageData } from './$types';
    import { citaStore } from '$lib/stores/citas.svelte';
    import { DatabaseController } from '$lib/services/db';
    import type { Evento } from '$lib/types/calendario';
    import type { Cita } from '$lib/types/cita';
    

    let { data }: { data: PageData } = $props();
	const storeCitas = new citaStore(data.citas);
	const db = new DatabaseController();
    
    // Definir un tipo para las claves de serviceColors
    type ServiceId = keyof typeof serviceColors;

    // Mapeo de id de servicio a colores
    const serviceColors = {
        2: "bg-purple-100", // Técnica de Micropigmentación
        3: "bg-violet-100", // Tratamiento de Rejuvenecimiento
        4: "bg-teal-100",   // Tratamiento Facial
        5: "bg-fuchsia-100", // Tratamiento Corporal Médico
        6: "bg-pink-100",   // Tratamiento Corporal Cosmetológico
    } as const;

    // Convertir las citas a eventos
    const eventos: Evento<Cita>[] = storeCitas.citas.map(cita => {
        // Asegurar que cita.service.id sea una clave válida de serviceColors
        const serviceId = cita.service?.id as ServiceId;
        const color = serviceColors[serviceId] || "bg-gray-100"; // Color por defecto

        return {
            title: `${cita.service?.nombre} con ${cita.client.nombre}`,
            fecha: `${cita.date}`,
            inicio: `${cita.start_time}`,
            final: `${cita.end_time}`,
            color: color, // Asignar color basado en el id del servicio
            data: cita,
        };
    });

    // Filtrar citas por profesional seleccionado
    let valueProfesional = $state(''); // ID del profesional seleccionado

    const citasFiltradas = $derived(
        valueProfesional
            ? eventos.filter(cita => cita.data.profesional.documento === valueProfesional)
            : eventos // Si no hay profesional seleccionado, mostrar todas las citas
    );

    type Vista = 'semanal' | 'mensual' | 'diaria'; // Restringimos las opciones

    // Opciones de vistas del calendario
    const opcionesVistas = [
        { value: 'semanal', label: 'Semanal' },
        { value: 'mensual', label: 'Mensual' },
        { value: 'diaria', label: 'Diaria' }
    ];

    let valueCalendario = $state<Vista>('semanal'); // Tipo restringido
    const triggerContentVista = $derived(
        opcionesVistas.find((f) => f.value === valueCalendario)?.label || 'Selecciona la vista'
    );

    const profesionales = $state(data.profesionales);

    type OpcionSelect = {
        value: string;
        label: string;
    };

    // Agregar la opción "Todos los profesionales"
    const opcionesProfesionales: OpcionSelect[] = [
        { value: '', label: 'Todos los profesionales' }, // Valor vacío para mostrar todas las citas
        ...profesionales.map(profesional => ({
            value: profesional.documento,
            label: profesional.nombre
        }))
    ];

    const triggerContentProfesional = $derived(
        opcionesProfesionales.find((f) => f.value === valueProfesional)?.label ??
            'Selecciona un profesional'
    );
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
								<Select.Item value={profesional.value} label={profesional.label}
									>{profesional.label}</Select.Item
								>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
			<!-- Select de Vista del Calendario -->
			<div class="flex justify-end">
				<Select.Root type="single" name="seleccionarVista" bind:value={valueCalendario}>
					<Select.Trigger class="w-full">
						{triggerContentVista}
					</Select.Trigger>
					<Select.Content>
						<Select.Group>
							<Select.GroupHeading>Vistas</Select.GroupHeading>
							{#each opcionesVistas as vista}
								<Select.Item value={vista.value} label={vista.label}>{vista.label}</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
		</div>

		<!-- Renderiza el componente según la vista seleccionada -->
		<div>
            {#if valueCalendario === 'mensual'}
                <VistaMensual eventos={citasFiltradas} />
            {/if}
            {#if valueCalendario === 'semanal'}
                <VistaSemanal eventos={citasFiltradas} />
            {/if}
            {#if valueCalendario === 'diaria'}
                <VistaDiaria eventos={citasFiltradas} />
            {/if}
        </div>
	</div>
</main>