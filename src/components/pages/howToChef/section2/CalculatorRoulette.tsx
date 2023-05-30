import anime from 'animejs';
import { useEffect, type ReactElement } from 'react';

interface CalculatorRouletteProps {
    startValue: string | number;
    endValue: string | number;
}

export function CalculatorRoulette({ startValue, endValue }: CalculatorRouletteProps): ReactElement {
    useEffect(() => {
        anime({
            targets: '.animeRouletteCount',
            innerHTML: [startValue, endValue],
            easing: 'linear',
            duration: 1000,
            round: 1,
        });
    }, [startValue, endValue]);

    return (
        <p className="absolute top-10 md:top-6 right-8 text-heading-xl md:text-text-m-bold my-0">
            <span className="animeRouletteCount" />€
        </p>
    );
}
