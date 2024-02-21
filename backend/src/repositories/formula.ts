import { dataSource } from "@medusajs/medusa/dist/loaders/database";
import { Formula } from "src/models/formula";

const FormulaRepository = dataSource.getRepository(Formula)

export default FormulaRepository
