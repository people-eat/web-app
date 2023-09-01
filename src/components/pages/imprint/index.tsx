import useTranslation from 'next-translate/useTranslation';
import { type ReactElement } from 'react';
import { type SignedInUser } from '../../../shared-domain/SignedInUser';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';

export interface ImprintPageProps {
    signedInUser?: SignedInUser;
}

export default function ImprintPage({ signedInUser }: ImprintPageProps): ReactElement {
    const { t } = useTranslation('imprint');

    return (
        <VStack className="w-full min-h-screen gap-16">
            <PEHeader signedInUser={signedInUser} />

            <VStack className="w-full max-w-screen-xl gap-4 lg:px-4 box-border" style={{ alignItems: 'flex-start' }}>
                <h1 className="text-heading-xl m-0 p-0 max-w-screen-lg">{t('imprint')}</h1>
                <p className="leading-16">
                    {t('point-1')}
                    <br />
                    <br />
                    {/* {t('point-2')}
                    <br />
                    <br /> */}
                    {t('point-3')}
                    <br />
                    <br />
                    {t('point-4')}
                    <br />
                    <br />
                    {t('point-5')}
                    <br />
                    <br />
                    {t('point-6')}
                </p>
            </VStack>

            <Spacer />

            <PEFooter />
        </VStack>
    );
}
