import { type GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { type ReactElement } from 'react';
import PEFooter from '../../components/footer/PEFooter';
import PEHeader from '../../components/header/PEHeader';
import PEButton from '../../components/standard/buttons/PEButton';
import { Icon } from '../../components/standard/icon/Icon';
import PEIcon from '../../components/standard/icon/PEIcon';
import HStack from '../../components/utility/hStack/HStack';
import VStack from '../../components/utility/vStack/VStack';
import { createApolloClient } from '../../data-source/createApolloClient';
import { GetProfileQueryDocument } from '../../data-source/generated/graphql';
import useResponsive from '../../hooks/useResponsive';
import { type SignedInUser } from '../../shared-domain/SignedInUser';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const apolloClient = createApolloClient(req.headers.cookie);
    const { data: profileData } = await apolloClient.query({ query: GetProfileQueryDocument });

    return {
        props: {
            signedInUser: profileData.users.me,
        },
    };
};

interface EventsProps {
    signedInUser?: SignedInUser;
}

function Content({ signedInUser }: EventsProps): ReactElement {
    const { isMobile, isTablet } = useResponsive();
    // const stripePaymentUrl: string = 'https://buy.stripe.com/14kaIm0SPdnX64gdQT';
    const h2Styles: React.CSSProperties = {
        color: '#18181B',
        position: 'absolute',
        top: isTablet ? '140px' : isMobile ? '15vh' : '120px',
        width: isTablet ? '60%' : 'auto',
        maxWidth: '700px',
    };

    return (
        <VStack className="w-full">
            <PEHeader signedInUser={signedInUser} />

            <VStack gap={16} className="max-w-screen-xl" style={{ marginBottom: 64, padding: 16 }}>
                <HStack className="max-w-screen-xl">
                    <VStack style={{ alignItems: 'flex-start' }}>
                        <h1 className="text-orange text-3xl">Nächstes Event</h1>

                        {!isMobile && (
                            <div className="w-full h-[90px]">
                                <h2 style={h2Styles}>
                                    Soul Symphony: <br /> Eine transformative Verschmelzung aus Yoga, Meditation und veganer Küche
                                </h2>
                            </div>
                        )}

                        {isMobile && (
                            <h2 style={{ color: '#18181B' }}>
                                Soul Symphony: <br /> Eine transformative Verschmelzung aus Yoga, Meditation und veganer Küche
                            </h2>
                        )}

                        <VStack className="w-full" gap={32} style={{ alignItems: 'flex-start' }}>
                            <HStack style={{ justifyContent: 'start', alignItems: 'center', flexWrap: 'wrap' }} gap={6}>
                                <Link href="https://yogaloft-frankfurt.de" target="_blank">
                                    <Image
                                        unoptimized
                                        className="cursor-pointer block"
                                        src={'/events/Yogaloft.png'}
                                        alt="YogaLoft"
                                        width={40}
                                        height={40}
                                    />
                                </Link>
                                <PEIcon icon={Icon.close} edgeLength={15} />
                                <Link href="/">
                                    <Image
                                        unoptimized
                                        className="cursor-pointer block"
                                        src={'/people-eat-logo-title.png'}
                                        alt="PeopleEat"
                                        width={203}
                                        height={46}
                                    />
                                </Link>
                                <PEIcon icon={Icon.close} edgeLength={15} />
                                <Link href="https://grainology.de" target="_blank">
                                    <Image
                                        unoptimized
                                        className="cursor-pointer block"
                                        src="/events/Grainology.png"
                                        alt="grainology"
                                        width={120}
                                        height={40}
                                    />
                                </Link>
                            </HStack>

                            <PEButton title="Jetzt Buchen" disabled onClick={(): void => undefined} className="w-full" />

                            <HStack style={{ display: 'flex', flexDirection: 'column' }}>
                                <VStack style={{ display: 'flex', flexDirection: 'row', marginBottom: '8px' }}>
                                    <div className="flex flex-col" style={{ marginRight: '18px' }}>
                                        <span className="font-bold">Wann:</span>
                                        <span className="font-bold">16.09.2023</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="font-bold">Uhrzeit:</span>
                                        <span className="font-bold">10:45 - 14:30 Uhr</span>
                                    </div>
                                </VStack>
                                <div className="flex flex-col">
                                    <span className="font-bold">Wo:</span>
                                    <span className="font-bold">Nio House Frankfurt</span>
                                </div>
                            </HStack>
                        </VStack>
                    </VStack>

                    {/* <Spacer /> */}

                    {!isMobile && (
                        <VStack
                            className="pr-8 w-full h-[600px]"
                            style={{
                                backgroundImage: 'url(/events/Groupvector.svg)',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right',
                                backgroundSize: 'cover',
                            }}
                        >
                            <Image unoptimized src="/events/group1.jpeg" alt="deco" width={800} height={520} />
                        </VStack>
                    )}
                </HStack>

                <VStack className="max-w-screen-xl" style={{ alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <h2 className="text-orange text-3xl" style={{ lineHeight: '48px', marginTop: 0 }}>
                        Eventbeschreibung
                    </h2>

                    <h3>Höhepunkte des Events</h3>

                    <p style={{ lineHeight: 2 }}>
                        Schließe dich uns für ein einmaliges Event an, bei dem die renommierte Yoga-Trainerin Eva Gouveia im Mittelpunkt
                        steht. Eva ist die visionäre Kraft hinter YogaLoft Frankfurt. Sie wird dich durch eine transformative 50-minütige
                        Hatha-Flow-Yoga stunde führen, die darauf abzielt, Spannungen zu lösen und Harmonie sowohl in Körper als auch Geist
                        wiederherzustellen. Tauche ein in den Fluss von Bewegung und Atem, während du die Belastungen des Alltags hinter dir
                        lässt. Mit dem sanften Abschluss der Yogastunde erwartet dich eine 15-minütige Meditations-Session, die von Eva
                        persönlich geleitet wird. Diese Meditation öffnet die Pforten zur inneren Gelassenheit und ermöglicht es dir, deine
                        Sorgen beiseitezuschieben, eine tiefe Verbindung zu deinem Inneren aufzubauen und eine Fülle positiver Energie zu
                        erzeugen, die dich noch lange nach dem Event begleiten wird.
                    </p>

                    {isMobile && (
                        <Image
                            unoptimized
                            src="/events/yoga.jpg"
                            alt="yoga"
                            height={300}
                            width={250}
                            style={{ borderRadius: '18px', objectFit: 'cover' }}
                            className="shadow-active"
                        />
                    )}

                    <h3>Kulinarische Entdeckung: Vegane Masterclass</h3>

                    <p style={{ lineHeight: 2 }}>
                        Doch die Reise endet hier nicht. Nachdem Körper und Geist in Einklang gebracht wurden, ist es an der Zeit, deine
                        Geschmacksknospen mit einer veganen Masterclass zu verwöhnen, die von PeopleEat organisiert wird - die erste
                        Plattform, die Privatkoch Erlebnisse für deine Anlässe zu dir Nachhause bringt. Unter der Anleitung eines erfahrenen
                        Privatkochs begibst du dich auf ein kulinarisches Abenteuer wie kein anderes. Kreiere zwei visuell beeindruckende
                        und köstliche Brunch-Gerichte, die die Brillanz der veganen Küche zur Geltung bringen. Unser Brunch-Konzept dreht
                        sich um Granola, eine vielseitige und nahrhafte Zutat, geliefert von Grainology - einem innovativen Frankfurter
                        Start-up, bekannt für seine einzigartigen Granola-Geschmacksrichtungen. Entdecke die Geheimnisse des Kochs, um
                        Gerichte zu zaubern, die nicht nur exquisit schmecken, sondern auch kunstvoll für Instagram geeignet sind. Lass
                        deine Kreativität fließen, während du deine Kreationen anrichtest und deine Gerichte in Meisterwerke verwandelst,
                        die genauso erfreulich anzusehen sind wie sie zu genießen.
                    </p>

                    {isMobile && (
                        <Image
                            unoptimized
                            src="/events/meals.png"
                            alt="nice vegan meals"
                            height={200}
                            width={290}
                            style={{ borderRadius: '18px' }}
                            className="shadow-active"
                        />
                    )}

                    <h3>Netzwerken und Verbinden</h3>

                    <p style={{ lineHeight: 2 }}>
                        Dieses Event dreht sich nicht nur um individuelle Bereicherung; es bietet dir die Möglichkeit, sich mit
                        gleichgesinnten Seelen zu verbinden, die deine Leidenschaft für Wohlbefinden, gutes Essen und authentische
                        Beziehungen teilen. Knüpfe neue Freundschaften und erweitere dein Netzwerk in einer heimischen Atmosphäre.
                    </p>

                    <HStack className="w-full" style={{ alignItems: 'center' }}>
                        <PEButton title=" Jetzt Buchen" disabled onClick={(): void => undefined} className="no-underline p-3 w-full" />
                    </HStack>
                </VStack>
            </VStack>

            <PEFooter />
        </VStack>
    );
}

const Events = ({ signedInUser }: EventsProps): JSX.Element => {
    return (
        <>
            <Head>
                <title>Event | PeopleEat</title>
            </Head>

            <Content signedInUser={signedInUser} />
        </>
    );
};

export default Events;
