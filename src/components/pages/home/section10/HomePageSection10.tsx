import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { type ReactElement } from 'react';
import VStack from '../../../utility/vStack/VStack';

export default function HomePageSection10(): ReactElement {
    const { t } = useTranslation('home');

    return (
        <VStack className="w-full my-[140px] sm:my-[40px]">
            <p className="text-heading-m lg:text-rem-heading-xm lg:uppercase">{t('support-section-header')}</p>

            <Link href="https://entrepreneurship-centre.fs.de/portfolio/peopleeat" style={{ width: '100%', flex: 1 }}>
                <Image
                    unoptimized
                    src="/frankfurt-school.png"
                    alt=""
                    width={400}
                    height={200}
                    style={{ objectFit: 'cover', width: '75%' }}
                />
            </Link>
        </VStack>
    );
}
