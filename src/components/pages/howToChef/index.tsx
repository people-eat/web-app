import { Button } from '@mui/material';
import Link from 'next/link';
import { type ReactElement } from 'react';
import useResponsive from '../../../hooks/useResponsive';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PEHeaderMobile from '../../header/PEHeaderMobile';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';

export default function HowToChefPage(): ReactElement {
    const { isMobile } = useResponsive();

    return (
        <VStack className="w-full">
            {isMobile ? <PEHeaderMobile /> : <PEHeader />}

            <VStack className="w-full max-w-screen-xl">
                <VStack
                    className="w-full"
                    style={{
                        backgroundImage: 'url(/picture-1.png)',
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        height: 502,
                        borderRadius: '16px',
                    }}
                >
                    <Spacer />
                    <VStack style={{ gap: 32 }}>
                        <span className="text-white text-2xl font-semibold">Become part of the fastest growing</span>
                        <span className="text-white text-2xl font-semibold">network in Germany</span>
                        <Link href={'chef-sign-up'}>
                            <Button variant="contained">Start now</Button>
                        </Link>
                    </VStack>
                    <Spacer />
                </VStack>
            </VStack>
            <PEFooter />
        </VStack>
    );
}
