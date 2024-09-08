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
import { getMakes } from '@/components/vehicle-selector/actions';
import { Lookup } from '@/components/vehicle-selector/types';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';

type MakeSelectorProps = {
	year?: number;
	onMakeSelected: (lookup?: Lookup) => void;
};

export function MakeSelector({ year, onMakeSelected }: MakeSelectorProps) {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState<number | undefined>();
	const [makes, setMakes] = useState<Lookup[] | undefined>();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (year) {
			setIsLoading(true);
			getMakes(year).then((data) => {
				setMakes(data);
				setIsLoading(false);
			});
		}
	}, [year]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
					disabled={isLoading}
				>
					{isLoading ? 'Loading...' : value ? makes?.find((make) => make.id === value)?.name : 'Select vehicle make...'}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search makes..." />
					<CommandList>
						<CommandEmpty>No make(s) found.</CommandEmpty>
						<CommandGroup>
							{makes
								?.toSorted((a, b) => a.name.localeCompare(b.name))
								.map((make) => (
									<CommandItem
										key={make.id}
										value={make.id.toString()}
										onSelect={(currentValue) => {
											onMakeSelected(makes.find((x) => x.id === Number(currentValue)));
											setValue(Number(currentValue));
											setOpen(false);
										}}
									>
										<Check className={cn('mr-2 h-4 w-4', value === make.id ? 'opacity-100' : 'opacity-0')} />
										{make.name}
									</CommandItem>
								))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
