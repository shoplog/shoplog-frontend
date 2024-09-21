import { shoplogApiClient } from '@/lib/api';

export async function getMaintenanceLogs(vehicleId: number) {
	const apiClient = await shoplogApiClient();
	const { data } = await apiClient.GET('/maintenance-logs/{vehicleId}', {
		params: { path: { vehicleId } },
	});

	return data;
}
