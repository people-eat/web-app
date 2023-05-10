import { Button, CircularProgress, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { type ReactElement } from 'react';
import { Icon } from '../../../standard/icon/Icon';
import PEIcon from '../../../standard/icon/PEIcon';
import HStack from '../../../utility/hStack/HStack';

export interface IndividualRequestPageDialogProps {
    state: 'LOADING' | 'SUCCESS' | 'ERROR';
    onContinue: () => void;
}

export default function IndividualRequestPageDialog({ state, onContinue }: IndividualRequestPageDialogProps): ReactElement {
    return (
        <>
            <DialogTitle>
                {state === 'LOADING' && <>Loading...</>}
                {state === 'ERROR' && <>An error occurred</>}
                {state === 'SUCCESS' && <>Thank you! Your order was successfully submitted.</>}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {state === 'LOADING' && (
                        <HStack>
                            <CircularProgress />
                        </HStack>
                    )}
                    {state === 'ERROR' && <>Please try again.</>}
                    {state === 'SUCCESS' && (
                        <HStack>
                            <PEIcon icon={Icon.confetti} edgeLength={64} />
                        </HStack>
                    )}
                    {state === 'SUCCESS' && <>Thank you! Your order was successfully submitted.</>}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onContinue} autoFocus>
                    Back home
                </Button>
            </DialogActions>
        </>
    );
}
