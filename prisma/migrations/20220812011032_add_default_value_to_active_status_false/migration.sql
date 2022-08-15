-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Aluno" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeCompleto" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "dataIngresso" DATETIME NOT NULL,
    "cursoFatec" TEXT NOT NULL,
    "ciclo" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Aluno" ("ativo", "ciclo", "cursoFatec", "dataIngresso", "email", "id", "nomeCompleto", "senha") SELECT "ativo", "ciclo", "cursoFatec", "dataIngresso", "email", "id", "nomeCompleto", "senha" FROM "Aluno";
DROP TABLE "Aluno";
ALTER TABLE "new_Aluno" RENAME TO "Aluno";
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
