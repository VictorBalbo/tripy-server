import { MongoClient, ServerApiVersion } from 'mongodb'
import { db_host, db_name, db_username, db_password } from '../constants'
import { Place } from '../models/Place'

export class MongoDb {
	private static client?: MongoClient

	public static connectAsync = async () => {
		if (MongoDb.client) {
			return
		}
		const connStr = `mongodb+srv://${db_username}:${db_password}@${db_host}/?retryWrites=true&w=majority&appName=${db_name}`
		try {
			MongoDb.client = new MongoClient(connStr, {
				serverApi: {
					version: ServerApiVersion.v1,
					strict: true,
					deprecationErrors: true,
				},
			})
			await MongoDb.client.connect()
			console.log('Connected')
		} catch (err) {
			console.error(err)
			await MongoDb.client?.close()
		}
	}
	public static findPlaceByIdAsync = async (placeId: string) => {
		await MongoDb.connectAsync()
		const place = await MongoDb.client
			?.db(db_name)
			.collection<Place>('Places')
			.findOne({ _id: placeId })
		return place as Place | undefined
	}

	public static savePlaceAsync = async (place: Place) => {
		await MongoDb.connectAsync()
		await MongoDb.client
			?.db(db_name)
			.collection<Place>('Places')
			.insertOne(place)
	}
}
