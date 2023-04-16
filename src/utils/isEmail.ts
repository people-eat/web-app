import Validator from 'validatorjs';

export function isEmail(value: string): boolean {
    const data = {
        email: value,
    };

    const rules = {
        email: 'required|email',
    };

    const validationEmail = new Validator(data, rules);

    return Boolean(validationEmail.passes());
}
