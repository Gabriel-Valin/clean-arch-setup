import { CadastroAluno } from "@/domain/use-cases/cadastro-aluno"
import { badRequest, HttpResponse, ok, serverError } from "../helpers/http"

type HttpRequest = {
    nomeCompleto: string
    email: string
    senha: string
    dataIngresso: string
    cursoFatec: string
    ciclo: number
}

export class CadastroAlunoController {
    constructor (private readonly insertAluno: CadastroAluno) {}

    async handle({ nomeCompleto, email, senha, dataIngresso, cursoFatec, ciclo }: HttpRequest): Promise<HttpResponse> {
        try {
            const result = await this.insertAluno({ nomeCompleto, email, senha, dataIngresso, cursoFatec, ciclo })
            return ok(result)
        } catch (error) {
            if (error instanceof Error) return badRequest(error.message)
            return serverError(error)
            throw error
        }
    }
}