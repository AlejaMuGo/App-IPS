import type { PageServerLoad } from './$types';
import { DatabaseController } from '$lib/services/db';
import type { Client } from '$lib/types/client';
import type { Profesional } from '$lib/types/profesional';

export const load = (async () => {
	const databaseController = new DatabaseController();
	const clientes: Client[] = await databaseController.getClientes();
	const profesionales: Profesional[] = await databaseController.getProfesionales();

	return {
		clientes: clientes,
		profesionales: profesionales
	};
}) satisfies PageServerLoad;
