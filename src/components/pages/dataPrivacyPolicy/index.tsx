import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { type ReactElement } from 'react';
import { type SignedInUser } from '../../../shared/SignedInUser';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import VStack from '../../utility/vStack/VStack';

export interface DataPrivacyPolicyPageProps {
    signedInUser?: SignedInUser;
    latestPrivacyPolicyUpdate?: {
        privacyPolicyUpdateId: string;
        englishText: string;
        germanText: string;
        createdAt: Date;
    };
}

export default function DataPrivacyPolicyPage({ signedInUser, latestPrivacyPolicyUpdate }: DataPrivacyPolicyPageProps): ReactElement {
    const { t } = useTranslation('common');
    const { locale } = useRouter();

    return (
        <VStack className="w-full" style={{ gap: 80 }}>
            <PEHeader signedInUser={signedInUser} />

            <VStack className="w-full max-w-screen-xl" style={{ gap: 64, alignItems: 'flex-start' }}>
                <h1 className="text-heading-xl m-0 p-0 max-w-screen-lg">{t('data-privacy-policy')}</h1>
                {latestPrivacyPolicyUpdate && (
                    <div
                        dangerouslySetInnerHTML={{
                            __html: locale === 'en' ? latestPrivacyPolicyUpdate.englishText : latestPrivacyPolicyUpdate.germanText,
                        }}
                    />
                )}
                {!latestPrivacyPolicyUpdate && <>Currently no privacy policy is available</>}
            </VStack>

            <PEFooter />
        </VStack>
    );
}
