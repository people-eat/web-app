import { type ReactElement } from 'react';
import { Icon } from '../icon/Icon';
import PEIconButton from '../iconButton/PEIconButton';

export interface PEAddressCardProps {
    title?: string;
    address?: string;
    onHouseClick?: () => void;
    onPinClick?: () => void;
    onEditClick?: () => void;
}

export default function PEAddressCard({ title, address, onHouseClick, onPinClick, onEditClick }: PEAddressCardProps): ReactElement {
    return (
        <div className="w-full flex flex-row justify-between">
            <div className="flex flex-row items-center gap-4">
                <PEIconButton size={'48px'} iconSize={20} icon={Icon.home} onClick={onHouseClick} />
                <div className="flex flex-col gap-1">
                    <div className="text-text-m-bold">{title}</div>
                    {address ? <div className="text-text-sm text-lightBlack">{address}</div> : null}
                </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
                <PEIconButton size={'40px'} icon={Icon.pin} onClick={onPinClick} />
                <PEIconButton size={'40px'} icon={Icon.editPencil} onClick={onEditClick} iconSize={20} />
            </div>
        </div>
    );
}
