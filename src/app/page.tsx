import { MaintenanceLog } from '@/components/maintenance-log-table/columns';
import MyVehicleSelector from '@/components/my-vehicle-selector/my-vehicle-selector';
import { Button } from '@/components/ui';
import { shoplogApiClient } from '@/lib/api';
import { getAccessToken, withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function Home() {
	const { accessToken } = await getAccessToken();
	let maintenanceLogs: MaintenanceLog[] = [];

	if (accessToken) {
		const client = await shoplogApiClient(accessToken);
		const { data } = await client.GET('/maintenance-logs/{vehicleId}', { params: { path: { vehicleId: 1 } } });

		if (data) {
			maintenanceLogs = data.map((log) => ({
				id: log.id,
				serviceDate: new Date(log.serviceDate),
				mileage: log.mileage,
				notes: log.notes,
				services: [],
			}));
		}
	}

	return (
		<>
			<div className="flex items-center">
				<h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
			</div>
		</>
	);
});
