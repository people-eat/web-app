import classNames from 'classnames';
import { type ReactElement } from 'react';
import { Icon } from '../../standard/icon/Icon';
import PEIconButton from '../../standard/iconButton/PEIconButton';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';

export interface PEAddressCardProps {
    title: string;
    address: string;

    onHouseClick?: () => void;

    pin?: {
        isPinned: boolean;
        onPinClick: () => void;
    };

    onEdit?: () => void;
    onDelete?: () => void;
}

export default function PEAddressCard({ title, address, onHouseClick, pin, onEdit, onDelete }: PEAddressCardProps): ReactElement {
    return (
        <HStack className="w-full" gap={16}>
            <PEIconButton size={'48px'} iconSize={20} icon={Icon.home} onClick={onHouseClick} withoutShadow />

            <VStack gap={4} style={{ alignItems: 'start' }}>
                <div className="text-text-m-bold">{title}</div>
                <div className="text-text-sm text-lightBlack">{address}</div>
            </VStack>

            <Spacer />

            {pin && (
                <PEIconButton
                    className={classNames({ ['opacity-30']: !pin.isPinned })}
                    icon={Icon.pin}
                    onClick={pin.onPinClick}
                    withoutShadow
                />
            )}

            {onEdit && <PEIconButton icon={Icon.editPencil} onClick={onEdit} withoutShadow />}

            {onDelete && <PEIconButton icon={Icon.trash} onClick={onDelete} withoutShadow />}
        </HStack>
    );
}
