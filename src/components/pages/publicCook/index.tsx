import Image from 'next/image';
import { type ReactElement } from 'react';
import { type CookRank } from '../../../data-source/generated/graphql';
import { type SignedInUser } from '../../../shared/SignedInUser';
import PEFooter from '../../footer/PEFooter';
import PEHeader from '../../header/PEHeader';
import { Icon } from '../../standard/icon/Icon';
import PEIcon from '../../standard/icon/PEIcon';
import HStack from '../../utility/hStack/HStack';
import Spacer from '../../utility/spacer/Spacer';
import VStack from '../../utility/vStack/VStack';

export interface PublicCookPageProps {
    signedInUser?: SignedInUser;
    publicCook?: {
        cookId: string;
        rank: CookRank;
        biography: string;
        maximumParticipants?: number | null;
        maximumPrice?: number | null;
        maximumTravelDistance?: number | null;
        minimumParticipants?: number | null;
        minimumPrice?: number | null;
        travelExpenses: number;
        user: { firstName: string; profilePictureUrl?: string };
        location: { latitude: number; longitude: number };
        languages: { languageId: string; title: string }[];
    };
}

export default function PublicCookPage({ signedInUser, publicCook }: PublicCookPageProps): ReactElement {
    // const { isMobile } = useResponsive();

    return (
        <VStack gap={40} className="w-full overflow-hidden">
            <PEHeader signedInUser={signedInUser} />

            <VStack
                className="relative lg:w-[calc(100%-32px)] w-[calc(100%-64px)] max-w-screen-xl mx-8 lg:mx-4"
                style={{ alignItems: 'flex-start', gap: 16 }}
            >
                {publicCook && (
                    <HStack className="w-full bg-white shadow-primary box-border p-8 rounded-4" gap={16}>
                        {publicCook.user.profilePictureUrl && (
                            <Image
                                style={{ width: '120px', height: '120px', borderRadius: 4, objectPosition: 'center', objectFit: 'cover' }}
                                src={publicCook.user.profilePictureUrl}
                                alt={'Profile Picture'}
                                width={120}
                                height={120}
                            />
                        )}

                        {!publicCook.user.profilePictureUrl && (
                            <div className="bg-base rounded-2 flex justify-center items-center min-h-[120px] w-[120px]">
                                <PEIcon edgeLength={32} icon={Icon.profileLight} />
                            </div>
                        )}

                        <VStack style={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <VStack style={{ alignItems: 'flex-start' }}>
                                <p className="text-heading-m my-0">{publicCook.user.firstName}</p>
                            </VStack>
                            <span>{publicCook.rank}</span>
                        </VStack>

                        <Spacer />
                    </HStack>
                )}
                {JSON.stringify(publicCook)}
            </VStack>

            <PEFooter />
        </VStack>
    );
}
