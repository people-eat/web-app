import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import Link from 'next/link';
import { type ReactElement } from 'react';
import PEButton from '../standard/buttons/PEButton';
import HStack from '../utility/hStack/HStack';
import VStack from '../utility/vStack/VStack';

export interface BookingRequestDeclineDialogProps {
    isOpen: boolean;
    onCancel: () => void;
    onDecline: () => void;
}

export function BookingRequestDeclineDialog({ isOpen, onCancel, onDecline }: BookingRequestDeclineDialogProps): ReactElement {
    return (
        <Dialog open={isOpen}>
            <DialogTitle>Bist du dir sicher dass du die Buchungsanfrage ablehnen möchtest?</DialogTitle>
            <DialogContent>
                <VStack className="w-full" gap={32}>
                    <span>
                        Bitte beachte unsere Stornierungsbedingungen bevor du die Buchungsanfrage ablehnst. Diese findest du in unseren{' '}
                        <Link href="terms-and-conditions" target="_blank" className="text-orange">
                            AGB
                        </Link>
                        .
                    </span>
                    <HStack gap={16} className="w-full">
                        <PEButton title="Nein" type="secondary" onClick={onCancel} />
                        <PEButton title="Ja" type="primary" onClick={onDecline} />
                    </HStack>
                </VStack>
            </DialogContent>
        </Dialog>
    );
}
