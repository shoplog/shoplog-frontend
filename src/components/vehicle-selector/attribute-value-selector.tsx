'use client';

import {
	Button,
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui';
import { ModelAttributeValue } from '@/components/vehicle-selector/types';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useState } from 'react';

type AttributeValueSelectorProps = {
	attributeName: string;
	values: string[];
	defaultValue?: string;
	onSelect: (value: string) => void;
};

export function AttributeValueSelector({ attributeName, values, defaultValue, onSelect }: AttributeValueSelectorProps) {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(defaultValue);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
					disabled={values.length === 1}
				>
					{value ? values.find((v) => v === value) : `Select ${attributeName}...`}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search variations..." />
					<CommandList>
						<CommandEmpty>No variation(s) found.</CommandEmpty>
						<CommandGroup>
							{values.map((value) => (
								<CommandItem
									key={value}
									value={value}
									onSelect={(selectedValue) => {
										onSelect(selectedValue);
										setValue(selectedValue);
										setOpen(false);
									}}
								>
									<Check className={cn('mr-2 h-4 w-4', value == value ? 'opacity-100' : 'opacity-0')} />
									{value}
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
