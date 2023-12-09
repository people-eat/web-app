import Image from 'next/image';
import { type ReactElement } from 'react';
import PEButton from '../../../standard/buttons/PEButton';
import styles from './HomePageSection3.module.css';

export default function HomePageSection3(): ReactElement {
    return (
        <div className={styles.section}>
            <div className={styles.section3Content}>
                <h2 className={styles.title}>Werde Gastgeber aus Leidenschaft, wir kümmern uns um den Rest</h2>
                <div className={styles.entires}>
                    <div className={styles.section3Entry}>
                        <h3 className={styles.section3EntryTitle}>🛒 Einkauf der Lebensmittel</h3>
                        <p className={styles.section3EntryDescription}>
                            Du erhältst frische und regionale Lebensmittel von deinem Koch zu dir nachhause geliefert und vor Ort zubereitet
                        </p>
                    </div>
                    <div className={styles.section3Entry}>
                        <h3 className={styles.section3EntryTitle}>🍽️ Servieren der Gerichte</h3>
                        <p className={styles.section3EntryDescription}>
                            Lehn dich zurück, lass dich und deine deine Lieben kulinarisch verwöhnen und genieße dir Zeit mit deinen Lieben
                        </p>
                    </div>
                    <div className={styles.section3Entry}>
                        <h3 className={styles.section3EntryTitle}>🫧 Saubere Küche</h3>
                        <p className={styles.section3EntryDescription}>
                            Lass den Abend ausklingen und mache dir als Gastgeber keine Gedanken mehr über eine Saubere Küche
                        </p>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <PEButton title="Koch finden" onClick={(): void => undefined} className="max-w-sm" />
                </div>
            </div>
            <Image unoptimized src="/home/3/dinner.jpeg" alt="" width={500} height={500} className={styles.image} />
        </div>
    );
}
