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

export default function AdministrationPage({ signedInUser }: AdministrationPageProps): ReactElement {
    const tiles: string[] = [
        'Users',
        'Chefs',
        'Administrators',
        'Statistics',
        'Feature Toggles',
        'Search Requests',
        'Categories',
        'Languages',
        'Allergies',
        'Terms and Conditions',
        'Privacy Policy Statement',
        'Global Booking Requests',
    ];

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
                {tiles.map((tile, index) => (
                    <Link key={index} href="/" className="no-underline">
                        <ButtonBase>
                            <Paper style={tileStyle} elevation={3} className="text-heading-m">
                                {tile}
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
