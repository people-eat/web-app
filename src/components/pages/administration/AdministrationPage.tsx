import { ButtonBase, Paper } from '@mui/material';
import Link from 'next/link';
import { type CSSProperties, type ReactElement } from 'react';
import { type SignedInUser } from '../../../shared-domain/SignedInUser';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';

export interface AdministrationPageProps {
    signedInUser?: SignedInUser;
}

const tiles: { title: string; path: string }[] = [
    { title: 'Users', path: '/administration/users' },
    { title: 'Chefs', path: '/administration' },
    { title: 'Administrators', path: '/administration' },
    { title: 'Statistics', path: '/administration' },
    { title: 'Feature Toggles', path: '/administration' },
    { title: 'Search Requests', path: '/administration' },
    { title: 'Categories', path: '/administration' },
    { title: 'Languages', path: '/administration' },
    { title: 'Allergies', path: '/administration' },
    { title: 'Terms and Conditions', path: '/administration' },
    { title: 'Privacy Policy Statement', path: '/administration' },
    { title: 'Global Booking Requests', path: '/administration/global-booking-requests' },
    { title: 'Booking Requests', path: '/administration/booking-requests' },
];

export default function AdministrationPage({ signedInUser }: AdministrationPageProps): ReactElement {
    const tileStyle: CSSProperties = {
        padding: 8,
        width: 180,
        height: 180,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    };

    return (
        <VStack className="w-full min-h-screen" gap={64}>
            <PEHeader signedInUser={signedInUser} />

            <HStack gap={32} style={{ flexWrap: 'wrap', margin: 16 }} className="max-w-screen-xl">
                {tiles.map(({ title, path }) => (
                    <Link key={path} href={path} className="no-underline">
                        <ButtonBase>
                            <Paper style={tileStyle} elevation={3} className="text-heading-m">
                                {title}
                            </Paper>
                        </ButtonBase>
                    </Link>
                ))}
            </HStack>

            <Spacer />

            <PEFooter />
        </VStack>
    );
}
