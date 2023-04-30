import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import { type ReactElement } from 'react';
import PEButton from '../../../standard/buttons/PEButton';
import PETextField from '../../../standard/textFields/PETextField';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';

export default function ProfilePagePersonalTab(): ReactElement {
    const { t } = useTranslation('common');

    return (
        <VStack className="w-full max-w-screen-xl" style={{ gap: 16 }}>
            <HStack className="w-full bg-white shadow-md" style={{ padding: 16, alignItems: 'center', borderRadius: 16 }}>
                <VStack style={{ alignItems: 'flex-start' }}>
                    <span>{'First Name'}</span>
                    <span>{'Last Name'}</span>
                </VStack>
                <Spacer />
                <Link href="/chef-sign-up" className="no-underline">
                    <PEButton onClick={(): void => undefined} title={t('how-to-become-a-chef')} />
                </Link>
            </HStack>

            <VStack className="w-full bg-white shadow-md" style={{ padding: 16, alignItems: 'center', borderRadius: 16 }}>
                <HStack className="w-full">
                    <span>{t('personal-information-label')}</span>
                    <Spacer />
                </HStack>
                <HStack className="w-full" style={{ justifyContent: 'center', flexWrap: 'wrap', gap: 16 }}>
                    <VStack style={{ alignItems: 'flex-start', flex: 1, minWidth: 420 }}>
                        <span>{t('first-name-label')}</span>
                        <PETextField disabled type="text" />
                    </VStack>
                    <VStack style={{ alignItems: 'flex-start', flex: 1, minWidth: 420 }}>
                        <span>{t('last-name-label')}</span>
                        <PETextField disabled type="text" />
                    </VStack>
                    <VStack style={{ alignItems: 'flex-start', flex: 1, minWidth: 420 }}>
                        <span>{t('birthday-label')}</span>
                        <PETextField disabled type="text" />
                    </VStack>
                    <VStack style={{ alignItems: 'flex-start', flex: 1, minWidth: 420 }}>
                        <span>{t('email-address-label')}</span>
                        <PETextField disabled type="text" />
                    </VStack>
                    <VStack style={{ alignItems: 'flex-start', flex: 1, minWidth: 420 }}>
                        <span>{t('phone-number-label')}</span>
                        <PETextField disabled type="text" />
                    </VStack>
                </HStack>
            </VStack>

            <VStack className="w-full bg-white shadow-md" style={{ padding: 16, alignItems: 'center', borderRadius: 16 }}>
                <HStack className="w-full">
                    <span>{t('addresses-label')}</span>
                    <Spacer />
                </HStack>
            </VStack>
        </VStack>
    );
}
