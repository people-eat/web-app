import { useState, type ReactElement } from 'react';
import PEDropdown from '../../../../../standard/dropdown/PEDropdown';
import PETabItem from '../../../../../standard/tabItem/PETabItem';
import PETextField from '../../../../../standard/textFields/PETextField';
import HStack from '../../../../../utility/hStack/HStack';
import VStack from '../../../../../utility/vStack/VStack';

const CATEGORIES: string[] = ['Vegetarian', 'Kosher', 'Vegetarian', 'Kosher'];

const KITCHENS: string[] = ['European', 'Asian', 'European', 'Asian'];

export default function ChefProfilePageUploadMenusStep1(): ReactElement {
    const [menuName, setMenuName] = useState('');
    const [offerGreeting, setOfferGreeting] = useState(false);
    const [offerGreetingOptional, setOfferGreetingOptional] = useState('');

    return (
        <VStack className="w-full gap-6" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
            <VStack className="w-full">
                <p className="w-full mb-4 text-text-m-bold my-0">Menu name</p>
                <PETextField type={'text'} value={menuName} onChange={(value): void => setMenuName(value)} />
            </VStack>

            <PEDropdown options={CATEGORIES} getOptionLabel={(category): string => category} defaultExpanded />

            <PEDropdown options={KITCHENS} getOptionLabel={(category): string => category} defaultExpanded />

            <VStack className="w-full mt-12">
                <p className="w-full text-text-m-bold my-0">Would you like to offer a greeting from the kitchen?</p>
                <HStack className="gap-2 w-full my-4" style={{ justifyContent: 'flex-start' }}>
                    <PETabItem
                        title="Yes"
                        onClick={(): void => {
                            setOfferGreeting(true);
                        }}
                        active={offerGreeting}
                    />
                    <PETabItem
                        title="No"
                        onClick={(): void => {
                            setOfferGreeting(false);
                        }}
                        active={!offerGreeting}
                    />
                </HStack>
                <PETextField type={'text'} value={offerGreetingOptional} onChange={(value): void => setOfferGreetingOptional(value)} />
            </VStack>
        </VStack>
    );
}
