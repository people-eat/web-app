import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import moment, { type Moment } from 'moment';
import { type ReactElement } from 'react';
import PEButton from '../../../standard/buttons/PEButton';
import PECounter from '../../../standard/counter/PECounter';
import PEMultiLineTextField from '../../../standard/textFields/PEMultiLineTextField';
import PETextField from '../../../standard/textFields/PETextField';
import HStack from '../../../utility/hStack/HStack';
import Spacer from '../../../utility/spacer/Spacer';
import VStack from '../../../utility/vStack/VStack';

export interface IndividualRequestPageStepOneProps {
    adultCount: number;
    setAdultCount: (changedAdultCount: number) => void;
    childrenCount: number;
    setChildrenCount: (changeChildrenCount: number) => void;
    addressSearchText: string;
    setAddressSearchText: (changedAddressSearchText: string) => void;
    dateTime: Moment;
    setDateTime: (changedDateTime: Moment) => void;
    occasion: string;
    setOccasion: (changedOccasion: string) => void;
    budget: string;
    setBudget: (changedBudget: string) => void;
    message: string;
    setMessage: (changedMessage: string) => void;
    onContinue: () => void;
}

export default function IndividualRequestPageStep1({
    adultCount,
    setAdultCount,
    childrenCount,
    setChildrenCount,
    addressSearchText,
    setAddressSearchText,
    dateTime,
    setDateTime,
    occasion,
    setOccasion,
    budget,
    setBudget,
    message,
    setMessage,
    onContinue,
}: IndividualRequestPageStepOneProps): ReactElement {
    const disabled = adultCount < 1 || dateTime.diff(moment(), 'days') < 7;

    return (
        <>
            <VStack gap={16} className="w-full" style={{ alignItems: 'flex-start' }}>
                <h3>Participants</h3>
                <HStack className="w-full lg:items-center lg:my-4">
                    <span>Adults</span>
                    <Spacer />
                    <PECounter value={adultCount} onValueChange={setAdultCount} />
                </HStack>
                <HStack className="w-full lg:items-center">
                    <span>Children</span>
                    <Spacer />
                    <PECounter value={childrenCount} onValueChange={setChildrenCount} />
                </HStack>
            </VStack>

            <VStack gap={16} className="w-full relative" style={{ alignItems: 'flex-start' }}>
                <h3>Event details</h3>
                <HStack gap={16} className="w-full box-border relative">
                    <div className="w-full min-w-[calc(50% - 8px)] h-16 border-[1px] border-solid border-disabled rounded-4 px-4  py-2 box-border">
                        <DatePicker
                            sx={{ width: '100%' }}
                            value={dateTime}
                            onChange={(changedDate: Moment | null): void => {
                                if (changedDate) setDateTime(changedDate);
                            }}
                            slotProps={{ textField: { variant: 'standard', InputProps: { disableUnderline: true } } }}
                            label={'Date'}
                            disablePast
                        />
                    </div>
                    <div className="w-full min-w-[calc(50% - 8px)] h-16 border-[1px] border-solid border-disabled rounded-4 px-4  py-2 box-border">
                        <TimePicker
                            sx={{ width: '100%' }}
                            value={dateTime}
                            onChange={(changedTime: Moment | null): void => {
                                if (changedTime) setDateTime(changedTime);
                            }}
                            slotProps={{ textField: { variant: 'standard', InputProps: { disableUnderline: true } } }}
                            label={'Time'}
                        />
                    </div>
                </HStack>
                <PETextField value={occasion} onChange={setOccasion} type="text" placeholder="Occasion" />
            </VStack>
            {/* {dateTime} */}
            <VStack gap={4} className="w-full" style={{ alignItems: 'flex-start' }}>
                <h3>Event location</h3>
                <PETextField value={addressSearchText} onChange={setAddressSearchText} type="text" placeholder="Location" />
            </VStack>

            <VStack gap={4} className="w-full" style={{ alignItems: 'flex-start' }}>
                <h3>Budget</h3>
                <PETextField startContent={<p>€</p>} type={'number'} value={budget} onChange={setBudget} placeholder="Budget" />
            </VStack>

            <VStack gap={4} className="w-full" style={{ alignItems: 'flex-start' }}>
                <h3>Message</h3>
                <PEMultiLineTextField value={message} onChange={setMessage} placeholder="Message" />
            </VStack>

            <PEButton onClick={onContinue} title="Continue" disabled={disabled} />
        </>
    );
}
