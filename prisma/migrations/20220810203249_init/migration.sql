-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nomeCompleto" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "dataIngresso" DATETIME NOT NULL,
    "cursoFatec" TEXT NOT NULL,
    "ciclo" INTEGER NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
