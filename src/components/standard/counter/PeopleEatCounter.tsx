import { useState, type ReactElement } from 'react';
import { Icon } from '~/components/standard/icon/Icon';
import PeopleEatIcon from '~/components/standard/icon/PeopleEatIcon';

export default function PeopleEatCounter(): ReactElement {
    const [count, setCount] = useState(0);

    function handleIncreaseCount(): void {
        setCount(count + 1);
    }

    function handleDecreaseCount(): void {
        if (count - 1 >= 0) setCount(count - 1);
    }

    return (
        <section className="flex flex-row gap-3">
            <section
                onClick={handleDecreaseCount}
                className={'flex active:opacity-70 justify-center items-center bg-base w-10 h-10 rounded-3'}
            >
                <PeopleEatIcon icon={Icon.minus} />
            </section>
            <section className={'flex justify-center items-center min-w-3'}>{count}</section>
            <section
                onClick={handleIncreaseCount}
                className={'flex active:opacity-70 justify-center items-center bg-base w-10 h-10 rounded-3'}
            >
                <PeopleEatIcon icon={Icon.plus} />
            </section>
        </section>
    );
}
