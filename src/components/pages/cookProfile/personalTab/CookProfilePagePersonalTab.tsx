import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { Dialog, DialogContent } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState, type ReactElement } from 'react';
import {
    CookGetStripeDashboardUrlDocument,
    CookGetStripeOnboardingUrlDocument,
    GetCookProfileQueryDocument,
    UpdateCookIsVisibleDocument,
    UpdateCookLocationDocument,
    UpdateCookMaximumParticipantsDocument,
    UpdateCookMaximumTravelDistanceDocument,
    UpdateCookTravelExpensesDocument,
} from '../../../../data-source/generated/graphql';
import useResponsive from '../../../../hooks/useResponsive';
import { type Location } from '../../../../shared-domain/Location';
import PEAddressCard from '../../../cards/address/PEAddressCard';
import PEMap from '../../../map/PEMap';
import PEButton from '../../../standard/buttons/PEButton';
import PECheckbox from '../../../standard/checkbox/PECheckbox';
import PECounter from '../../../standard/counter/PECounter';
import { Icon } from '../../../standard/icon/Icon';
import PEIcon from '../../../standard/icon/PEIcon';
import PEIconButton from '../../../standard/iconButton/PEIconButton';
import PESlider from '../../../standard/slider/PESlider';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';
import CreateAddressDialog from '../../profile/personalTab/CreateAddressDialog';
import UpdateAddressDialog from '../../profile/personalTab/UpdateAddressDialog';
import ChefProfileSection1 from './section1/ChefProfileSection1';
import ChefProfileSection2 from './section2/ChefProfileSection2';
import ChefProfileSection5 from './section5/ChefProfileSection5';

// eslint-disable-next-line max-statements
export default function CookProfilePagePersonalTab({ cookId }: { cookId: string }): ReactElement {
    const { t } = useTranslation('chef-profile');
    const { t: commonTranslations } = useTranslation('common');
    const { isMobile } = useResponsive();

    const [biography, setBiography] = useState('');

    const [maximumParticipants, setMaximumParticipants] = useState<number | undefined>(undefined);

    const [editOrderDetails, setEditOrderDetails] = useState(false);

    const [travelExpenses, setTravelExpenses] = useState<number | undefined>(0);
    const [maximumTravelDistance, setMaximumTravelDistance] = useState<number | undefined>(undefined);

    const [addAddressDialogOpen, setAddAddressDialogOpen] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState<
        | {
              addressId: string;
              title: string;
              country: string;
              city: string;
              postCode: string;
              street: string;
              houseNumber: string;
              createdAt: Date;
              location: Location;
          }
        | undefined
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

    const {
        data,
        loading: loadingCookProfile,
        error,
        refetch,
    } = useQuery(GetCookProfileQueryDocument, {
        variables: { cookId },
    });

    const chefProfile = data?.cooks.findOne;

    useEffect(() => {
        if (chefProfile) setBiography(chefProfile.biography);
        if (chefProfile) setTravelExpenses(chefProfile.travelExpenses / 100);
        if (chefProfile) setMaximumTravelDistance(chefProfile.maximumTravelDistance ?? undefined);
        if (chefProfile) setMaximumParticipants(chefProfile.maximumParticipants ?? undefined);
    }, [chefProfile]);

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
        setTimeout(() => {
            void refetch();
        }, 1000);
    }

    function handleUnSaveOrderDetails(): void {
        if (chefProfile) setMaximumTravelDistance(chefProfile.maximumTravelDistance ?? undefined);
        if (chefProfile) setTravelExpenses(chefProfile.travelExpenses / 100);
        if (chefProfile) setMaximumParticipants(chefProfile.maximumParticipants ?? undefined);
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
        <VStack className="w-full max-w-screen-xl mb-[80px] lg_min:my-10 md:my-2 gap-6 md:gap-3 box-border">
            {chefProfile && (
                <>
                    <ChefProfileSection1 chefProfile={chefProfile} refetch={(): void => void refetch()} />

                    <HStack
                        className="w-full bg-white shadow-primary box-border p-8 md:p-2 rounded-4"
                        style={{ alignItems: 'center', justifyContent: 'flex-start' }}
                        gap={32}
                    >
                        <PECheckbox
                            checked={chefProfile.isVisible}
                            onCheckedChange={(): void =>
                                void updateCookIsVisible({ variables: { cookId, isVisible: !chefProfile.isVisible } }).then(
                                    (res) => res.data?.cooks.success && void refetch(),
                                )
                            }
                        />
                        <span className={classNames({ ['text-disabled']: !chefProfile.isVisible })}>{t('section-public-visible')}</span>
                        &nbsp;/&nbsp;
                        <span className={classNames({ ['text-disabled']: chefProfile.isVisible })}>{t('section-public-no-visible')}</span>
                        <Spacer />
                        <HStack style={{ width: 600 }} gap={32}>
                            {!chefProfile.hasStripePayoutMethodActivated && (
                                <PEButton
                                    title="Stripe Onboarding"
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
                            {chefProfile.hasStripePayoutMethodActivated && (
                                <PEButton
                                    title="Stripe Dashboard"
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
                    </HStack>

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
                                location={chefProfile.location}
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
                                userId={chefProfile.cookId}
                                onSuccess={(): void => {
                                    setAddAddressDialogOpen(false);
                                    void refetch();
                                }}
                                onCancel={(): void => setAddAddressDialogOpen(false)}
                            />
                        )}

                        {selectedAddress && (
                            <UpdateAddressDialog
                                open={Boolean(selectedAddress)}
                                userId={chefProfile.cookId}
                                onSuccess={(): void => {
                                    setSelectedAddress(undefined);
                                    void refetch();
                                }}
                                onCancel={(): void => setSelectedAddress(undefined)}
                                address={selectedAddress}
                            />
                        )}

                        <VStack className="w-full gap-3">
                            {chefProfile.user.addresses.map((address, index) => (
                                <PEAddressCard
                                    key={index}
                                    address={`${address.postCode} ${address.city}, ${address.street} ${address.houseNumber}`}
                                    title={address.title}
                                    onHouseClick={(): void => setSelectedAddress(address)}
                                    pin={{
                                        isPinned:
                                            chefProfile.location.latitude === address.location.latitude &&
                                            chefProfile.location.longitude === address.location.longitude,
                                        onPinClick: (): void =>
                                            void updateCookLocation({
                                                variables: {
                                                    cookId,
                                                    location: {
                                                        latitude: address.location.latitude,
                                                        longitude: address.location.longitude,
                                                    },
                                                },
                                            }).then((res) => res.data?.cooks.success && void refetch()),
                                    }}
                                />
                            ))}
                        </VStack>
                    </VStack>

                    {/* <ChefProfileCertificationsSection /> */}

                    <ChefProfileSection5 chefProfile={chefProfile} />
                </>
            )}

            <Dialog open={loadingCookProfile || loadingStripeOnboardingUrl || loadingStripeDashboardUrl}>
                <DialogContent>
                    <CircularProgress />
                </DialogContent>
            </Dialog>

            {error && <>{commonTranslations('error')}</>}
        </VStack>
    );
}
