import { useMutation, useQuery } from '@apollo/client';
import { CircularProgress, Dialog, DialogContent, DialogTitle, Divider } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import classNames from 'classnames';
import moment from 'moment';
import useTranslation from 'next-translate/useTranslation';
import { useContext, useState, type ReactElement } from 'react';
import {
    CreateOneUserBookingRequestDocument,
    GetProfileQueryDocument,
    type CreateBookingRequestRequest,
    type CreateConfiguredMenuCourseRequest,
    type GetPublicMenuPageDataQuery,
    type Price,
} from '../../../data-source/generated/graphql';
import { type GoogleMapsPlacesResult } from '../../../data-source/searchAddress';
import { PublicMenuPageContext } from '../../../pages/menus/[menuId]';
import { type Allergy } from '../../../shared-domain/Allergy';
import { type Location } from '../../../shared-domain/Location';
import { formatPrice } from '../../../shared-domain/formatPrice';
import { geoDistance } from '../../../utils/geoDistance';
import BookingRequestForm from '../../BookingRequestForm';
import SignInDialog from '../../SignInDialog';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import PEButton from '../../standard/buttons/PEButton';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';
import { calculateMenuPrice } from '../cookProfile/menusTab/createMenu/createMenuStep3/ChefProfilePageCreateMenuStep3';
import Payment from '../menuBookingRequest/Payment';
import styles from './PublicMenu.module.css';
import PublicMenuCourses from './PublicMenuCourses';
import PublicMenuSummaryHeader from './PublicMenuSummaryHeader';

interface PublicMenuPageProps {
    searchParameters: {
        location: {
            address: string;
            latitude: number;
            longitude: number;
        };
        adults: number;
        children: number;
        date: string;
    };
    allergies: Allergy[];
    publicMenu: NonNullable<GetPublicMenuPageDataQuery['publicMenus']['findOne']>;
    stripePublishableKey: string;
}

// eslint-disable-next-line max-statements
export default function PublicMenuPage({
    publicMenu,
    searchParameters,
    allergies,
    stripePublishableKey,
}: PublicMenuPageProps): ReactElement {
    const { signedInUser, setSignedInUser } = useContext(PublicMenuPageContext);

    const { t } = useTranslation('common');

    const [showSignInDialog, setShowSignInDialog] = useState(false);

    const [address, setAddress] = useState<string>(searchParameters.location.address);
    const [selectedLocation, setSelectedLocation] = useState<Location | undefined>(undefined);
    const [addressSearchResults, setAddressSearchResults] = useState<GoogleMapsPlacesResult[]>([]);

    const [adults, setAdults] = useState(searchParameters.adults);
    const [children, setChildren] = useState(searchParameters.children);
    const [dateTime, setDateTime] = useState(moment(searchParameters.date).set('hours', 12).set('minutes', 0));

    const moreThanTwoWeeksInTheFuture = dateTime.diff(moment(), 'days');

    const [occasion, setOccasion] = useState('');
    const [message, setMessage] = useState<string>('');

    const [selectedAllergies, setSelectedAllergies] = useState<Allergy[]>([]);

    const { refetch } = useQuery(GetProfileQueryDocument);

    const [stripeClientSecret, setStripeClientSecret] = useState<string | undefined>();

    const [completionState, setCompletionState] = useState<undefined | 'SUCCESSFUL' | 'FAILED'>(undefined);
    const [loading, setLoading] = useState(false);

    const [configuredMenuCourses, setConfiguredMenuCourses] = useState<CreateConfiguredMenuCourseRequest[]>([]);
    const [configuredMenuCoursesForPreview, setConfiguredMenuCoursesForPreview] = useState<
        { courseId: string; mealTitle: string; courseTitle: string }[]
    >([]);

    const [displayDetails, setDisplayDetails] = useState(false);

    const distance: number | undefined =
        selectedLocation && geoDistance({ location1: selectedLocation, location2: publicMenu.cook.location });

    const isOutOfCookTravelRadius =
        !!publicMenu.cook.maximumTravelDistance && distance !== undefined && location && distance > publicMenu.cook.maximumTravelDistance;

    const travelExpenses: number | undefined = distance && distance * publicMenu.cook.travelExpenses;

    const menuPrice = calculateMenuPrice(
        adults,
        children,
        publicMenu.basePrice,
        publicMenu.basePriceCustomers,
        publicMenu.pricePerAdult,
        publicMenu.pricePerChild,
    );

    const customerFee = menuPrice * 0.04;
    const stripeTransactionPrice = menuPrice + (travelExpenses ?? 0) + customerFee;
    const finalPrice = (stripeTransactionPrice + 25) / (1 - 0.015);
    const stripeFee = finalPrice - stripeTransactionPrice;
    const serviceFee = stripeFee + customerFee;

    const lineItems: { title: string; price: Price }[] = [];

    lineItems.push({
        title: 'Menüpreis',
        price: { amount: menuPrice, currencyCode: 'EUR' },
    });

    if (travelExpenses && !isOutOfCookTravelRadius) {
        lineItems.push({
            title: 'Reisekosten',
            price: { amount: travelExpenses, currencyCode: 'EUR' },
        });
    }

    lineItems.push({
        title: 'Service Gebühren',
        price: { amount: serviceFee, currencyCode: 'EUR' },
    });

    const costs: { lineItems: { title: string; price: Price }[]; total: Price } = {
        lineItems: lineItems,
        total: {
            amount: finalPrice,
            currencyCode: 'EUR',
        },
    };

    const [createMenuBookingRequest] = useMutation(CreateOneUserBookingRequestDocument);
    const [bookingRequestId, setBookingRequestId] = useState<string | undefined>(undefined);

    function onBook(): void {
        const menuBookingRequest: CreateBookingRequestRequest = {
            adultParticipants: adults,
            children,
            dateTime: dateTime.toDate(),
            duration: 120,
            location: {
                latitude: selectedLocation?.latitude ?? 0,
                longitude: selectedLocation?.latitude ?? 0,
                text: address,
            },
            occasion,
            price: {
                // TODO: remove this from menu booking params. Should be calculated on the server side
                amount: finalPrice,
                currencyCode: 'EUR',
            },
            // allergyIds: selectedAllergies.map(({ allergyId }) => allergyId),
            message,
            cookId: publicMenu.cook.cookId,
            preparationTime: 120,
            configuredMenu: {
                menuId: publicMenu.menuId,
                courses: configuredMenuCourses,
            },
        };

        setLoading(true);

        void createMenuBookingRequest({
            variables: {
                userId: signedInUser?.userId ?? '',
                request: menuBookingRequest,
            },
        })
            .then(({ data }) => {
                if (data?.users.bookingRequests.createOne.success) {
                    setCompletionState('SUCCESSFUL');
                    setStripeClientSecret(data.users.bookingRequests.createOne.clientSecret);
                    setBookingRequestId(data.users.bookingRequests.createOne.bookingRequestId);
                } else setCompletionState('FAILED');
            })
            .catch(() => setCompletionState('FAILED'))
            .finally(() => setLoading(false));
    }

    if (!publicMenu) return <>Menu not found</>;

    return (
        <VStack className="w-full" gap={32}>
            <PEHeader signedInUser={signedInUser} />

            <main className={styles.container}>
                <PublicMenuSummaryHeader
                    publicMenu={publicMenu}
                    adults={adults}
                    childrenCount={children}
                    calculatedMenuPrice={menuPrice}
                    className={classNames(displayDetails ? styles.hiddenOnMobile : '')}
                />

                <div className={styles.body}>
                    <PublicMenuCourses
                        publicMenu={publicMenu}
                        onCourseSelectionChange={(a, b): void => {
                            setConfiguredMenuCourses(a);
                            setConfiguredMenuCoursesForPreview(b);
                        }}
                        className={classNames(displayDetails ? styles.hiddenOnMobile : '')}
                    />

                    <PEButton
                        title="Weiter"
                        className={classNames(styles.nextButton, styles.hiddenOnDesktop, displayDetails ? styles.hiddenOnMobile : '')}
                        onClick={(): void => setDisplayDetails(true)}
                    />

                    <BookingRequestForm
                        onBack={(): void => setDisplayDetails(false)}
                        className={classNames(displayDetails ? '' : styles.hiddenOnMobile)}
                        signedInUser={signedInUser}
                        allergies={allergies}
                        costs={costs}
                        onComplete={(): void => onBook()}
                        address={address}
                        setAddress={setAddress}
                        location={selectedLocation}
                        setLocation={setSelectedLocation}
                        cookMaximumTravelDistance={publicMenu.cook.maximumTravelDistance ?? undefined}
                        cookLocation={publicMenu.cook.location}
                        addressSearchResults={addressSearchResults}
                        setAddressSearchResults={setAddressSearchResults}
                        adults={adults}
                        setAdults={setAdults}
                        // eslint-disable-next-line react/no-children-prop
                        children={children}
                        setChildren={setChildren}
                        dateTime={dateTime}
                        setDateTime={setDateTime}
                        occasion={occasion}
                        setOccasion={setOccasion}
                        message={message}
                        setMessage={setMessage}
                        selectedAllergies={selectedAllergies}
                        setSelectedAllergies={setSelectedAllergies}
                        onShowSignInDialog={(): void => setShowSignInDialog(!showSignInDialog)}
                    />
                </div>
            </main>

            <Dialog open={showSignInDialog} maxWidth="md">
                <DialogTitle>{'Anmelden'}</DialogTitle>
                <DialogContent>
                    <SignInDialog
                        onSuccess={(): void => {
                            refetch()
                                .then((data) => {
                                    setShowSignInDialog(false);
                                    if (data.data.users.me) {
                                        setSignedInUser({
                                            userId: data.data.users.me.userId,
                                            firstName: data.data.users.me.firstName,
                                            isCook: data.data.users.me.isCook,
                                            isAdmin: data.data.users.me.isAdmin,
                                        });
                                    }
                                })
                                .catch((e) => console.error(e));
                        }}
                        onFail={(): void => undefined}
                    />
                </DialogContent>
            </Dialog>

            {completionState === 'SUCCESSFUL' && stripeClientSecret && (
                <Dialog open maxWidth="md">
                    <DialogTitle>Zahlungsmittel hinterlegen</DialogTitle>

                    <Elements stripe={loadStripe(stripePublishableKey)} options={{ clientSecret: stripeClientSecret }}>
                        <Payment userId={signedInUser!.userId} bookingRequestId={bookingRequestId!}>
                            {costs && (
                                <VStack gap={16} style={{ width: '100%', flex: 1 }} className={styles.hiddenOnMobile}>
                                    <h3 style={{ lineHeight: 0 }}>{publicMenu.title}</h3>

                                    {configuredMenuCoursesForPreview.map(({ courseId, courseTitle, mealTitle }) => (
                                        <VStack key={courseId}>
                                            <b>{courseTitle}</b>
                                            <div>{mealTitle}</div>
                                        </VStack>
                                    ))}

                                    <Spacer />

                                    <Divider flexItem />

                                    {costs.lineItems.map((lineItem, index) => (
                                        <HStack className="w-full" key={index}>
                                            <span>{lineItem.title}</span>
                                            <Spacer />
                                            <span>{formatPrice(lineItem.price)}</span>
                                        </HStack>
                                    ))}

                                    <HStack className="w-full">
                                        <span>
                                            <b>Gesamtsumme</b>
                                        </span>
                                        <Spacer />
                                        <span>
                                            <b>{formatPrice(costs.total)}</b>
                                        </span>
                                    </HStack>

                                    {moreThanTwoWeeksInTheFuture <= 14 && (
                                        <div className="text-text-sm" style={{ color: 'gray' }}>
                                            Der Gesamtbetrag wird erst dann eingezogen wenn der Koch die Anfrage akzeptiert hat.
                                        </div>
                                    )}

                                    {moreThanTwoWeeksInTheFuture > 14 && (
                                        <div className="text-text-sm" style={{ color: 'gray' }}>
                                            Nachdem der Koch die Anfrage akzeptiert hat, wird die Gesamtsumme 2 Wochen vor dem Event
                                            eingezogen (zuvor wird eine Ankündigungsmail verschickt).
                                        </div>
                                    )}
                                </VStack>
                            )}
                        </Payment>
                    </Elements>
                </Dialog>
            )}

            <Dialog open={loading}>
                <DialogContent>
                    <CircularProgress />
                </DialogContent>
            </Dialog>

            <Dialog open={completionState === 'FAILED'}>
                <DialogContent>{t('error')}</DialogContent>
            </Dialog>

            <PEFooter className={styles.hiddenOnMobile} />
        </VStack>
    );
}
