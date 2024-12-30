import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Activity, Destination, Housing, Place, Transportation, Trip} from '../models'

export const AppDataSource = new DataSource({
	type: 'mssql',
	host: 'tripy.database.windows.net',
	port: 1433,
	username: 'TripyApp',
	password: 'uHg.P-DY8X!i3qnH9HvMBuFfr78DajpesWQrsx3R',
	database: 'Tripy',
	entities: [Activity, Destination, Housing, Place, Transportation, Trip],
	synchronize: true,
	logging: false,
})
