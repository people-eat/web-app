import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import moment from 'moment';
import { type ReactElement } from 'react';
import { type GetAdministrationGlobalBookingRequestsPageDataQuery } from '../../../data-source/generated/graphql';
import { type SignedInUser } from '../../../shared-domain/SignedInUser';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';

export interface AdministrationGlobalBookingRequestsPageProps {
    signedInUser?: SignedInUser;
    globalBookingRequests: NonNullable<GetAdministrationGlobalBookingRequestsPageDataQuery['globalBookingRequests']['findMany']>;
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
                                <TableCell align="left">Kunde</TableCell>
                                <TableCell align="left">Teilnehmer</TableCell>
                                <TableCell align="left">Datum</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {globalBookingRequests.map((globalBookingRequest) => (
                                <TableRow
                                    key={globalBookingRequest.globalBookingRequestId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left">{globalBookingRequest.occasion}</TableCell>
                                    <TableCell align="left">{globalBookingRequest.user.firstName}</TableCell>
                                    <TableCell align="left">
                                        {globalBookingRequest.adultParticipants} Erwachsene {globalBookingRequest.children} Kinder
                                    </TableCell>
                                    <TableCell align="left">{moment(globalBookingRequest.dateTime).format('L')}</TableCell>
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