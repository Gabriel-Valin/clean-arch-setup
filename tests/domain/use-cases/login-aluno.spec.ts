import { MockProxy, mock } from "jest-mock-extended"
import { CryptographyPass } from "@/domain/contracts/gateways/crypto/crypto-pass"
import { LoginAluno, Setup, setupLoginAluno } from "@/domain/use-cases/login-aluno"
import { LoadAlunoByEmailRepositorio } from "@/domain/contracts/repos/load-aluno"

type GerarTokenLogin = {
    email: string
}

interface GerarTokenAcessoAluno {
    generate: (params: GerarTokenLogin) => Promise<string>
}


// receive email and load aluno with email ✅
// if password provider password equals password storage continue if process 
// if aluno not exists return domain Error (AuthenticationError) ✅
// if aluno exists but ativo is false return domain Error (ActiveError) ✅
// if aluno exists and ativo is true return access token ✅

describe('LoginAluno', () => {
    let sut: LoginAluno
    let loadAlunoByEmail: MockProxy<LoadAlunoByEmailRepositorio>
    let gerarTokenLogin: MockProxy<GerarTokenAcessoAluno>
    let crypto: MockProxy<CryptographyPass>
    let emailAluno = 'gabrielvalin@mail.com'
    let passProvided = 'any_pass'

    beforeAll(() => {
        loadAlunoByEmail = mock()
        gerarTokenLogin = mock()
        crypto = mock()

        loadAlunoByEmail.load.mockResolvedValue({ id: 1, email: 'anymail@mail.com', ativo: true, senha: 'any_pass' })
        gerarTokenLogin.generate.mockResolvedValue('any_token_login')
        crypto.decode.mockResolvedValue(true)
    })

    beforeEach(() => {
        sut = setupLoginAluno(loadAlunoByEmail, gerarTokenLogin, crypto)
    })

    afterAll(() => {
        jest.clearAllMocks()
    })

    it('should call loadAluno with correct params', async () => {
        await sut({ email: emailAluno, password: passProvided })

        expect(loadAlunoByEmail.load).toHaveBeenCalledWith({ email: emailAluno })
        expect(loadAlunoByEmail.load).toHaveBeenCalledTimes(1)
    })

    it('should calls crypto decode with correct params', async () => {
        await sut({ email: emailAluno,  password: passProvided })

        expect(crypto.decode).toHaveBeenCalledWith(passProvided, 'any_pass')
        expect(crypto.decode).toHaveBeenCalledTimes(1)
    })

    it('should return AuthenticateError if password not matchs', async () => {
        crypto.decode.mockResolvedValueOnce(false)

        const promise = sut({ email: emailAluno,  password: passProvided })

        expect(promise).rejects.toThrow(new Error('password not matchs'))
    })

    it('should returns AuthenticationError if repositorio return false', async () => {
        loadAlunoByEmail.load.mockResolvedValueOnce(undefined)
        
        const promise = sut({ email: emailAluno,  password: passProvided })
        
        expect(promise).rejects.toThrow(new Error('user not exists'))
    })

    it('should return ActiveError if repositorio returns ativo equals false', async () => {
        loadAlunoByEmail.load.mockResolvedValueOnce({ id: 1, email: 'anymail@mail.com', ativo: false, senha: 'any_pass' })

        const promise = sut({ email: emailAluno, password: passProvided })
        
        expect(promise).rejects.toThrow(new Error('user not active'))
    })

    it('should returns accessToken if repositorio returns ativo equals true', async () => {
        const authToken = await sut({ email: emailAluno,  password: passProvided})
        
        expect(authToken).toEqual({ accessToken: 'any_token_login' })
    })

    it('should calls gerarTokenAlunoLogin with correct params', async () => {
        await sut({ email: emailAluno,  password: passProvided })

        expect(gerarTokenLogin.generate).toHaveBeenCalledWith({ email: emailAluno })
        expect(gerarTokenLogin.generate).toHaveBeenCalledTimes(1)
    })
})