import Link from 'next/link';
import { type ReactElement } from 'react';
import PEButton from '../../../standard/buttons/PEButton';
import VStack from '../../../utility/vStack/VStack';
import { header, signUpBtn } from '../translations.mock';

export default function HowToChefSection1(): ReactElement {
    return (
        <VStack className="w-full max-w-screen-xl lg:px-8 box-border">
            <VStack
                className="w-full mt-10"
                style={{
                    backgroundImage: 'url(/picture-1.png)',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    height: 502,
                    borderRadius: '16px',
                }}
            >
                <VStack style={{ gap: 32 }}>
                    <div className="flex mt-[120px] text-heading-xxl max-w-[1040px] leading-[80px] w-full lg:justify-center">
                        <h2 className="w-full text-white text-center w-full text-heading-xl m-0 p-0 lg:uppercase">{header}</h2>
                    </div>
                    <Link href={'chef-sign-up'} className="no-underline">
                        <PEButton className="min-w-[300px]" onClick={(): void => undefined} title={signUpBtn} />
                    </Link>
                </VStack>
            </VStack>
        </VStack>
    );
}
