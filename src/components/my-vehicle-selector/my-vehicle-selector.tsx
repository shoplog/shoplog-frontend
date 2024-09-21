import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui';
import { components, shoplogApiClient } from '@/lib/api';

export default async function MyVehicleSelector() {
	const client = await shoplogApiClient();
	const { data: vehicles } = await client.GET('/vehicles');
	const firstVehicle = vehicles?.at(0);

	const createVehicleName = (vehicle: components['schemas']['Vehicle']) => {
		return `${vehicle.year} ${vehicle.make} ${vehicle.model}`;
	};

	return (
		<Select>
			<SelectTrigger className="w-full">
				<SelectValue
					placeholder="Select a vehicle..."
					defaultValue={firstVehicle ? createVehicleName(firstVehicle) : undefined}
				/>
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{vehicles?.map((vehicle) => (
						<SelectItem key={vehicle.id} value={createVehicleName(vehicle)}>
							{createVehicleName(vehicle)}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
