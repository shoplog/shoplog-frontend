'use client';

import { AttributeValueSelector } from '@/components/vehicle-selector/attribute-value-selector';
import { ModelAttribute, ModelAttributeValue } from '@/components/vehicle-selector/types';
import { useEffect, useState } from 'react';

type AttributeSelectorProps = {
	attribute: ModelAttribute;
	vinSchemaIds: number[];
	onAttributeValueSelected: (attributeValue?: ModelAttributeValue) => void;
};

export function AttributeSelector({ attribute, vinSchemaIds, onAttributeValueSelected }: AttributeSelectorProps) {
	const values = attribute.values.filter((value) => vinSchemaIds.some((vs) => value.vinSchemaIds.includes(vs)));

	const [selectedAttributeValue, setSelectedAttributeValue] = useState(values.length === 1 ? values[0] : undefined);
	const [attributeValues, setAttributeValues] = useState<ModelAttributeValue[]>();

	useEffect(() => {
		const values = attribute.values.filter((value) => vinSchemaIds.some((vs) => value.vinSchemaIds.includes(vs)));
		setAttributeValues(values);

		if (selectedAttributeValue && selectedAttributeValue.vinSchemaIds.some((vs) => vinSchemaIds.includes(vs))) {
			setSelectedAttributeValue(undefined);
			onAttributeValueSelected(undefined);
		} else if (values.length === 1) {
			setSelectedAttributeValue(values[0]);
			onAttributeValueSelected(values[0]);
			console.log('hit');
		}
	}, [vinSchemaIds]);

	const onSelect = (value: string) => {
		const attributeValue = attributeValues?.find((av) => av.value.toString() === value);

		if (attributeValue) {
			setSelectedAttributeValue(attributeValue);
			onAttributeValueSelected(attributeValue);
		}
	};

	return (
		<AttributeValueSelector
			attributeName={attribute.name}
			defaultValue={selectedAttributeValue?.value?.toString()}
			values={attributeValues?.map((av) => av.value.toString()) ?? []}
			onSelect={onSelect}
		/>
	);
}
