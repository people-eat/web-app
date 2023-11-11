import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import moment from 'moment';
import { type ReactElement } from 'react';
import { type GetAdministrationBookingRequestsPageDataQuery } from '../../../data-source/generated/graphql';
import { type SignedInUser } from '../../../shared-domain/SignedInUser';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';

export interface AdministrationBookingRequestsPageProps {
    signedInUser?: SignedInUser;
    bookingRequests: NonNullable<GetAdministrationBookingRequestsPageDataQuery['bookingRequests']['findMany']>;
}

export default function AdministrationBookingRequestsPage({
    signedInUser,
    bookingRequests,
}: AdministrationBookingRequestsPageProps): ReactElement {
    return (
        <VStack className="w-full min-h-screen" gap={64}>
            <PEHeader signedInUser={signedInUser} />

            <HStack className="max-w-screen-xl w-full">
                <TableContainer component={Paper} style={{ margin: 16 }} className="w-full">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Anlass</TableCell>
                                <TableCell align="left">Koch</TableCell>
                                <TableCell align="left">Kunde</TableCell>
                                <TableCell align="left">Teilnehmer</TableCell>
                                <TableCell align="left">Datum</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookingRequests.map((bookingRequest) => (
                                <TableRow key={bookingRequest.bookingRequestId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="left">{bookingRequest.occasion}</TableCell>
                                    <TableCell align="left">{bookingRequest.cook.user.firstName}</TableCell>
                                    <TableCell align="left">{bookingRequest.user.firstName}</TableCell>
                                    <TableCell align="left">
                                        {bookingRequest.adultParticipants} Erwachsene {bookingRequest.children} Kinder
                                    </TableCell>
                                    <TableCell align="left">{moment(bookingRequest.dateTime).format('L')}</TableCell>
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
