import moment, { type Moment } from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';
import PEIconButton from '../../standard/iconButton/PEIconButton';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';

interface OrderDetailsProps {
    adults: number;
    numOfChildren: number;
    dateTime: Moment;
    occasion: string;
    price: string;
    onClose: () => void;
}

const OrderDetails = ({ adults, numOfChildren, dateTime, occasion, price, onClose }: OrderDetailsProps): ReactElement => {
    const { t } = useTranslation('chef-profile');
    return (
        <VStack
            className="absolute bg-white z-40 box-border p-5 w-2/4 md:w-[80%] rounded-3 shadow-2xl"
            gap={32}
            style={{ alignItems: 'flex-start' }}
        >
            <div className="absolute top-2 right-2">
                <PEIconButton icon={Icon.close} onClick={onClose} />
            </div>
            <span>Event Details</span>
            <VStack gap={16} style={{ alignItems: 'flex-start' }}>
                <span className="text-text-m-bold">Participants</span>
                <HStack gap={16} className="w-full">
                    <PEIcon icon={Icon.users} /> <span>Adults</span> <Spacer />
                    <span>{adults}</span>
                </HStack>
                <HStack gap={16} className="w-full">
                    <PEIcon icon={Icon.users} /> <span>Children</span> <Spacer />
                    <span>{numOfChildren}</span>
                </HStack>
            </VStack>
            <VStack style={{ alignItems: 'flex-start' }} className="w-full">
                <span className="text-text-m-bold" style={{ marginBottom: '16px' }}>
                    Event Details
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span>Date:</span>
                    <p>{dateTime.format(moment.HTML5_FMT.DATE)}</p>
                    <p>{dateTime.format('LT')}</p>
                </div>
                <p>Occasion: {occasion}</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span className="text-text-m-bold">Categories</span>
                    <p></p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span className="text-text-m-bold">Kitchen</span>
                    <p></p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span className="text-text-m-bold">Allergies</span>
                    <p></p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span className="text-text-m-bold">{t('booking-price')}</span>
                    <p>{price}</p>
                </div>
            </VStack>
        </VStack>
    );
};

export default OrderDetails;
