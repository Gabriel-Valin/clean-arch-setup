import { LoginAlunoController } from "@/application/controller/login-aluno";
import { makeLoginAluno } from "../domain/use-cases/login-aluno";

export const makeLoginAlunoController = (): LoginAlunoController => {
    const controller = new LoginAlunoController(makeLoginAluno())
    return controller
}