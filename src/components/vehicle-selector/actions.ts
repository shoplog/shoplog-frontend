'use server';

import { Lookup, ModelAttributes } from '@/components/vehicle-selector/types';
import { components, shoplogApiClient } from '@/lib/api';

export async function getYears() {
	const apiClient = await shoplogApiClient();
	const { data } = await apiClient.GET('/vpic/years');

	return data;
}

export async function getMakes(year: number): Promise<Lookup[] | undefined> {
	const apiClient = await shoplogApiClient();
	const { data } = await apiClient.GET('/vpic/years/{year}/makes', { params: { path: { year } } });

	return data?.filter((x) => x.id === 448);
}

export async function getModels(year: number, makeId: number): Promise<Lookup[] | undefined> {
	const apiClient = await shoplogApiClient();
	const { data } = await apiClient.GET('/vpic/makes/{makeId}/year/{year}/models', {
		params: { path: { year, makeId } },
	});

	return data;
}

export async function getModelAttributes(year: number, modelId: number): Promise<ModelAttributes | undefined> {
	const apiClient = await shoplogApiClient();
	const { data } = await apiClient.GET('/vpic/models/{modelId}/year/{year}/attributes', {
		params: { path: { year, modelId } },
	});

	return data;
}
