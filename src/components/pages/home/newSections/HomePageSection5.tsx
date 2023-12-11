import Image from 'next/image';
import { type ReactElement } from 'react';
import PEButton from '../../../standard/buttons/PEButton';
import { Icon } from '../../../standard/icon/Icon';
import PEIcon from '../../../standard/icon/PEIcon';
import styles from './HomePageSection5.module.css';

export default function HomePageSection5(): ReactElement {
    return (
        <div className={styles.section}>
            <h2 className={styles.title}>Deine nächste Feier ist nur einen klick entfernt</h2>
            <div className={styles.body}>
                <Image src="/home/5/dining.jpeg" alt="" width={640} height={500} className={styles.image} />
                <div className={styles.entriesAndButton}>
                    <div className={styles.entries}>
                        <div className={styles.entry}>
                            <PEIcon icon={Icon.checkCircle} />
                            <h3>Stelle eigene Menüs zusammen</h3>
                            <p>Erstelle aus einer vielzahl von vorgeschlagenen menüs deine eigenen Kreationen für deinen Anlass</p>
                        </div>
                        <div className={styles.entry}>
                            <PEIcon icon={Icon.checkCircle} />
                            <h3>Support rund um die Uhr</h3>
                            <p>Du hast Fragen zu deiner Buchung, oder benötigst Hilfe bei deinem Anliegen? Wir sind 24/7 für dich da</p>
                        </div>
                        <div className={styles.entry}>
                            <PEIcon icon={Icon.checkCircle} />
                            <h3>Kundenbewertungen</h3>
                            <p>Sei dir bei deiner Buhcung sicher und Wähle einen Koch anhand von Bewertungen, Level und Rezensionen, aus</p>
                        </div>
                        <div className={styles.entry}>
                            <PEIcon icon={Icon.checkCircle} />
                            <h3>Sichere Bezahlung</h3>
                            <p>
                                Geschützte Zahlungen durch SSL-Technologie. Deine Zahlung wird erst freigegeben, nachdem deine Buchung von
                                deinem Koch bestätigt wurde
                            </p>
                        </div>
                    </div>
                    <div className={styles.buttonContainer}>
                        <PEButton title="Koch finden" onClick={(): void => undefined} className="max-w-sm" />
                    </div>
                </div>
            </div>
        </div>
    );
}
