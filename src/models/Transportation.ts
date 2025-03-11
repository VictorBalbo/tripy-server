import {
	AfterLoad,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Place, Price, Trip, type Coordinates } from '.'
import { PlaceDetailService } from '../services/PlaceDetailService'

@Entity()
export class Transportation {
	@Column()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	originTerminalId: string
	
	@Column()
	originId: string

	@Column()
	destinationTerminalId: string

	@Column()
	destinationId: string

	// Used as DTO
	originTerminal: Place
	destinationTerminal: Place

	@Column('simple-json')
	path: Coordinates[]

	@Column()
	type: TransportTypes

	@Column({ nullable: true })
	startDate?: Date

	@Column({ nullable: true })
	endDate?: Date

	@Column(() => Price)
	price: Price

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
		this.originTerminal = await PlaceDetailService.getPlaceById(this.originTerminalId)
		this.destinationTerminal = await PlaceDetailService.getPlaceById(this.destinationTerminalId)
	}
}
export enum TransportTypes {
	Bus = 'Bus',
	Car = 'Car',
	Plane = 'Plane',
	Ship = 'Ship',
	Train = 'Train',
}
