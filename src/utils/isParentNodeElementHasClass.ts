export function isParentNodeElementHasClass(event: MouseEvent, targetClass: string): boolean {
    let element = event.target as HTMLElement;

    try {
        while (element && element.classList) {
            if (element.classList && element.classList?.contains(targetClass)) return true;
            element = element.parentNode as HTMLElement;
        }
    } catch (e) {
        console.error(e);
    }

    return false;
}
