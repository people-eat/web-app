import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState, type PropsWithChildren, type ReactElement } from 'react';
import PEButton from '../../standard/buttons/PEButton';
import HStack from '../../utility/hStack/HStack';
import VStack from '../../utility/vStack/VStack';

export default function Payment({ children }: PropsWithChildren): ReactElement {
    const stripe = useStripe();
    const elements = useElements();
    const [resultMessage, setResultMessage] = useState<string | undefined>();

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
            confirmParams: { return_url: `${window.location.origin}/profile?tab=4` },
        });

        if (error.type === 'card_error' || error.type === 'validation_error') setResultMessage(error.message);
        else setResultMessage('An unexpected error occured.');
    }

    return (
        <VStack gap={32} style={{ margin: 32, width: 800 }}>
            <HStack gap={32} style={{ width: '100%' }}>
                <VStack style={{ flex: 1 }}>{children}</VStack>
                <VStack style={{ flex: 1, alignItems: 'stretch' }}>
                    <PaymentElement id="payment-element" />
                </VStack>
            </HStack>

            <PEButton title="Fertig" onClick={(): void => void pay()} />

            {resultMessage && <span>{resultMessage}</span>}
        </VStack>
    );
}
