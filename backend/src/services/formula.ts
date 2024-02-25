import { ProductVariantService, TransactionBaseService } from "@medusajs/medusa"
import FormulaRepository from "src/repositories/formula"
import { FormulaCreateInput } from "../types/formula"
import { Repository } from "typeorm"
import { Formula } from "src/models/formula"
import { ProductVariant } from "../models/product-variant"

type InjectedDependencies = {
  formulaRepository: typeof FormulaRepository,
  productVariantService: ProductVariantService
}

export default class FormulaService extends TransactionBaseService {
  private formulaRepository: Repository<Formula>
  private productVariantService: ProductVariantService

  constructor(container: InjectedDependencies) {
    super(container)
    this.formulaRepository = this.createRepository(container.formulaRepository)
    this.productVariantService = container.productVariantService
  }

  private createRepository(
    repository: typeof FormulaRepository): Repository<Formula> {
    return this.activeManager_.withRepository(repository)
  }

  async create(input: FormulaCreateInput): Promise<Formula> {
    const formula = this.formulaRepository.create()

    const productVariants = await this.productVariantService.list({ 
      id: input.variant_ids 
    })

    formula.name = input.name
    formula.product_variants = productVariants

    return await this.formulaRepository.save(formula)
  }

}