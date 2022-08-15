import { LoginAluno, setupLoginAluno } from "@/domain/use-cases/login-aluno";
import { Cryptography } from "@/infra/cryptography/crypto";
import { AlunoRepositorio } from "@/infra/repos/aluno";
import { TokenAtivacao } from "@/infra/token/generate";

export const makeLoginAluno = (): LoginAluno => {
    const repositorio = new AlunoRepositorio()
    const decoded = new Cryptography()
    const token = new TokenAtivacao()
    return setupLoginAluno(repositorio, token, decoded)
}