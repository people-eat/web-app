import { type ReactElement } from 'react';
import { Icon } from '~/components/standard/icon/Icon';
import PeopleEatIcon from '~/components/standard/icon/PeopleEatIcon';

interface IPeopleEatEditButtonProps {
    onClick: () => void;
}

export default function PeopleEatEditButton({ onClick }: IPeopleEatEditButtonProps): ReactElement {
    return (
        <section onClick={onClick} className={'flex justify-center items-center bg-base w-10 h-10 rounded-3'}>
            <PeopleEatIcon icon={Icon.editPencil} className={'cursor-pointer'} edgeLength={24} />
        </section>
    );
}
