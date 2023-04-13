export function isEmail(value: string): boolean {
    const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{1,2}');

    return regex.test(value);
}
