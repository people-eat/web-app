import Image from 'next/image';
import { type ReactElement } from 'react';
import PEButton from '../../../standard/buttons/PEButton';
import styles from './HomePageSection4.module.css';

export default function HomePageSection4(): ReactElement {
    return (
        <div className={styles.section}>
            <div className={styles.sectionContent}>
                <h2 className={styles.title}>Entdecke einzigartige Menükreationen von talentierten Köchen</h2>
                <p>
                    Finde individuelle Menüvorschläge, die von talentierten Köchen zusammengestellt werden. Ganz gleich, ob du eine
                    Dinnerparty veranstaltest, einen besonderen Anlass feierst oder einfach nur Lust auf ein Gourmet-Menü hast, bei uns
                    findest du das Richtige für deinen Anlass.
                </p>

                <PEButton title="Menüs entdecken" onClick={(): void => undefined} className="max-w-sm" />
            </div>

            <Image unoptimized src="/home/4/dining.png" alt="" width={600} height={400} className={styles.image} />
        </div>
    );
}
