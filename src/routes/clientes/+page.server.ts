import type { PageServerLoad } from './$types';
import { DatabaseController } from '$lib/services/db';
import type { Client } from '$lib/types/client';

export const load = (async () => {

    const databaseController = new DatabaseController();
    const clientes: Client[] = await databaseController.getClientes(); 

    return {
        clientes: clientes
    };
}) satisfies PageServerLoad;