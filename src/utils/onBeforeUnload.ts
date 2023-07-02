export function onBeforeUnload(changes: boolean, message: string): boolean {
    if (changes) {
        // eslint-disable-next-line no-alert
        return confirm(message);
    }

    return true;
}
