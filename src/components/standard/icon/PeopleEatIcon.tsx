import Image from 'next/image';
import { type ReactElement } from 'react';
import { type PeopleEatIconProps } from './PeopleEatIconProps';

export default function PeopleEatIcon({ className, edgeLength = 24, icon }: PeopleEatIconProps): ReactElement {
    return (
        <div>
            <Image src={icon} width={edgeLength} className={className} height={edgeLength} alt={`PeopleEat icon ${icon}`} />
        </div>
    );
}
