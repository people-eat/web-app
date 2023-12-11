import Image from 'next/image';
import { type ReactElement } from 'react';
import styles from './HomePageSection2.module.css';

export default function HomePageSection2(): ReactElement {
    return (
        <div className={styles.section}>
            <h2 className={styles.newSectionTitle}>Finde in nur wenigen Schritten einen Koch für Zuhause</h2>
            <div className={styles.newSectionBody}>
                <div className={styles.newSectionEntry}>
                    <Image src="/home/2/köche.png" alt="" width={380} height={240} className={styles.newSectionEntryImage} />
                    <h3 className={styles.newSectionEntryTitle}>Finde einen Koch in deiner Umgebung</h3>
                    <p className={styles.newSectionEntryDescription}>
                        Wähle einen Koch oder aus verschiedenen Menüvorschlägen aus. Wenn du nach einer speziellen Küche oder einer
                        Kategorie suchst, hilft dir unsere Filterfunktion weiter. Du hast nichts passendes in deiner Umgebung gefunden? Dann
                        sende uns eine individuelle Anfrage. Unser Netzwerk aus Köchen wächst stetig weiter.{' '}
                    </p>
                </div>
                <div className={styles.newSectionEntry}>
                    <Image src="/home/2/menü-gerichte.png" alt="" width={380} height={240} className={styles.newSectionEntryImage} />
                    <h3 className={styles.newSectionEntryTitle}>Stelle dein Menü individuell zusammen</h3>
                    <p className={styles.newSectionEntryDescription}>
                        Wähle einen Koch oder aus verschiedenen Menüvorschlägen aus. Wenn du nach einer speziellen Küche oder einer
                        Kategorie suchst, hilft dir unsere Filterfunktion weiter. Du hast nichts passendes in deiner Umgebung gefunden? Dann
                        sende uns eine individuelle Anfrage. Unser Netzwerk aus Köchen wächst stetig weiter.{' '}
                    </p>
                </div>
                <div className={styles.newSectionEntry}>
                    <Image src="/home/2/chat.png" alt="" width={380} height={240} className={styles.newSectionEntryImage} />
                    <h3 className={styles.newSectionEntryTitle}>Kommuniziert gemeinsam via Chat</h3>
                    <p className={styles.newSectionEntryDescription}>
                        Sobald dein ausgewählter Koch die Anfrage bestätigt, können die letzten Einzelheiten via Chat gemeinsam abgestimmt
                        werden. Menüanpassungen können nach der Buchung selbstverständlich erfolgen.
                    </p>
                </div>
            </div>
        </div>
    );
}
