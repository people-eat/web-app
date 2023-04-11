import { type ReactElement } from 'react';
import { Icon } from '../icon/Icon';
import PeopleEatIcon from '../icon/PeopleEatIcon';

interface IPeopleEatCameraButtonProps {
    onClick: () => void;
}

export default function PeopleEatCameraButton({ onClick }: IPeopleEatCameraButtonProps): ReactElement {
    return (
        <section onClick={onClick} className={'flex justify-center items-center bg-base w-9 h-9 rounded-3'}>
            <PeopleEatIcon icon={Icon.camera} className={'cursor-pointer'} edgeLength={16} />
        </section>
    );
}
