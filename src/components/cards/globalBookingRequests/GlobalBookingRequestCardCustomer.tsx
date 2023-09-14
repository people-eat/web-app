import { type Moment } from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import PEButton from '../../standard/buttons/PEButton';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';
import GlobalBookingDetails from './GlobalBookingDetails';

interface PEGlobalBookingRequestCardCustomerProps {
    occasion: string;
    price?: string;
    adults: number;
    numOfChildren: number;
    participants: number;
    dateTime: Moment;
    address: string;
    createdAt: Moment;
    onCancelClick?: () => void;
}

const PEGlobalBookingRequestCardCustomer = ({
    occasion,
    price,
    adults,
    numOfChildren,
    participants,
    dateTime,
    address,
    createdAt,
    onCancelClick,
}: PEGlobalBookingRequestCardCustomerProps): ReactElement => {
    const { t } = useTranslation('global-booking-request');
    const [openOrderDetails, setOpenOrderDetails] = useState(false);

    return (
        <VStack
            gap={32}
            style={{ alignItems: 'stretch', padding: 32 }}
            className="w-full box-border rounded-3 shadow-primary cursor-pointer hover:shadow-active"
        >
            {/* <HStack style={{ justifyContent: 'flex-start' }}>
                <span className="text-green">status: Open</span>
            </HStack> */}
            <span>{occasion}</span>
            <HStack gap={8} className="text-text-sm">
                <span>{t('budget-placeholder-label')}</span>
                <span className="text-green text-heading-ss-bold md:text-text-m-bold">{price}</span>
                <Spacer />
            </HStack>
            <HStack gap={16}>
                <VStack gap={16} style={{ alignItems: 'flex-start', flex: 1 }}>
                    <span className="text-gray md:text-text-s text-text-m">
                        Event {t('date-label')}: <span className="text-black">{dateTime.format('L')}</span>
                    </span>
                    <span className="text-gray md:text-text-s text-text-m">
                        {t('persons')}: <span className="text-black">{participants}</span>
                    </span>
                </VStack>
                <span className="w-[1px] mx-3 md:mx-4 h-[52px] bg-separator rounded-1" />
                <VStack gap={8} style={{ alignItems: 'flex-start', flex: 1 }}>
                    <span className="text-gray md:text-text-s text-text-m">
                        {t('time')}: <span className="text-black">{dateTime.format('LT')}</span>
                    </span>
                    <span className="text-gray md:text-text-s text-text-m">
                        {t('location-placeholder-label')}: <span className="text-black">{address}</span>
                    </span>
                </VStack>
            </HStack>
            <HStack gap={16}>
                <PEButton onClick={(): void => onCancelClick?.()} title={t('cancel')} type="secondary" />
                <PEButton onClick={(): void => setOpenOrderDetails(true)} title={t('see-order')} />
            </HStack>
            <VStack style={{ alignItems: 'flex-end' }}>
                <Spacer />
                <span className="text-60black text-text-s">{t('you-made-request-on')}</span>
                <span className="text-60black text-text-s">{createdAt.format('L')}</span>
            </VStack>

            {openOrderDetails && (
                <GlobalBookingDetails
                    adults={adults}
                    numOfChildren={numOfChildren}
                    dateTime={dateTime}
                    occasion={occasion}
                    price={price ?? '0'}
                    onClose={(): void => setOpenOrderDetails(false)}
                />
            )}
        </VStack>
    );
};
export default PEGlobalBookingRequestCardCustomer;
