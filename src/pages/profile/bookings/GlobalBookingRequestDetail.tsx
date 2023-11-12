import { type ReactElement } from 'react';

export interface GlobalBookingRequestDetailProps {
    globalBookingRequestId: string;
}

export default function GlobalBookingRequestDetail({ globalBookingRequestId }: GlobalBookingRequestDetailProps): ReactElement {
    return <>GlobalBookingRequest {globalBookingRequestId}</>;
}
