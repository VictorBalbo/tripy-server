import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Destination, Place } from '.'

@Entity()
export class Activity {
	@Column()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@ManyToOne(() => Place, (Place) => Place.id, { eager: true, cascade: true })
	@JoinColumn()
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
}
