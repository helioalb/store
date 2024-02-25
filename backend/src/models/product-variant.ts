import { ProductVariant as MedusaProductVariant } from "@medusajs/medusa"
import { Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm"
import { Formula } from "./formula"

@Entity()
export class ProductVariant extends MedusaProductVariant {
  @Index()
  @Column({ type: "varchar", nullable: true})
  formula_id: string
  
  @ManyToOne(() => Formula, formula => formula.product_variants)
  @JoinColumn({ name: "formula_id" })
  formula: Formula
}