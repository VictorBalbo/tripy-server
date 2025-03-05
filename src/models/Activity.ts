import {
	AfterLoad,
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Destination, Place } from '.'
import { PlaceDetailService } from '../services/PlaceDetailService'

@Entity()
export class Activity {
	@Column()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column({ nullable: true })
	name: string

	@Column()
	placeId: string
	// Used as DTO
	place: Place

	@Column({ nullable: true })
	dateTime?: Date

	@Column({ nullable: true })
	website?: string

	@Column({ nullable: true })
	notes?: string

	@Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
	price?: number

	@ManyToOne(() => Destination, (destination) => destination.activities)
	destination: Destination

	@AfterLoad()
	async loadPlace() {
		this.place = await PlaceDetailService.getPlaceById(this.placeId)
	}
}
