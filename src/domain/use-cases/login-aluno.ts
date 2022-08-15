import { LoadAlunoByEmailRepositorio } from "@/domain/contracts/repos/load-aluno"
import { GerarTokenAcessoAluno } from "@/domain/contracts/gateways/token/token-login"
import { CryptographyPass } from "../contracts/gateways/crypto/crypto-pass"

export type Setup = (loadAlunoByEmail: LoadAlunoByEmailRepositorio, gerarTokenAluno: GerarTokenAcessoAluno, crypto: CryptographyPass) => LoginAluno
export type Input = { email: string, password: string }
export type Output = Error | { accessToken: string } | void
export type LoginAluno = (input: Input) => Promise<Output> 

export const setupLoginAluno: Setup = (loadAlunoByEmail, gerarTokenAluno, crypto) => async input => {
    const aluno = await loadAlunoByEmail.load({ email: input.email } )
    if (!aluno) throw new Error('user not exists')
    const validatePassword = await crypto.decode(input.password, aluno?.senha)
    if (!validatePassword) throw new Error('password not matchs')
    if (!aluno.ativo) throw new Error('user not active')
    const accessToken = await gerarTokenAluno.generate({ email: input.email })
    return { accessToken }
}