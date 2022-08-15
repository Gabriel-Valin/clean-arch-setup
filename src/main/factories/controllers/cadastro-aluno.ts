import { CadastroAlunoController } from "@/application/controller/cadastro-aluno"
import { makeCadastroAluno } from "../domain/use-cases/cadastro-aluno"

export const makeCadastroAlunoController = (): CadastroAlunoController => {
    const controller = new CadastroAlunoController(makeCadastroAluno())
    return controller
}