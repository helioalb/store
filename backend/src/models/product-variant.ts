import { ProductVariant as MedusaProductVariant } from "@medusajs/medusa";
import { Entity, ManyToOne } from "typeorm";
import { Formula } from "./formula";

@Entity()
export class ProductVariant extends MedusaProductVariant {
  @ManyToOne(() => Formula, formula => formula.product_variants)
  formula: Formula
}
