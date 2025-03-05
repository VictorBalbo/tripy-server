import 'reflect-metadata'
import { DataSource, EntityTarget } from 'typeorm'
import { Activity, Destination, Housing, Place, Transportation, Trip} from '../models'
import { db_host, db_name, db_password, db_port, db_username } from '../constants'

let connection: DataSource | null = null

export const getDatabaseConnection = async () => {
	try {
		if (!connection) {
			const AppDataSource = new DataSource({
				type: 'postgres',
				host: db_host,
				port: db_port,
				username: db_username,
				password: db_password,
				database: db_name,
				entities: [Activity, Destination, Housing, Place, Transportation, Trip],
				synchronize: true,
				logging: false,
				ssl: true,
			
			})
			connection = await AppDataSource.initialize()
			console.log('SQL Connected')
		}
		return connection
	} catch (e) {
		console.error(e)
	}
}

export const getRepository = async <T>(target: EntityTarget<T>) => {
	const connection = await getDatabaseConnection()
	return connection.getRepository<T>(target)
}

