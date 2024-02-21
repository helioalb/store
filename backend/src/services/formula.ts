import { ProductVariantService, TransactionBaseService } from "@medusajs/medusa"
import FormulaRepository from "../repositories/formula"
import { Formula } from "src/models/formula"
import { ProductVariant } from "src/models/product-variant"

type InjectedDependency = {
  formulaRepository: typeof FormulaRepository
  productVariantService: ProductVariantService
}

type FormulaInput = {
  name: string
  variant_ids: string[]
}

class FormulaService extends TransactionBaseService {
  private formulaRepository_: typeof FormulaRepository
  private productVariantService: ProductVariantService

  constructor({formulaRepository, productVariantService}: InjectedDependency) {
    super(arguments[0])
    this.formulaRepository_ = formulaRepository
    this.productVariantService = productVariantService
  }


  async create({name, variant_ids}: FormulaInput): Promise<Formula> {
    const formulaRepository = this.activeManager_.withRepository(
      this.formulaRepository_
    )
    const formula = formulaRepository.create()
    formula.name = name

    const productVariants = await this.productVariantService.list(variant_ids)
    formula.product_variants = productVariants

    return await formulaRepository.save(formula)
  }
}

export default FormulaService
