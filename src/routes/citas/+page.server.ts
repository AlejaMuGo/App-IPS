import type { PageServerLoad } from './$types';
import { DatabaseController } from '$lib/services/db';
export const load = (async () => {
    const db = new DatabaseController();
    const clientes = await db.getClientes();
    
    return {
        clientes: clientes
    };
}) satisfies PageServerLoad;