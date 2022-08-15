import { mock, MockProxy } from 'jest-mock-extended'
import { CryptographyPass } from '@/domain/contracts/gateways/crypto/crypto-pass'
import { InsertAlunoRepository } from '@/domain/contracts/repos/insert-aluno'
import { LoadAlunoRepository } from '@/domain/contracts/repos/load-aluno'
import { setupCadastrarAluno, CadastroAluno } from '@/domain/use-cases/cadastro-aluno'
import { SendEmailCadastroAluno } from '@/domain/contracts/gateways/emails/email-cadastro-aluno'
import { GerarTokenAtivacao } from '@/domain/contracts/gateways/token/generate'

describe('CadastroAluno', () => {
    let sut: CadastroAluno
    let alunoRepositorio: MockProxy<InsertAlunoRepository & LoadAlunoRepository>
    let crypto: MockProxy<CryptographyPass>
    let emailCadastroAluno: MockProxy<SendEmailCadastroAluno>
    let tokenAtivacao: MockProxy<GerarTokenAtivacao>
    let aluno = { nomeCompleto: 'any name', email: 'any_email_registered', senha: 'any pass', dataIngresso: '30/07/2022', cursoFatec: 'ADS', ciclo: 1, tokenAtivacao: 'any_token' }

    beforeAll(() => {
        alunoRepositorio = mock()
        crypto = mock()
        emailCadastroAluno = mock()
        tokenAtivacao = mock()
        alunoRepositorio.insertAluno.mockResolvedValue({ id: 'any_id' })
        crypto.cryptograph.mockResolvedValue('stringcipher')
    })

    beforeEach(() => {
        sut = setupCadastrarAluno(alunoRepositorio, emailCadastroAluno, tokenAtivacao, crypto)
    })

    afterAll(() => {
        jest.clearAllMocks()
    })

    it('should loadAluno with correct params', async () => {
        await sut(aluno)

        expect(alunoRepositorio.loadAluno).toHaveBeenCalledWith({ email: aluno.email })
        expect(alunoRepositorio.loadAluno).toHaveBeenCalledTimes(1)
    })

    it('should throws if user already exists', async () => {
        alunoRepositorio.loadAluno.mockResolvedValueOnce({ id: 'any_id', senha: 'any_pass' })

        const promise = sut(aluno)

        expect(promise).rejects.toThrow(new Error('user_already_exists'))
    })

    it('should insertAluno with correct params', async () => {
        await sut(aluno)

        expect(alunoRepositorio.insertAluno).toHaveBeenCalledWith(aluno)
        expect(alunoRepositorio.insertAluno).toHaveBeenCalledTimes(1)
    })

    it('should calls crypto with correct params', async () => {
        await sut(aluno)

        expect(crypto.cryptograph).toHaveBeenCalledWith(aluno.senha)
        expect(crypto.cryptograph).toHaveBeenCalledTimes(1)
    })

    it('should calls gerarTokenAtivacao with correct params', async () => {
        await sut(aluno)

        expect(tokenAtivacao.generate).toHaveBeenCalledWith({ email: aluno.email })
        expect(tokenAtivacao.generate).toHaveBeenCalledTimes(1)
    })

    it('should calls emailCadastroAluno with correct params', async () => {
        tokenAtivacao.generate.mockResolvedValueOnce('any_token')

        await sut(aluno)

        expect(emailCadastroAluno.send).toHaveBeenCalledWith({ from: 'gabrielvalin@gmail.com', to: aluno.email, subject: 'Ative sua conta para logar na plataforma.', text: 'Bem vindx!', html: `<b>Aqui esta seu link de ativacao: <a href="http://localhost:8081/ativar-conta?token=any_token">Link de ativação</a></b>`  })
        expect(emailCadastroAluno.send).toHaveBeenCalledTimes(1)
    })

    it('should returns aluno id if success', async () => {
        const alunoID = await sut(aluno)

        expect(alunoID).toEqual({ id: 'any_id' })
    })
})