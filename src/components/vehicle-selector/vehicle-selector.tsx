'use client';

import { AttributesSelector } from '@/components/vehicle-selector/attributes-selector';
import { MakeSelector } from '@/components/vehicle-selector/make-selector';
import { ModelSelector } from '@/components/vehicle-selector/model-selector';
import { Lookup, ModelAttributeValue } from '@/components/vehicle-selector/types';
import { YearSelector } from '@/components/vehicle-selector/year-selector';
import { useEffect, useState } from 'react';

export function VehicleSelector() {
	const [selectedYear, setSelectedYear] = useState<number | undefined>();
	const [selectedMake, setSelectedMake] = useState<Lookup | undefined>();
	const [selectedModel, setSelectedModel] = useState<Lookup | undefined>();
	const [selectedAttributeValues, setSelectedAttributeValues] = useState<{ [code: string]: ModelAttributeValue }>();

	useEffect(() => {
		console.log(selectedAttributeValues);
	}, [selectedAttributeValues]);

	return (
		<>
			<YearSelector onYearSelected={setSelectedYear} />
			{selectedYear && <MakeSelector year={selectedYear} onMakeSelected={setSelectedMake} />}
			{selectedMake && (
				<ModelSelector year={selectedYear} makeId={selectedMake.id} onModelSelected={setSelectedModel} />
			)}
			{selectedModel && (
				<AttributesSelector
					year={selectedYear}
					modelId={selectedModel.id}
					onAttributeValuesSelected={setSelectedAttributeValues}
				/>
			)}
		</>
	);
}
