# Sveltils

Handy utilities for Svelte, including:
- `tooltip` action + `Tooltip` component
- `Confirm` component (with nice API for creating confirm dialogs)
- `Toast` component (with nice API for creating toast notifications)
- Actions for handling clickoutside, enter, escape, and more fun like `mouseglow`!
- Transitions, such as `growShrink`, `typewriter`, `circle` and more.
- Convenient handlers for various events, like `keydown` to handle keyboard shortcuts.
... and more!

## Installation

```bash
npm install sveltils
# or your favorite package manager
```

## Usage

```svelte
<script>
  import { tooltip, toast, mouseglow } from 'sveltils/tooltip';
  import { handleKeydown, type KeyboardShortcut } from 'sveltils/handlers';

  const SHORTCUTS: KeyboardShortcut[] = [
    {
        key: "Enter",
        ctrl: true,
        condition: something !== null,
        action: () => toast.error("Oh no!")
    },
    {
        key: "Enter",
        ctrl: true,
        condition: something === null,
        action: () => toast.success("Yay!")
    }
  ]
</script>

<svelte:window on:keydown={(e) => handleKeydown(e, SHORTCUTS)}>

<button 
    use:mouseglow 
    use:tooltip="Hello world!" 
    on:click={() => toast.success('Hello world!')}
    data-tooltip="Hi" 
    data-tooltip-position="left"
>
    Hover me!
</button>
```

## Documentation

See the [documentation](https://sveltils.sby051.live/) for more information.

## Contributing

Contributions are welcome! Please open an issue or PR if you have any ideas or suggestions.

## License

[MIT](https://choosealicense.com/licenses/mit/)

## Acknowledgements

- [Svelte](https://svelte.dev/)

