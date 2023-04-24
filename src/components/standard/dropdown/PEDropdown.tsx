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

function intersection(a: readonly string[], b: readonly string[]): string[] {
    return a.filter((value) => b.indexOf(value) !== -1);
}

export interface PEDropdownProps {
    items: string[];
}

export default function PEDropdown({ items }: PEDropdownProps): ReactElement {
    const [checked, setChecked] = useState<readonly string[]>([]);
    const [isOpen, setOpen] = useState(true);

    const handleToggle = (value: string) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) newChecked.push(value);
        else newChecked.splice(currentIndex, 1);

        setChecked(newChecked);
    };

    const Title = (title: string): ReactElement => (
        <div className={'flex justify-between items-center'}>
            <div>
                <span className="font-manrope text-text-m">{title} </span>
                <span className="font-manrope text-60black text-text-m">({intersection(checked, items).length} selected)</span>
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
    );

    return (
        <Grid container spacing={2}>
            <Grid item>
                <Card sx={{ borderRadius: '12px', width: '690px', my: '16px' }}>
                    <CardHeader
                        onClick={(): void => setOpen(!isOpen)}
                        sx={{
                            cursor: 'pointer',
                            px: 2,
                            py: 1,
                            fontFamily: 'Manrope',
                            border: isOpen ? '1px solid rgba(255, 100, 51, 1)' : '1px solid rgba(245, 245, 245, 1)',
                            borderRadius: isOpen ? '12px 12px 0 0' : '12px',
                        }}
                        title={Title('Choices')}
                    />
                    {isOpen ? <Divider /> : null}
                    <Collapse in={isOpen}>
                        <List
                            sx={{
                                width: '100%',
                                bgcolor: 'background.paper',
                                overflow: 'auto',
                                padding: 0,
                            }}
                            dense
                            component="div"
                            role="list"
                        >
                            {items.map((value: string) => {
                                const labelId = `transfer-list-all-item-${value}-label`;

                                return (
                                    <ListItem
                                        sx={{
                                            px: '0px',
                                            cursor: 'pointer',
                                            width: '100%',
                                            ':hover': { background: 'rgba(245, 245, 245, 1)' },
                                        }}
                                        key={value}
                                        role="listitem"
                                        onClick={handleToggle(value)}
                                    >
                                        <ListItemIcon sx={{ minWidth: '42px', px: '3px' }}>
                                            {/* Todo - onCheckedChange was not implemented */}
                                            <PECheckbox checked={checked.includes(value)} onCheckedChange={(): void => undefined} />
                                        </ListItemIcon>
                                        <ListItemText sx={{ fontFamily: 'Manrope' }} id={labelId} primary={value} />
                                    </ListItem>
                                );
                            })}
                        </List>
                    </Collapse>
                </Card>
            </Grid>
        </Grid>
    );
}
