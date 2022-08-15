import { CryptographyPass } from "../contracts/gateways/crypto/crypto-pass"
import { InsertAlunoRepository } from "../contracts/repos/insert-aluno"
import { LoadAlunoRepository } from "@/domain/contracts/repos/load-aluno"
import { SendEmailCadastroAluno } from '@/domain/contracts/gateways/emails/email-cadastro-aluno'
import { GerarTokenAtivacao } from "@/domain/contracts/gateways/token/generate"

type Setup = (repositorioAluno: InsertAlunoRepository & LoadAlunoRepository, emailCadastroAluno: SendEmailCadastroAluno, sendTokenAtivacao: GerarTokenAtivacao, crypto: CryptographyPass) => CadastroAluno
type Input = { nomeCompleto: string, email: string, senha: string, dataIngresso: string, cursoFatec: string, ciclo: number, tokenAtivacao?: string }
type Output = Error | { id: string }
export type CadastroAluno = (input: Input) => Promise<Output> 


const setupCadastrarAluno: Setup = (repositorioAluno, emailCadastroAluno, sendTokenAtivacao, crypto) => async input => {
    const aluno = await repositorioAluno.loadAluno({ email: input.email })
    const cryptoPass = await crypto.cryptograph(input.senha)
    if (aluno?.id) {
        throw new Error('user_already_exists')
    }
    const token = await sendTokenAtivacao.generate({ email: input.email })
    input.senha = cryptoPass
    input.tokenAtivacao = token
    const novoAluno = await repositorioAluno.insertAluno(input)
    await emailCadastroAluno.send({ from: 'gabrielvalin@gmail.com', to: input.email, subject: 'Ative sua conta para logar na plataforma.', text: 'Bem vindx!', html: `<b>Aqui esta seu link de ativacao: <a href="http://localhost:8081/ativar-conta?token=${token}">Link de ativação</a></b>` })
    return { id: novoAluno.id }
}

export { setupCadastrarAluno }