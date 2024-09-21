'use client';

import { ColumnDef } from '@tanstack/react-table';

export type MaintenanceLog = {
	id: number;
	serviceDate: Date;
	notes?: string | null;
	mileage: number;
	services: MaintenanceLogService[];
};

export type MaintenanceLogService = {
	id: number;
	name: string;
	description?: string | null;
};

export const columns: ColumnDef<MaintenanceLog>[] = [
	{
		accessorKey: 'serviceDate',
		header: 'Service Date',
	},
	{
		accessorKey: 'mileage',
		header: 'Mileage',
	},
	{
		accessorKey: 'services',
		header: 'Services',
	},
	{
		accessorKey: 'notes',
		header: 'Notes',
	},
];
