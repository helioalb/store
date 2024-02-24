import { MigrationInterface, QueryRunner } from "typeorm"

export class AddManyProductsToFormula17085573422985 implements MigrationInterface {
  name = "AddManyProductsToFormula17085573422985"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "formula" (
        "id" character varying NOT NULL,
        "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP WITH TIME ZONE,
        "name" character varying NOT NULL UNIQUE,
        CONSTRAINT "PK_formula" PRIMARY KEY ("id"))`)

    await queryRunner.query(`ALTER TABLE "product_variant" ADD COLUMN "formula_id" character varying`)
    await queryRunner.query(`
      ALTER TABLE "product_variant" ADD CONSTRAINT "FK_product_variant_formula_id"
      FOREIGN KEY ("formula_id")
      REFERENCES "formula" ("id")`)
    await queryRunner.query(`CREATE INDEX "IDX_product_variant_formula_id" ON "product_variant" ("formula_id")`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "IDX_product_variant_formula_id"`)
    await queryRunner.query(`ALTER TABLE "product_variant" DROP CONSTRAINT "FK_product_variant_formula_id"`)
    await queryRunner.query(`ALTER TABLE "product_variant" DROP COLUMN "formula_id"`)
    await queryRunner.query(`DROP TABLE "formula"`)
  }
}