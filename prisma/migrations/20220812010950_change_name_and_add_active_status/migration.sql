/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Aluno" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeCompleto" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "dataIngresso" DATETIME NOT NULL,
    "cursoFatec" TEXT NOT NULL,
    "ciclo" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");
