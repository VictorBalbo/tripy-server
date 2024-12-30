import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Place } from '.'

@Entity()
export class Housing {
  @Column()
	@PrimaryGeneratedColumn('uuid')
	id: string
  
	@ManyToOne(() => Place, (Place) => Place.id, { eager: true, cascade: true })
	@JoinColumn()
	place: Place
	
  @Column({nullable: true})
	checkin?: string
	
  @Column({nullable: true})
	checkout?: string
	
  @Column({nullable: true})
	website?: string
	
  @Column({nullable: true})
	notes?: string
	
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
	price?: number
}
