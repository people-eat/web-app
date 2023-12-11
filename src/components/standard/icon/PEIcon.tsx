import Image from 'next/image';
import { type ReactElement } from 'react';
import { type PEIconProps } from './PEIconProps';

export default function PEIcon({ className, edgeLength = 24, icon }: PEIconProps): ReactElement {
    return (
        <div style={{ height: `${edgeLength}px`, width: `${edgeLength}px` }} className="select-none">
            <Image src={icon} width={edgeLength} className={className} height={edgeLength} alt={`PeopleEat icon ${icon}`} />
        </div>
    );
}
