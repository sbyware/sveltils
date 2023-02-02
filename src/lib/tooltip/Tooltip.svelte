<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { fly } from "svelte/transition";
    import type { TooltipPosition } from "./types";
    
    export let title: string | undefined = undefined;
    export let text: string;
    export let position: TooltipPosition = "top";
    export let delay: number | undefined = undefined;
    
    const dispatch = createEventDispatcher();
    const dispatchCloseEvent = () => dispatch("close");
    
    const FLY_PARAMS = {
        x: position === "left" ? 5 : position === "right" ? -5 : 0,
        y: position === "top" ? 5 : position === "bottom" ? -5 : 0,
        duration: 100,
        delay: delay ?? 0,
    }
</script>

{#if text}
    <span
        class="tooltip {position}"
        on:mousemove={dispatchCloseEvent}
        transition:fly={FLY_PARAMS}
    >
        {#if title}
            <span class="tooltip__title">{title}</span>
        {/if}
        {@html text}
    </span>
{/if}

<style>
    .tooltip {
        display: flex;
        flex-direction: column;
        gap: 0.8rem;
        font-size: var(--fs-xs);
        position: absolute;
        z-index: 9999;
        width: max-content;
        max-width: 200px;
        max-height: 300px;
        padding: 0.8rem;
        border-radius: var(--br-more);
        background: #544d4d;
        user-select: none;
        color: white;
    }

    .tooltip__title {
        font-weight: var(--fw-semibold);
        color: white;
    }
    
    .tooltip.top {
        bottom: 130%;
        left: 50%;
        transform: translateX(-50%);
    }
    
    .tooltip.bottom {
        top: 130%;
        left: 50%;
        transform: translateX(-50%);
    }
    
    .tooltip.left {
        top: 50%;
        right: 130%;
        transform: translateY(-50%);
    }
    
    .tooltip.right {
        top: 50%;
        left: 130%;
        transform: translateY(-50%);
    }

</style>