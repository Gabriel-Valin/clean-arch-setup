import { Router } from "express"
import { adaptExpressRoute } from "../adapters/express-router"
import { makeCadastroAlunoController } from "@/main/factories/controllers/cadastro-aluno"
import { makeLoginAlunoController } from "@/main/factories/controllers/login-aluno"

export default (router: Router): void => {
    router.post('/criar-aluno', adaptExpressRoute(makeCadastroAlunoController()))
}