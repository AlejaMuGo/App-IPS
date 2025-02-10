import { supabase } from '$lib/services/supabase';
import type { Client } from '$lib/types/client';
import type { Profesional } from '$lib/types/profesional';
import type { Service } from '$lib/types/service';
import type { Cita } from '$lib/types/cita';

export class DatabaseController {
	async createClient(client: Client): Promise<Client | null> {
		const { data, error } = await supabase.from('client').insert([client]).select();

		if (error !== null) {
			console.log(error);
			return null;
		}

		if (data === null || data.length === 0) {
			return null;
		}

		return data[0] as Client;
	}

	async createProfesional(profesional: Profesional): Promise<Profesional | null> {
		const { data, error } = await supabase.from('profesional').insert([profesional]).select();

		if (error !== null) {
			console.log(error);
			return null;
		}

		if (data === null || data.length === 0) {
			return null;
		}

		return data[0] as Profesional;
	}

	async getClientes(): Promise<Client[]> {
		let { data: clients, error } = await supabase.from('client').select('*');
		return clients as Client[];
	}

	async getProfesionales(): Promise<Profesional[]> {
		let { data: profesionals, error } = await supabase.from('profesional').select('*');
		return profesionals as Profesional[];
	}

	async updateClient(id: number, client: Partial<Client>): Promise<Client | null> {
		const { data, error } = await supabase.from('client').update(client).eq('id', id).select();

		if (error !== null) {
			console.log(error);
			return null;
		}

		if (data === null || data.length === 0) {
			return null;
		}

		return data[0] as Client;
	}

	async updateProfesional(id: number, profesional: Partial<Profesional>): Promise<Profesional | null> {
		const { data, error } = await supabase.from('profesional').update(profesional).eq('id', id).select();

		if (error !== null) {
			console.log(error);
			return null;
		}

		if (data === null || data.length === 0) {
			return null;
		}

		return data[0] as Profesional;
	}
	
	async deleteProfesional(id: number): Promise<boolean> {
		const { error } = await supabase.from('profesional').delete().eq('id', id)
		if (error !== null) {
			console.log(error);
			return false;
		}

		return true
	}

	async getServices(): Promise<Service[]> {
		let { data: services, error } = await supabase.from('service').select('*');
		return services as Service[];
	}
	
	async getCitas(): Promise<Cita[]> {
		let { data: citas, error } = await supabase.from('appointment').select(`*, client (*), service (*), profesional (*)`)
		return citas as Cita[];
	}

	async getCitasByProfesional(id: number): Promise<Cita[]> {
		let { data: citas, error } = await supabase.from('appointment').select(`*, client (*), service (*), profesional (*)`).eq('profesional', id)
		return citas as Cita[];
	}
}
