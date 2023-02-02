import Tooltip from "./Tooltip.svelte";
import type { SvelteComponent } from "svelte";

export const tooltip = (node: HTMLElement) => {
    const CURRENT_POSITION_STYLE = node.style.position;
    let component: SvelteComponent | null = null;
    let opened = false;
    let destroyed = false;

    const getPosition = () => {
        const rect = node.getBoundingClientRect();
        const top = rect.top;
        const left = rect.left;
        const right = window.innerWidth - rect.right;
        const bottom = window.innerHeight - rect.bottom;
        const space = Math.max(top, left, right, bottom);
        if (space === top) return "top";
        if (space === left) return "left";
        if (space === right) return "right";
        if (space === bottom) return "bottom";
    };

    const text = node.dataset.tooltip;
    const position = node.dataset.tooltipPosition || getPosition();
    const delay = node.dataset.tooltipDelay || 0;

    const attach = () => {
        if (node.hasAttribute("disabled")) return;

        if (!opened && text) {
            if (CURRENT_POSITION_STYLE !== "absolute" && CURRENT_POSITION_STYLE !== "fixed") {
                node.style.position = "relative";
            }

            component = new Tooltip({
                target: node,
                props: {
                    text,
                    position,
                    delay,
                },
                intro: true
            });
            destroyed = false;
            component.$on("close", detach);
        }
        opened = true;
    };

    const detach = () => {
        if (!destroyed && component) {
            node.style.position = CURRENT_POSITION_STYLE;
            component.$destroy();
            destroyed = true;
        }
    };

    const handleClickAndLeave = () => {
        detach();
        opened = false;
    };

    node.addEventListener("focusin", attach);
    node.addEventListener("focusout", handleClickAndLeave);

    node.addEventListener("mouseenter", attach);
    node.addEventListener("mouseleave", handleClickAndLeave);

    node.addEventListener("touchstart", attach);
    node.addEventListener("touchend", handleClickAndLeave);

    node.addEventListener("click", handleClickAndLeave);

    return {
        destroy() {
            node.removeEventListener("mouseenter", attach);
            node.removeEventListener("mouseleave", handleClickAndLeave);
            node.removeEventListener("focusin", attach);
            node.removeEventListener("focusout", handleClickAndLeave);
            node.removeEventListener("click", handleClickAndLeave);
        }
    };
};
