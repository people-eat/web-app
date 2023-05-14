import { type ReactElement } from 'react';
import { Icon } from '../icon/Icon';
import PEIcon from '../icon/PEIcon';
import { type PECounterProps } from './PECounterProps';

export default function PECounter({ value, onValueChange }: PECounterProps): ReactElement {
    function handleIncreaseCount(): void {
        onValueChange(value + 1);
    }

    function handleDecreaseCount(): void {
        if (value - 1 >= 0) onValueChange(value - 1);
    }

    return (
        <section className="flex flex-row gap-3 w-[130px] justify-between">
            <section
                onClick={handleDecreaseCount}
                className={'flex active:opacity-70 justify-center items-center bg-base w-10 h-10 rounded-3'}
            >
                <PEIcon icon={Icon.minus} />
            </section>
            <section className={'flex justify-center items-center min-w-3'}>{value}</section>
            <section
                onClick={handleIncreaseCount}
                className={'flex active:opacity-70 justify-center items-center bg-base w-10 h-10 rounded-3'}
            >
                <PEIcon icon={Icon.plus} />
            </section>
        </section>
    );
}
