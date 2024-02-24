import { SoftDeletableEntity } from "@medusajs/medusa"
import { Column, Entity, OneToMany } from "typeorm"
import { ProductVariant } from "./product-variant"

@Entity()
export class Formula extends SoftDeletableEntity {
  @Column({ type: "varchar", unique: true, nullable: false })
  name: string

  @OneToMany(() => ProductVariant, variant => variant.formula)
  product_variants: ProductVariant[]
}