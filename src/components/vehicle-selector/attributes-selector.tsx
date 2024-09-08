import { getModelAttributes } from '@/components/vehicle-selector/actions';
import { AttributeSelector } from '@/components/vehicle-selector/attribute-selector';
import { ModelAttribute, ModelAttributeValue, ModelAttributes } from '@/components/vehicle-selector/types';
import { useEffect, useState } from 'react';

type AttributesSelectorProps = {
	year?: number;
	modelId?: number;
	onAttributeValuesSelected: (values: { [code: string]: ModelAttributeValue }) => void;
};

export function AttributesSelector({ year, modelId, onAttributeValuesSelected }: AttributesSelectorProps) {
	const [attributes, setAttributes] = useState<ModelAttributes>();
	const [vinSchemaIds, setVinSchemaIds] = useState<number[]>();
	const [selectedAttributeValues, setSelectedAttributeValues] = useState<{ [code: string]: ModelAttributeValue }>();

	useEffect(() => {
		if (year && modelId) {
			getModelAttributes(year, modelId).then((data) => {
				setAttributes(data);

				if (data) {
					setVinSchemaIds(
						Array.from(new Set(data.flatMap((attribute) => attribute.values.flatMap((av) => av.vinSchemaIds))))
					);

					const defaultSelectedAttributeValues = data.reduce(
						(acc: { [code: string]: ModelAttributeValue }, attribute: ModelAttribute) => {
							if (!acc[attribute.code] && attribute.values.length < 2) {
								acc[attribute.code] = attribute.values[0];
							}

							return acc;
						},
						{}
					);

					setSelectedAttributeValues(defaultSelectedAttributeValues);
					onAttributeValuesSelected(defaultSelectedAttributeValues);
				}
			});
		}
	}, [year, modelId]);

	const onAttributeValueSelected = (attribute: ModelAttribute, attributeValue?: ModelAttributeValue) => {
		if (attributeValue) {
			const newSelectedAttributeValues = { ...selectedAttributeValues, [attribute.code]: attributeValue };
			setSelectedAttributeValues(newSelectedAttributeValues);
			onAttributeValuesSelected(newSelectedAttributeValues);
		}
	};

	return (
		<>
			<ul>
				{attributes?.map((attribute) => (
					<li key={attribute.code}>
						<AttributeSelector
							attribute={attribute}
							vinSchemaIds={vinSchemaIds ?? []}
							onAttributeValueSelected={(value) => onAttributeValueSelected(attribute, value)}
						/>
					</li>
				))}
			</ul>
		</>
	);
}
