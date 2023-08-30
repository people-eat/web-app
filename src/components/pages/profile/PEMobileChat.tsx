import { type ReactElement } from 'react';
import VStack from '../../utility/vStack/VStack';

export interface PEMobileChatProps {
    userId: string | undefined;
}

export default function PEMobileChat(): ReactElement {
    // const [selectedBookingRequestId, setSelectedBookingRequestId] = useState<string | undefined>();
    // const [isSelectedOpen, setIsSelectedOpen] = useState(false);

    // const bookingRequestsResult = useQuery(FindManyUserBookingRequestsDocument, { variables: { userId: userId ?? '' } });
    // const bookingRequests = bookingRequestsResult.data?.users.bookingRequests.findMany ?? [];
    // const handleBookingRequestClick = (bookingRequestId: string): void => {
    //     setSelectedBookingRequestId(bookingRequestId);
    // };

    return (
        <VStack style={{ alignItems: 'flex-start' }} className="w-[80%]">
            {/* <VStack className="w-full" style={{ alignItems: 'flex-start' }}>
                {bookingRequests.map((req) => (
                    <PEMobileChatCard
                        key={req.bookingRequestId}
                        bookingRequest={req}
                        onClick={(): void => {
                            handleBookingRequestClick(req.bookingRequestId);
                            setIsSelectedOpen(true);
                        }}
                    />
                ))}
            </VStack>
            <VStack
                gap={16}
                className="bg-white shadow-primary"
                style={{ alignItems: 'center', justifyContent: 'flex-start', padding: 16, flex: 2, borderRadius: 16 }}
            ></VStack>
            {selectedBookingRequestId && isSelectedOpen && (
                <ProfilePageBookingMobile
                    setIsSelectedOpen={setIsSelectedOpen}
                    userId={userId ?? ''}
                    bookingRequestId={selectedBookingRequestId}
                />
            )} */}
        </VStack>
    );
}
