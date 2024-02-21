import { SoftDeletableEntity } from "@medusajs/medusa"
import { ProductVariant } from "./product-variant"
import { Column, Entity, OneToMany } from "typeorm"

@Entity()
export class Formula extends SoftDeletableEntity {
  @Column({ type: "varchar", nullable: false })
  name: string

  @OneToMany(() => ProductVariant, variant => variant.formula)
  product_variants: ProductVariant[]
}
