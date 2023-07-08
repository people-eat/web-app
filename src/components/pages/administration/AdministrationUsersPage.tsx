import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { type ReactElement } from 'react';
import { type SignedInUser } from '../../../shared-domain/SignedInUser';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';

export interface AdministrationUsersPageProps {
    signedInUser?: SignedInUser;
    users: {
        userId: string;
        isLocked: boolean;
        firstName: string;
        lastName: string;
        profilePictureUrl?: string;
        isAdmin: boolean;
        isCook: boolean;
        createdAt: string;
    }[];
}

export default function AdministrationUsersPage({ signedInUser, users }: AdministrationUsersPageProps): ReactElement {
    return (
        <VStack className="w-full min-h-screen" gap={64}>
            <PEHeader signedInUser={signedInUser} />

            <HStack className="max-w-screen-xl w-full">
                <TableContainer component={Paper} style={{ margin: 16 }} className="w-full">
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">First Name</TableCell>
                                <TableCell align="left">Last Name</TableCell>
                                <TableCell align="left">Is Locked</TableCell>
                                <TableCell align="left">Is Chef</TableCell>
                                <TableCell align="left">Is Admin</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user, index) => (
                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell align="left">{user.firstName}</TableCell>
                                    <TableCell align="left">{user.lastName}</TableCell>
                                    <TableCell align="left">{user.isLocked ? 'X' : ''}</TableCell>
                                    <TableCell align="left">{user.isCook ? 'X' : ''}</TableCell>
                                    <TableCell align="left">{user.isAdmin ? 'X' : ''}</TableCell>
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
