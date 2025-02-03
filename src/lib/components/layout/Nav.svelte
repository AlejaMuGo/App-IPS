<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<div class="flex items-center justify-between bg-indigo-100 px-12 py-6">
	<div class="flex items-center gap-6">
		<h1>Sistema gestion</h1>

		<div class="flex items-center gap-2">
			<Button href="/clientes" variant="secondary">Gestion clientes</Button>
			<Button variant="secondary">Gestion profesionales</Button>
		</div>
	</div>
	<div>
		<Avatar.Root>
			<Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
			<Avatar.Fallback>CN</Avatar.Fallback>
		</Avatar.Root>
	</div>
</div>
