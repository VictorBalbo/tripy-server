import { Column, Entity, PrimaryColumn } from 'typeorm'
import { Coordinates } from './Coordinates'

@Entity()
export class Place {
	@Column()
  @PrimaryColumn()
	id: string
	
  @Column({ nullable: false })
	name: string
	
  @Column(() => Coordinates)
	coordinates?: Coordinates
	
  @Column({ nullable: true })
	address?: string

  @Column({ nullable: true })
  description?: string
  
	@Column('simple-array', { nullable: true })
	categories?: string[]
  
	@Column({ nullable: true })
	vicinity?: string
  
	@Column({ nullable: true })
	rating?: number
  
	@Column({ nullable: true })
	website?: string
  
	@Column({ nullable: true })
	phoneNumber?: string
  
	@Column('simple-array', { nullable: true })
	images?: string[]
  
	@Column({ nullable: true })
	businessStatus?: string
  
	@Column({ nullable: true })
	mapsUrl?: string
	
	@Column('simple-json', { nullable: true })
	openingHours?: OpeningHours
}

export interface OpeningHours {
	periods: [
		{
			open: { day: number; time: string }
			close: { day: number; time: string }
		}
	]
	weekdayText: string[]
}
