import { sineInOut } from "svelte/easing";
import type { EasingFunction, TransitionConfig } from "svelte/transition";

interface TransitionParams {
    delay?: number;
    duration?: number;
    easing?: EasingFunction;
}

interface CircleParams extends TransitionParams {
    blur?: boolean,
    origin?: string
}

export const circle = (node: Element, params: CircleParams): TransitionConfig => {
    return {
        delay: params.delay || 0,
        duration: params.duration || 400,
        easing: params.easing || sineInOut,
        css: (t, u) => `
            clip-path: circle(${t * 150}% at ${params.origin || "center"});
            opacity: ${t + 0.2};
        `
    };
};

interface GrowShrinkParams extends TransitionParams {opacity: boolean;}

export const growShrink = (node: Element, params: GrowShrinkParams): TransitionConfig => {
    return {
        delay: params.delay || 0,
        duration: params.duration || 400,
        easing: params.easing || sineInOut,
        css: (t, u) => `
            ${params.opacity ? `opacity: ${t};` : ""}
            width: ${t};
        `
    };
};

interface TypewriterParams extends TransitionParams {speed?: number;}

export const typewriter = (node: Element, params: TypewriterParams): TransitionConfig => {
    const textNodes = _get_all_text_nodes(node);
    if (!textNodes.length) {
        throw new Error("This transition only works on elements with text nodes");
    }

    let totalLength = 0;
    const ranges = textNodes.map(textNode => {
        const range = [totalLength, totalLength + textNode.textContent.length];
        totalLength += textNode.textContent.length;
        const text = textNode.textContent;
        textNode.textContent = "";
        return { textNode, range, text };
    });

    let currentRangeIndex = 0;

    const _get_current_range = (i: number): any => {
        while (ranges[currentRangeIndex].range[1] < i && currentRangeIndex < ranges.length) {
            const { textNode, text } = ranges[currentRangeIndex];
            textNode.textContent = text;
            currentRangeIndex++;
        }
        return ranges[currentRangeIndex];
    };

    return {
        delay: params.delay || 0,
        duration: totalLength * (params.speed || 1),
        tick: (t: number) => {
            const progress = totalLength * t;
            const { textNode, range, text } = _get_current_range(progress);
            const [start, end] = range;
            const textLength = ((progress - start) / (end - start)) * text.length;
            textNode.textContent = text.slice(0, textLength);
        }
    };
};

const _get_all_text_nodes = (node: any): any[] => {
    if (node.nodeType === 3) return [node];
    if (node.hasChildNodes()) {
        const list: any[] = [];
        for (const child of node.childNodes) {
            _get_all_text_nodes(child).forEach(textNode => list.push(textNode));
        }
        return list;
    }
    return [];
};
