export type KeyboardShortcut = {
	key: string;
	ctrlKey: boolean;
	altKey: boolean;
	shiftKey: boolean;
	condition?: boolean;
	action: () => void;
}

export type EventHandler<EventType, HandlerData> = (event: EventType, data: HandlerData) => void;

export const handleKeydown: EventHandler<KeyboardEvent, KeyboardShortcut[]> = (event, shortcuts) => {
	shortcuts.forEach((shortcut) => {
		if (shortcut.condition === false) return;
		if (
			event.key === shortcut.key &&
			event.ctrlKey === shortcut.ctrlKey &&
			event.altKey === shortcut.altKey &&
			event.shiftKey === shortcut.shiftKey
		) {
			event.preventDefault();
			shortcut.action();
		}
	});
};
