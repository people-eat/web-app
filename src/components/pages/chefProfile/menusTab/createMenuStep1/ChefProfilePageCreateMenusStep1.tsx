import { useState, type ReactElement } from 'react';
import PEDropdown from '../../../../standard/dropdown/PEDropdown';
import PETabItem from '../../../../standard/tabItem/PETabItem';
import PETextField from '../../../../standard/textFields/PETextField';
import HStack from '../../../../utility/hStack/HStack';
import VStack from '../../../../utility/vStack/VStack';

const CATEGORIES: string[] = ['Vegetarian', 'Kosher', 'Vegetarian', 'Kosher'];

const KITCHENS: string[] = ['European', 'Asian', 'European', 'Asian'];

export default function ChefProfilePageCreateMenusStep1(): ReactElement {
    const [title, setMenuName] = useState('');
    const [greetingFromKitchen, setGreetingFromKitchen] = useState(false);
    const [description, setDescription] = useState('');

    return (
        <VStack className="w-full gap-6" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
            <VStack className="w-full">
                <p className="w-full mb-4 text-text-m-bold my-0">Menu name</p>
                <PETextField type={'text'} value={title} onChange={(value): void => setMenuName(value)} />
            </VStack>

            <PEDropdown title={'Categories'} options={CATEGORIES} getOptionLabel={(category): string => category} defaultExpanded />

            <PEDropdown title={'Kitchen'} options={KITCHENS} getOptionLabel={(kitchen): string => kitchen} defaultExpanded />

            <VStack className="w-full mt-12">
                <p className="w-full text-text-m-bold my-0">Would you like to offer a greeting from the kitchen?</p>

                <HStack className="gap-2 w-full my-4" style={{ justifyContent: 'flex-start' }}>
                    <PETabItem title="Yes" onClick={(): void => setGreetingFromKitchen(true)} active={greetingFromKitchen} />
                    <PETabItem title="No" onClick={(): void => setGreetingFromKitchen(false)} active={!greetingFromKitchen} />
                </HStack>

                <PETextField type={'text'} value={description} onChange={setDescription} />
            </VStack>
        </VStack>
    );
}
