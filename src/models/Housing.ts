import { AfterLoad, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Place, Price } from '.'
import { PlaceDetailService } from '../services/PlaceDetailService'

@Entity()
export class Housing {
	@Column()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	placeId: string
	// Used as DTO
	place: Place

	@Column({ nullable: true })
	image?: string

	@Column({ nullable: true })
	name?: string

	@Column({ nullable: true })
	checkin?: Date

	@Column({ nullable: true })
	checkout?: Date

	@Column({ nullable: true })
	website?: string

	@Column({ nullable: true })
	notes?: string

	@Column(() => Price)
	price: Price

	@AfterLoad()
	async loadPlace() {
		this.place = await PlaceDetailService.getPlaceById(this.placeId)
	}
}
