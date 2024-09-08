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
import { getModels } from '@/components/vehicle-selector/actions';
import { Lookup } from '@/components/vehicle-selector/types';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { useEffect, useState } from 'react';

type ModelSelectorProps = {
	year?: number;
	makeId?: number;
	onModelSelected: (lookup?: Lookup) => void;
};

export function ModelSelector({ year, makeId, onModelSelected }: ModelSelectorProps) {
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState<number | undefined>();
	const [models, setModels] = useState<Lookup[] | undefined>();
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (year && makeId) {
			setIsLoading(true);
			getModels(year, makeId).then((data) => {
				setModels(data);
				setIsLoading(false);
			});
		}
	}, [year, makeId]);

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
					{isLoading
						? 'Loading...'
						: value
							? models?.find((model) => model.id === value)?.name
							: 'Select vehicle model...'}
					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search models..." />
					<CommandList>
						<CommandEmpty>No model(s) found.</CommandEmpty>
						<CommandGroup>
							{models
								?.toSorted((a, b) => a.name.localeCompare(b.name))
								.map((model) => (
									<CommandItem
										key={model.id}
										value={model.id.toString()}
										onSelect={(currentValue) => {
											onModelSelected(models.find((x) => x.id === Number(currentValue)));
											setValue(Number(currentValue));
											setOpen(false);
										}}
									>
										<Check className={cn('mr-2 h-4 w-4', value === model.id ? 'opacity-100' : 'opacity-0')} />
										{model.name}
									</CommandItem>
								))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
