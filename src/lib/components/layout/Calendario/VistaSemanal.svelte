<script lang="ts">
    import { Button } from '$lib/components/ui/button/index.js';

    const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    const dates = [9, 10, 11, 12, 13, 14, 15]; // Suponiendo una semana de febrero 2025
    const hours = Array.from({ length: 10 }, (_, i) => `${i + 8}:00`); // Horas de 8 AM a 19 PM
</script>

<main>

    <div class="border border-gray-300 rounded-md">
        <div class="flex justify-between px-4 py-3">
            <Button class="text-black bg-white border border-gray-300 hover:bg-gray-200">Semana Anterior</Button>
            <h2 class="text-xl font-bold">Febrero 2025</h2>
            <Button class="text-black bg-white border border-gray-300 hover:bg-gray-200">Siguiente Semana</Button>
        </div>

        <!-- Cabecera de los días -->
        <div class="grid grid-cols-8 border-t border-gray-300 text-center font-semibold">
            <div class="border-r border-gray-300"></div> <!-- Columna vacía para las horas -->
            {#each days as day, i}
                <div class="border-r border-gray-300 px-2 py-2">{day} {dates[i]}</div>
            {/each}
        </div>

        <!-- Celdas del calendario -->
        <div class="grid grid-cols-8 border-gray-300">
            {#each hours as hour}
                <div class="border-r border-t border-gray-300 px-2 py-2 text-center font-semibold">{hour}</div>
                {#each days as _}
                    <div class="border-r border-t border-gray-300 h-16"></div>
                {/each}
            {/each}
        </div>
    </div>
</main>
