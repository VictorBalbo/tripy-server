import {
	Column,
	Entity,
	JoinColumn,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm'
import { Destination, Transportation } from '.'

@Entity()
export class Trip {
	@Column()
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	name: string

	@Column()
	startDate: Date

	@Column()
	endDate: Date

	@OneToMany(() => Destination, (destination) => destination.trip, {
		eager: true,
		cascade: true,
	})
	@JoinColumn()
	destinations: Destination[]

	@OneToMany(() => Transportation, (transportation) => transportation.trip, {
		eager: true,
		cascade: true,
	})
	@JoinColumn()
	transportations: Transportation[]
}
