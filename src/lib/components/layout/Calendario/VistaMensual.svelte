<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import type { Evento } from '$lib/types/calendario';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
    import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";

	type Props = {
		eventos: Evento[];
	};

	const { eventos }: Props = $props();

	const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
	const months = [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre'
	];

	let currentDate = new Date();
	const today = new Date();

	function getMonthDays(year: number, month: number) {
		let firstDay = new Date(year, month, 1).getDay();
		let totalDays = new Date(year, month + 1, 0).getDate();

		let daysArray = Array(42).fill(null);
		for (let i = 0; i < totalDays; i++) {
			daysArray[firstDay + i] = i + 1;
		}
		return daysArray;
	}

	// Inicializar daysArray
	let daysArray = $state(getMonthDays(currentDate.getFullYear(), currentDate.getMonth()));

	function changeMonth(offset: number) {
		// Actualizar currentDate
		currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
		// Actualizar daysArray directamente
		daysArray = getMonthDays(currentDate.getFullYear(), currentDate.getMonth());
	}

	// Derivar el mes y el año actuales
	const currentMonth = $derived(months[currentDate.getMonth()]);
	const currentYear = $derived(currentDate.getFullYear());

	// Función para obtener las citas de un día específico
	function getCitasDelDia(day: number): Evento[] {
		const fecha = `${currentYear}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
		return eventos.filter((evento) => evento.fecha.startsWith(fecha));
	}
</script>

<main>
	<div class="rounded-md border border-gray-300">
		<div class="flex justify-between px-4 py-3">
			<Button
				onclick={() => changeMonth(-1)}
				class="border border-gray-300 bg-white text-black hover:bg-gray-200"
			>
				Mes Anterior
			</Button>
			<h2 class="text-xl font-bold">{currentMonth} {currentYear}</h2>
			<Button
				onclick={() => changeMonth(1)}
				class="border border-gray-300 bg-white text-black hover:bg-gray-200"
			>
				Siguiente Mes
			</Button>
		</div>

		<!-- Cabecera de los días -->
		<div class="grid grid-cols-7 border-t border-gray-300 text-center font-semibold">
			{#each days as day}
				<div class="border-r border-gray-300 px-4 py-2">{day}</div>
			{/each}
		</div>

		<!-- Celdas del calendario -->
        
		<div class="grid grid-cols-7 border-gray-300">
			{#each daysArray as day}
            
				<div
					class="relative flex h-24 items-start justify-start space-x-2 overflow-y-auto overflow-x-hidden border-r border-t border-gray-300 p-2 {day
						? ''
						: 'bg-gray-100'}"
				>
					{#if day !== null}
                        <span
							class="flex items-center justify-center text-center size-7 rounded-full text-sm font-semibold {day === today.getDate() &&
							currentYear === today.getFullYear() &&
							currentMonth === months[today.getMonth()]
								? 'bg-indigo-200'
								: ''}">
                                {day}
                            </span>
						

                        <ScrollArea>
                            <div class="flex w-full flex-col space-y-2">
                                <!-- Mostrar las citas del día -->
                                {#each getCitasDelDia(day) as cita}
                                    <Dialog.Root>
                                        <Dialog.Trigger
                                            class={`text-xs ${cita.color} elipsis truncate rounded p-3 text-start`}
                                        >
                                            <span>{cita.inicio}</span>
                                            <span>{cita.title}</span>
                                        </Dialog.Trigger>
                                        <Dialog.Content>
                                            <Dialog.Header>
                                                <Dialog.Title><div class="text-lg">Detalles de la Cita</div></Dialog.Title>
                                                <Dialog.Description>
                                                    <div class="flex flex-col gap-2 py-2 text-base text-black">
                                                        <div class="flex flex-row gap-2">
                                                            <h1 class="font-bold">Procedimiento:</h1>
                                                            <h2>{cita.data.service.nombre}</h2>
                                                        </div>
                                                        <div class="flex flex-row gap-2">
                                                            <h1 class="font-bold">Cliente:</h1>
                                                            <h2>{cita.data.client.nombre}</h2>
                                                        </div>
                                                        <div class="flex flex-row gap-2">
                                                            <h1 class="font-bold">Fecha:</h1>
                                                            <h2>{cita.fecha}</h2>
                                                        </div>
                                                        <div class="flex flex-row gap-2">
                                                            <h1 class="font-bold">Hora:</h1>
                                                            <h2>{cita.inicio} - {cita.final}</h2>
                                                        </div>
                                                    </div>
                                                </Dialog.Description>
                                            </Dialog.Header>
                                        </Dialog.Content>
                                    </Dialog.Root>
                                {/each}
                            </div>
                        </ScrollArea>

						
					{/if}
				</div>
			{/each}
		</div>
	</div>
    <ScrollArea class="h-[200px] w-[350px] rounded-md border p-4">
        Jokester began sneaking into the castle in the middle of the night and
        leaving jokes all over the place: under the king's pillow, in his soup, even
        in the royal toilet. The king was furious, but he couldn't seem to stop
        Jokester. And then, one day, the people of the kingdom discovered that the
        jokes left by Jokester were so funny that they couldn't help but laugh. And
        once they started laughing, they couldn't stop.
      </ScrollArea>
</main>
