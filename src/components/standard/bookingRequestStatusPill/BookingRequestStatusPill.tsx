import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';

export interface BookingRequestStatusPillProps {
    status: 'OPEN' | 'PENDING' | 'CANCELED' | 'COMPLETED';
}

export default function BookingRequestStatusPill({ status }: BookingRequestStatusPillProps): ReactElement {
    const { t } = useTranslation('booking-status');

    if (status === 'OPEN') {
        return (
            <span className="text-green" style={{ padding: '4px 16px', backgroundColor: 'lightgray', borderRadius: 16 }}>
                {t('booking-status-open')}
            </span>
        );
    }

    if (status === 'PENDING') {
        return (
            <span className="text-blue-400" style={{ padding: '4px 16px', backgroundColor: 'lightgray', borderRadius: 16 }}>
                {t('booking-status-in-progress')}
            </span>
        );
    }

    if (status === 'CANCELED') {
        return (
            <span className="text-red-400" style={{ padding: '4px 16px', backgroundColor: 'lightgray', borderRadius: 16 }}>
                {t('booking-status-cancelled')}
            </span>
        );
    }

    if (status === 'COMPLETED')
        return <span style={{ padding: '4px 16px', backgroundColor: 'lightgray', borderRadius: 16 }}>{t('booking-status-completed')}</span>;

    return <></>;
}
