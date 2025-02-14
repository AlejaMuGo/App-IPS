<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<main class="flex flex-col items-center justify-center min-h-screen">
	<div class="max-w-md w-full space-y-8 p-10 bg-white shadow-lg rounded-lg">
		<h2 class="text-2xl font-bold text-center">Iniciar Sesión</h2>

		<!-- Formulario que enviará los datos automáticamente -->
		<form method="POST">
			<div>
				<h1>Usuario</h1>
				<Input class="w-full" placeholder="Ingrese su usuario" name="username" required />
			</div>
			<div>
				<h1>Contraseña</h1>
				<Input type="password" class="w-full" placeholder="Ingrese su contraseña" name="password" required />
			</div>
            <Button 
            class="w-full py-3 mt-6 text-lg font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
            type="submit"
            >
                Iniciar Sesión
            </Button>
        
		</form>
	</div>
</main>

