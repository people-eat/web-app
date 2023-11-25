import { useQuery } from '@apollo/client';
import { useEffect, useState, type ReactElement } from 'react';
import { FindManyUserBookingRequestsDocument } from '../../../../data-source/generated/graphql';
import VStack from '../../../utility/vStack/VStack';
import CookProfilePageBookingsTabDetailMobile from './CookProfilePageBookingsTabDetailMobile';

export interface PEMobileChatProps {
    cookId: string;
}

export default function CookProfilePageBookingsTabMobile({ cookId }: PEMobileChatProps): ReactElement {
    const [selectedBookingRequestId] = useState<string | undefined>();
    const [isSelectedOpen, setIsSelectedOpen] = useState(false);

    // const bookingRequestsResult = useQuery(FindManyUserBookingRequestsDocument, { variables: { userId: cookId ?? '' } });
    const { refetch } = useQuery(FindManyUserBookingRequestsDocument, { variables: { userId: cookId ?? '' } });

    // const bookingRequests = bookingRequestsResult.data?.users.bookingRequests.findMany ?? [];
    // const handleBookingRequestClick = (bookingRequestId: string): void => {
    //     setSelectedBookingRequestId(bookingRequestId);
    // };

    useEffect((): void => {
        const fetchData = async (): Promise<void> => {
            try {
                if (!isSelectedOpen) await refetch();
            } catch (error) {
                console.error(error);
            }
        };
        void fetchData();
    }, [isSelectedOpen, refetch]);

    return (
        <VStack style={{ alignItems: 'flex-start' }} className="w-[80%]">
            <VStack className="w-full" style={{ alignItems: 'flex-start' }}></VStack>

            {selectedBookingRequestId && isSelectedOpen && (
                <CookProfilePageBookingsTabDetailMobile
                    setIsSelectedOpen={setIsSelectedOpen}
                    cookId={cookId}
                    bookingRequestId={selectedBookingRequestId}
                />
            )}
        </VStack>
    );
}
