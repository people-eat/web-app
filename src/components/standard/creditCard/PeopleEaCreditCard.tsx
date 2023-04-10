import classNames from 'classnames';
import Image from 'next/image';
import { type ReactElement } from 'react';
import { Icon } from '~/components/standard/icon/Icon';
import PeopleEatIcon from '~/components/standard/icon/PeopleEatIcon';

interface IPeopleEatCreditCardProps {
    disabled?: boolean;
    label: string;
    number: string;
}

export default function PeopleEatCreditCard({ disabled, label, number }: IPeopleEatCreditCardProps): ReactElement {
    const className = classNames(
        'max-w-[400px] box-border hover:opacity-70 cursor-pointer border border-solid rounded-3 border-border flex flex-row gap-3 items-center justify-between px-4 py-3',
        { ['opacity-50 hover:opacity-50']: disabled },
    );

    return (
        <section className={className}>
            <section className="flex flex-row items-center gap-2">
                <Image src={'/MasterCard.png'} alt={'MasterCard'} width={36} height={22} />
                <span className="text-text-sm">{label}</span>
                <span className="text-text-sm">{number}</span>
            </section>
            <PeopleEatIcon icon={Icon.close} />
        </section>
    );
}
