import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { type ReactElement } from 'react';
import PEButton from '../standard/buttons/PEButton';
import HStack from '../utility/hStack/HStack';
import VStack from '../utility/vStack/VStack';

export interface BookingRequestAcceptDialogProps {
    isOpen: boolean;
    onCancel: () => void;
    onAccept: () => void;
}

export function BookingRequestAcceptDialog({ isOpen, onCancel, onAccept }: BookingRequestAcceptDialogProps): ReactElement {
    return (
        <Dialog open={isOpen}>
            <DialogTitle>Buchungsanfrage akzeptieren?</DialogTitle>
            <DialogContent>
                <VStack className="w-full" gap={32}>
                    <span>Wir freuen uns dass du die Buchungsanfrage annehmen möchtest.</span>
                    <HStack gap={16} className="w-full">
                        <PEButton title="Nein" type="secondary" onClick={onCancel} />
                        <PEButton title="Ja" type="primary" onClick={onAccept} />
                    </HStack>
                </VStack>
            </DialogContent>
        </Dialog>
    );
}
