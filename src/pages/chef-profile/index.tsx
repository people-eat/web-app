import { useLazyQuery, useMutation } from '@apollo/client';
import classNames from 'classnames';
import { type GetServerSideProps, type NextPage } from 'next';
import useTranslation from 'next-translate/useTranslation';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import PEAddressCard from '../../components/cards/address/PEAddressCard';
import PEFooter from '../../components/footer/PEFooter';
import PEHeader from '../../components/header/PEHeader';
import { LoadingDialog } from '../../components/loadingDialog/LoadingDialog';
import PEMap from '../../components/map/PEMap';
import { CookProfileNavigationTabs } from '../../components/navigation/CookProfileNavigationTabs';
import styles from '../../components/pages/cookProfile/cook-bookings.module.css';
import ChefProfileSection1 from '../../components/pages/cookProfile/personalTab/section1/ChefProfileSection1';
import ChefProfileSection2 from '../../components/pages/cookProfile/personalTab/section2/ChefProfileSection2';
import ChefProfileSection5 from '../../components/pages/cookProfile/personalTab/section5/ChefProfileSection5';
import CreateAddressDialog from '../../components/pages/profile/personalTab/CreateAddressDialog';
import UpdateAddressDialog from '../../components/pages/profile/personalTab/UpdateAddressDialog';
import PEButton from '../../components/standard/buttons/PEButton';
import PECheckbox from '../../components/standard/checkbox/PECheckbox';
import PECounter from '../../components/standard/counter/PECounter';
import { Icon } from '../../components/standard/icon/Icon';
import PEIcon from '../../components/standard/icon/PEIcon';
import PEIconButton from '../../components/standard/iconButton/PEIconButton';
import PESlider from '../../components/standard/slider/PESlider';
import HStack from '../../components/utility/hStack/HStack';
import Spacer from '../../components/utility/spacer/Spacer';
import VStack from '../../components/utility/vStack/VStack';
import { createApolloClient } from '../../data-source/createApolloClient';
import {
    CookGetStripeDashboardUrlDocument,
    CookGetStripeOnboardingUrlDocument,
    GetCookProfilePersonalInformationPageDataDocument,
    GetCookProfileQueryDocument,
    GetSignedInUserDocument,
    UpdateCookIsVisibleDocument,
    UpdateCookLocationDocument,
    UpdateCookMaximumParticipantsDocument,
    UpdateCookMaximumTravelDistanceDocument,
    UpdateCookTravelExpensesDocument,
    type GetCookProfilePersonalInformationPageDataQuery,
} from '../../data-source/generated/graphql';
import useResponsive from '../../hooks/useResponsive';
import { type Unpacked } from '../../shared-domain/util-types';

interface ServerSideProps {
    signedInUser: NonNullable<GetCookProfilePersonalInformationPageDataQuery['users']['signedInUser']>;
    profile: NonNullable<GetCookProfilePersonalInformationPageDataQuery['cooks']['findOne']>;
}

export const getServerSideProps: GetServerSideProps<ServerSideProps> = async (context) => {
    const apolloClient = createApolloClient(context.req.headers.cookie);
    const { data: signedInUserData } = await apolloClient.query({ query: GetSignedInUserDocument });

    const signedInUser = signedInUserData.users.signedInUser;

    if (!signedInUser) throw new Error();

    const { data } = await apolloClient.query({
        query: GetCookProfilePersonalInformationPageDataDocument,
        variables: { cookId: signedInUser.userId },
    });

    if (!data.cooks.findOne) throw new Error();

    return {
        props: {
            signedInUser,
            profile: data.cooks.findOne,
        },
    };
};

// eslint-disable-next-line max-statements
const Index: NextPage<ServerSideProps> = ({ signedInUser, profile: initialProfile }) => {
    const { userId: cookId } = signedInUser;

    const { t } = useTranslation('chef-profile');
    const { t: commonTranslations } = useTranslation('common');
    const { isMobile } = useResponsive();

    const [profile, setProfile] = useState(initialProfile);

    const [biography, setBiography] = useState('');

    const [maximumParticipants, setMaximumParticipants] = useState<number | undefined>(undefined);

    const [editOrderDetails, setEditOrderDetails] = useState(false);

    const [travelExpenses, setTravelExpenses] = useState<number | undefined>(0);
    const [maximumTravelDistance, setMaximumTravelDistance] = useState<number | undefined>(undefined);

    const [addAddressDialogOpen, setAddAddressDialogOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<
        Unpacked<Unpacked<NonNullable<GetCookProfilePersonalInformationPageDataQuery['cooks']['findOne']>>['user']['addresses']> | undefined
    >(undefined);

    const [updateTravelExpenses] = useMutation(UpdateCookTravelExpensesDocument, {
        variables: { cookId, travelExpenses: Number(travelExpenses) * 100 },
    });

    const [updateMaximumTravelDistance] = useMutation(UpdateCookMaximumTravelDistanceDocument, {
        variables: { cookId, maximumTravelDistance: maximumTravelDistance ?? 0 },
    });

    const [updateMaximumParticipants] = useMutation(UpdateCookMaximumParticipantsDocument, {
        variables: { cookId, maximumParticipants: maximumParticipants ?? 0 },
    });

    const [fetchProfile, { data, loading: loadingCookProfile, error }] = useLazyQuery(GetCookProfileQueryDocument, {
        variables: { cookId },
    });

    useEffect(() => {
        const updatedProfile = data?.cooks.findOne ?? initialProfile;
        setProfile(updatedProfile);
        if (updatedProfile) setBiography(updatedProfile.biography);
        if (updatedProfile) setTravelExpenses(updatedProfile.travelExpenses / 100);
        if (updatedProfile) setMaximumTravelDistance(updatedProfile.maximumTravelDistance ?? undefined);
        if (updatedProfile) setMaximumParticipants(updatedProfile.maximumParticipants ?? undefined);
    }, [data?.cooks.findOne, initialProfile]);

    function handleUpdateOrderDetails(
        value: number,
        updateValue: (value: ((prevState: number | undefined) => number | undefined) | number | undefined) => void,
    ): void {
        updateValue(value);
        setEditOrderDetails(true);
    }

    function handleSaveOrderDetails(): void {
        void updateMaximumTravelDistance();
        void updateMaximumParticipants();
        void updateTravelExpenses();
        setEditOrderDetails(false);
        setTimeout(() => void fetchProfile(), 1000);
    }

    function handleUnSaveOrderDetails(): void {
        if (profile) setMaximumTravelDistance(profile.maximumTravelDistance ?? undefined);
        if (profile) setTravelExpenses(profile.travelExpenses / 100);
        if (profile) setMaximumParticipants(profile.maximumParticipants ?? undefined);
        setEditOrderDetails(false);
    }

    const [updateCookLocation] = useMutation(UpdateCookLocationDocument);
    const [updateCookIsVisible] = useMutation(UpdateCookIsVisibleDocument);

    const [getStripeOnboardingUrl, { loading: loadingStripeOnboardingUrl }] = useLazyQuery(CookGetStripeOnboardingUrlDocument, {
        variables: { cookId },
    });
    const [getStripeDashboardUrl, { loading: loadingStripeDashboardUrl }] = useLazyQuery(CookGetStripeDashboardUrlDocument, {
        variables: { cookId },
    });

    return (
        <>
            <Head>
                <title>PeopleEat - Chef Profil</title>

                <meta name="title" content="" />
                <meta name="description" content="" />
                <meta name="keywords" content="" />

                <link rel="icon" href="/favicon.ico" />
            </Head>

            <VStack className="w-full" gap={32}>
                <PEHeader signedInUser={signedInUser} />

                <div className={styles.bodyContainer}>
                    <CookProfileNavigationTabs selection="PERSONAL_INFORMATION" />

                    <main>
                        <VStack className="w-full max-w-screen-xl mb-[80px] lg_min:my-10 md:my-2 gap-6 md:gap-3 box-border">
                            <ChefProfileSection1 chefProfile={profile} refetch={(): void => void fetchProfile()} />

                            <HStack
                                className="w-full bg-white shadow-primary box-border p-8 md:p-2 rounded-4"
                                style={{ alignItems: 'center', justifyContent: 'flex-start' }}
                                gap={32}
                            >
                                <HStack style={{ alignItems: 'center' }}>
                                    <PECheckbox
                                        checked={profile.isVisible}
                                        onCheckedChange={(): void =>
                                            void updateCookIsVisible({ variables: { cookId, isVisible: !profile.isVisible } }).then(
                                                (res) => res.data?.cooks.success && void fetchProfile(),
                                            )
                                        }
                                    />
                                    <span className={classNames({ ['text-disabled']: !profile.isVisible })}>
                                        {t('section-public-visible')}
                                    </span>
                                    &nbsp;/&nbsp;
                                    <span className={classNames({ ['text-disabled']: profile.isVisible })}>
                                        {t('section-public-no-visible')}
                                    </span>
                                </HStack>
                                <Spacer />
                            </HStack>

                            <VStack className="w-full bg-white shadow-primary box-border p-8 md:p-4 rounded-4 gap-3">
                                <HStack className="w-full" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                    <h2 style={{ lineHeight: 0 }}>Ein- und Auszahlungen</h2>
                                </HStack>
                                <HStack gap={32} className="w-full">
                                    <HStack>
                                        {!profile.hasStripePayoutMethodActivated && (
                                            <PEButton
                                                title="Wallet hinzufügen"
                                                onClick={(): void => {
                                                    const openEvent = window.open('', '_blank');
                                                    void getStripeOnboardingUrl()
                                                        .then(({ data: sData }) => {
                                                            if (sData?.cooks.getStripeOnboardingUrl)
                                                                openEvent!.location.href = sData.cooks.getStripeOnboardingUrl;
                                                        })
                                                        .catch((e) => console.error(e));
                                                }}
                                            />
                                        )}
                                        {profile.hasStripePayoutMethodActivated && (
                                            <PEButton
                                                title="Transaktionen Anzeigen"
                                                onClick={(): void => {
                                                    const openEvent = window.open('', '_blank');
                                                    void getStripeDashboardUrl()
                                                        .then(({ data: sData }) => {
                                                            if (sData?.cooks.getStripeDashboardUrl)
                                                                openEvent!.location.href = sData.cooks.getStripeDashboardUrl;
                                                        })
                                                        .catch((e) => console.error(e));
                                                }}
                                            />
                                        )}
                                    </HStack>
                                    <Spacer />
                                </HStack>
                            </VStack>

                            <ChefProfileSection2 chefBiography={biography} cookId={cookId} />

                            <VStack
                                className="relative w-full bg-white shadow-primary box-border p-8 md:p-4 rounded-4 gap-6"
                                style={{ alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <HStack className="w-full">
                                    <h2 style={{ lineHeight: 0 }}>{t('section-order-details')}</h2>
                                    <Spacer />
                                </HStack>
                                {editOrderDetails && (
                                    <HStack
                                        className="absolute right-8 top-8 md:top-4 md:right-2 gap-3 w-full mb-4"
                                        style={{ justifyContent: 'flex-end' }}
                                    >
                                        <PEIconButton
                                            onClick={(): void => handleSaveOrderDetails()}
                                            icon={Icon.checkGreen}
                                            border="1px solid green"
                                            bg="white"
                                            size={'36px'}
                                        />
                                        <PEIconButton
                                            onClick={(): void => handleUnSaveOrderDetails()}
                                            icon={Icon.closeRed}
                                            border="1px solid red"
                                            bg="white"
                                            size={'36px'}
                                        />
                                    </HStack>
                                )}

                                <VStack className="w-full">
                                    <HStack className="w-full" style={{ justifyContent: 'space-between' }}>
                                        <HStack className="w-full" style={{ justifyContent: 'flex-start' }}>
                                            <PEIcon icon={Icon.data} />
                                            <p className="my-0">{t('section-order-details-travel-cost')}</p>
                                        </HStack>
                                        <p className="my-0 text-end w-full text-green text-ellipsis">{travelExpenses?.toFixed(2)} EUR</p>
                                    </HStack>
                                    <PESlider
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        value={Number(travelExpenses)}
                                        onValueChange={(value): void => handleUpdateOrderDetails(value, setTravelExpenses)}
                                    />
                                </VStack>

                                <VStack className="w-full">
                                    <HStack className="w-full" style={{ justifyContent: 'space-between' }}>
                                        <HStack className="w-full" style={{ justifyContent: 'flex-start' }}>
                                            <PEIcon icon={Icon.forward} />
                                            <p className="my-0">Radius</p>
                                        </HStack>
                                        <p className="my-0 text-end w-full text-green text-ellipsis">{maximumTravelDistance} km</p>
                                    </HStack>
                                    <PESlider
                                        min={0}
                                        max={200}
                                        step={1}
                                        value={maximumTravelDistance ?? 0}
                                        onValueChange={(value): void => handleUpdateOrderDetails(value, setMaximumTravelDistance)}
                                    />
                                </VStack>

                                <VStack className="w-full">
                                    <HStack className="w-full" style={{ alignItems: 'center' }}>
                                        <VStack style={{ alignItems: 'flex-start' }}>
                                            <span>{t('section-order-details-customers-limit')}</span>
                                            <span>{t('section-order-details-customers-limit-max')}</span>
                                        </VStack>
                                        <Spacer />
                                        <PECounter
                                            value={maximumParticipants ?? 0}
                                            onValueChange={(value): void => handleUpdateOrderDetails(value, setMaximumParticipants)}
                                            boundaries={{ min: 1, max: 20 }}
                                        />
                                    </HStack>
                                </VStack>

                                <VStack gap={16} className="w-full">
                                    <PEMap
                                        apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ?? ''}
                                        style={{ height: isMobile ? '300px' : '500px', borderRadius: 16 }}
                                        location={profile.location}
                                        markerRadius={(maximumTravelDistance ?? 0) * 1000}
                                    />
                                </VStack>
                            </VStack>

                            <VStack
                                className="w-full bg-white shadow-primary box-border p-8 md:p-4 rounded-4 gap-3"
                                style={{ alignItems: 'center', justifyContent: 'flex-start' }}
                            >
                                <HStack className="w-full" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                                    <h2 style={{ lineHeight: 0 }}>{t('section-event-address')}</h2>
                                    <PEIconButton
                                        icon={Icon.plus}
                                        iconSize={24}
                                        withoutShadow
                                        onClick={(): void => setAddAddressDialogOpen(!addAddressDialogOpen)}
                                    />
                                </HStack>

                                {addAddressDialogOpen && (
                                    <CreateAddressDialog
                                        open={addAddressDialogOpen}
                                        userId={signedInUser.userId}
                                        onSuccess={(): void => {
                                            setAddAddressDialogOpen(false);
                                            void fetchProfile();
                                        }}
                                        onCancel={(): void => setAddAddressDialogOpen(false)}
                                    />
                                )}

                                {selectedAddress && (
                                    <UpdateAddressDialog
                                        open={Boolean(selectedAddress)}
                                        userId={signedInUser.userId}
                                        onSuccess={(): void => {
                                            setSelectedAddress(undefined);
                                            void fetchProfile();
                                        }}
                                        onCancel={(): void => setSelectedAddress(undefined)}
                                        address={selectedAddress}
                                    />
                                )}

                                <VStack className="w-full gap-3">
                                    {profile.user.addresses.map((address, index) => (
                                        <PEAddressCard
                                            key={index}
                                            address={`${address.postCode} ${address.city}, ${address.street} ${address.houseNumber}`}
                                            title={address.title}
                                            onHouseClick={(): void => setSelectedAddress(address)}
                                            pin={{
                                                isPinned:
                                                    profile.location.latitude === address.location.latitude &&
                                                    profile.location.longitude === address.location.longitude,
                                                onPinClick: (): void =>
                                                    void updateCookLocation({
                                                        variables: {
                                                            cookId,
                                                            location: {
                                                                latitude: address.location.latitude,
                                                                longitude: address.location.longitude,
                                                            },
                                                        },
                                                    }).then((res) => res.data?.cooks.success && void fetchProfile()),
                                            }}
                                        />
                                    ))}
                                </VStack>
                            </VStack>

                            {/* <ChefProfileCertificationsSection /> */}

                            <ChefProfileSection5 chefProfile={profile} onInvalidate={(): void => void fetchProfile()} />
                        </VStack>
                    </main>
                </div>

                <PEFooter className={styles.hiddenOnMobile} />
            </VStack>

            <LoadingDialog isLoading={loadingCookProfile || loadingStripeOnboardingUrl || loadingStripeDashboardUrl} />

            {error && <>{commonTranslations('error')}</>}
        </>
    );
};

export default Index;
