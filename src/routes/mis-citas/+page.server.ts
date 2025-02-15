import type { PageServerLoad } from './$types';
import { DatabaseController } from '$lib/services/db';
import type { Cita } from '$lib/types/cita';

export const load = (async () => {
    const db = new DatabaseController();
    const clientes = await db.getClientes();
    const profesionales = await db.getProfesionales();
    const servicios = await db.getServices();
    const citas: Cita[] = await db.getCitas();
    
    return {
        clientes: clientes,
        profesionales: profesionales,
        servicios: servicios,
        citas: citas
    };

}) satisfies PageServerLoad;