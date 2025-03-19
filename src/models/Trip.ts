import {
	AfterLoad,
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

	@Column({ type: 'timestamp without time zone' })
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

	@AfterLoad()
	async loadPlace() {
		console.log(this.startDate.toISOString())
		console.log(new Date(this.startDate).toISOString())
		console.log(this.startDate.toUTCString())
		console.log(this.startDate.toISOString())
	}
}
