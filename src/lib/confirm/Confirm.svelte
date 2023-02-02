<script lang="ts">
    import { confirmData, submitConfirm } from "./confirm";
    import { enter } from "../actions";
    
    const handleEnter = () => {
        if ($confirmData) submitConfirm(true);
    }

    $: confirmVisible = !!($confirmData);
</script>

<svelte:window on:enter={handleEnter} use:enter/>

<!-- TODO -->