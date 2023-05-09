import { type ReactElement } from 'react';
import PEMenuCard from '../../../../cards/menuCard/PEMenuCard';
import { type PEMenuCardProps } from '../../../../cards/menuCard/PEMenuCardProps';
import HStack from '../../../../utility/hStack/HStack';

interface ChefProfilePageMenuProps {
    menus: PEMenuCardProps[];
    archive: PEMenuCardProps[];
}

export default function ChefProfilePageMenu({ menus, archive }: ChefProfilePageMenuProps): ReactElement {
    return (
        <HStack className="relative w-full gap-6 flex-wrap" style={{ alignItems: 'center', justifyContent: 'center' }}>
            {menus.map((menu, index) => (
                <PEMenuCard
                    key={`${index}_ChefProfilePageMenu`}
                    title={menu.title}
                    description={String(menu.description)}
                    imageUrls={menu.imageUrls}
                    pricePerPerson={menu.pricePerPerson}
                    chefFirstName={menu.chefFirstName}
                    categories={menu.categories}
                    fullWidth
                />
            ))}
            {archive.length && (
                <>
                    <p className="text-text-m-bold w-full">Archive</p>
                    <HStack
                        className="relative w-full gap-6 flex-wrap opacity-30"
                        style={{ alignItems: 'center', justifyContent: 'center' }}
                    >
                        {archive.map((menu, index) => (
                            <div className="relative" key={`${index}_archive_ChefProfilePageMenu`}>
                                <PEMenuCard
                                    title={menu.title}
                                    description={String(menu.description)}
                                    imageUrls={menu.imageUrls}
                                    pricePerPerson={menu.pricePerPerson}
                                    chefFirstName={menu.chefFirstName}
                                    categories={menu.categories}
                                    fullWidth
                                />
                            </div>
                        ))}
                    </HStack>
                </>
            )}
        </HStack>
    );
}
