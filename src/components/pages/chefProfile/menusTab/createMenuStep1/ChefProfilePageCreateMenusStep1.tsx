import { useState, type ReactElement } from 'react';
import PEDropdown from '../../../../standard/dropdown/PEDropdown';
import PETextField from '../../../../standard/textFields/PETextField';
import VStack from '../../../../utility/vStack/VStack';

const CATEGORIES: string[] = ['Vegetarian', 'Kosher', 'Vegetarian', 'Kosher'];

const KITCHENS: string[] = ['European', 'Asian', 'European', 'Asian'];

export default function ChefProfilePageCreateMenusStep1(): ReactElement {
    const [title, setMenuName] = useState('');

    return (
        <VStack className="w-full gap-6" style={{ alignItems: 'center', justifyContent: 'flex-start' }}>
            <VStack className="w-full">
                <p className="w-full mb-4 text-text-m-bold my-0">Menu name</p>
                <PETextField type={'text'} value={title} onChange={(value): void => setMenuName(value)} />
            </VStack>

            <PEDropdown title={'Categories'} options={CATEGORIES} getOptionLabel={(category): string => category} defaultExpanded />

            <PEDropdown title={'Kitchen'} options={KITCHENS} getOptionLabel={(kitchen): string => kitchen} defaultExpanded />
        </VStack>
    );
}
