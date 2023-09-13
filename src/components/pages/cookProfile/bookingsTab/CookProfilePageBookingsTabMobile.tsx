import { useQuery } from '@apollo/client';
import { useEffect, useState, type ReactElement } from 'react';
import { FindManyUserBookingRequestsDocument } from '../../../../data-source/generated/graphql';
import PEMobileChatCard from '../../../cards/chatCard/PEMobileChatCard';
import VStack from '../../../utility/vStack/VStack';
import CookProfilePageBookingsTabDetailMobile from './CookProfilePageBookingsTabDetailMobile';

export interface PEMobileChatProps {
    cookId: string;
}

export default function CookProfilePageBookingsTabMobile({ cookId }: PEMobileChatProps): ReactElement {
    const [selectedBookingRequestId, setSelectedBookingRequestId] = useState<string | undefined>();
    const [isSelectedOpen, setIsSelectedOpen] = useState(false);

    const bookingRequestsResult = useQuery(FindManyUserBookingRequestsDocument, { variables: { userId: cookId ?? '' } });
    const { refetch } = useQuery(FindManyUserBookingRequestsDocument, { variables: { userId: cookId ?? '' } });

    const bookingRequests = bookingRequestsResult.data?.users.bookingRequests.findMany ?? [];
    const handleBookingRequestClick = (bookingRequestId: string): void => {
        setSelectedBookingRequestId(bookingRequestId);
    };

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
            <VStack className="w-full" style={{ alignItems: 'flex-start' }}>
                {bookingRequests.map((req) => (
                    <PEMobileChatCard
                        key={req.bookingRequestId}
                        bookingRequest={{
                            bookingRequestId: req.bookingRequestId,
                            price: {
                                amount: req.price.amount,
                                currencyCode: req.price.currencyCode,
                            },
                            status: req.status,
                            dateTime: new Date(req.dateTime),
                            cook: {
                                user: {
                                    firstName: req.cook.user.firstName,
                                    profilePictureUrl: req.cook.user.profilePictureUrl ?? '',
                                },
                            },
                            configuredMenu: {
                                title: req.configuredMenu?.title || undefined,
                            },
                        }}
                        onClick={(): void => {
                            handleBookingRequestClick(req.bookingRequestId);
                            setIsSelectedOpen(true);
                        }}
                    />
                ))}
            </VStack>

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
