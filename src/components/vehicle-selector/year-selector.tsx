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
import { getYears } from '@/components/vehicle-selector/actions';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';

export function YearSelector({ onYearSelected }: { onYearSelected: (year: number) => void }) {
	const [years, setYears] = useState<number[] | undefined>();
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState<number | null>(null);

	useEffect(() => {
		getYears().then((data) => setYears(data));
	}, []);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
					{value ? years?.find((year) => year === value) : 'Select vehicle year...'}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search years..." />
					<CommandList>
						<CommandEmpty>No year(s) found.</CommandEmpty>
						<CommandGroup>
							{years
								?.toSorted((a, b) => b - a)
								.map((year) => (
									<CommandItem
										key={year}
										value={year.toString()}
										onSelect={(currentValue) => {
											onYearSelected(Number(currentValue));
											setValue(Number(currentValue));
											setOpen(false);
										}}
									>
										<Check className={cn('mr-2 h-4 w-4', value === year ? 'opacity-100' : 'opacity-0')} />
										{year}
									</CommandItem>
								))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
