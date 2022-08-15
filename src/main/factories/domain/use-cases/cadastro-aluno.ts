import { CadastroAluno, setupCadastrarAluno } from "@/domain/use-cases/cadastro-aluno"
import { Cryptography  } from "@/infra/cryptography/crypto"
import { EmailCadastroAluno } from "@/infra/email/mailer"
import { AlunoRepositorio } from "@/infra/repos/aluno"
import { TokenAtivacao } from "@/infra/token/generate"

export const makeCadastroAluno = (): CadastroAluno => {
    const repositorio = new AlunoRepositorio()
    const hashPass = new Cryptography()
    const token = new TokenAtivacao()
    const mailer = new EmailCadastroAluno()
    
    return setupCadastrarAluno(repositorio, mailer, token, hashPass)
}