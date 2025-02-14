import type { Cita } from '$lib/types/cita';
import type { OpcionesFiltroEstado, OpcionesFiltroFecha } from '$lib/types/filtros';


export function citaCumpleFiltroEstado(
	cita: Cita, valorFiltro: OpcionesFiltroEstado): boolean {
	if (valorFiltro === '') return true;

	const valueEstado = valorFiltro === 'confirmada' ? true : false;
	if (cita.confirmed === valueEstado) {
		return true;
	} else {
		return false;
	}
}

export function citaCumpleFiltroFecha(cita: Cita, valorfiltro: OpcionesFiltroFecha): boolean {
    const hoy = new Date();
    hoy.setHours(0, 0, 0, 0); // Reiniciamos la hora de hoy a medianoche

    const fechaCita = new Date(cita.date);
    fechaCita.setHours(fechaCita.getHours() + 5); // Ajustamos la diferencia horaria de UTC-5
    fechaCita.setHours(0, 0, 0, 0); // Reiniciamos la hora de la cita a medianoche
    if (valorfiltro === '') return true;

    switch (valorfiltro) {
        case 'hoy':
            return fechaCita.getTime() === hoy.getTime();
        case 'pasados':
            return fechaCita.getTime() < hoy.getTime();
        case 'proximos':
            return fechaCita.getTime() > hoy.getTime();
        default:
            return false;
    }
}

