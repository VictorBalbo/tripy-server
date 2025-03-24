import { Destination, Trip } from '../models'
import { getRepository } from '../storage/DataSource'

export class TripService {
	static setTrip = async (trip: Trip) => {
		const tripRepository = await getRepository(Trip)
		return tripRepository.save(trip)
	}

	static getTrip = async (id: string) => {
		const tripRepository = await getRepository(Trip)
		return tripRepository.findOne({
			where: {
				id,
			},
			order: {
				startDate: 'ASC',
				destinations: {
					startDate: 'ASC',
				},
				transportations: {
					startDate: 'ASC',
				},
			},
		})
	}

	static getDestination = async (destinationId: string) => {
		const destinationRepository = await getRepository(Destination)
		return destinationRepository.findOne({
			where: {
				id: destinationId,
			},
			loadEagerRelations: false,
			order: {
				startDate: 'ASC',
			},
		})
	}
}
