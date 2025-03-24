import {
	AfterLoad,
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Activity, Housing, Place, Trip } from '.'
import { PlaceDetailService } from '../services/PlaceDetailService'

@Entity()
export class Destination {
	@Column()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	placeId: string
	// Used as DTO
	place: Place

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
	startDate: Date

	@Column()
	endDate: Date

	@Column({ nullable: true })
	notes?: string

	@ManyToOne(() => Trip, (trip) => trip.destinations)
	trip: Trip

	@AfterLoad()
	async loadPlace() {
		this.place = await PlaceDetailService.getPlaceById(this.placeId)
	}
}
