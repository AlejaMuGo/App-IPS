<script lang="ts">
    import { Button } from '$lib/components/ui/button/index.js';
    import { getLocalTimeZone, today, CalendarDate } from "@internationalized/date";
    import type { Evento } from '$lib/types/calendario';
    import * as Dialog from '$lib/components/ui/dialog/index.js';

    type Props = {
        eventos: Evento[];
    };

    const { eventos }: Props = $props();

    const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    const timeZone = getLocalTimeZone();

    let currentDate = today(timeZone);
    let startOfWeek = currentDate.subtract({ days: currentDate.toDate(timeZone).getDay() });

    function getWeekDates(): CalendarDate[] {
        return Array.from({ length: 7 }, (_, i) => startOfWeek.add({ days: i }));
    }

    let weekDates = $state(getWeekDates());
    let todayDate = today(timeZone); // Fecha actual para comparar

    function changeWeek(offset: number) {
        startOfWeek = startOfWeek.add({ days: offset * 7 });
        weekDates = getWeekDates();
    }

    function isToday(date: CalendarDate): boolean {
        return (
            date.day === todayDate.day &&
            date.month === todayDate.month &&
            date.year === todayDate.year
        );
    }

    const hours = Array.from({ length: 10 }, (_, i) => `${i + 8}:00`);

    // Función para obtener las citas de un día y hora específicos
    function getCitasDelDiaYHora(date: CalendarDate, hour: string): Evento[] {
        const fecha = `${date.year}-${String(date.month).padStart(2, '0')}-${String(date.day).padStart(2, '0')}`;
        return eventos.filter(evento => evento.fecha === fecha && evento.inicio.startsWith(hour));
    }
</script>

<main>
    <div class="border border-gray-300 rounded-md">
        <div class="flex justify-between px-4 py-3">
            <Button onclick={() => changeWeek(-1)} class="text-black bg-white border border-gray-300 hover:bg-gray-200">
                Semana Anterior
            </Button>
            <h2 class="text-xl font-semibold">
                {months[weekDates[0].month - 1]} {weekDates[0].year}
            </h2>
            <Button onclick={() => changeWeek(1)} class="text-black bg-white border border-gray-300 hover:bg-gray-200">
                Siguiente Semana
            </Button>
        </div>

        <!-- Cabecera de los días -->
        <div class="grid grid-cols-8 border-t border-gray-300 text-center font-semibold">
            <div class="border-r border-gray-300"></div> <!-- Columna vacía para las horas -->
            {#each weekDates as date}
            <div class="border-r border-gray-300 px-2 py-2">
                <span class="{isToday(date) ? 'bg-indigo-200 px-3 py-1 rounded-full' : ''}">
                    {days[date.toDate(timeZone).getDay()]} {date.day}
                </span>
            </div>
            {/each}
        </div>

        <!-- Celdas del calendario -->
        <div class="grid grid-cols-8 border-gray-300">
            {#each hours as hour}
                <div class="border-r border-t border-gray-300 px-2 py-2 text-center font-semibold">{hour}</div>
                {#each weekDates as date}
                    <div class="border-r border-t border-gray-300 h-16 p-1">
                        {#each getCitasDelDiaYHora(date, hour) as cita}
                            <Dialog.Root>
                                <Dialog.Trigger>
                                    <div class={`text-xs ${cita.color} rounded px-1 mt-1`}>
                                        {cita.title}
                                    </div>
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
                    </div>
                {/each}
            {/each}
        </div>
    </div>
</main>