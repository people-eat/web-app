import { useMutation, useQuery } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { type ReactElement } from 'react';
import {
    CreateOneCookBookingRequestDocument,
    FindCookProfileGlobalBookingRequestsDocument,
} from '../../../../data-source/generated/graphql';
import PEBookingRequestCardOpen from '../../../cards/bookingRequestCard/PEBookingRequestCardOpen';
import HStack from '../../../utility/hStack/HStack';
import VStack from '../../../utility/vStack/VStack';

export interface ChefProfilePageGlobalBookingsTabProps {
    cookId: string;
}

export default function ChefProfilePageGlobalBookingsTab({ cookId }: ChefProfilePageGlobalBookingsTabProps): ReactElement {
    const router = useRouter();
    const { t: commonTranslate } = useTranslation('common');

    const { data, loading, error } = useQuery(FindCookProfileGlobalBookingRequestsDocument, { variables: { cookId } });
    const globalBookingRequests = data?.cooks.globalBookingRequests.findMany;

    const [createBookingRequest] = useMutation(CreateOneCookBookingRequestDocument);

    return (
        <VStack className="w-full relative max-w-screen-xl mb-[80px] lg:my-10 gap-6 box-border">
            <HStack className="w-full gap-8 flex-wrap" style={{ justifyContent: 'space-between' }}>
                {globalBookingRequests?.map((globalBookingRequest) => (
                    <div key={globalBookingRequest.globalBookingRequestId} className="w-[calc(50%-20px)] md:w-full">
                        <PEBookingRequestCardOpen
                            onOrderDetailsClick={(): void => undefined}
                            createdAt={moment(globalBookingRequest.createdAt)}
                            title={'Global Booking Request'}
                            name={''}
                            profilePictureUrl={undefined}
                            occasion={globalBookingRequest.occasion}
                            price={`${globalBookingRequest.price.amount} ${globalBookingRequest.price.currencyCode}`}
                            dateTime={moment(globalBookingRequest.dateTime)}
                            participants={globalBookingRequest.adultParticipants + globalBookingRequest.children}
                            address={'Location'}
                            onAcceptClick={(): void =>
                                void createBookingRequest({
                                    variables: { cookId, globalBookingRequestId: globalBookingRequest.globalBookingRequestId },
                                }).then(({ data: successData }) => {
                                    if (!successData?.cooks.bookingRequests.success) return;
                                    void router.push('chef-profile?tab=3');
                                })
                            }
                        />
                    </div>
                ))}
            </HStack>

            {loading && <CircularProgress />}

            {error && <>{commonTranslate('error')}</>}
        </VStack>
    );
}
