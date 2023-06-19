import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import classNames from 'classnames';
import { useState, type ReactElement } from 'react';
import PECheckbox from '../../standard/checkbox/PECheckbox';
import PEIcon from '../../standard/icon/PEIcon';
import { Icon } from '../icon/Icon';

export interface PEDropdownProps<T> {
    title?: string;
    defaultExpanded?: boolean;
    singleSelector?: boolean;
    options: T[];
    getOptionLabel: (option: T) => string;
    onSelectedOptionsChange?: (changedSelectedOptions: T[]) => void;
    selectedOptions?: T[];
}

export default function PEDropdown<T>({
    title,
    defaultExpanded,
    options,
    getOptionLabel,
    onSelectedOptionsChange,
    singleSelector,
    selectedOptions,
}: PEDropdownProps<T>): ReactElement {
    const [isOpen, setOpen] = useState(Boolean(defaultExpanded));
    const [selectedOptionIndices, setSelectedOptionIndices] = useState(handleGetSelectedOptionsIndices(selectedOptions));

    function handleGetSelectedOptionsIndices(selectedOptionsArray?: T[]): Set<number> {
        if (selectedOptionsArray && Array.isArray(selectedOptionsArray)) {
            const selectedOptionIndicesSet = new Set<number>();

            options.map((option, index): void => {
                if (selectedOptionsArray.includes(option)) selectedOptionIndicesSet.add(index);
            });

            return selectedOptionIndicesSet;
        }

        return new Set<number>();
    }

    function handleOptionSelect(index: number): void {
        const isSelected: boolean = selectedOptionIndices.has(index);

        if (isSelected) {
            selectedOptionIndices.delete(index);
            setSelectedOptionIndices(new Set(selectedOptionIndices));
        } else setSelectedOptionIndices(new Set(selectedOptionIndices.add(index)));

        const selectedOptionsArray: T[] = options.filter((_option, filterIndex): boolean => selectedOptionIndices.has(filterIndex));
        onSelectedOptionsChange?.(selectedOptionsArray);
    }

    return (
        <Grid sx={{ width: '100%' }} container>
            <Grid sx={{ width: '100%' }} item>
                <Card sx={{ borderRadius: '12px', width: '100%' }}>
                    <CardHeader
                        title={
                            <div className="flex justify-between items-center">
                                <div>
                                    <span className="font-manrope text-text-m">{(title ?? 'Choices') + ' '}</span>
                                    {singleSelector && (
                                        <span className="font-manrope text-60black text-text-m">
                                            ({selectedOptionIndices.size} selected)
                                        </span>
                                    )}
                                </div>
                                <div
                                    className={classNames('w-6 h-6 scroll flex items-start justify-center bg-base rounded-4', {
                                        ['rotate-180']: isOpen,
                                    })}
                                >
                                    <div className="-mt-[6px]">
                                        <PEIcon icon={Icon.arrowDown} edgeLength={12} />
                                    </div>
                                </div>
                            </div>
                        }
                        onClick={(): void => setOpen(!isOpen)}
                        sx={{
                            cursor: 'pointer',
                            py: 1,
                            fontFamily: 'Manrope',
                            border: isOpen ? '1px solid rgba(255, 100, 51, 1)' : '1px solid rgba(245, 245, 245, 1)',
                            borderRadius: isOpen ? '12px 12px 0 0' : '12px',
                        }}
                    />

                    {isOpen && <Divider />}

                    <Collapse in={isOpen}>
                        <List
                            sx={{ width: '100%', bgcolor: 'background.paper', overflow: 'auto', padding: 0 }}
                            dense
                            component="div"
                            role="list"
                        >
                            {options.map((option: T, index) => (
                                <ListItem
                                    sx={{
                                        px: '0px',
                                        cursor: 'pointer',
                                        width: '100%',
                                        ':hover': { background: 'rgba(245, 245, 245, 1)' },
                                    }}
                                    key={index}
                                    role="listitem"
                                    onClick={(): void => handleOptionSelect(index)}
                                >
                                    <ListItemIcon sx={{ minWidth: '42px', px: '3px' }}>
                                        <PECheckbox checked={selectedOptionIndices.has(index)} onCheckedChange={(): void => undefined} />
                                    </ListItemIcon>
                                    <ListItemText sx={{ fontFamily: 'Manrope' }} id={`${index}`} primary={getOptionLabel(option)} />
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                </Card>
            </Grid>
        </Grid>
    );
}
