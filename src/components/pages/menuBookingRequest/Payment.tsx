import { useMutation } from '@apollo/client';
import { CircularProgress, Dialog, DialogContent } from '@mui/material';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';
import { useState, type PropsWithChildren, type ReactElement } from 'react';
import { UserBookingRequestConfirmPaymentSetupDocument } from '../../../data-source/generated/graphql';
import PEButton from '../../standard/buttons/PEButton';
import HStack from '../../utility/hStack/HStack';
import VStack from '../../utility/vStack/VStack';

export default function Payment({
    children,
    bookingRequestId,
    userId,
}: PropsWithChildren<{ bookingRequestId: string; userId: string }>): ReactElement {
    const router = useRouter();
    const stripe = useStripe();
    const elements = useElements();
    const [resultMessage, setResultMessage] = useState<string | undefined>();

    const [confirmPaymentSetup, { loading }] = useMutation(UserBookingRequestConfirmPaymentSetupDocument, {
        variables: { userId, bookingRequestId },
    });

    async function pay(): Promise<void> {
        if (!stripe || !elements) {
            // Stripe.js has not yet loaded.
            // Make sure to disable form submission until Stripe.js has loaded.
            return;
        }

        // Make sure to change this to your payment completion page ${window.location.origin}
        // const { error } = await stripe.confirmPayment({
        //     elements,
        //     confirmParams: { return_url: `${window.location.origin}/profile?tab=4` },
        // });
        const { error } = await stripe.confirmSetup({
            elements,
            confirmParams: { return_url: `${window.location.origin}/profile/bookings/${bookingRequestId}` },
            redirect: 'if_required',
        });

        if (error) {
            if (error.type === 'card_error' || error.type === 'validation_error') setResultMessage(error.message);
            else setResultMessage('An unexpected error occurred.');

            return;
        }

        confirmPaymentSetup()
            .then(({ data }) => data?.users.bookingRequests.success && router.push(`/profile/bookings/${bookingRequestId}`))
            .catch(() => undefined);
    }

    return (
        <VStack gap={32} style={{ margin: 32 }}>
            <HStack gap={32} style={{ width: '100%' }}>
                {children}
                <VStack style={{ flex: 1, alignItems: 'stretch' }}>
                    <PaymentElement id="payment-element" />
                </VStack>
            </HStack>

            <PEButton title="Fertig" onClick={(): void => void pay().then(() => console.log('called'))} />

            {resultMessage && <span>{resultMessage}</span>}
            {loading && (
                <Dialog open>
                    <DialogContent>
                        <CircularProgress />
                    </DialogContent>
                </Dialog>
            )}
        </VStack>
    );
}
