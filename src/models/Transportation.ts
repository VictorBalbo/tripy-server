import {
	AfterLoad,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Place, Trip, type Coordinates } from '.'
import { PlaceDetailService } from '../services/PlaceDetailService'

@Entity()
export class Transportation {
	@Column()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	originId: string

	@Column()
	destinationId: string

	// Used as DTO
	origin: Place
	destination: Place

	@Column('simple-json')
	path: Coordinates[]

	@Column()
	type: TransportTypes

	@Column({ nullable: true })
	startDate?: Date

	@Column({ nullable: true })
	endDate?: Date

	@Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
	price?: number

	@Column({ nullable: true })
	company?: string

	@Column({ nullable: true })
	number?: string

	@Column({ nullable: true })
	reservation?: string

	@Column({ nullable: true })
	seat?: string

	@ManyToOne(() => Trip, (trip) => trip.transportations)
	trip: Trip

	@AfterLoad()
	async loadPlaces() {
		this.origin = await PlaceDetailService.getPlaceById(this.originId)
		this.destination = await PlaceDetailService.getPlaceById(this.destinationId)
	}
}
export enum TransportTypes {
	Bus = 'Bus',
	Car = 'Car',
	Plane = 'Plane',
	Ship = 'Ship',
	Train = 'Train',
}
