import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDueDateToTasks1758508864937 implements MigrationInterface {
    name = 'AddDueDateToTasks1758508864937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "due_date" TIMESTAMP WITH TIME ZONE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "due_date"`);
    }

}
