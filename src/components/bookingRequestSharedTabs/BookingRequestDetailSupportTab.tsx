import { useMutation } from '@apollo/client';
import { Alert, Button, Snackbar } from '@mui/material';
import { useState, type ReactElement } from 'react';
import { CreateOneUserSupportRequestDocument } from '../../data-source/generated/graphql';
import PEButton from '../standard/buttons/PEButton';
import PEMultiLineTextField from '../standard/textFields/PEMultiLineTextField';
import PETextField from '../standard/textFields/PETextField';
import VStack from '../utility/vStack/VStack';

export interface BookingRequestDetailSupportTabProps {
    userId: string;
    bookingRequestId: string;
    afterSubmission: () => void;
}

export function BookingRequestDetailSupportTab({
    userId,
    bookingRequestId,
    afterSubmission,
}: BookingRequestDetailSupportTabProps): ReactElement {
    const [supportSubject, setSupportSubject] = useState('');
    const [supportMessage, setSupportMessage] = useState('');
    const [supportRequestStatus, setSupportRequestStatus] = useState<'NOT_REQUESTED' | 'REQUESTED' | 'REQUEST_FAILED'>('NOT_REQUESTED');

    const [createSupportRequest] = useMutation(CreateOneUserSupportRequestDocument);

    return (
        <VStack style={{ width: '100%' }} gap={32}>
            <form style={{ width: '100%' }} onSubmit={(event): void => event.preventDefault()}>
                <VStack gap={32} style={{ width: '100%', justifyContent: 'stretch' }}>
                    <VStack style={{ width: '100%', alignItems: 'flex-start' }} gap={8}>
                        <label>Betreff</label>
                        <PETextField
                            type="text"
                            value={supportSubject}
                            onChange={setSupportSubject}
                            disabled={supportRequestStatus === 'REQUESTED'}
                        />
                    </VStack>

                    <VStack style={{ width: '100%', alignItems: 'flex-start' }} gap={8}>
                        <label>Text Nachricht</label>
                        <PEMultiLineTextField
                            value={supportMessage}
                            onChange={setSupportMessage}
                            disabled={supportRequestStatus === 'REQUESTED'}
                        />
                    </VStack>

                    <PEButton
                        title="Nachricht Senden"
                        onClick={(): void =>
                            void createSupportRequest({
                                variables: {
                                    userId,
                                    request: { bookingRequestId, subject: supportSubject, message: supportMessage },
                                },
                            })
                                .then(({ data: resData }) =>
                                    setSupportRequestStatus(resData?.users.supportRequests.createOne ? 'REQUESTED' : 'REQUEST_FAILED'),
                                )
                                .catch((error) => {
                                    console.error(error);
                                    setSupportRequestStatus('REQUEST_FAILED');
                                })
                        }
                    />
                </VStack>
            </form>
            <a href="tel:+4915678459804" className="w-full no-underline">
                <PEButton type="secondary" title="Anrufen +491567 8459804" onClick={(): void => undefined} />
            </a>
            <Snackbar open={supportRequestStatus === 'REQUESTED'} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                <Alert
                    severity="success"
                    action={
                        <Button
                            color="inherit"
                            size="small"
                            onClick={(): void => {
                                afterSubmission();
                                setSupportSubject('');
                                setSupportMessage('');
                                setSupportRequestStatus('NOT_REQUESTED');
                            }}
                        >
                            Schließen
                        </Button>
                    }
                >
                    Wir haben deine Support Anfrage erhalten und werden uns umgehend mit dir in Verbindung setzen.
                </Alert>
            </Snackbar>
        </VStack>
    );
}
