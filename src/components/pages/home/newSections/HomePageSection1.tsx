import classNames from 'classnames';
import Image from 'next/image';
import Link from 'next/link';
import { type ReactElement } from 'react';
import PEButton from '../../../standard/buttons/PEButton';
import styles from './HomePageSection1.module.css';

export default function HomePageSection1(): ReactElement {
    return (
        <div className={styles.section}>
            <div>
                <h2>Feiere einzigartige Anlässe und kreiere unvergessliche Momente</h2>
                <p>
                    Entdecke Privatköche für jeden Anlass bei dir Zuhause. Egal, ob du ein Treffen mit deinen Freunden, ein Team-Event,
                    einen Geburtstag planst oder ein Familienessen organisierst, PeopleEat bietet dir die Plattform auf der du deine
                    Lebensmomente mit kulinarischen Erlebnissen verbindest.
                </p>
                <Link href="/chefs" className={classNames(styles.buttonContainer)}>
                    <PEButton title="Finde einen Koch" onClick={(): void => undefined} className="max-w-sm" />
                </Link>
            </div>
            <Image unoptimized src="/home/1/party.png" width={420} height={340} alt="" className={styles.image} />
        </div>
    );
}
