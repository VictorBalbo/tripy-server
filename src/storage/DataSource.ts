import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Activity, Destination, Housing, Place, Transportation, Trip} from '../models'
import { db_host, db_name, db_password, db_port, db_username } from '../constants'

export const AppDataSource = new DataSource({
	type: 'mssql',
	host: db_host,
	port: db_port,
	username: db_username,
	password: db_password,
	database: db_name,
	entities: [Activity, Destination, Housing, Place, Transportation, Trip],
	synchronize: true,
	logging: false,
})
