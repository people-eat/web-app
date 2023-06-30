import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { type ReactElement } from 'react';
import { type SignedInUser } from '../../../shared/SignedInUser';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';

export interface TermsAndConditionsPageProps {
    signedInUser?: SignedInUser;
    latestTermsUpdate?: {
        termsUpdateId: string;
        englishText: string;
        germanText: string;
        createdAt: Date;
    };
}

export default function TermsAndConditionsPage({ signedInUser, latestTermsUpdate }: TermsAndConditionsPageProps): ReactElement {
    const { t } = useTranslation('common');
    const { locale } = useRouter();

    return (
        <VStack className="w-full min-h-screen" style={{ gap: 80 }}>
            <PEHeader signedInUser={signedInUser} />

            <VStack className="w-full max-w-screen-xl" style={{ gap: 64, alignItems: 'flex-start' }}>
                <h1 className="text-heading-xl m-0 p-0 max-w-screen-lg">{t('terms-and-conditions')}</h1>
                {latestTermsUpdate && (
                    <div
                        dangerouslySetInnerHTML={{ __html: locale === 'en' ? latestTermsUpdate.englishText : latestTermsUpdate.germanText }}
                    />
                )}
                {!latestTermsUpdate && <>Currently no terms and conditions are available</>}
            </VStack>

            <Spacer />

            <PEFooter />
        </VStack>
    );
}
