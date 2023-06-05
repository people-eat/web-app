import { useState, type ReactElement } from 'react';
import { Icon } from '../../../../standard/icon/Icon';
import PEIcon from '../../../../standard/icon/PEIcon';
import PETabItem from '../../../../standard/tabItem/PETabItem';
import PEMultiLineTextField from '../../../../standard/textFields/PEMultiLineTextField';
import PETextField from '../../../../standard/textFields/PETextField';
import HStack from '../../../../utility/hStack/HStack';
import VStack from '../../../../utility/vStack/VStack';

const DISHES_TABS = ['Starter', 'Main', 'Dessert', 'Intermediate'];

export default function ChefProfilePageUploadDishes(): ReactElement {
    const [dishName, setDishName] = useState('');
    const [dishDescription, setDishDescription] = useState('');
    const [dishTab, setDishTab] = useState(0);

    return (
        <VStack
            className="w-full bg-white shadow-primary box-border p-8 rounded-4 gap-6"
            style={{ alignItems: 'center', justifyContent: 'flex-start' }}
        >
            <p className="w-full text-heading-xl my-0 mb-6">Adding a new dish</p>
            <VStack className="w-full">
                <p className="w-full mb-4 text-text-m-bold my-0">Gang</p>
                <HStack
                    gap={8}
                    className="w-full max-w-screen-xl overflow-x-scroll"
                    style={{ overflowY: 'initial', justifyContent: 'flex-start' }}
                >
                    {DISHES_TABS.map((dish, index) => (
                        <PETabItem
                            key={`${dish}_DishesPage`}
                            title={dish}
                            onClick={(): void => {
                                setDishTab(index);
                            }}
                            active={dishTab === index}
                        />
                    ))}
                </HStack>
            </VStack>

            <VStack className="w-full">
                <p className="w-full mb-4 text-text-m-bold my-0">Name</p>
                <PETextField type={'text'} value={dishName} onChange={(value): void => setDishName(value)} />
            </VStack>

            <VStack className="w-full">
                <p className="w-full mb-4 text-text-m-bold my-0">Description</p>
                <PEMultiLineTextField value={dishDescription} onChange={(value): void => setDishDescription(value)} />
            </VStack>

            <VStack className="w-full">
                <p className="w-full mb-4 text-text-m-bold my-0">Description</p>
                <VStack className="w-full" style={{ alignItems: 'flex-start' }}>
                    <VStack className="w-[200px] h-[200px] hover:cursor-pointer select-none hover:shadow-primary active:shadow-active delay-100 ease-linear transition border-solid border-[1px] border-disabled justify-center rounded-4">
                        <PEIcon icon={Icon.plus} />
                    </VStack>
                </VStack>
            </VStack>
        </VStack>
    );
}
