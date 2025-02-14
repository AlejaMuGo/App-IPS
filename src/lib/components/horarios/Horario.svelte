<script lang="ts">
    type Props = {
        hora: string;
    };

    const { hora }: Props = $props();
</script>

<div>
    { hora }
</div>