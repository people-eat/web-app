import { CircularProgress, Dialog, DialogContent, DialogTitle } from '@mui/material';
import { type ReactElement } from 'react';
import VStack from '../utility/vStack/VStack';

export interface LoadingDialogProps {
    title?: string;
    isLoading: boolean;
}

export function LoadingDialog({ title, isLoading }: LoadingDialogProps): ReactElement {
    return (
        <Dialog open={isLoading}>
            {title && <DialogTitle>{title}</DialogTitle>}
            <DialogContent>
                <VStack>
                    <CircularProgress />
                </VStack>
            </DialogContent>
        </Dialog>
    );
}
