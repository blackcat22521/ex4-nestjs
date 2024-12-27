"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManualMigration1735212804441 = void 0;
class ManualMigration1735212804441 {
    async up(queryRunner) {
        await queryRunner.query(`
      CREATE TABLE "class" (
        "id" SERIAL NOT NULL,
        "className" VARCHAR NOT NULL UNIQUE,
        CONSTRAINT "PK_class_id" PRIMARY KEY ("id")
      )
    `);
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
    async down(queryRunner) {
        await queryRunner.query(`
      DROP TABLE "student"
    `);
        await queryRunner.query(`
      DROP TABLE "class"
    `);
    }
}
exports.ManualMigration1735212804441 = ManualMigration1735212804441;
//# sourceMappingURL=1735212804441-ManualMigration.js.map