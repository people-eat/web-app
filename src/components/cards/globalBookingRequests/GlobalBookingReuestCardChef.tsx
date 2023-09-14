import moment, { type Moment } from 'moment';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import { useState, type ReactElement } from 'react';
import PEButton from '../../standard/buttons/PEButton';
import PELineButton from '../../standard/buttons/PELineButton';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';
import OrderDetails from './GlobalBookingDetails';

interface PEGlobalBookingRequestCardChefProps {
    name: string;
    profilePictureUrl?: string;
    occasion: string;
    price?: string;
    adults: number;
    numOfChildren: number;
    participants: number;
    dateTime: Moment;
    address: string;
    createdAt: Moment;
    onAcceptClick?: () => void;
}

const PEGlobalBookingRequestCardChef = ({
    name,
    profilePictureUrl,
    occasion,
    price,
    adults,
    numOfChildren,
    participants,
    dateTime,
    address,
    createdAt,
    onAcceptClick,
}: PEGlobalBookingRequestCardChefProps): ReactElement => {
    const { t } = useTranslation('chef-profile');

    const [GlobalBookingDetails, setOpenOrderDetails] = useState(false);
    return (
        <VStack
            gap={32}
            style={{ alignItems: 'stretch', padding: 32 }}
            className="w-full box-border rounded-3 shadow-primary cursor-pointer hover:shadow-active"
        >
            <HStack>
                <PELineButton
                    title={t('see-order-details')}
                    onClick={(): void => {
                        setOpenOrderDetails(true);
                    }}
                />
                <Spacer />
            </HStack>
            <span>{t('booking-global-requests')}</span>
            <HStack gap={16}>
                {profilePictureUrl && (
                    <Image
                        className="rounded-3"
                        style={{ width: '45px', height: '45px', objectFit: 'cover' }}
                        src={profilePictureUrl}
                        alt={'client image'}
                        width={45}
                        height={45}
                    />
                )}
                {!profilePictureUrl && (
                    <div className="flex justify-center items-center w-11 h-11 bg-base rounded-3">
                        <PEIcon icon={Icon.profileLight} edgeLength={32} />
                    </div>
                )}
                <VStack style={{ alignItems: 'flex-start' }}>
                    <span className={'text-heading-ss-bold md:text-text-sm-bold'}>{name}</span>
                    <span className={'text-text-sm'}>{occasion}</span>
                </VStack>
                <Spacer />
            </HStack>

            <HStack gap={8} className="text-text-sm">
                <span>{t('booking-price')}</span>
                <span className="text-green text-heading-ss-bold md:text-text-m-bold">{price}</span>
                <Spacer />
            </HStack>
            <HStack gap={16}>
                <VStack gap={16} style={{ alignItems: 'flex-start', flex: 1 }}>
                    <span className="text-gray md:text-text-s text-text-m">
                        {t('booking-date')}: <span className="text-black">{dateTime.format(moment.HTML5_FMT.DATE)}</span>
                    </span>
                    <span className="text-gray md:text-text-s text-text-m">
                        {t('booking-persons')}: <span className="text-black">{participants}</span>
                    </span>
                </VStack>
                <span className="w-[1px] mx-3 md:mx-4 h-[52px] bg-separator rounded-1" />
                <VStack gap={8} style={{ alignItems: 'flex-start', flex: 1 }}>
                    <span className="text-gray md:text-text-s text-text-m">
                        {t('booking-time')}: <span className="text-black">{dateTime.format('LT')}</span>
                    </span>
                    <span className="text-gray md:text-text-s text-text-m">
                        {t('booking-address')}: <span className="text-black">{address}</span>
                    </span>
                </VStack>
            </HStack>
            <HStack gap={16}>
                <PEButton onClick={(): void => onAcceptClick?.()} title={t('booking-accept-button')} />
            </HStack>
            <VStack style={{ alignItems: 'flex-end' }}>
                <Spacer />
                <span>{t('request-made')} </span>
                <span className="text-60black text-text-s">{createdAt.format(moment.HTML5_FMT.DATE)}</span>
            </VStack>
            {GlobalBookingDetails && (
                <OrderDetails
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
export default PEGlobalBookingRequestCardChef;
