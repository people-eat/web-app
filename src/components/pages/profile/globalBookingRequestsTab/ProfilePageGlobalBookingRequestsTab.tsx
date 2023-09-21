import { useMutation, useQuery } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { useState, type ReactElement } from 'react';
import {
    FindUserProfileGlobalBookingRequestsDocument,
    UserBookingRequestUpdatePriceDocument,
    type CurrencyCode,
} from '../../../../data-source/generated/graphql';
import BookingRequestDetailsDialog from '../../../BookingRequestDetailsDialog';
// import PEBookingRequestCardOpen from '../../../cards/bookingRequestCard/PEBookingRequestCardOpen';
import GlobalBookingRequestCardCustomer from '../../../cards/globalBookingRequests/GlobalBookingRequestCardCustomer';
import HStack from '../../../utility/hStack/HStack';
import VStack from '../../../utility/vStack/VStack';

export interface ProfilePageGlobalBookingRequestsTabProps {
    userId: string;
}

export default function ProfilePageGlobalBookingRequestsTab({ userId }: ProfilePageGlobalBookingRequestsTabProps): ReactElement {
    const { t } = useTranslation('common');
    const [updateBookingRequestPrice] = useMutation(UserBookingRequestUpdatePriceDocument);

    const [selectedBookingRequest, setSelectedBookingRequest] = useState<
        | {
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
          }
        | undefined
    >();

    const { data, loading, error, refetch } = useQuery(FindUserProfileGlobalBookingRequestsDocument, { variables: { userId } });
    const globalBookingRequests = data?.users.globalBookingRequests.findMany;

    return (
        <VStack className="w-full md:overflow-hidden relative max-w-screen-xl gap-6 lg:px-4 md:py-6 box-border">
            <HStack className="w-full gap-8 flex-wrap" style={{ justifyContent: 'space-between' }}>
                {globalBookingRequests?.map((globalBookingRequest) => (
                    <div key={globalBookingRequest.globalBookingRequestId} className="w-[calc(50%-20px)] md:w-full">
                        <GlobalBookingRequestCardCustomer
                            createdAt={moment(globalBookingRequest.createdAt)}
                            occasion={globalBookingRequest.occasion}
                            price={`${globalBookingRequest.price.amount} ${globalBookingRequest.price.currencyCode}`}
                            dateTime={moment(globalBookingRequest.dateTime)}
                            adults={globalBookingRequest.adultParticipants}
                            numOfChildren={globalBookingRequest.children}
                            participants={globalBookingRequest.adultParticipants + globalBookingRequest.children}
                            address={'address'}
                        />
                    </div>
                ))}
            </HStack>

            {loading && <CircularProgress />}

            {error && <>{t('error')}</>}

            {selectedBookingRequest && (
                <BookingRequestDetailsDialog
                    onClose={(): void => setSelectedBookingRequest(undefined)}
                    bookingRequest={selectedBookingRequest}
                    onPriceChange={(changedPrice): void => {
                        void updateBookingRequestPrice({
                            variables: { userId, bookingRequestId: selectedBookingRequest.bookingRequestId, price: changedPrice },
                        })
                            .then((result) => {
                                if (!result.data?.users.bookingRequests.success) return;
                                void refetch();
                            })
                            .finally((): void => setSelectedBookingRequest(undefined));
                    }}
                />
            )}
        </VStack>
    );
}
