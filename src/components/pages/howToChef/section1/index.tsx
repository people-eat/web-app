import Link from 'next/link';
import { type ReactElement } from 'react';
import useResponsive from '../../../../hooks/useResponsive';
import PEButton from '../../../standard/buttons/PEButton';
import VStack from '../../../utility/vStack/VStack';
import { header, signUpBtn } from '../translations.mock';

export default function HowToChefSection1(): ReactElement {
    const { isMobile } = useResponsive();
    return (
        <VStack className="w-full max-w-screen-xl lg_min:px-8 box-border">
            <VStack
                className="w-full md:w-screen mt-10 md:mt-0 rounded-4 md:rounded-[0px]"
                style={{
                    backgroundImage: 'url(/picture-1.png)',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    height: isMobile ? 700 : 502,
                }}
            >
                <VStack style={{ gap: 32 }}>
                    <div className="flex mt-[120px] md:mt-[500px] md:px-8 box-border text-heading-xxl max-w-[1040px] leading-[80px] w-full lg:justify-center">
                        <h2 className="w-full text-white text-center w-full text-heading-xl md:text-heading-s m-0 p-0">{header}</h2>
                    </div>
                    <Link href={'chef-sign-up'} className="no-underline">
                        <PEButton className="min-w-[300px]" onClick={(): void => undefined} title={signUpBtn} />
                    </Link>
                </VStack>
            </VStack>
        </VStack>
    );
}
