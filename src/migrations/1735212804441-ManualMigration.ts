import { MigrationInterface, QueryRunner } from 'typeorm';

export class ManualMigration1735212804441 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the "class" table
    await queryRunner.query(`
      CREATE TABLE "class" (
        "id" SERIAL NOT NULL,
        "className" VARCHAR NOT NULL UNIQUE,
        CONSTRAINT "PK_class_id" PRIMARY KEY ("id")
      )
    `);

    // Create the "student" table
    await queryRunner.query(`
      CREATE TABLE "student" (
        "id" SERIAL NOT NULL,
        "studentName" VARCHAR NOT NULL,
        "classId" INTEGER,
        CONSTRAINT "PK_student_id" PRIMARY KEY ("id"),
        CONSTRAINT "FK_student_class" FOREIGN KEY ("classId") REFERENCES "class" ("id") ON DELETE CASCADE
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the "student" table
    await queryRunner.query(`
      DROP TABLE "student"
    `);

    // Drop the "class" table
    await queryRunner.query(`
      DROP TABLE "class"
    `);
  }
}
