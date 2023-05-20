import classNames from 'classnames';
import Image from 'next/image';
import { type ReactElement } from 'react';
import { Icon } from '../icon/Icon';
import PEIcon from '../icon/PEIcon';
import { type PECreditCardProps } from './PECreditCardProps';

export default function PECreditCard({ disabled, label, number }: PECreditCardProps): ReactElement {
    const className = classNames(
        'w-full box-border hover:opacity-70 cursor-pointer border border-solid rounded-3 border-border flex flex-row gap-3 items-center justify-between px-4 py-3',
        { ['opacity-50 hover:opacity-50']: disabled },
    );

    return (
        <section className={className}>
            <section className="flex flex-row items-center gap-2">
                <Image src={'/master-card.png'} alt={'MasterCard'} width={36} height={22} />
                <span className="text-text-sm">{label}</span>
                <span className="text-text-sm">{number}</span>
            </section>
            <PEIcon icon={Icon.close} />
        </section>
    );
}
