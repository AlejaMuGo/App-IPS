<script lang="ts">
    import { Button } from '$lib/components/ui/button/index.js';
    import type { Evento } from '$lib/types/calendario';
    import * as Dialog from '$lib/components/ui/dialog/index.js';

    type Props = {
        eventos: Evento[];
    };

    const { eventos }: Props = $props();

    const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const hours = Array.from({ length: 10 }, (_, i) => `${i + 8}:00`);

    let currentDate = $state(new Date(2025, 1, 14)); // Inicializado en Viernes 14 de Febrero de 2025
    let today = new Date(); // Fecha actual

    function changeDay(offset: number) {
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + offset);
    }

    function isToday() {
        return (
            currentDate.getDate() === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear()
        );
    }

    // Función para obtener las citas de un día y hora específicos
    function getCitasDelDiaYHora(hour: string): Evento[] {
        const fecha = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;
        return eventos.filter(evento => evento.fecha === fecha && evento.inicio.startsWith(hour));
    }
</script>

<main>
    <div class="border border-gray-300 rounded-md">
        <div class="flex justify-between px-4 py-3">
            <Button onclick={() => changeDay(-1)} class="text-black bg-white border border-gray-300 hover:bg-gray-200">
                Día Anterior
            </Button>
            <h2 class="text-xl font-semibold">
                <span class="{isToday() ? 'text-indigo-600' : ''}">
                    {daysOfWeek[currentDate.getDay()]} {currentDate.getDate()} de {months[currentDate.getMonth()]} {currentDate.getFullYear()}
                </span>
            </h2>
            <Button onclick={() => changeDay(1)} class="text-black bg-white border border-gray-300 hover:bg-gray-200">
                Siguiente Día
            </Button>
        </div>

        <!-- Contenedor de la vista diaria -->
        <div class="grid grid-cols-1 border-t border-gray-300">
            {#each hours as hour}
                <div class="relative px-8  border-t border-gray-300 h-24 flex flex-row">
                    <span class="py-5 px-4 text-sm">{hour}</span>
                    
                    <span class="flex gap-x-4 py-5 px-4 text-base">
                        {#each getCitasDelDiaYHora(hour) as cita}
                        <Dialog.Root>
                            <Dialog.Trigger class={`${cita.color} rounded-md p-4  `}>
                                    {cita.title}
                            </Dialog.Trigger>
                            <Dialog.Content>
                                <Dialog.Header>
                                    <Dialog.Title>Detalles de la Cita</Dialog.Title>
                                    <Dialog.Description>
                                        <div class="flex flex-col py-2 gap-2 text-black text-base">
                                            <div class="flex flex-row gap-2">
                                                <h1 class="font-bold">Procedimiento: </h1>
                                                <h2>{cita.data.service.nombre}</h2>
                                            </div>
                                            <div class="flex flex-row gap-2">
                                                <h1 class="font-bold">Cliente: </h1>
                                                <h2>{cita.data.client.nombre}</h2>
                                            </div>
                                            <div class="flex flex-row gap-2">
                                                <h1 class="font-bold">Fecha: </h1>
                                                <h2>{cita.fecha}</h2>
                                            </div>
                                            <div class="flex flex-row gap-2">
                                                <h1 class="font-bold">Hora: </h1>
                                                <h2>{cita.inicio} - {cita.final}</h2>
                                            </div>
                                        </div>
                                    </Dialog.Description>
                                </Dialog.Header>
                            </Dialog.Content>
                        </Dialog.Root>
                    {/each}
                    </span>
                    
                </div>
            {/each}
        </div>
    </div>
</main>