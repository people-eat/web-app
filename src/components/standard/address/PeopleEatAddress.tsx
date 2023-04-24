import { type ReactElement } from 'react';
import PeopleEatIconButton from '../../standard/iconButton/PeopleEatIconButton';
import { Icon } from '../icon/Icon';

interface PeopleEatAddressProps {
    title?: string;
    address?: string;
    onHouseClick?: () => void;
    onPinClick?: () => void;
    onEditClick?: () => void;
}

export default function PeopleEatAddress({ title, address, onHouseClick, onPinClick, onEditClick }: PeopleEatAddressProps): ReactElement {
    return (
        <div className="w-full flex flex-row justify-between">
            <div className="flex flex-row items-center gap-4">
                <PeopleEatIconButton size={'48px'} iconSize={20} icon={Icon.home} onClick={onHouseClick} />
                <div className="flex flex-col gap-1">
                    <div className="text-text-m-bold">{title}</div>
                    {address ? <div className="text-text-sm text-lightBlack">{address}</div> : null}
                </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
                <PeopleEatIconButton size={'40px'} icon={Icon.pin} onClick={onPinClick} />
                <PeopleEatIconButton size={'40px'} icon={Icon.editPencil} onClick={onEditClick} iconSize={20} />
            </div>
        </div>
    );
}
