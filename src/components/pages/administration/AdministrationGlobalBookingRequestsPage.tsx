import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { type ReactElement } from 'react';
import { type SignedInUser } from '../../../shared-domain/SignedInUser';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';

export interface AdministrationGlobalBookingRequestsPageProps {
    signedInUser?: SignedInUser;
    globalBookingRequests: {
        globalBookingRequestId: string;
        occasion: string;
    }[];
}

export default function AdministrationGlobalBookingRequestsPage({
    signedInUser,
    globalBookingRequests,
}: AdministrationGlobalBookingRequestsPageProps): ReactElement {
    return (
        <VStack className="w-full min-h-screen" gap={64}>
            <PEHeader signedInUser={signedInUser} />

            <HStack className="max-w-screen-xl w-full">
                <TableContainer component={Paper} style={{ margin: 16 }} className="w-full">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Anlass</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {globalBookingRequests.map((globalBookingRequest) => (
                                <TableRow
                                    key={globalBookingRequest.globalBookingRequestId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">{globalBookingRequest.occasion}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </HStack>

            <Spacer />

            <PEFooter />
        </VStack>
    );
}
