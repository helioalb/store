import { MedusaRequest, MedusaResponse } from "@medusajs/medusa";
import FormulaService from "src/services/formula";

export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const formulaService: FormulaService = req.scope.resolve("formulaService")

  const formula = await formulaService.create(req.body)

  res.json({ formula })
}
