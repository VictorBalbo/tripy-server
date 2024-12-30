import { Column, Entity } from 'typeorm'

@Entity()
export class Coordinates {
	@Column({ type: 'float' })
	lat: number

	@Column({ type: 'float' })
	lng: number

	constructor(lat: number, lng: number) {
		this.lat = lat
		this.lng = lng
	}
}
