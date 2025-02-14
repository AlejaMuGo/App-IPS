import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { Rol } from '$lib/types/profesional';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData();
		const username = formData.get('username') as string;
		const password = formData.get('password') as string;

		const users: Record<string, { password: string; role: Rol }> = {
			medica: { password: 'medica123', role: Rol.MEDICA_ESTETICA },
			cosmetologa: { password: 'cosmeto123', role: Rol.COSMETOLOGA }
		};

		if (!users[username] || users[username].password !== password) {
			return fail(401, { message: 'Usuario o contraseña incorrectos' });
		}

		cookies.set('session', JSON.stringify({ user: username, role: users[username].role }), {
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 60 * 60 * 24
		});

		throw redirect(303, '/citas');
	}
};




