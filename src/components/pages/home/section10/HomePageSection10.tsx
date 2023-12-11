import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import Link from 'next/link';
import { type ReactElement } from 'react';
import styles from './HomePageSection10.module.css';

export default function HomePageSection10(): ReactElement {
    const { t } = useTranslation('home');

    return (
        <div className={styles.section}>
            <h2 className={styles.title}>{t('support-section-header')}</h2>

            <Link href="https://entrepreneurship-centre.fs.de/portfolio/peopleeat" className={styles.imageWrapper}>
                <Image unoptimized src="/frankfurt-school.png" alt="" width={400} height={200} className={styles.image} />
            </Link>
        </div>
    );
}
