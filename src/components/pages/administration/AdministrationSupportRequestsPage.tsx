import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import moment from 'moment';
import { type ReactElement } from 'react';
import { type GetAdministrationSupportRequestsPageDataQuery } from '../../../data-source/generated/graphql';
import { type SignedInUser } from '../../../shared-domain/SignedInUser';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';

export interface AdministrationSupportRequestsPageProps {
    signedInUser?: SignedInUser;
    supportRequests: NonNullable<GetAdministrationSupportRequestsPageDataQuery['supportRequests']['findMany']>;
}

export default function AdministrationSupportRequestsPage({
    signedInUser,
    supportRequests,
}: AdministrationSupportRequestsPageProps): ReactElement {
    return (
        <VStack className="w-full min-h-screen" gap={64}>
            <PEHeader signedInUser={signedInUser} />

            <HStack className="max-w-screen-xl w-full">
                <TableContainer component={Paper} style={{ margin: 16 }} className="w-full">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Benutzer</TableCell>
                                <TableCell align="left">Betreff</TableCell>
                                <TableCell align="left">Nachricht</TableCell>
                                <TableCell align="left">Datum</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {supportRequests.map((supportRequest) => (
                                <TableRow key={supportRequest.bookingRequestId} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="left">{supportRequest.user.firstName}</TableCell>
                                    <TableCell align="left">{supportRequest.subject}</TableCell>
                                    <TableCell align="left">{supportRequest.message}</TableCell>
                                    <TableCell align="left">{moment(supportRequest.createdAt).format('L')}</TableCell>
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
