import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Activity, Coordinates, Housing, Trip } from '.'

@Entity()
export class Destination {
	@Column()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	name: string

	@Column(() => Coordinates)
	coordinates: Coordinates

	@OneToOne(() => Housing, { eager: true, cascade: true })
	@JoinColumn()
	housing?: Housing

	@OneToMany(() => Activity, (activity) => activity.destination, {
		eager: true,
		cascade: true,
	})
	@JoinColumn()
	activities?: Activity[]

	@Column()
	startDate?: Date

	@Column()
	endDate?: Date

	@ManyToOne(() => Trip, (trip) => trip.destinations)
	@JoinColumn()
	trip: Trip
}
