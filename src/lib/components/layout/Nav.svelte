<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<div class="flex items-center justify-between bg-indigo-100 px-12 py-3">
	<div class="flex items-center gap-10">
		<a href="/afrodita"
			><div
				class="flex items-center justify-between gap-2 transition duration-150 ease-in-out hover:-translate-y-1 hover:scale-105"
			>
				<img
					src="src/lib/components/layout/images/logo afrodita.png"
					alt=""
					style="width: 35px; height: 35px"
				/>
				<h1 class="text-lg font-bold">Afrodita</h1>
			</div>
		</a>

		<div class="flex items-center gap-8">
			<a href="/clientes" class="text-s hover:text-indigo-500">Gestión clientes</a>
			<a href="/profesionales" class="text-s hover:text-indigo-500">Gestión profesionales</a>
			<a href="/citas" class="text-s hover:text-indigo-500">Gestión citas</a>
			<a href="/mis-horarios" class="text-s hover:text-indigo-500">Mis horarios</a>
			<a href="/mis-citas" class="text-s hover:text-indigo-500">Mis citas</a>
		</div>
	</div>
	<div>
		<Avatar.Root>
			<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
	</div>
</div>
