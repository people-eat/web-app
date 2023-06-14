import { useMutation, useQuery } from '@apollo/client';
import CircularProgress from '@mui/material/CircularProgress';
import classNames from 'classnames';
import useTranslation from 'next-translate/useTranslation';
import { useEffect, useState, type ReactElement } from 'react';
import {
    GetCookProfileQueryDocument,
    UpdateCookIsVisibleDocument,
    UpdateCookLocationDocument,
    UpdateCookMaximumParticipantsDocument,
    UpdateCookMaximumTravelDistanceDocument,
    UpdateCookTravelExpensesDocument,
} from '../../../../data-source/generated/graphql';
import PEAddressCard from '../../../cards/address/PEAddressCard';
import PEMap from '../../../map/PEMap';
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
import ChefProfileSection1 from './section1/ChefProfileSection1';
import ChefProfileSection2 from './section2/ChefProfileSection2';
import ChefProfileSection3 from './section3/ChefProfileSection3';
import ChefProfileSection5 from './section5/ChefProfileSection5';

// eslint-disable-next-line max-statements
export default function ChefProfilePagePersonalTab({ cookId }: { cookId: string }): ReactElement {
    const { t } = useTranslation('chef-profile');

    const [biography, setBiography] = useState('');

    const [maximumParticipants, setMaximumParticipants] = useState<number | undefined>(undefined);

    const [editOrderDetails, setEditOrderDetails] = useState(false);

    const [travelExpenses, setTravelExpenses] = useState<number | undefined>(0);
    const [maximumTravelDistance, setMaximumTravelDistance] = useState<number | undefined>(undefined);

    const [addAddressDialogOpen, setAddAddressDialogOpen] = useState(false);

    const [updateTravelExpenses] = useMutation(UpdateCookTravelExpensesDocument, {
        variables: { cookId, travelExpenses: Number(travelExpenses) * 100 },
    });

    const [updateMaximumTravelDistance] = useMutation(UpdateCookMaximumTravelDistanceDocument, {
        variables: { cookId, maximumTravelDistance: maximumTravelDistance ?? 0 },
    });

    const [updateMaximumParticipants] = useMutation(UpdateCookMaximumParticipantsDocument, {
        variables: { cookId, maximumParticipants: maximumParticipants ?? 0 },
    });

    const { data, loading, error, refetch } = useQuery(GetCookProfileQueryDocument, {
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
    }

    function handleUnSaveOrderDetails(): void {
        if (chefProfile) setMaximumTravelDistance(chefProfile.maximumTravelDistance ?? undefined);
        if (chefProfile) setTravelExpenses(chefProfile.travelExpenses / 100);
        if (chefProfile) setMaximumParticipants(chefProfile.maximumParticipants ?? undefined);
        setEditOrderDetails(false);
    }

    const [updateCookLocation] = useMutation(UpdateCookLocationDocument);
    const [updateCookIsVisible] = useMutation(UpdateCookIsVisibleDocument);

    return (
        <VStack className="w-full max-w-screen-xl mb-[80px] lg:my-10 gap-6 px-5 box-border">
            {chefProfile && (
                <>
                    <ChefProfileSection1 chefProfile={chefProfile} />

                    <HStack
                        className="w-full bg-white shadow-primary box-border p-8 rounded-4"
                        style={{ alignItems: 'center', justifyContent: 'flex-start' }}
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
                    </HStack>

                    <ChefProfileSection2 chefBiography={biography} cookId={cookId} />

                    <VStack
                        className="relative w-full bg-white shadow-primary box-border p-8 rounded-4 gap-6"
                        style={{ alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <p className="text-heading-ss w-full justify-start my-0">{t('section-order-details')}</p>
                        {editOrderDetails && (
                            <HStack className="absolute right-8 top-8 gap-3 w-full mb-4" style={{ justifyContent: 'flex-end' }}>
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
                                <p className="my-0 text-end w-full text-green text-ellipsis">{travelExpenses} EUR</p>
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
                                />
                            </HStack>
                        </VStack>

                        <VStack gap={16} className="w-full">
                            <PEMap
                                apiKey={process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY ?? ''}
                                style={{ height: '500px', borderRadius: 16 }}
                                location={chefProfile.location}
                                markerRadius={(maximumTravelDistance ?? 0) * 1000}
                            />
                        </VStack>
                    </VStack>

                    <VStack
                        className="w-full bg-white shadow-primary box-border p-8 rounded-4 gap-3"
                        style={{ alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <HStack className="w-full" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                            <p className="text-heading-ss w-full justify-start my-0">{t('section-event-address')}</p>
                            <PEIconButton
                                icon={Icon.plus}
                                iconSize={24}
                                withoutShadow
                                onClick={(): void => setAddAddressDialogOpen(!addAddressDialogOpen)}
                            />
                        </HStack>

                        <CreateAddressDialog
                            open={addAddressDialogOpen}
                            userId={chefProfile.cookId}
                            onSuccess={(): void => {
                                setAddAddressDialogOpen(false);
                                void refetch();
                            }}
                            onCancel={(): void => setAddAddressDialogOpen(false)}
                        />

                        <VStack className="w-full gap-3">
                            {chefProfile.user.addresses.map(({ title, city, postCode, street, houseNumber, location }, index) => (
                                <PEAddressCard
                                    key={index}
                                    address={`${postCode} ${city}, ${street} ${houseNumber}`}
                                    title={title}
                                    pin={{
                                        isPinned:
                                            chefProfile.location.latitude === location.latitude &&
                                            chefProfile.location.longitude === location.longitude,
                                        onPinClick: (): void =>
                                            void updateCookLocation({
                                                variables: {
                                                    cookId,
                                                    location: { latitude: location.latitude, longitude: location.longitude },
                                                },
                                            }).then((res) => res.data?.cooks.success && void refetch()),
                                    }}
                                />
                            ))}
                        </VStack>
                    </VStack>

                    <ChefProfileSection3 />

                    <ChefProfileSection5 chefProfile={chefProfile} />

                    {/* <VStack
                        className="w-full bg-white shadow-primary box-border p-8 rounded-4 gap-3"
                        style={{ alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <HStack className="w-full" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                            <p className="text-heading-ss w-full justify-start my-0">Training</p>
                            <PEIconButton icon={Icon.plus} iconSize={24} withoutShadow />
                        </HStack>
                        <HStack className="w-full" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                            <HStack className="gap-3">
                                <PEIcon icon={Icon.checkGreen} />
                                <p className="w-full justify-start m-0">Bio</p>
                            </HStack>
                            <PEIconButton icon={Icon.editPencil} iconSize={24} withoutShadow />
                        </HStack>
                    </VStack> */}
                </>
            )}

            {loading && <CircularProgress />}

            {error && <>An error ocurred</>}
        </VStack>
    );
}
