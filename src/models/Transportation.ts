import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Place, Trip, type Coordinates } from '.'

@Entity()
export class Transportation {
	@Column()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@ManyToOne(() => Place, (Place) => Place.id, { eager: true, cascade: true })
	@JoinColumn()
	origin: Place

	@ManyToOne(() => Place, (Place) => Place.id, { eager: true, cascade: true })
	@JoinColumn()
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
}
export enum TransportTypes {
	Bus = 'Bus',
	Car = 'Car',
	Plane = 'Plane',
	Ship = 'Ship',
	Train = 'Train',
}
