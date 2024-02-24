import { TransactionBaseService } from "@medusajs/medusa"
import FormulaRepository from "src/repositories/formula"
import { FormulaCreateInput } from "../types/formula"
import { Repository } from "typeorm"
import { Formula } from "src/models/formula"

type InjectedDependencies = {
  formulaRepository: typeof FormulaRepository
}

export default class FormulaService extends TransactionBaseService {
  private formulaRepository: Repository<Formula>

  constructor(container: InjectedDependencies) {
    super(container)
    this.formulaRepository = this.createRepository(container.formulaRepository)
  }

  private createRepository(
    repository: typeof FormulaRepository): Repository<Formula> {
    return this.activeManager_.withRepository(repository)
  }

  async create(input: FormulaCreateInput): Promise<Formula> {
    const formula = this.formulaRepository.create()
    formula.name = input.name
    formula.product_variants = []

    return await this.formulaRepository.save(formula)
  }

}