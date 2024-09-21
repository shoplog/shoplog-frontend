import { MaintenanceLog } from '@/components/maintenance-log-table/columns';
import MyVehicleSelector from '@/components/my-vehicle-selector/my-vehicle-selector';
import { Button } from '@/components/ui';
import { shoplogApiClient } from '@/lib/api';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

export default withPageAuthRequired(async function MaintenanceLogs() {
	const client = await shoplogApiClient();
	const { data } = await client.GET('/maintenance-logs/{vehicleId}', { params: { path: { vehicleId: 1 } } });
	let maintenanceLogs: MaintenanceLog[] = [];

	if (data) {
		maintenanceLogs = data.map((log) => ({
			id: log.id,
			serviceDate: new Date(log.serviceDate),
			mileage: log.mileage,
			notes: log.notes,
			services: [],
		}));
	}

	return (
		<>
			<div className="flex items-center">
				<h1 className="text-lg font-semibold md:text-2xl">Maintenance Log</h1>
			</div>
			<div className="flex flex-1 flex-col items-center rounded-lg border border-dashed shadow-sm">
				<div className="flex">
					<MyVehicleSelector />
				</div>
				<div className="flex flex-col items-center gap-1 text-center">
					<h3 className="text-2xl font-bold tracking-tight">You have no log entries</h3>
					<p className="text-sm text-muted-foreground">You can start selling as soon as you add an entry.</p>
					<Button className="mt-4">Add Entry</Button>
				</div>
			</div>
		</>
	);
});
