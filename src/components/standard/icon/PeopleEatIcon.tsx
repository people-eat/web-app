import Image from 'next/image';
import { type ReactElement } from 'react';
import { type PeopleEatIconProps } from './PeopleEatIconProps';

export default function PeopleEatIcon({ icon, edgeLength = 24 }: PeopleEatIconProps): ReactElement {
    return (
        <div>
            <Image src={icon} width={edgeLength} height={edgeLength} alt={`PeopleEat icon ${icon}`} />
        </div>
    );
}
