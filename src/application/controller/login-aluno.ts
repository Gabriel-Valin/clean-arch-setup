import { LoginAluno } from "@/domain/use-cases/login-aluno"
import { badRequest, HttpResponse, ok, serverError } from "../helpers/http"

type HttpRequest = {
    email: string
    senha: string
}

export class LoginAlunoController {
    constructor (private readonly login: LoginAluno) {}

    async handle({ email, senha }: HttpRequest): Promise<HttpResponse> {
        try {
            const result = await this.login({ email, password: senha })
            return ok(result)
        } catch (error) {
            if (error instanceof Error) return badRequest(error.message)
            return serverError(error)
            throw error
        }
    }
}