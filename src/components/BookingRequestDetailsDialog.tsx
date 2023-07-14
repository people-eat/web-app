import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import { type CurrencyCode, type Price } from '../data-source/generated/graphql';
import { Transition } from './pages/profile/personalTab/CreateAddressDialog';
import PEButton from './standard/buttons/PEButton';
import { Icon } from './standard/icon/Icon';
import PEIcon from './standard/icon/PEIcon';
import PEIconButton from './standard/iconButton/PEIconButton';
import PETextField from './standard/textFields/PETextField';
import HStack from './utility/hStack/HStack';
import Spacer from './utility/spacer/Spacer';
import VStack from './utility/vStack/VStack';

export interface BookingRequestDetailsDialogProps {
    bookingRequest: {
        bookingRequestId: string;
        globalBookingRequestId?: string | null;
        adultParticipants: number;
        children: number;
        dateTime: Date;
        userAccepted?: boolean | null;
        cookAccepted?: boolean | null;
        kitchenId?: string | null;
        occasion: string;
        preparationTime: number;
        duration: number;
        createdAt: Date;
        price: { amount: number; currencyCode: CurrencyCode };
    };
    onClose: () => void;
    onPriceChange?: (changedPrice: Price) => void;
}

export default function BookingRequestDetailsDialog({
    bookingRequest,
    onClose,
    onPriceChange,
}: BookingRequestDetailsDialogProps): ReactElement {
    const { t: translateCommon } = useTranslation('common');
    const { t: translateBooking } = useTranslation('global-booking-request');

    const [amount, setAmount] = useState(bookingRequest.price.amount);

    return (
        <Dialog open onClose={onClose} TransitionComponent={Transition} keepMounted>
            <DialogTitle>
                <HStack>
                    <span>{translateCommon('Booking Request Details')}</span>
                    <Spacer />
                    <PEIconButton withoutShadow bg="white" icon={Icon.close} onClick={onClose} iconSize={24} />
                </HStack>
            </DialogTitle>
            <DialogContent>
                <VStack className="box-border p-4 md:p-0" gap={32}>
                    <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                        <span className="text-text-m-bold">{translateBooking('participants-label')}</span>
                        <HStack gap={16} className="w-full">
                            <PEIcon icon={Icon.users} /> <span>{translateBooking('adults-label')}</span> <Spacer />{' '}
                            {bookingRequest.adultParticipants}
                        </HStack>
                        <HStack gap={16} className="w-full">
                            <PEIcon icon={Icon.users} /> <span>{translateBooking('children-label')}</span> <Spacer />{' '}
                            {bookingRequest.children}
                        </HStack>
                    </VStack>
                    <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                        <span className="text-text-m-bold">{translateBooking('event-details-label')}</span>
                        <HStack gap={16}>
                            <PETextField
                                value={moment(bookingRequest.dateTime).format(moment.HTML5_FMT.DATE)}
                                onChange={(): void => undefined}
                                type="text"
                            />
                            <PETextField
                                value={moment(bookingRequest.dateTime).format('LT')}
                                onChange={(): void => undefined}
                                type="text"
                            />
                            <PETextField value={bookingRequest.occasion} onChange={(): void => undefined} type="text" />
                        </HStack>
                    </VStack>
                    <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                        <span className="text-text-m-bold">{translateBooking('categories-label')}</span>
                        <PETextField value="" onChange={(): void => undefined} type="text" />
                    </VStack>
                    <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                        <span className="text-text-m-bold">{translateBooking('kitchen-label')}</span>
                        <PETextField value="" onChange={(): void => undefined} type="text" />
                    </VStack>
                    <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                        <span className="text-text-m-bold">{translateBooking('allergies-label')}</span>
                        <PETextField value="" onChange={(): void => undefined} type="text" />
                    </VStack>
                    <VStack gap={16} style={{ alignItems: 'flex-start' }} className="w-full">
                        <span className="text-text-m-bold">{translateBooking('budget-label')}</span>
                        <PETextField
                            value={`${amount}`}
                            endContent={<>{bookingRequest.price.currencyCode}</>}
                            onChange={(changedAmount): void => setAmount(Number(changedAmount))}
                            type="text"
                        />
                    </VStack>
                    {bookingRequest.price.amount !== amount && (
                        <PEButton
                            title={translateBooking('budget-suggestion')}
                            onClick={(): void =>
                                onPriceChange?.({
                                    currencyCode: bookingRequest.price.currencyCode,
                                    amount,
                                })
                            }
                        />
                    )}
                </VStack>
            </DialogContent>
        </Dialog>
    );
}
