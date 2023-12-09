import Image from 'next/image';
import { type ReactElement } from 'react';
import PEButton from '../../../standard/buttons/PEButton';
import styles from './HomePageSection6.module.css';

export default function HomePageSection6(): ReactElement {
    return (
        <div className={styles.section}>
            <div>
                <h2>Geschenkgutschein</h2>
                <p>
                    Verschenke ein unvergessliches Geschmackserlebniss an deine Lieben. Schaffe unvergessliche Momente nach ihren
                    kulinarischen Wünschen und bringe einen Koch im zu Ihnen nachhause. Denke daran, der Koch kümmert sich um den Einkauf,
                    das Kochen, Servieren und hinterlässt die Küche sauber.{' '}
                </p>
                <PEButton title="Gutschein verschenken" onClick={(): void => undefined} />
            </div>
            <Image unoptimized src="/home/5/gutschein.png" alt="" width={600} height={400} />
        </div>
    );
}
