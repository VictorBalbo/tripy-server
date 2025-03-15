import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Trip } from '.'

@Entity()
class Distance {
	@Column()
	distance: number
	@Column()
	duration: number
	@Column()
	polyline: string
}

@Entity()
export class DistanceBetweenPlaces {
	@PrimaryColumn()
	fromPlaceId: string

	@PrimaryColumn()
	toPlaceId: string

	@Column(() => Distance)
	driving: Distance

	@Column(() => Distance)
	transit: Distance

	@Column(() => Distance)
	walking: Distance

	@ManyToOne(() => Trip, (trip) => trip.transportations)
	trip?: Trip
}
