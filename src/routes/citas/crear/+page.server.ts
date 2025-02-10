import type { PageServerLoad } from './$types';
import { DatabaseController } from '$lib/services/db';

export const load = (async () => {
    const db = new DatabaseController();
    const clientes = await db.getClientes();
    const profesionales = await db.getProfesionales();
    const servicios = await db.getServices();
    
    return {
        clientes: clientes,
        profesionales: profesionales,
        servicios: servicios
    };

}) satisfies PageServerLoad;