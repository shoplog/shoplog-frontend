import { ThemeSelector } from '@/components';
import { MaintenanceLog } from '@/components/maintenance-log-table/columns';
import { MaintenanceLogTable } from '@/components/maintenance-log-table/maintenance-log-table';
import { Button } from '@/components/ui';
import { VehicleSelector } from '@/components/vehicle-selector/vehicle-selector';
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
		<main className="flex min-h-screen flex-col items-center justify-between p-24">
			<Button asChild>
				<a href="/api/auth/logout">Logout</a>
			</Button>
			<MaintenanceLogTable logs={maintenanceLogs} />
			<ThemeSelector />
		</main>
	);
});
