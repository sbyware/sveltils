export const clickoutside = (node: HTMLElement, extraNodes?: HTMLElement[]): { destroy(): void } => {
	const handleClick = (e: MouseEvent) => {
		let outsideExtraNodes = true;

		if (extraNodes?.length) {
			extraNodes.map((extraNode) => {
				if (extraNode && extraNode?.contains(e.target as Node)) {
					outsideExtraNodes = false;
				}
			});
		}

		if (!outsideExtraNodes) return;

		if (!node?.contains(e.target as Node)) node.dispatchEvent(new CustomEvent("clickoutside"));
	};

	document.addEventListener("click", handleClick, true);
	document.addEventListener("contextmenu", handleClick, true);

	return {
		destroy() {
			document.removeEventListener("click", handleClick, true);
		}
	};
};

type ModifierKey = "shift" | "ctrl" | "alt";
export const modifierkey = (node: HTMLElement, key: ModifierKey) => {
	let parsedKey: "Shift" | "Control" | "Alt";

	switch (key) {
		case "shift":
			parsedKey = "Shift";
			break;
		case "ctrl":
			parsedKey = "Control";
			break;
		case "alt":
			parsedKey = "Alt";
			break;
		default:
			throw new Error("Invalid modifier key");
	}

	let modifierOn = false;

	const handleKeydown = (e: KeyboardEvent) => (modifierOn = e.key === key);
	const handleKeyup = (e: KeyboardEvent) => (modifierOn = !e.key === key);

	document.addEventListener("keydown", handleKeydown, true);
	document.addEventListener("keyup", handleKeyup, true);

	return {
		update(newKey: ModifierKey): void {
			key = newKey;
		},
		destroy(): void {
			document.removeEventListener("keydown", handleKeydown, true);
			document.removeEventListener("keyup", handleKeyup, true);
		},
	};
};

export const escape = (node: HTMLElement): { destroy(): void } => {
	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			node.dispatchEvent(new CustomEvent("escape"));
		}
	};

	document.addEventListener("keydown", handleKeydown, true);

	return {
		destroy() {
			document.removeEventListener("keydown", handleKeydown, true);
		},
	};
};

export const hover = (
	node: HTMLElement,
	hovering: boolean
): { update(newHovering: boolean): void; destroy(): void } => {
	const handleMouseEnter = () => (hovering = true);
	const handleMouseLeave = () => (hovering = false);

	document.addEventListener("mouseenter", handleMouseEnter);
	document.addEventListener("mouseleave", handleMouseLeave);

	return {
		update(newHovering) {
			hovering = newHovering;
		},
		destroy() {
			document.removeEventListener("mouseenter", handleMouseEnter);
			document.removeEventListener("mouseleave", handleMouseLeave);
		},
	};
};

export const enter = (node: HTMLElement): { destroy(): void } => {
	const handleKeydown = (e: KeyboardEvent) => {
		if (e.shiftKey || e.altKey || e.ctrlKey) return;
		if (e.key !== "Enter") return;
		e.preventDefault();
		e.stopPropagation();
		node.dispatchEvent(new CustomEvent("enter"));
	};

	document.addEventListener("keydown", handleKeydown, true);

	return {
		destroy() {
			document.removeEventListener("keydown", handleKeydown, true);
		},
	};
};

export interface LazyFocusEvent extends CustomEvent {
    detail: {
        focused: boolean;
    };
}

export const lazyfocus = (node: HTMLElement): { destroy(): void } => {
    const handleEnter = () => {
        node.dispatchEvent(
            new CustomEvent("lazyfocus", {
                detail: {
                    focused: true
                }
            }) as LazyFocusEvent
        );
    };

    const handleLeave = () => {
        node.dispatchEvent(
            new CustomEvent("lazyfocus", {
                detail: {
                    focused: false
                }
            }) as LazyFocusEvent
        );
    };

    node.addEventListener("mouseenter", handleEnter, true);
    node.addEventListener("mouseleave", handleLeave, true);

    return {
        destroy() {
            node.removeEventListener("mouseenter", handleEnter, true);
            node.removeEventListener("mouseleave", handleLeave, true);
        }
    };
};

export const mouseglow = (node: HTMLElement): { destroy(): void } => {
    let pos: { x: number, y: number } | null;
    let rect = node.getBoundingClientRect();

    node.addEventListener("mouseenter", (e: MouseEvent) => {
        pos = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
        node.style.setProperty("--c", "rgb(255, 255, 255, 0.03)");
    });
    node.addEventListener("mousemove", (e: MouseEvent) => {
        pos = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
        node.style.setProperty("--x", pos.x + "px");
        node.style.setProperty("--y", pos.y + "px");
        node.style.setProperty("background", `var(--c) radial-gradient(circle at var(--x) var(--y), rgba(217, 177, 248, 0.15) 0%,rgba(79, 20, 204, 0) calc(0% + 15rem)) no-repeat scroll 0% 0% border-box`);
    });
    node.addEventListener("mouseleave", () => {
        node.style.removeProperty("--x");
        node.style.removeProperty("--y");
        node.style.removeProperty("background");
    });

    return {
        destroy() {
            node.removeEventListener("mouseenter", () => { });
            node.removeEventListener("mousemove", () => { });
            node.removeEventListener("mouseleave", () => { });
            node.style.removeProperty("--c");
            node.style.removeProperty("--x");
            node.style.removeProperty("--y");
        }
    };
};