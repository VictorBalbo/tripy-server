import { Entity, Column } from 'typeorm'

@Entity()
export class Price {
	@Column({
		type: 'decimal',
		precision: 10,
		scale: 2,
		nullable: true,
		transformer: {
			to: (value: number) => value, // Store as is
			from: (value: string) => (value ? Number(value) : value), // Convert string to number
		},
	})
	value?: string

	@Column({ nullable: true })
	currency?: string
}
