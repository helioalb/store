import { dataSource } from "@medusajs/medusa/dist/loaders/database"
import { Formula } from "../models/formula"

const FormulaRepository = dataSource.getRepository(Formula)

export default FormulaRepository