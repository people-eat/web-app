import { useMutation } from '@apollo/client';
import { CircularProgress, Dialog, DialogContent } from '@mui/material';
import { useState, type ReactElement } from 'react';
import { CreateOneCookMealDocument, type MealType } from '../../../../../data-source/generated/graphql';
import { mealTypes } from '../../../../../shared/mealTypes';
import PEButton from '../../../../standard/buttons/PEButton';
import { Icon } from '../../../../standard/icon/Icon';
import PEIcon from '../../../../standard/icon/PEIcon';
import PETabItem from '../../../../standard/tabItem/PETabItem';
import PEMultiLineTextField from '../../../../standard/textFields/PEMultiLineTextField';
import PETextField from '../../../../standard/textFields/PETextField';
import HStack from '../../../../utility/hStack/HStack';
import VStack from '../../../../utility/vStack/VStack';

export interface ChefProfilePageCreateMealProps {
    cookId: string;
}

export default function ChefProfilePageCreateMeal({ cookId }: ChefProfilePageCreateMealProps): ReactElement {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState<MealType>('MAIN_COURSE');

    const disabled: boolean = title === '';

    const [createOneCookMeal, { loading }] = useMutation(CreateOneCookMealDocument, {
        variables: {
            cookId,
            meal: {
                title,
                description,
                type: 'DESSERT',
                imageUrl: undefined,
            },
        },
    });

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
                    {mealTypes.map((mealType, index) => (
                        <PETabItem
                            key={index}
                            title={mealType}
                            onClick={(): void => {
                                setType(mealType);
                            }}
                            active={mealType === type}
                        />
                    ))}
                </HStack>
            </VStack>

            <VStack className="w-full">
                <p className="w-full mb-4 text-text-m-bold my-0">Name</p>
                <PETextField type={'text'} value={title} onChange={(value): void => setTitle(value)} />
            </VStack>

            <VStack className="w-full">
                <p className="w-full mb-4 text-text-m-bold my-0">Description</p>
                <PEMultiLineTextField value={description} onChange={(value): void => setDescription(value)} />
            </VStack>

            <VStack className="w-full">
                <p className="w-full mb-4 text-text-m-bold my-0">Description</p>
                <VStack className="w-full" style={{ alignItems: 'flex-start' }}>
                    <VStack className="w-[200px] h-[200px] hover:cursor-pointer select-none hover:shadow-primary active:shadow-active delay-100 ease-linear transition border-solid border-[1px] border-disabled justify-center rounded-4">
                        <PEIcon icon={Icon.plus} />
                    </VStack>
                </VStack>
            </VStack>

            {<PEButton onClick={(): void => void createOneCookMeal()} disabled={disabled} title="Add" className="w-full" />}

            {loading && (
                <Dialog open>
                    <DialogContent>
                        <CircularProgress />
                    </DialogContent>
                </Dialog>
            )}
        </VStack>
    );
}
