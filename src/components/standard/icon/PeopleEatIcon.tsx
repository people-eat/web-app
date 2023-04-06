import Image from 'next/image';
import { type ReactElement } from 'react';
import { type PeopleEatIconProps } from './PeopleEatIconProps';

export default function PeopleEatIcon({ icon, edgeLength = 24, classes }: PeopleEatIconProps): ReactElement {
    return (
        <div className={classes}>
            <Image src={icon} width={edgeLength} height={edgeLength} alt={`PeopleEat icon ${icon}`} />
        </div>
    );
}
