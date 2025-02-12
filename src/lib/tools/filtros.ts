import type { Cita } from '$lib/types/cita';
import type { OpcionesFiltroFecha } from '$lib/types/filtros';

export function citaCumpleFiltroEstado(
	cita: Cita,
	valorFiltro: 'confirmada' | 'noconfirmada' | ''
): boolean {
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
	const fechaCita = new Date(cita.date);

	if (valorfiltro === '') return true;

    if (valorfiltro === 'hoy') {
        if (fechaCita.toDateString() === hoy.toDateString()) {
            return true;
        } else {
            return false;
        }
    }

	if (valorfiltro === 'pasados') {
		if (fechaCita < hoy) {
            return true;
		} else {
            return false;
        }
	}
    if (valorfiltro === 'proximos') {
        if (fechaCita > hoy) {
            return true;
        } else {
            return false;
        }
    }

    return false;
}
