import { useQuery } from '@apollo/client';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useState, type ReactElement } from 'react';
import { FindUserProfileGlobalBookingRequestsDocument } from '../../../../data-source/generated/graphql';
import PETabItem from '../../../standard/tabItem/PETabItem';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';

const BOOKING_TABS = ['Open', 'In Progress', 'Completed'];

export interface ProfilePageBookingsTabProps {
    userId: string;
}

export default function ProfilePageBookingsTab({ userId }: ProfilePageBookingsTabProps): ReactElement {
    const [selectedTab, setSelectedTab] = useState<number | undefined>(0);

    const { data, loading, error } = useQuery(FindUserProfileGlobalBookingRequestsDocument, { variables: { userId } });
    const globalBookingRequests = data?.users.globalBookingRequests.findMany;

    return (
        <VStack className="w-full md:overflow-hidden relative max-w-screen-xl gap-6 lg:px-4 md:py-6 box-border">
            <HStack
                gap={8}
                className="w-full bg-white shadow-primary md:shadow-none box-border p-8 md:p-0 rounded-4 md:overflow-x-auto"
                style={{ alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {BOOKING_TABS.map((menu, index) => (
                    <PETabItem key={index} title={menu} onClick={(): void => setSelectedTab(index)} active={selectedTab === index} />
                ))}

                <Spacer />

                <PETabItem title={'Global Requests'} onClick={(): void => setSelectedTab(undefined)} active={selectedTab === undefined} />
            </HStack>

            {selectedTab === undefined &&
                globalBookingRequests?.map((globalBookingRequest, index) => (
                    <Button variant="contained" key={index}>
                        {globalBookingRequest.occasion}
                    </Button>
                ))}

            {loading && <CircularProgress />}

            {error && <>An error ocurred</>}
        </VStack>
    );
}
