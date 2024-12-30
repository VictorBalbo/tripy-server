import { Trip } from '../models'
import { AppDataSource } from '../storage/DataSource'

export class TripService {
	static tripRepository = AppDataSource.getRepository(Trip)
	static setTrip = async (trip: Trip) => {
    return TripService.tripRepository.save(trip)
	}

	static getTrip = async (id: string) => {
		return TripService.tripRepository.findOneBy({ id })
	}
}
